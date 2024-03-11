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

const invoices = [
    {
        method: "Tether (USDT Trc20)",
        email: "d.golburn10@gmail.com",
        phone: "44 079233472",
        country: "GB",
        joinedAt: "2024-02-19 7:08 PM\n ",
        timestamp: "15 hours ago",
        limit: {
            min: 10,
            max: 5000
        },
        status: "enabled",
        charge: "0.00",
        currency: "USD",

    }
]


const WithdrawalMethodTable = () => {

    return (
        <Table className='mt-7 text-[15px]'>
            <TableCaption>A list of all withdrawal methods</TableCaption>
            <TableHeader>
                <TableRow className='dark:bg-dark dark:hover:bg-dark dark:text-white bg-primary hover:bg-primary text-white'>
                    <TableHead className="text-center text-white">Method</TableHead>
                    <TableHead className='text-center text-white'>Currency</TableHead>
                    <TableHead className='text-center text-white'>Charge</TableHead>
                    <TableHead className='text-center text-white'>Withdraw Limit</TableHead>
                    <TableHead className="text-center text-white">Status</TableHead>
                    <TableHead className="text-center text-white">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className=''>
                {invoices.map((invoice) => (
                    <TableRow key={invoice.method} className='text-center dark:hover:bg-dark/10'>
                        <TableCell className="font-medium">{invoice.method}</TableCell>
                        <TableCell className="">{invoice.currency}</TableCell>
                        <TableCell className="font-medium">{invoice.charge}</TableCell>
                        <TableCell className="font-medium">{invoice.limit.min} - {invoice.limit.max} {invoice.currency}</TableCell>
                        <TableCell className="">
                            {
                                invoice.status == "enabled" ?
                                    <div className='border border-green-500 text-green-500 bg-green-100 rounded-md py-1 '>
                                        Enabled
                                    </div>
                                    :
                                    <div className='border border-red-500 text-red-500 bg-red-100 rounded-md py-1 '>
                                        disabled
                                    </div>
                            }
                        </TableCell>
                        <TableCell className="">
                            {/* <Button className='dark:bg-dark bg-transparent border dark:text-white text-dark border-dark hover:bg-dark hover:text-white'>Edit</Button> */}
                            <Button className='bg-primary dark:bg-dark hover:bg-hover ml-2'>Disable</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default WithdrawalMethodTable