import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { accounts, gateways, priorities } from '@/constants'
import { capitalizeFirstLetter } from '@/lib/utils'

const formSchema = z.object({
    gateway: z.string(),
    account: z.string(),
    amount: z.string(),

})

const WithdrawForm = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            gateway: "",
            account: "",
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
                        name="gateway"
                        render={({ field }) => (
                            <FormItem className=''>
                                <FormLabel>Select Gateway</FormLabel>
                                <select
                                    value={field.value}
                                    onChange={field.onChange}
                                    className="w-full px-2 py-[6px] shadow-sm text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                >
                                    {
                                        gateways.map((gate) =>
                                            <option value={gate} key={gate}>
                                                {capitalizeFirstLetter(gate)}
                                            </option>
                                        )
                                    }
                                </select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="account"
                        render={({ field }) => (
                            <FormItem className=''>
                                <FormLabel>Trade Account</FormLabel>
                                <select
                                    value={field.value}
                                    onChange={field.onChange}
                                    className="w-full px-2 py-[6px] shadow-sm text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                >
                                    {
                                        accounts.map((acc) =>
                                            <option value={acc} key={acc}>
                                                {capitalizeFirstLetter(acc)}
                                            </option>
                                        )
                                    }
                                </select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='flex flex-row gap-2 items-center '>

                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormLabel>Amount</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" className='bg-white' type='number' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className='bg-primary/60 border border-primary self-end p-1 px-2 rounded-md'>
                            USD
                        </div>
                    </div>

                    <Button type="submit" className='w-full dark:bg-dark bg-primary hover:bg-hover'>Submit</Button>
                </form>
            </Form>
        </>
    )
}

export default WithdrawForm