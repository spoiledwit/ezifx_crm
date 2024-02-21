import React from 'react'
import { Button } from '../ui/button'
import { IoSearch } from 'react-icons/io5'
import { Input } from '../ui/input'
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


const KYCPending = () => {
    return (
        <>
            <div className='py-10 px-10'>

                <div className='flex flex-row justify-between'>
                    <h1 className='text-2xl font-semibold'>KYC Pending Users</h1>
                    <div className='flex flex-row gap-4'>
                        <div className='flex flex-row items-center justify-end gap-3 w-full'>
                            <IoSearch size={25} className={"text-dark dark:text-dark font-light focus:border-white "} />
                            <Input placeholder='Email / Username' className='w-2/3 focus:w-full transition-all duration-300 placeholder:text-dark  border-dark dark:border-[#2d2d2d] text-dark dark:text-dark text-md outline-none' />
                        </div>
                        <Button className='bg-transparent border-primary border text-primary hover:bg-primary hover:text-white dark:text-dark dark:border-dark dark:hover:bg-dark dark:hover:text-white '>Export Excel</Button>
                    </div>
                </div>
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


            </div>

        </>
    )
}

export default KYCPending 