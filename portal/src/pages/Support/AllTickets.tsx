import { Button } from '../../components/ui/button'
import SupportTable from '@/components/SupportTables/SupportTable'
import { Ticket } from '@/types'
import { Link } from 'react-router-dom';

const AllTickets = () => {
    const emptyTickets: Ticket[] = [];
    return (
        <>
            <div className='py-10 px-10'>

                <div className='flex flex-row justify-between'>
                    <h1 className='text-2xl font-semibold'>Support Tickets</h1>
                    <Link to={'/open-ticket'}>
                        <Button className='bg-primary dark:bg-dark dark:hover:bg-dark hover:bg-hover'>Open Support Ticket</Button>
                    </Link>
                </div>
                <SupportTable tickets={emptyTickets} />


            </div>

        </>
    )
}

export default AllTickets; 