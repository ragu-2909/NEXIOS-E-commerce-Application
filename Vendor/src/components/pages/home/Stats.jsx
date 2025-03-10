import React from 'react'
import StatCard from './StatCard'
import { FaCircleDollarToSlot,FaChartLine, } from 'react-icons/fa6'
import { BiReceipt,BiSolidUserAccount } from "react-icons/bi";
import './StatcardEffect.css'

const Stats = () => {
  return (
    <div className="w-full ml-2 grid grid-cols-10 grid-rows-8 gap-3 gap-y-[30px]">
        <div className="statItem bg-transparent col-span-5 row-span-4 rounded-lg shadow-box-shadow"><StatCard 
            icon={<FaCircleDollarToSlot />}
            count={'100,000'}
            title={'Total Revenue'}
        />
        </div>
        <div className="statItem bg-transparent col-span-5 row-span-4 rounded-lg shadow-box-shadow">
        <StatCard 
            icon={<FaChartLine />}
            count={'20,000'}
            title={'Total Profits'}
        />
        </div>
        <div className="statItem bg-transparent col-span-5 row-span-4 rounded-lg shadow-box-shadow">
        <StatCard 
            icon={<BiReceipt />}
            count={'1,345'}
            title={'Total Sold'}
        />
        </div>
        <div className="statItem bg-transparent col-span-5 row-span-4 rounded-lg shadow-box-shadow">
        <StatCard 
            icon={<BiSolidUserAccount />}
            count={'1,234'}
            title={'Total Customers'}
        />
        </div>
    </div>
  )
}

export default Stats