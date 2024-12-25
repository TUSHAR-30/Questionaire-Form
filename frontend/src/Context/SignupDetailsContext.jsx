import { createContext, useEffect, useState } from 'react'

const SignupDetailsContext=createContext();

export const SignupDetailsProvider=({children})=>{
    const [signupdetails,setSignupdetails]= useState(null)

    useEffect(()=>{
        console.log(signupdetails)
    },[signupdetails])
    return (
        <SignupDetailsContext.Provider value={{signupdetails,setSignupdetails}}>
            {children}
        </SignupDetailsContext.Provider>
    )
}




export default SignupDetailsContext