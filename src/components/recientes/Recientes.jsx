import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { auth, dataBase } from '../../firebase/firebaseconfig';
import {
  actionBorrarTodo,
  actionDeleteCompra,
  agregarComprasAsync,
} from '../../redux/actions/comprasActions';
import { actionGetPlatosAsync } from '../../redux/actions/platosActions';
import Footer from '../home/footer/Footer';
import './style.scss';
import NavBar from '../navbar/NavBar';
import TimestampTable from '../../services/ConverTime';
import NewFooter from '../home/footer/NewFooter';

const Recientes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userStore = useSelector((store) => store.userStore);
  const comprasStore = useSelector((store) => store.comprasStore);
  const [compras, setCompras] = useState([]);
  const [userCompras, setUserCompras] = useState([]);
  const sendWpp = () => {
    const baseURL = "https://wa.me/+573214353505?text=";
    console.log('wpp');
  
    // Mapear comprasStore para obtener un array de nombres de productos
    const nombresProductos = comprasStore.map(compra => compra.quantity +" "+ compra.platoName  );
    console.log(nombresProductos);
  
    // Unir los nombres de los productos en una sola cadena separada por comas
    const additionalText = nombresProductos.join(', ');
  console.log(additionalText);
    // Construir el enlace de WhatsApp con el mensaje concatenado
    const wppLink = `${baseURL}Buenas tardes, quisiera pedir: ${additionalText}`;
  console.log(wppLink);
    // Abrir el enlace en una nueva ventana
    window.open(wppLink);
  };
  

  useEffect(() => {
    dispatch(actionGetPlatosAsync());
  }, [dispatch]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user?.displayName) {
        navigate(`/createaccount/${user.uid}`);
      }
    });
  }, []);
  useEffect(() => {
    verCompras();
    verUserCompras();
  }, []);
  const deleteItem = (index) => {
    const compra = [...comprasStore];
    compra.splice(index, 1);
    dispatch(actionDeleteCompra(compra));
  };

  const deleteAll = () => {
    dispatch(actionBorrarTodo());
  };

  const verCompras = async () => {
    const comprasTotales = [];
    const userCollection = collection(dataBase, 'compras');
    const querySnapshot = await getDocs(userCollection);

    querySnapshot.forEach((doc) => {
      comprasTotales.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    // userCompras.length
    setCompras(comprasTotales);
    console.log(comprasTotales);
  };
  const verUserCompras = async () => {
    const comprasTotalesUser = [];
    const userCollection = collection(dataBase, 'compras');
    const q = query(userCollection, where('userId', '==', userStore.uid));
    try {
      // Ejecutar la consulta filtrando por el campo 'userid' igual a 'userStore.uid'
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        comprasTotalesUser.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setUserCompras(comprasTotalesUser);
      console.log(comprasTotalesUser);
      console.log(userCompras);
    } catch (error) {
      console.error('Error al ejecutar la consulta:', error);
    }
  };

  const confirmBuy = () => {
    console.log(comprasStore);
    console.log(userStore);
    const userId = userStore.uid; // Obtener el ID del usuario desde el store

    // Modificar cada compra para agregar el ID del usuario
    const comprasConUserId = comprasStore.map((compra) => ({
      ...compra,
      userId: userId,
      userName: userStore.name,
      timestamp: new Date(),
    }));

    dispatch(agregarComprasAsync(comprasConUserId));
    sendWpp()
    Swal.fire('Sus compras han sido recibidas', '', 'success');
    deleteAll();
  };

  return (
    <>
      <NavBar />
      <div style={{ minHeight: '35vh' }} className="container">
        {comprasStore && comprasStore.length  ? (
          <div className="recientes container p-1 m-2">
            <h3>Recientes</h3>
            <button className="btn btn-outline-danger mx-2" onClick={deleteAll}>
              Vaciar carrito
            </button>
            <button className="btn btn-outline-danger" onClick={confirmBuy}>
              Confirmar compras
            </button>
            {comprasStore.length ? (
              <div className="table-container">
                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead>
                      <tr className="align-bottom">
                        <th>Restaurante</th>
                        <th>Plato</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                        <th>Estado</th>
                        <th>Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comprasStore.map((item, index) => (
                        <tr key={index}>
                          <td>{item.restaurante}</td>
                          <td>{item.platoName}</td>
                          <td>${item.price}</td>
                          <td>{item.quantity}</td>
                          <td>${item.total}</td>
                          <td>
                            <span onClick={() => deleteItem(index)}>
                              {item.confirmacion ? 'Confirmado' : 'Pendiente'}
                            </span>
                          </td>
                          <td>
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => deleteItem(index)}
                            >
                              Cancelar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <h3>Tu lista está vacía, compra algo primero</h3>
            )}
          </div>
        ) : (
          <h3>Tu lista está vacía, compra algo primero</h3>
        )}
      
      </div>
      
      <NewFooter />
    </>
  );
};

export default Recientes;
