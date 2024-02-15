import React from 'react'
import { Input } from '../ui/input'
import { IoSearch } from 'react-icons/io5';
import useAuthStore from '@/store/authStore';
import logo from '@/assets/logo.png'
import { BiSun, BiMoon } from 'react-icons/bi';

const Navbar = () => {

    const { user, theme, setTheme } = useAuthStore();

    return (
        <>
            <div className='w-full flex flex-row items-center justify-between p-3 px-10 bg-[#f5ae39] dark:bg-[#1d1d1d] transition-all'>
                <div className='w-1/3'>
                    <img src={logo} className='w-[120px]' />
                </div>
                <div className='flex flex-row items-center justify-between gap-5 w-1/2'>

                    <div className='flex flex-row items-center justify-end gap-3 w-full'>
                        <IoSearch size={25} className={"text-white dark:text-white font-light focus:border-white "} />
                        <Input placeholder='Search' className='w-2/3 focus:w-full transition-all duration-300 placeholder:text-white  border-white dark:border-[#2d2d2d] text-white dark:text-white text-md outline-none' />
                    </div>
                    <div className='flex flex-row items-center justify-between w-1/3'>
                        <p className='text-white dark:text-white text-lg w-full'>Welcome, {user?.name}</p>
                        {
                            theme == 'dark' ?
                                <BiMoon size={25} className="text-black dark:text-white" onClick={() => setTheme("light")} />
                                :
                                <BiSun size={25} onClick={() => setTheme("dark")} className={"text-white dark:text-white"} />
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar