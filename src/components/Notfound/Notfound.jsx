import React from 'react'
import styles from "./Notfound.module.css"
import NotFoundImg from "./../../assets/404.jpg"

export default function Notfound() {
  return (
    <>
    
    <div className='container mx-auto'>
    <img src={NotFoundImg} className='w-full' alt="" />
    </div>
    
    </>
  )
}
