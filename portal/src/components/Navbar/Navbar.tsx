import React from 'react'
import { Input } from '../ui/input'
import { IoSearch } from 'react-icons/io5';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuthStore from '@/store/authStore';
import logo from '@/assets/logo.png'
import { BiSun, BiMoon, BiUser } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { logout } from '@/hooks/auth';

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
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            {/* {user?.picture ? (
                                <>
                                    <img
                                        src={user.picture}
                                        className="xl:w-[60px] lg:w-[70px] md:w-[80px] w-[45px]  object-cover rounded-full"
                                        alt=""
                                    />
                                </>
                            ) : ( */}
                            <div className='dark:bg-black bg-hover p-2 rounded-full'>

                                <BiUser size={22} className="dark:text-white  text-white" />
                            </div>
                            {/* )} */}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            style={{
                                right: 0,
                                top: "50px",
                                width: "200px",
                                zIndex: 1000,
                            }}
                        >
                            <Link to={"/profile"}>
                                <DropdownMenuItem>
                                    Profile
                                </DropdownMenuItem>
                            </Link>
                            <Link to={"/surprise-me"}>
                                <DropdownMenuItem>Surprise me</DropdownMenuItem>
                            </Link>
                            {
                                user &&
                                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                            }
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div className='flex flex-row items-center justify-between cursor-pointer'>

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