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
        name: "Deandre Golburn",
        id: "@AcWufWxMD",
        email: "d.golburn10@gmail.com",
        phone: "44 079233472",
        country: "GB",
        joinedAt: "2024-02-19 7:08 PM\n ",
        timestamp: "15 hours ago",
        balance: "0.00",
    },
    {
        name: "Deandre Golburn",
        id: "@AcWufWxMD",
        email: "d.golburn10@gmail.com",
        phone: "44 079233472",
        country: "GB",
        timestamp: "15 hours ago",
        joinedAt: "2024-02-19 7:08 PM\n ",
        balance: "0.00",
    },
    {
        name: "Deandre Golburn",
        id: "@AcWufWxMD",
        email: "d.golburn10@gmail.com",
        phone: "44 079233472",
        country: "GB",
        timestamp: "15 hours ago",
        joinedAt: "2024-02-19 7:08 PM\n ",
        balance: "0.00",
    },
    {
        name: "Deandre Golburn",
        id: "@AcWufWxMD",
        timestamp: "15 hours ago",
        email: "d.golburn10@gmail.com",
        phone: "44 079233472",
        country: "GB",
        joinedAt: "2024-02-19 7:08 PM\n ",
        balance: "0.00",
    },

    {
        name: "Deandre Golburn",
        id: "@AcWufWxMD",
        email: "d.golburn10@gmail.com",
        phone: "44 079233472",
        country: "GB",
        joinedAt: "2024-02-19 7:08 PM\n ",
        timestamp: "15 hours ago",
        balance: "0.00",
    },
    {
        name: "Deandre Golburn",
        id: "@AcWufWxMD",
        email: "d.golburn10@gmail.com",
        country: "GB",
        phone: "44 079233472",
        joinedAt: "2024-02-19 7:08 PM\n ",
        timestamp: "15 hours ago",
        balance: "0.00",
    },
    {
        name: "Deandre Golburn",
        id: "@AcWufWxMD",
        email: "d.golburn10@gmail.com",
        phone: "44 079233472",
        country: "GB",
        joinedAt: "2024-02-19 7:08 PM ",
        timestamp: "15 hours ago",
        balance: "0.00",
    },
    {
        name: "Deandre Golburn",
        id: "@AcWufWxMD",
        email: "d.golburn10@gmail.com",
        country: "GB",
        phone: "44 079233472",
        joinedAt: "2024-02-19 7:08 PM ",
        timestamp: "15 hours ago",
        balance: "0.00",
    },
]


const UserTable = () => {

    return (
        <Table className='mt-7 text-[15px]'>
            <TableCaption>A list of active users</TableCaption>
            <TableHeader>
                <TableRow className='dark:bg-dark dark:hover:bg-dark dark:text-white bg-primary hover:bg-primary text-white'>
                    <TableHead className="text-center text-white">User</TableHead>
                    <TableHead className='text-center text-white'>Email</TableHead>
                    <TableHead className='text-center text-white'>Phone</TableHead>
                    <TableHead className='text-center text-white'>Country</TableHead>
                    <TableHead className="text-center text-white">Joined At</TableHead>
                    <TableHead className="text-center text-white">Balance</TableHead>
                    <TableHead className="text-center text-white">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className=''>
                {invoices.map((invoice) => (
                    <TableRow key={invoice.id} className='text-center dark:hover:bg-dark/10'>
                        <TableCell className="font-medium">{invoice.name}<br /><span className='text-dark/80 cursor-pointer'>{invoice.id}</span></TableCell>
                        <TableCell>{invoice.email}</TableCell>
                        <TableCell>+{invoice.phone}</TableCell>
                        <TableCell>{invoice.country}</TableCell>
                        <TableCell className="">{invoice.joinedAt}<br /><span className='font-medium'>{invoice.timestamp}</span></TableCell>
                        <TableCell className="font-medium">{invoice.balance}</TableCell>
                        <TableCell className="">
                            <Button className='bg-primary dark:bg-dark hover:bg-hover'>Details</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default UserTable