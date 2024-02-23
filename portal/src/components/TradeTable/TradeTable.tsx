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
import { ACData, UserDetail } from '@/types'
import { Link } from 'react-router-dom'


const TradeTable = ({ data }: { data: ACData[] }) => {

    return (

        < Table className=' text-[15px]' >
            <TableCaption>A list of active users</TableCaption>
            <TableHeader>
                <TableRow className='dark:bg-dark dark:hover:bg-dark dark:text-white bg-primary hover:bg-primary text-white'>
                    <TableHead className="text-center text-white">#</TableHead>
                    <TableHead className='text-center text-white'>Account</TableHead>
                    <TableHead className='text-center text-white'>Main Password</TableHead>
                    <TableHead className='text-center text-white'>Investor Password</TableHead>
                    <TableHead className="text-center text-white">Group</TableHead>
                    <TableHead className="text-center text-white">Leverage</TableHead>
                    <TableHead className="text-center text-white">Balance</TableHead>
                    <TableHead className="text-center text-white">Equity</TableHead>
                    <TableHead className="text-center text-white">Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className=''>
                {
                    data.map((item: ACData) => (
                        <TableRow key={item.id} className='text-center dark:hover:bg-dark/10'>
                            <TableCell className="font-medium">{item.id}</TableCell>
                            <TableCell className="font-medium">{item.account}</TableCell>
                            <TableCell>{item.mainPassword}</TableCell>
                            <TableCell>{item.investorPassword}</TableCell>
                            <TableCell>{item.group}</TableCell>
                            <TableCell className="">{item.leverage}</TableCell>
                            <TableCell className="font-medium">{item.balance}</TableCell>
                            <TableCell className="font-medium">{item.equity}</TableCell>
                            <TableCell className="font-medium">
                                {
                                    item.status ?
                                        <div className='border border-green-500 text-green-500 bg-green-100 rounded-md py-1 '>
                                            Live
                                        </div>
                                        :
                                        <div className='border border-red-500 text-red-500 bg-red-100 rounded-md py-1 '>
                                            Offline
                                        </div>
                                }
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table >
    )
}

export default TradeTable 