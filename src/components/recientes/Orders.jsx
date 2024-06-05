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
import './style.scss';
import NavBar from '../navbar/NavBar';
import TimestampTable from '../../services/ConverTime';

const Orders = () => {
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


  return (
    <>
      <NavBar />
      <div style={{ minHeight: '35vh' }} className="container">
          <div className="col-12 d-flex justify-content-end">
            <span className="pull-right text-right ">
              Ver historial de Pedidos
            </span>
          </div>
 
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Restaurante</th>
                  <th>Fecha</th>
                  <th>Nombre del Plato</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {compras.map((item, index) => (
                  <tr className="comprasU" key={index}>
                    <td>{item.restaurante}</td>
                    <TimestampTable timestamp={item.timestamp} />
                    <td>{item.platoName}</td>
                    <td>${item.price}</td>
                    <td>{item.quantity}</td>
                    <td>${item.total}</td>
                    <td className="text-center">
                      <button className="btn btn-danger">Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </div>
    </>
  );
};

export default Orders;
