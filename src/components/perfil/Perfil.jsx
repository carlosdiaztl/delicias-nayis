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
import Footer from '../home/footer/Footer';
import './style.scss';
import { useForm } from 'react-hook-form';
import { FloatingLabel, Form, Card, Table } from 'react-bootstrap';
import { fileUpLoad } from '../../services/fileUpLoad';
import Swal from 'sweetalert2';
import NavBar from '../navbar/NavBar';

const Perfil = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userStore = useSelector((store) => store.userStore);
  const [isEdit, setIsEdit] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const { register, handleSubmit, formState: { errors } } = useForm();

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

  const showForm = () => {
    setIsEdit(!isEdit);
  };

  const onSubmit = async (data) => {
    const docRef = doc(dataBase, `usuarios/${userStore.uid}`);

    if (data.name === '' && data.image.length) {
      const URLimg = await fileUpLoad(data.image[0]);

      updateDoc(docRef, {
        name: userStore.name,
        avatar: URLimg,
        address: data.address,
      });

      dispatch(
        actionLoginSync({
          ...userStore,
          avatar: URLimg,
          address: data.address,
        })
      );

      setIsEdit(false);
    }

    if (data.name !== '' && data.image.length) {
      Swal.fire('Informacion actualizada', '', 'success');
      const URLimg = await fileUpLoad(data.image[0]);

      updateDoc(docRef, {
        name: data.name,
        avatar: URLimg,
        address: data.address,
      });

      dispatch(
        actionLoginSync({
          ...userStore,
          name: data.name,
          avatar: URLimg,
          address: data.address,
        })
      );

      setIsEdit(false);
    }
  };

  return (
    <>
      <NavBar/>

    <div className={userStore.admin ? 'perfil_admin' : 'perfil'}>
      {userStore && userStore.admin ? (
        <div>
          <h3>
           Usuarios
          </h3>
          {usuarios && usuarios.length ? (
            <div className='table-responsive'>

            <Table striped bordered hover>
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
      ) : (
        <div className="d-flex align-items-center">
          <Card className="mb-4">
            <Card.Body>
              <div className="user-avatar-section">
                <div className="d-flex align-items-center flex-column">
                  <img
                    className="perfil_img"
                    src={userStore.avatar ? userStore.avatar : ''}
                  />
                  <div className="user-info text-center">
                    <h4 className="mb-2">
                      {userStore.name ? userStore.name : ''}
                    </h4>
                    <span className="badge bg-label-secondary mt-1">
                      Usuario
                    </span>
                  </div>
                  <span>
                    Dirección:{' '}
                    {userStore.address ? userStore.address : 'No definida'}{' '}
                  </span>
                  <button onClick={showForm}>Editar perfil</button>
                  {isEdit ? (
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <input
                        defaultValue={userStore.name}
                        placeholder="Nombre"
                        {...register('name')}
                      />
                      <input
                        defaultValue={userStore.address}
                        placeholder="Dirección"
                        {...register('address', { required: true })}
                      />
                      {errors.exampleRequired && (
                        <span>This field is required</span>
                      )}
                      <FloatingLabel className="mb-3">
                        <Form.Control
                          type="file"
                          size="sm"
                          {...register('image', { required: true })}
                        />
                      </FloatingLabel>
                      <input type="submit" />
                    </form>
                  ) : null}
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      )}
      <Footer />
    </div>
    </>
  );
};

export default Perfil;
