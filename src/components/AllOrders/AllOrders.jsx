import React from 'react'
import styles from "./AllOrders.module.css"
import { FcApproval } from "react-icons/fc";

export default function AllOrders() {
  return (
    <div >
    <div className="container mx-auto">
    <div className='m-auto'>
     <h1 className="text-center font-extralight text-main text-5xl">Congratulations</h1>

<h2 className="text-center py-4 font-extrabold">Purchase completed successfully <i className="fa-solid fa-right"><FcApproval /></i> </h2>
     </div> 
    </div>
    </div>
  )
}
