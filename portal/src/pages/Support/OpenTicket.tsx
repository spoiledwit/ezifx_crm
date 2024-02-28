import OpenTicketForm from '@/components/OpenTicketForm/OpenTicketForm'
import React from 'react'

const OpenTicket = () => {
    return (
        <>
            <div className='p-10'>

                <h1 className='text-2xl font-semibold'>Open Ticket</h1>
                <div className='bg-primary-light rounded-xl px-5 py-3 mt-5'>
                    <OpenTicketForm />
                </div>
            </div>
        </>
    )
}

export default OpenTicket