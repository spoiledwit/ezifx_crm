import ChangePasswordForm from '@/components/Profile/ChangePasswordForm'
import { Button } from '@/components/ui/button'

const ChangePassword = () => {
    return (
        <>
            <div className='p-10'>

                <div className="flex flex-row justify-between">
                    <h1 className='text-2xl font-semibold'>Change Password</h1>
                </div>
                <div className='bg-primary/10 rounded-xl px-5 py-3 mt-5'>
                    <ChangePasswordForm />
                </div>
            </div>
        </>
    )
}

export default ChangePassword 