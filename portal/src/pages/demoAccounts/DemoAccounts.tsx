import React from 'react'
import { Button } from '../../components/ui/button'
import { acData, users } from '@/constants'
import TradeTable from '@/components/TradeTable/TradeTable'
import DemoTable from '@/components/DemoTable/DemoTable'

const DemoAccounts = () => {
  return (
    <>
      <div className='py-10 px-10'>

        <div className='flex flex-row justify-between mb-5'>
          <h1 className='text-2xl font-semibold'>Demo Accounts</h1>
          <div className='flex flex-row gap-4'>
            <Button className='bg-transparent border-primary border text-primary hover:bg-primary hover:text-white dark:text-dark dark:border-dark dark:hover:bg-dark dark:hover:text-white '>Open Demo Account</Button>
          </div>
        </div>
        <DemoTable data={acData} />


      </div>

    </>
  )
}

export default DemoAccounts 