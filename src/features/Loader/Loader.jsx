import React from 'react'
import styles from "./Loader.module.css"
import { Audio } from 'react-loader-spinner'

export default function Loader() {
  return (
    <><Audio
    height="100"
    width="100"
    color="#4fa94d"
    ariaLabel="audio-loading"
    wrapperStyle={{}}
    wrapperClass="wrapper-class h-screen flex justify-center items-center"
    visible={true}
    /></>
  )
}
