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
import { Withdrawal } from '@/types'

const invoices = [
    {
        gateway: "Bank Transfer",
        transaction: "1RSFRER54FWQR",
        id: "@AcWufWxMD",
        email: "d.golburn10@gmail.com",
        phone: "44 079233472",
        country: "GB",
        joinedAt: "2024-02-19 7:08 PM\n ",
        timestamp: "15 hours ago",
        balance: "0.00",
        type: 786880,
        status: "approved",
        name: "Deandre Golburn",
        amount: "100",
        currency: "PKR",
        conversion: "1 USD = 285.00 PKR",

    },
    {
        gateway: "Bank Transfer",
        transaction: "1RSFRER54FWQR",
        id: "@AcWufWxMD",
        email: "d.golburn10@gmail.com",
        phone: "44 079233472",
        country: "GB",
        joinedAt: "2024-02-19 7:08 PM\n ",
        timestamp: "15 hours ago",
        balance: "0.00",
        type: 786880,
        status: "approved",
        name: "Deandre Golburn",
        amount: "100",
        currency: "PKR",
        conversion: "1 USD = 285.00 PKR",

    },
    {

        gateway: "Bank Transfer",
        transaction: "1RSFRER54FWQR",
        id: "@AcWufWxMD",
        email: "d.golburn10@gmail.com",
        phone: "44 079233472",
        country: "GB",
        joinedAt: "2024-02-19 7:08 PM\n ",
        timestamp: "15 hours ago",
        balance: "0.00",
        type: 786880,
        status: "rejected",
        name: "Deandre Golburn",
        amount: "100",
        currency: "PKR",
        conversion: "1 USD = 285.00 PKR",

    },


]


const WithdrawalTable = ({ withdrawals }: { withdrawals: Withdrawal[] }) => {

    return (
        <Table className='mt-7 text-[15px]'>
            <TableCaption>A list of all withdrawals</TableCaption>
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
                {withdrawals.map((invoice: Withdrawal) => (
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
                            <Button className='bg-primary dark:bg-dark hover:bg-hover'>Details</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default WithdrawalTable