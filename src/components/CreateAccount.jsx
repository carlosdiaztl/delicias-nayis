import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  actionAuthenticationSync,
  actionUserCreateAsync,
  actionUserLogOutAsync,
} from '../redux/actions/userActions';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, dataBase } from '../firebase/firebaseconfig';
import './style.scss';
import { Spinner } from 'react-bootstrap';
import { doc, setDoc } from 'firebase/firestore';

const CreateAccount = () => {
  const [check, setCheck] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { uid } = useParams();
  const userStore = useSelector((store) => store.userStore);
  const [usuario, setUsuario] = useState('');
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUsuario(user);
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setCheck(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (!check) {
      if (userStore.name) {
        navigate('/home');
      } else {
        console.log(false);
      }
    } else {
      console.log(false);
    }
  }, [userStore]);
  const { register, handleSubmit, required } = useForm();
  const onSubmit = async (data) => {
    const docRef = doc(dataBase, `usuarios/${auth.currentUser.uid}`);
    dispatch(actionUserCreateAsync(data));
    setDoc(docRef, {
      email: data.email,
      name: data.name,
      photoURL: usuario.photoURL,
      phoneNumber: usuario.phoneNumber,
      rol: 'usuario',
    });
    dispatch(actionAuthenticationSync());
    navigate('/home');
  };
  const LogOutUser = () => {
    dispatch(actionUserLogOutAsync());
  };
  if (check) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  return (
    <>
      {check ? (
        <></>
      ) : (
        <div className="container d-flex flex-column justify-content-center">
          <h2 className='h2 text-center'>Crear cuenta </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
          <div className='form-group'>

            <input className='form-control'
              type="text"
              placeholder="Nombre"
              {...register('name', { required })}
            />
          </div>
          <div className='form-group my-2'>

            <input className='form-control'
              type="email"
              placeholder="email"
              {...register('email', { required })}
            />
          </div>
          <div className='form-group mb-2'>

            <input className='form-control'
              type="password"
              placeholder="Contraseña"
              {...register('password', { required })}
            />
          </div>
          
          <div className='form-group justify-content-center'>

            <button className='col-md-4 btn btn-primary' type="submit"> Sign in </button>
          </div>
          </form>
          {/* <span> {uid} </span> */}
          <div className='form-group justify-content-center mt-2'>

          <button className='col-md-4 btn btn-warning text-center' onClick={LogOutUser}> Log Out</button>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateAccount;
