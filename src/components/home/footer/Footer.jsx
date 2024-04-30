import React from 'react'
import lupa from '../../../assets/lupeicon.png'
import hogar from '../../../assets/homeicon.png'
import recientes from '../../../assets/recientesicon.png'
import perfil from '../../../assets/usericon.png'
import './style.scss'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
 const navigate=useNavigate()
 const goHome=()=>{
    navigate('/home')

 }
 const goSearch=()=>{
    navigate('/search')
    
}
const goRecientes=()=>{
    navigate('/recientes')
    
}
const goPerfil=()=>{
    navigate('/perfil')
    
}
  return (
    <div className="footer"> 
    <button onClick={goHome} ><img src={hogar} /> </button>
    <button  onClick={goSearch} ><img src={lupa}/> </button>
    <button   onClick={goRecientes}><img src={recientes}/> </button>
    <button   onClick={goPerfil}><img src={perfil}/></button>
     </div>
  )
}

export default Footer