import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actionAuthenticationSync, actionSignPhoneAsync } from "../redux/actions/userActions";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseconfig";
import screen from "./../assets/Logo.png"
const CodeVerificaction = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const [codigo, setCodigo] = useState("");
  const user = useSelector((store) => store.userStore);
  const validateCodigo = ({ target }) => {
    const code = target.value;
    setCodigo(code);
    if (code.length === 6) {
      dispatch(actionSignPhoneAsync(code));
      if(!user.name && !user.email ){
       
        if (user.uid) {
          console.log(user.uid);
          
        }
        navigate(`/createaccount/${user.uid}`)


      }
      else{
        navigate(`/home`)
      
      }
    }
  };
  useEffect(() => {
    setTimeout(()=>{navigate("/signIn")},30000)
  }, [])
  
  return (
    <div className="verification">
    <img src={screen} /> 
      <h2> Verification</h2>
      
      <form>
        <label>
          Login or create an account with your phone number to start ordering 
          <input
            type="number"
            onChange={validateCodigo}
            value={codigo}
            placeholder="Ingrese codigo de verificación"
          />
        </label>
      </form>
    </div>
  );
};
export default CodeVerificaction;
