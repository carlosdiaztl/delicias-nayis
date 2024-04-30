import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.scss'

import screen from "../../../assets/screen.png"
import { auth } from '../../../firebase/firebaseconfig'
import { onAuthStateChanged } from 'firebase/auth'
const Intro = () => {
    const navigate=useNavigate()
    const goCarousel=()=>{
        navigate('/intro')

    }
   useEffect(() => {
    setTimeout(goCarousel,2000)
    
   }, [])
   
   
  return (
    <div className='div' ><img className='' src={screen} /></div>
  )
}

export default Intro