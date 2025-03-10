import React from 'react'
import { FaCircleDollarToSlot,FaChartLine, } from 'react-icons/fa6'
import { BiReceipt,BiSolidUserAccount } from "react-icons/bi";
import './StatcardEffect.css'

const StatCard = (props) => {
  return (
    <div className="statCard !bg-second-bg ">
        <div className="statCardIcon">
            {props.icon}
        </div>
        <div className="statCardInfo">
            <h4>{props.count}</h4>
            <span>{props.title}</span>
        </div>
    </div>
  )
}

export default StatCard