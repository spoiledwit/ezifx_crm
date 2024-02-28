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
import { priorities } from '@/constants'
import { capitalizeFirstLetter } from '@/lib/utils'
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
    type: z.string(),
    remark: z.string(),
    number: z.string(),
})

const TransactionFilter = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            type: "",
            remark: "",
            number: "",

        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-2">
                    <div className='flex flex-row gap-5 justify-between  px-5 py-4 bg-primary-light rounded-md items-center'>
                        <FormField
                            control={form.control}
                            name="number"
                            render={({ field }) => (
                                <FormItem className='w-1/3'>
                                    <FormLabel>Transaction Number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Transaction number" className='bg-white' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem className='w-1/3'>
                                    <FormLabel>Type</FormLabel>
                                    <select
                                        value={field.value}
                                        onChange={field.onChange}
                                        className="w-full px-2 py-[6px] shadow-sm text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    >
                                        <option value="all" key="1">
                                            All
                                        </option>
                                    </select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="remark"
                            render={({ field }) => (
                                <FormItem className='w-1/3'>
                                    <FormLabel>Remark</FormLabel>
                                    <select
                                        value={field.value}
                                        onChange={field.onChange}
                                        className="w-full px-2 py-[6px] shadow-sm text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    >
                                        <option value="all" key="1">
                                            All
                                        </option>
                                    </select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className=' dark:bg-dark bg-primary hover:bg-hover self-end'>Filter</Button>
                    </div>

                </form>
            </Form>
        </>
    )
}

export default TransactionFilter