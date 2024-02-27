import TransactionFilter from '@/components/Transactions/TransactionFilter'
import TransactionHistory from '@/components/Transactions/TransactionHistory'
import { deposits } from '@/constants'
import React from 'react'

const Transactions = () => {
    return (
        <div className='p-10'>

            <h1 className='text-2xl font-semibold mb-4'>Transactions</h1>
            <TransactionFilter />
            <div className='flex flex-col gap-2 mt-5'>
                {
                    deposits.map((deposit) =>
                        <TransactionHistory deposit={deposit} />

                    )
                }
            </div>
        </div>
    )
}

export default Transactions