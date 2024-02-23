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
import { Deposit } from '@/types'
import { Link } from 'react-router-dom'

const DepositTable = ({ invoices }: { invoices: Deposit[] }) => {

    return (
        <Table className='mt-7 text-[15px]'>
            <TableCaption>A list of all deposits</TableCaption>
            <TableHeader>
                <TableRow className='dark:bg-dark dark:hover:bg-dark dark:text-white bg-primary hover:bg-primary text-white'>
                    <TableHead className="text-center text-white">Gateway | Transaction</TableHead>
                    <TableHead className='text-center text-white'>Initiated</TableHead>
                    <TableHead className='text-center text-white'>User</TableHead>
                    <TableHead className='text-center text-white'>Amount</TableHead>
                    <TableHead className="text-center text-white">Conversion</TableHead>
                    <TableHead className="text-center text-white">Type</TableHead>
                    <TableHead className="text-center text-white">Status</TableHead>
                    <TableHead className="text-center text-white">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className=''>
                {invoices.map((invoice: any) => (
                    <TableRow key={invoice.id} className='text-center dark:hover:bg-dark/10'>
                        <TableCell className="font-medium">{invoice.gateway}<br /><span className='text-dark/80 cursor-pointer'>{invoice.transaction}</span></TableCell>
                        <TableCell className="">{invoice.joinedAt}<br /><span className='font-medium'>{invoice.timestamp}</span></TableCell>
                        <TableCell className="font-medium">{invoice.name}<br /><span className='text-dark/80 cursor-pointer'>{invoice.id}</span></TableCell>
                        <TableCell>${invoice.amount} + <span className='text-red-500'>0.00</span> <br /><span className='text-dark/80 cursor-pointer font-medium'>{invoice.amount} USD</span></TableCell>
                        <TableCell>{invoice.conversion}<br />{invoice.amount} {invoice.currency}</TableCell>
                        <TableCell className="font-medium">{invoice.type}</TableCell>
                        <TableCell className="">
                            {
                                invoice.status == "approved" ?
                                    <div className='border border-green-500 text-green-500 bg-green-100 rounded-md py-1 '>
                                        Approved
                                    </div>
                                    :
                                    <div className='border border-red-500 text-red-500 bg-red-100 rounded-md py-1 '>
                                        Rejected
                                    </div>
                            }
                        </TableCell>
                        <TableCell className="">
                            <Link to={`/deposit/${invoice.transaction}`}>
                                <Button className='bg-primary dark:bg-dark hover:bg-hover'>Details</Button>
                            </Link>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default DepositTable