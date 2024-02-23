import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from '../ui/button'
import { Ticket } from '@/types'


const SupportTable = ({ tickets }: { tickets: Ticket[] }) => {

    return (
        <Table className='mt-7 text-[15px]'>
            <TableCaption>A list of active users</TableCaption>
            <TableHeader>
                <TableRow className='dark:bg-dark dark:hover:bg-dark dark:text-white bg-primary hover:bg-primary text-white'>
                    <TableHead className="text-center text-white">Ticket No.</TableHead>
                    <TableHead className="text-center text-white">Subject</TableHead>
                    <TableHead className='text-center text-white'>Submitted By</TableHead>
                    <TableHead className='text-center text-white'>Status</TableHead>
                    <TableHead className='text-center text-white'>Priority</TableHead>
                    <TableHead className="text-center text-white">Last Reply</TableHead>
                    <TableHead className="text-center text-white">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className=''>
                {tickets.map((invoice) => (
                    <TableRow key={invoice.id} className='text-center dark:hover:bg-dark/10'>
                        <TableCell className="font-medium">{invoice.id}</TableCell>
                        <TableCell>{invoice.subject}</TableCell>
                        <TableCell>{invoice.name}</TableCell>
                        <TableCell className="">
                            {
                                invoice.status == "open" ?
                                    <div className='border border-green-500 text-green-500 w-fit px-3 mx-auto bg-green-100 rounded-md py-1 '>
                                        Open
                                    </div>
                                    :
                                    <div className='border border-red-500 text-red-500 w-fit px-3 mx-auto bg-red-100 rounded-md py-1 '>
                                        Closed
                                    </div>
                            }
                        </TableCell>
                        <TableCell className="">
                            {
                                invoice.priority == "low" ?
                                    <div className='border border-green-500 text-green-500 w-fit px-3 mx-auto bg-green-100  rounded-md py-1 '>
                                        Low
                                    </div>
                                    :
                                    <div className='border border-red-500 text-red-500 w-fit px-3 mx-auto bg-red-100 rounded-md py-1 '>
                                        High
                                    </div>
                            }
                        </TableCell>
                        <TableCell className="font-medium">{invoice.timestamp}</TableCell>
                        <TableCell className="">
                            <Button className='bg-transparent border-primary text-primary dark:bg-transparent dark:text-dark dark:hover:text-white dark:hover:bg-dark dark:border-dark border hover:bg-primary hover:text-white'>Details</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default SupportTable;