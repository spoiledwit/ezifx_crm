import BalanceTransferForm from '@/components/BalanceTransferForm/BalanceTransferForm'

const BalanceTransfer = () => {
    return (
        <>
            <div className='p-10'>

                <div className="flex flex-row justify-between">
                    <h1 className='text-2xl font-semibold'>Balance Transfer</h1>
                </div>
                <div className='bg-primary/10 rounded-xl px-5 py-3 mt-5'>
                    <BalanceTransferForm />
                </div>
            </div>
        </>
    )
}

export default BalanceTransfer