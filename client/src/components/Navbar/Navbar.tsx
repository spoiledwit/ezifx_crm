import React from 'react'
import { Input } from '../ui/input'
import { IoSearch } from 'react-icons/io5';
import useAuthStore from '@/store/authStore';
import logo from '@/assets/logo.png'

const Navbar = () => {

    const { user } = useAuthStore();

    return (
        <>
            <div className='w-full flex flex-row items-center justify-between p-3 px-10 bg-[#1d1d1d]'>
                <img src={logo} className='w-[120px]' />
                <div className='flex flex-row items-center gap-3 w-1/2'>
                    <IoSearch size={20} className={"text-white font-light focus:border-white "} />
                    <Input placeholder='Search' className='w-1/2 border-[#2d2d2d] text-white focus:outline-none' />
                </div>
                <p className='text-white'>Welcome, {user?.name}</p>
            </div>
        </>
    )
}

export default Navbar