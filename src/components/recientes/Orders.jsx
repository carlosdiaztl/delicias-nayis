import { onAuthStateChanged } from 'firebase/auth';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
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
  }, []);


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
  const eliminarCompra = async (id) => {
    try {
      await deleteDoc(doc(dataBase, 'compras', id));
      Swal.fire('Eliminado', 'La compra ha sido eliminada con éxito', 'success');
      // Actualizar la lista de compras después de eliminar
      setCompras((prevCompras) => prevCompras.filter((compra) => compra.id !== id));
    } catch (error) {
      Swal.fire('Error', 'Hubo un error al eliminar la compra', 'error');
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
                    <button className="btn btn-danger" onClick={() => eliminarCompra(item.id)}>Eliminar</button>
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
