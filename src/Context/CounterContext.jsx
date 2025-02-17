import { createContext, useState } from "react";

export let counterContext = createContext();

export default function CounterContextProvider(props){

    console.log(props);
    
    const [counter, setCounter] = useState(20)


    return <counterContext.Provider value={{counter, setCounter}}>

{props.children}

    </counterContext.Provider>
}