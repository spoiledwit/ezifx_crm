import React from 'react'
import { Button } from '../../components/ui/button'
import { IoSearch } from 'react-icons/io5'
import { Input } from '../../components/ui/input'
import SupportTable from '@/components/SupportTables/SupportTable'
import { tickets } from '@/constants'

const AnsweredTickets = () => {
    return (
        <>
            <div className='py-10 px-10'>

                <div className='flex flex-row justify-between'>
                    <h1 className='text-2xl font-semibold'>Answered Tickets</h1>
                </div>
                <SupportTable tickets={tickets} />


            </div>

        </>
    )
}

export default AnsweredTickets; 