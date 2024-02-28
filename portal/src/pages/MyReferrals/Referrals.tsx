import React from 'react'

const MyReferrals = () => {
    return (
        <div className='p-10'>
            <div className='flex flex-row justify-between items-center'>
                <h1 className='text-2xl font-semibold'>My Referrals</h1>
                <div className='rounded-md w-1/3 px-3 py-1 text-primary font-semibold border border-primary/50 bg-primary-light'>
                    Level 1
                </div>

            </div>
            <div className='bg-primary-light p-5 rounded mt-5'>
                <h1 className='text-primary text-xl font-semibold text-center'>No referrals found</h1>
            </div>
        </div>
    )
}

export default MyReferrals