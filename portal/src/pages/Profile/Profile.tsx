import ProfileForm from '@/components/Profile/ProfileForm'

const Profile = () => {
    return (
        <>
            <div className='p-10'>

                <h1 className='text-2xl font-semibold'>Profile</h1>
                <div className='bg-primary/10 rounded-xl px-5 py-3 mt-5'>
                    <ProfileForm />
                </div>
            </div>
        </>
    )
}

export default Profile 