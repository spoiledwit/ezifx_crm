import DepositForm from "@/components/DepositForm/DepositForm"
import { Button } from "@/components/ui/button"

const Deposit = () => {
    return (
        <>
            <div className='p-10'>

                <div className="flex flex-row justify-between">
                    <h1 className='text-2xl font-semibold'>Deposit Funds</h1>
                    <Button className="bg-primary hover:bg-hover dark:bg-dark">Deposit History</Button>
                </div>
                <div className='bg-primary-light rounded-xl px-5 py-3 mt-5'>
                    <DepositForm />
                </div>
            </div>
        </>
    )
}

export default Deposit