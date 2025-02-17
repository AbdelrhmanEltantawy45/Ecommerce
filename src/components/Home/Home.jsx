import React, { useContext } from 'react'
import styles from "./Home.module.css"
import FeatureProducts from '../FeatureProducts/FeatureProducts'
import MainSlider from '../MainSlider/MainSlider'
import CatSlider from '../CatSlider/CatSlider'

export default function Home() {
  return (
    <>
    <div>
      <MainSlider/>
      <CatSlider/> 

      <FeatureProducts/>
    </div>

    
    
    
    </>
  )
}
