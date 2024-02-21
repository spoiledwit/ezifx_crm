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
import { UserDetail } from '@/types'
import { Link } from 'react-router-dom'


const UserTable = ({ users }: { users: UserDetail[] }) => {

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
                {users.map((invoice: UserDetail) => (
                    <TableRow key={invoice.id} className='text-center dark:hover:bg-dark/10'>
                        <TableCell className="font-medium">{invoice.name}<br /><span className='text-dark/80 cursor-pointer'>{invoice.id}</span></TableCell>
                        <TableCell>{invoice.email}</TableCell>
                        <TableCell>+{invoice.phone}</TableCell>
                        <TableCell>{invoice.country}</TableCell>
                        <TableCell className="">{invoice.joinedAt}<br /><span className='font-medium'>{invoice.timestamp}</span></TableCell>
                        <TableCell className="font-medium">{invoice.balance}</TableCell>
                        <TableCell className="">
                            <Link to={`/user/${invoice.id}`}>
                                <Button className='bg-primary dark:bg-dark hover:bg-hover'>Details</Button>
                            </Link>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default UserTable