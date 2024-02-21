import React from 'react'
import { Button } from '../../components/ui/button'
import { IoSearch } from 'react-icons/io5'
import { Input } from '../../components/ui/input'
import UserTable from '../../components/UserTable/UserTable'

const BannedUsers = () => {
  return (
    <>
      <div className='py-10 px-10'>

        <div className='flex flex-row justify-between'>
          <h1 className='text-2xl font-semibold'>Banned Users</h1>
          <div className='flex flex-row gap-4'>
            <div className='flex flex-row items-center justify-end gap-3 w-full'>
              <IoSearch size={25} className={"text-dark dark:text-dark font-light focus:border-white "} />
              <Input placeholder='Email / Username' className='w-2/3 focus:w-full transition-all duration-300 placeholder:text-dark  border-dark dark:border-[#2d2d2d] text-dark dark:text-dark text-md outline-none' />
            </div>
            <Button className='bg-transparent border-primary border text-primary hover:bg-primary hover:text-white dark:text-dark dark:border-dark dark:hover:bg-dark dark:hover:text-white '>Export Excel</Button>
          </div>
        </div>
        <UserTable />


      </div>

    </>
  )
}

export default BannedUsers 