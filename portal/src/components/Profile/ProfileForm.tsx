import React, { useEffect, useState } from 'react'
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
import useAuthStore from '@/store/authStore'
import PhotosUploader from '../Uploaders/PhotoUploader'

const formSchema = z.object({
    firstName: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    lastName: z.string(),
    email: z.string().email(),
    phone: z.string(),
    address: z.string(),
    state: z.string(),
    zip: z.string(),
    city: z.string(),
    country: z.string(),
    profilePicture: z.string(),

})

const ProfileForm = () => {

    const [images, setImages] = useState<string[]>([]);
    const { user } = useAuthStore();

    useEffect(() => {
        if (user?.profilePicture) {
            setImages([user?.profilePicture]);
        }
    }, []);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            address: "",
            state: "",
            city: "",
            country: "",
            profilePicture: "",
            zip: "",
            phone: "",

        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-2">

                    <PhotosUploader
                        maxPhotos={1}
                        addedPhotos={images}
                        onChange={setImages}
                    />
                    <div className='flex flex-row gap-5'>
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem className='w-1/2 '>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" className='bg-white' {...field} />
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
                                    <FormLabel>Last Name</FormLabel>
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
                            name="email"
                            render={({ field }) => (
                                <FormItem className='w-1/2 focus:outline-none'>
                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" className='bg-white focus:outline-none' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem className='w-1/2 focus:outline-none'>
                                    <FormLabel>Mobile Number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" className='bg-white focus:outline-none' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='flex flex-row gap-5'>
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem className='w-1/2 focus:outline-none'>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" className='bg-white focus:outline-none' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                                <FormItem className='w-1/2 focus:outline-none'>
                                    <FormLabel>State</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" className='bg-white focus:outline-none' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='flex flex-row gap-5'>
                        <FormField
                            control={form.control}
                            name="zip"
                            render={({ field }) => (
                                <FormItem className='w-1/2 focus:outline-none'>
                                    <FormLabel>Zip Code</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" className='bg-white focus:outline-none' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem className='w-1/2 focus:outline-none'>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" className='bg-white focus:outline-none' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                                <FormItem className='w-1/2 focus:outline-none'>
                                    <FormLabel>Country</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" className='bg-white focus:outline-none' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit" className='w-full dark:bg-dark bg-primary hover:bg-hover'>Submit</Button>
                </form>
            </Form >
        </>
    )
}

export default ProfileForm