import React from 'react'
import { Button } from '../../components/ui/button'
import { IoSearch } from 'react-icons/io5'
import { Input } from '../../components/ui/input'
import SupportTable from '@/components/SupportTables/SupportTable'
import { tickets } from '@/constants'
import { Ticket } from '@/types'

const AllTickets = () => {
    const emptyTickets: Ticket[] = [];
    return (
        <>
            <div className='py-10 px-10'>

                <div className='flex flex-row justify-between'>
                    <h1 className='text-2xl font-semibold'>Support Tickets</h1>
                    <Button className='bg-primary dark:bg-dark dark:hover:bg-dark hover:bg-hover'>Open Support Ticket</Button>
                </div>
                <SupportTable tickets={emptyTickets} />


            </div>

        </>
    )
}

export default AllTickets; 