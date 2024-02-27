import { toReadableDate } from '@/lib/utils';
import { Deposit } from '@/types'
import React from 'react'
import { BiArrowBack } from "react-icons/bi";

const TransactionHistory = ({ deposit }: { deposit: Deposit }) => {
    return (
        <>
            <div className='border border-primary/60 px-5 py-3 flex flex-row rounded-md items-center'>
                <div className='bg-green-200 w-fit rounded p-1'>
                    <BiArrowBack size={25} className="text-green-600 rotate-[220deg]" />
                </div>
                <div className='px-5 flex flex-row justify-between w-full'>
                    <div>
                        <p className='text-lg font-medium '>{deposit.amount}.00 <span className='text-[14px]'>{deposit.currency}</span></p>
                        <p className='text-sm opacity-50 font-medium'>#{deposit.transaction}</p>
                    </div>
                    <div>
                        <p className='font-medium text-end text-green-600'>Deposit</p>
                        <p className='self-end'>{toReadableDate(deposit.joinedAt)}</p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default TransactionHistory