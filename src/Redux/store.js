import { configureStore } from '@reduxjs/toolkit'
import { productReducer } from './ProductSlice'
 
 
export let store = configureStore({
    reducer: {
        productRed : productReducer
    },
})