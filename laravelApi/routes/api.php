<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use AleeDhillon\MetaFive\Entities\User;
use AleeDhillon\MetaFive\Facades\Client;
use AleeDhillon\MetaFive\Lib\MTEnDealAction;
use AleeDhillon\MetaFive\Entities\Trade;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/', function () {
    return response()->json(['message' => 'Welcome to the API']);
});

Route::middleware(['auth.apikey'])->group(function () {
    // A route to be pinged to check if the API is up
    Route::get('/ping', function () {
        return response()->json(['message' => 'pong']);
    });
    
    // Create Trading Account (tested with Postman)
    Route::post('/create-user', function (Request $request) {

        // return response()->json(['message' => 'pong']);
        try {
            $validatedData = $request->validate([
                'name' => 'required|string',
                'email' => 'required|email',
                'group' => 'required|string',
                'leverage' => 'required|string',
                'phone' => 'required|string',
                'main_password' => 'required|string',
                'investor_password' => 'required|string',
                'phone_password' => 'required|string',
            ]);

            $user = new User();
            $user->setName($validatedData['name']);
            $user->setEmail($validatedData['email']);
            $user->setGroup($validatedData['group']);
            $user->setLeverage($validatedData['leverage']);
            $user->setPhone($validatedData['phone']);
            $user->setMainPassword($validatedData['main_password']);
            $user->setInvestorPassword($validatedData['investor_password']);
            $user->setPhonePassword($validatedData['phone_password']);

            $result = Client::createUser($user);
            $userLogin = $result->getLogin();

            $userResponse = [
                'login' => $userLogin,
                'name' => $user->getName(),
                'email' => $user->getEmail(),
                'group' => $user->getGroup(),
                'main_password' => $user->getMainPassword(),
                'investor_password' => $user->getInvestorPassword(),
                'phone_password' => $user->getPhonePassword(),
            ];

            return response()->json($userResponse);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->errors()], 422);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    });

    // Make Deposit (tested with Postman)
    Route::post('/make-deposit', function (Request $request) {
        try {
            $validatedData = $request->validate([
                'login' => 'required|integer',
                'amount' => 'required|numeric|min:0.01',
            ]);

            $trade = new Trade();
            $trade->setLogin($validatedData['login']);
            $trade->setAmount($validatedData['amount']);
            $trade->setComment("Deposit");
            $trade->setType(Trade::DEAL_BALANCE);

            $trade = Client::trade($trade);

            return response()->json([
                'message' => 'Deposit successful!',
                'ticket' => $trade->getTicket(),
            ]);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->errors()], 422);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    });

    // Make Withdrawal (tested with Postman)
    Route::post('/make-withdraw', function (Request $request) {
        try {
            $validatedData = $request->validate([
                'login' => 'required|integer',
                'amount' => 'required|numeric|max:-0.01',
            ]);

            $trade = new Trade();
            $trade->setLogin($validatedData['login']);
            $trade->setAmount($validatedData['amount']);
            $trade->setComment("Withdrawal");
            $trade->setType(Trade::DEAL_BALANCE);

            $trade = Client::trade($trade);

            return response()->json([
                'message' => 'Withdrawal successful!',
                'ticket' => $trade->getTicket(),
            ]);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->errors()], 422);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    });

    // Get Trading Account Info (tested with Postman)
    Route::post('/get-trading-account', function (Request $request) {
        try {
            $validatedData = $request->validate([
                'login' => 'required|integer',
                'password' => 'required|string',
            ]);

            $isValidPassword = Client::checkPassword($validatedData['login'], $validatedData['password']);

            if ($isValidPassword) {
                $user = Client::getTradingAccounts($validatedData['login']);
                return response()->json($user);
            } else {
                return response()->json(['error' => 'Invalid password'], 401);
            }
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->errors()], 422);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    });

    // Get Trading Accounts per Group (tested with Postman)
    Route::post('/get-user-logins', function (Request $request) {
        try {
            $validatedData = $request->validate([
                'group' => 'required|string',
            ]);

            $logins = Client::getUserLogins($validatedData['group']);
            return response()->json(['logins' => $logins]);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->errors()], 422);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    })->name('get-user-logins');
});