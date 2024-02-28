import WithdrawForm from "@/components/WithdrawForm/WithdrawForm"
import { Button } from "@/components/ui/button"

const Withdraw = () => {
    return (
        <>
            <div className='p-10'>

                <div className="flex flex-row justify-between">
                    <h1 className='text-2xl font-semibold'>Withdraw Funds</h1>
                    <Button className="bg-primary hover:bg-hover dark:bg-dark">Withdraw History</Button>
                </div>
                <div className='bg-primary-light rounded-xl px-5 py-3 mt-5'>
                    <WithdrawForm />
                </div>
            </div>
        </>
    )
}

export default Withdraw