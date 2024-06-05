import { onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth, dataBase } from '../../firebase/firebaseconfig';
import { actionLoginSync } from '../../redux/actions/userActions';
import './style.scss';
import { useForm } from 'react-hook-form';
import { Table } from 'react-bootstrap';
import NavBar from '../navbar/NavBar';
import NewFooter from '../home/footer/NewFooter';

const ListaClientes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userStore = useSelector((store) => store.userStore);
  const [isEdit, setIsEdit] = useState(false);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    dispatch(actionLoginSync(userStore));
  }, [dispatch]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user?.displayName) {
        navigate(`/createaccount/${user.uid}`);
      }
    });
  }, []);
  useEffect(() => {
    sendInfoUser()
  }, []);
  const sendInfoUser = async () => {
    const users = [];
    const userCollection = collection(dataBase, 'usuarios');
    const querySnapshot = await getDocs(userCollection);

    querySnapshot.forEach((doc) => {
      users.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    setUsuarios(users);
    setIsEdit(!isEdit);
  };


  return (
    <>
      <NavBar/>

    <div className='perfil_admin'>
        <div>
          <h3>
           Usuarios
          </h3>
          {usuarios && usuarios.length ? (
            <div className='table-responsive'>

            <Table  striped bordered hover>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Dirección</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((person, index) => (
                  <tr key={index}>
                    <td>{person.name ? person.name : ''}</td>
                    <td>{person.email ? person.email : ''}</td>
                    <td>{person.address ? person.address : ''}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            </div>
          ) :''}
        </div>
    </div>
    </>
  );
};

export default ListaClientes;
