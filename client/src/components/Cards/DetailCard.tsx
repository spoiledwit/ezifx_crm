import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface Props {
    bgStyle: string,
    titleStyle: string,
    icon?: ReactNode,
    title: string,
    dataStyle: string,
    data: string | number,
    redirect?: string,

}

const DetailCard = ({ bgStyle, titleStyle, icon, title, data, dataStyle, redirect }: Props) => {
    return (
        <>
            <div className={"rounded-lg  py-4 pb-2 px-6" + " " + bgStyle}>
                <p className={"text-2xl font-semibold" + " " + titleStyle}>{title}</p>
                <div className={"flex flex-row justify-between items-baseline mt-2 pb-3 m-0 font-medium" + " " + dataStyle}>
                    <p className='text-4xl'>{data}</p>
                    {
                        redirect ?
                            <Link to={redirect}>
                                <p className='text-xl'>View</p>
                            </Link>
                            :
                            null
                    }
                </div>


            </div>
        </>
    )
}

export default DetailCard