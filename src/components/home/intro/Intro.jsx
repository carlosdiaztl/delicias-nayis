import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.scss'

import screen from "../../../assets/logo3.png"
const Intro = () => {
    const navigate=useNavigate()
    const goCarousel=()=>{
        navigate('/signIn')

    }
   useEffect(() => {
    setTimeout(goCarousel,2000)
    
   }, [])
   
   
  return (
    <div className='div' ><img className='' src={screen} /></div>
  )
}

export default Intro