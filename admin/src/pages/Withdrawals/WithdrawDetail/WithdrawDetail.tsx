import React from 'react'
import { withdrawals } from '@/constants'
import { useParams } from 'react-router-dom'
import { BiDownload } from 'react-icons/bi';



const WithdrawDetail = () => {

    const { id } = useParams();

    const deposit = withdrawals.filter((withdrawal) => withdrawal.transaction == id)[0];

    return (
        <>
            <div className='px-7 py-10'>

                <div>
                    <h1 className='text-2xl font-semibold'>Withdrawal Details</h1>
                </div>
                <div className='w-full shadow-lg flex flex-row gap-6 px-7 py-7 pb-10 mt-2 rounded-md'>
                    <div className='flex flex-col w-1/2'>
                        <div className='flex flex-row border-b pb-3 justify-between w-full'>
                            <div>
                                <h2 className='text-xl'><span className='font-semibold'>{deposit.name}</span> requested <span className='font-semibold'>{deposit.amount}.00 {deposit.currency}</span></h2>
                                <p className='font-semibold opacity-50 text-lg'>via {deposit.gateway}</p>
                            </div>
                            <div className='flex flex-col font-semibold '>
                                <p>{deposit.joinedAt}</p>
                                <p className='text-end opacity-50'>{deposit.timestamp}</p>
                            </div>
                        </div>
                        <div className='w-full flex flex-col gap-1 mt-3'>
                            <div className='flex flex-row justify-between text-lg border-b pb-3 pt-0 px-1'>
                                <p>Transaction Number</p>
                                <p className='font-semibold'>{deposit.transaction}</p>
                            </div>
                            <div className='flex flex-row justify-between text-lg border-b pb-3 pt-2 px-1'>
                                <p>User ID</p>
                                <p className='font-semibold'>{deposit.id}</p>
                            </div>
                            <div className='flex flex-row justify-between text-lg border-b pb-3 pt-2 px-1'>
                                <p>Method</p>
                                <p className='font-semibold'>{deposit.gateway}</p>
                            </div>
                            <div className='flex flex-row justify-between text-lg border-b pb-3 pt-2 px-1'>
                                <p>Amount</p>
                                <p className='font-semibold'>{deposit.amount}.00 USD</p>
                            </div>
                            <div className='flex flex-row justify-between text-lg border-b pb-3 pt-2 px-1'>
                                <p>Charge</p>
                                <p className='font-semibold'>{deposit.charge} USD</p>
                            </div>
                            <div className='flex flex-row justify-between text-lg border-b pb-3 pt-2 px-1'>
                                <p>After Charge</p>
                                <p className='font-semibold'>{Number(deposit.charge) + Number(deposit.amount)}</p>
                            </div>
                            <div className='flex flex-row justify-between text-lg border-b pb-3 pt-2 px-1'>
                                <p>Rate</p>
                                <p className='font-semibold'>{deposit.rate}</p>
                            </div>
                            <div className='flex flex-row justify-between text-lg border-b pb-3 pt-2 px-1'>
                                <p>Payable</p>
                                <p className='font-semibold'>{deposit.payable}.00 {deposit.currency}</p>
                            </div>
                        </div>
                    </div>

                    <div className='w-1/2 border-l pl-5'>
                        <div className='border-b pb-3 flex flex-row items-center justify-between font-semibold'>
                            <div>
                                <h1 className='text-xl'>User Withdrawal Information</h1>
                                {/* <p className='opacity-50 '>Bank Deposit Slip (or screenshot)</p> */}
                            </div>
                            <div className='bg-dark p-1 rounded self-end hover:bg-dark/90 cursor-pointer transition-all'>
                                <BiDownload size={25} className="text-white" />
                            </div>
                        </div>
                        <div className='w-full h-5/6 rounded-md mt-3 bg-dark/10'>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WithdrawDetail