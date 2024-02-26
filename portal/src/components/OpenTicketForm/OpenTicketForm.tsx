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
    name: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().email(),
    subject: z.string().min(5, {
        message: "Subject must be at least 5 characters"
    }),
    priority: z.string(),
    message: z.string().min(10, {
        message: "Message must be at least 10 characters"
    }).max(300)

})

const OpenTicketForm = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            priority: "",
            message: "",

        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-2">
                    <div className='flex flex-row gap-5'>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className='w-1/2 '>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" className='bg-white' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className='w-1/2'>
                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" className='bg-white' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='flex flex-row gap-5'>
                        <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                                <FormItem className='w-1/2 focus:outline-none'>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" className='bg-white focus:outline-none' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="priority"
                            render={({ field }) => (
                                <FormItem className='w-1/2'>
                                    <FormLabel>Priority</FormLabel>
                                    <select
                                        value={field.value}
                                        onChange={field.onChange}
                                        className="w-full px-2 py-[6px] shadow-sm text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    >
                                        {
                                            priorities.map((priority) =>
                                                <option value={priority} key={priority}>
                                                    {capitalizeFirstLetter(priority)}
                                                </option>
                                            )
                                        }
                                    </select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Message</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="What seems to be the problem?"
                                        className="resize-none bg-white h-[100px]"
                                        {...field}
                                    />
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

export default OpenTicketForm