import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { accounts, gateways, priorities } from '@/constants'
import { capitalizeFirstLetter } from '@/lib/utils'

const formSchema = z.object({
    username: z.string(),
    afterCharge: z.string(),
    amount: z.string(),

})

const BalanceTransferForm = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            afterCharge: "",
            amount: "",

        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-2">

                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="" className='bg-white'  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel>Amount (Charge: 1.00 USD + 2% | Max Limit: 1,000,00 USD)</FormLabel>
                                <FormControl>
                                    <Input placeholder="" type='number' className='bg-white'  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="afterCharge"
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel>After Charge</FormLabel>
                                <FormControl>
                                    <Input placeholder="" className='bg-white' disabled  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className='w-full dark:bg-dark bg-primary hover:bg-hover'>Submit</Button>
                </form>
            </Form>
        </>
    )
}

export default BalanceTransferForm 