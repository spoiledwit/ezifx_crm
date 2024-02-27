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
    currentPassword: z.string(),
    newPassword: z.string(),
    confirmPassword: z.string(),

})

const ChangePasswordForm = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",

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
                        name="currentPassword"
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel>Current Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="" className='bg-white'  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="" className='bg-white'  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="" className='bg-white'   {...field} />
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

export default ChangePasswordForm 