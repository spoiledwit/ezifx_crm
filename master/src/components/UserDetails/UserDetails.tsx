import React, { useEffect } from 'react'
import { users } from '@/constants'
import { Label } from '../ui/label';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { Switch } from "@/components/ui/switch"
import DetailCard from '../Cards/DetailCard';
import { User } from '@/types';
import { useParams } from 'react-router-dom';

const formSchema = z.object({
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    address: z.string().min(2).max(50),
    email: z.string().min(2).max(50),
    phone: z.string().min(2).max(50),
    city: z.string().min(2).max(50),
    state: z.string().min(2).max(50),
    country: z.string().min(2).max(50),
    postalCode: z.string().min(2).max(50),
    referral: z.string().min(2).max(50),
    emailVerified: z.boolean(),
    mobileVerified: z.boolean(),
    twoFAVerified: z.boolean(),
    kycVerified: z.boolean(),

})


const UserDetails = () => {

    const { id } = useParams();
    const user = users.filter((user) => user.id == id)[0];

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            postalCode: "",
            referral: "",
            state: "",
            city: "",
            country: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    useEffect(() => {
        form.setValue("firstName", user.name.split(' ')[0])
        form.setValue("lastName", user.name.split(' ')[1])
        form.setValue("email", user.email)
        form.setValue("phone", user.phone)
        form.setValue("postalCode", Number(5400).toString())
        form.setValue("city", "Lahore")
        form.setValue("country", user.country)
        form.setValue("state", "Punjab")
        form.setValue("mobileVerified", user.mobileVerified)
        form.setValue("emailVerified", user.emailVerified)
        form.setValue("kycVerified", user.kycVerified)
        form.setValue("twoFAVerified", user.paid)
    })

    return (
        <>
            <div className='w-full px-8 py-10 flex flex-row gap-5'>
                <div className='border w-3/4 bg-white  px-5 py-5 pb-7 rounded-md shadow'>
                    <div>
                        <h1 className='text-2xl font-semibold'>Information about {user.name}</h1>
                        <p className='text-lg'>View and edit information about this user</p>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                            <div className='flex flex-row gap-5'>
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem className='w-1/2'>
                                            <FormLabel>First name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem className='w-1/2'>
                                            <FormLabel>Last name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='flex flex-row gap-5'>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className='w-1/2'>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input type='email' placeholder="" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem className='w-1/2'>
                                            <FormLabel>Mobile number</FormLabel>
                                            <FormControl>
                                                <Input placeholder="" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className='flex flex-row gap-5'>
                                <FormField
                                    control={form.control}
                                    name="city"
                                    render={({ field }) => (
                                        <FormItem className='w-1/3'>
                                            <FormLabel>City</FormLabel>
                                            <FormControl>
                                                <Input placeholder="" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="state"
                                    render={({ field }) => (
                                        <FormItem className='w-1/3'>
                                            <FormLabel>State</FormLabel>
                                            <FormControl>
                                                <Input placeholder="" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="country"
                                    render={({ field }) => (
                                        <FormItem className='w-1/3'>
                                            <FormLabel>Country</FormLabel>
                                            <FormControl>
                                                <Input placeholder="" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='flex flex-row gap-5'>
                                <FormField
                                    control={form.control}
                                    name="postalCode"
                                    render={({ field }) => (
                                        <FormItem className='w-1/2'>
                                            <FormLabel>Zip/Postal code</FormLabel>
                                            <FormControl>
                                                <Input placeholder="" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="referral"
                                    render={({ field }) => (
                                        <FormItem className='w-1/2'>
                                            <FormLabel>Referred by</FormLabel>
                                            <FormControl>
                                                <Input placeholder="" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="emailVerified"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                        <div className="space-y-0.5">
                                            <FormLabel>Email Verification</FormLabel>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                className='dark:data-[state=unchecked]:bg-gray-300 dark:data-[state=checked]:bg-primary'

                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            /><FormField
                                control={form.control}
                                name="mobileVerified"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                        <div className="space-y-0.5">
                                            <FormLabel>Mobile Verification</FormLabel>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                className='dark:data-[state=unchecked]:bg-gray-300 dark:data-[state=checked]:bg-primary'

                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            /><FormField
                                control={form.control}
                                name="twoFAVerified"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                        <div className="space-y-0.5">
                                            <FormLabel>2FA Verification</FormLabel>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                className='dark:data-[state=unchecked]:bg-gray-300 dark:data-[state=checked]:bg-primary'

                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="kycVerified"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                        <div className="space-y-0.5">
                                            <FormLabel>KYC Verification</FormLabel>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                className='dark:data-[state=unchecked]:bg-gray-300 dark:data-[state=checked]:bg-primary'

                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className='w-full'>Submit</Button>
                        </form>
                    </Form>
                </div>
                <div className='w-1/4 flex flex-col gap-3'>
                    <DetailCard bgStyle='bg-card-primary' titleStyle='text-card-text' title='Balance' dataStyle='text-card-text' redirect='/' data={"$200.00 USD"} />
                    <DetailCard bgStyle='bg-transparent border-2 border-card-text ' titleStyle='text-card-text' title='Deposits' dataStyle='text-card-text' redirect='/' data={"$200.00 USD"} />
                    <DetailCard bgStyle='bg-card-primary' titleStyle='text-card-text' title='Withdrawals' dataStyle='text-card-text' redirect='/' data={"$200.00 USD"} />
                    <DetailCard bgStyle='bg-transparent border-2 border-card-text ' titleStyle='text-card-text' title='Transactions' dataStyle='text-card-text' redirect='/' data={"$200.00 USD"} />
                    <DetailCard bgStyle='bg-card-primary' titleStyle='text-card-text' title='Total Invest' dataStyle='text-card-text' redirect='/' data={"$200.00 USD"} />
                    <DetailCard bgStyle='bg-transparent border-2 border-card-text ' titleStyle='text-card-text' title='Total Referrals' dataStyle='text-card-text' redirect='/' data={"$200.00 USD"} />
                </div>
            </div >
        </>

    )
}

export default UserDetails