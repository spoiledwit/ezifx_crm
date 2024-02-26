import React from 'react'
import { Button } from '../../components/ui/button'
import { acData, users } from '@/constants'
import TradeTable from '@/components/TradeTable/TradeTable'

const TradeAccounts = () => {
  return (
    <>
      <div className='p-10'>

        <div className='flex flex-row justify-between mb-5'>
          <h1 className='text-2xl font-semibold'>Trade Accounts</h1>
          <div className='flex flex-row gap-4'>
            <Button className='bg-transparent border-primary border text-primary hover:bg-primary hover:text-white dark:text-dark dark:border-dark dark:hover:bg-dark dark:hover:text-white '>Open Trade Account</Button>
          </div>
        </div>
        <TradeTable data={acData} />


      </div>

    </>
  )
}

export default TradeAccounts 