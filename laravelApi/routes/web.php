<?php

use Illuminate\Support\Facades\Route;
use AleeDhillon\MetaFive\Entities\User;
use AleeDhillon\MetaFive\Facades\Client;
use AleeDhillon\MetaFive\Lib\MTEnDealAction;
use AleeDhillon\MetaFive\Entities\Trade;

Route::get('/', function () {
    return view('welcome');
});

// Create Trading Account

// test hardcoded version

// Route::get('/create-user', function () {
//     try {
//         $user = new User();
//         $user->setName("John Doe test 2");
//         $user->setEmail("smartpersonage4@gmail.com");
//         $user->setGroup("demo\usd");
//         $user->setLeverage("50");
//         $user->setPhone("0123456789");
//         $user->setAddress("Lahore");
//         $user->setCity("Lahore");
//         $user->setState("Punjab");
//         $user->setCountry("Pakistan");
//         $user->setZipCode(1470);
//         $user->setMainPassword("B+M3IdrPk");
//         $user->setInvestorPassword("B+dM3IrPk");
//         $user->setPhonePassword("B+M3dIrPk");
//         $result = Client::createUser($user);
//         $userLogin = $result->getLogin();
//         $userResponse = [
//             'login' => $userLogin,
//             'name' => $user->getName(),
//             'email' => $user->getEmail(),
//             'group' => $user->getGroup(),
//             'main_password' => $user->getMainPassword(),
//             'investor_password' => $user->getInvestorPassword(),
//             'phone_password' => $user->getPhonePassword(),
//           ];
//         return response()->json($userResponse);
//     } catch (Exception $e) {
//         return response()->json(['error' => $e->getMessage()]);
//     }
// });

// real version with data in body

// Make Deposit

Route::get('/make-deposit', function () {
    try {
        // Grab user data from request (assuming it's sent via POST)
        $userLogin = 787069;
        $depositAmount = 10; // Replace with the amount you want to deposit

        // Validate user input (amount should be positive)
        if ($depositAmount <= 0) {
            throw new Exception('Invalid deposit amount. Please enter a positive value.');
        }

        // Create a Trade object for deposit
        $trade = new Trade();
        $trade->setLogin(787069);
        $trade->setAmount(15);
        $trade->setComment("Deposit");
        $trade->setType(Trade::DEAL_BALANCE);


        // Call the trade function to deposit funds
        $trade = Client::trade($trade);
        
        return response()->json([
            'message' => 'Deposit successful!',
            'ticket' => $trade->getTicket(),
        ]);
    } catch (Exception $e) {
        return response()->json(['error' => $e->getMessage()], 422); // Set appropriate status code for validation errors
    }
});

// Make Withdrawal

Route::get('/make-withdraw', function () {
    try {
        // Grab user data from request (assuming it's sent via POST)
        $userLogin = 787069;
        $withdrawAmount = -200; // Replace with the amount you want to deposit

        // Validate user input (amount should be positive)
        if ($withdrawAmount >= 0) {
            throw new Exception('Invalid withdrawal amount. The amount should be negative.');
        }

        // Create a Trade object for deposit
        $trade = new Trade();
        $trade->setLogin($userLogin);
        $trade->setAmount($withdrawAmount);
        $trade->setComment("Withdrawal");
        $trade->setType(Trade::DEAL_BALANCE);


        // Call the trade function to deposit funds
        $trade = Client::trade($trade);
        
        return response()->json([
            'message' => 'Withdrawal successful!',
            'ticket' => $trade->getTicket(),
        ]);
    } catch (Exception $e) {
        return response()->json(['error' => $e->getMessage()], 422); // Set appropriate status code for validation errors
    }
});

// Get Trading Account

Route::get('/get-trading-account', function () {
    try {
        $login = 787069; // Use a real MT5 account login
        $password = "B+M3IdrPk"; // Replace with the password you want to check

        // Call the checkPassword function to validate the password
        $isValidPassword = Client::checkPassword($login, $password);

        if ($isValidPassword) {
            // Password is valid, proceed with getting the trading accounts
            $user = Client::getTradingAccounts($login);
            return response()->json($user);
        } else {
            // Password is invalid, return an error response
            return response()->json(['error' => 'Invalid password']);
        }
    } catch (Exception $e) {
        // Handle any exceptions that may occur
        return response()->json(['error' => $e->getMessage()]);
    }
});

// Get Trading Accounts per Group

Route::get('/get-user-logins', function () {
    try {
        $group = 'real\Standard'; // Replace with the group you want to get logins for
        $logins = Client::getUserLogins($group);
        return response()->json(['logins' => $logins]);
    } catch (Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
})->name('get-user-logins');