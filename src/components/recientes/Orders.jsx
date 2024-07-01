import { onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
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
  const [compras, setCompras] = useState([]);

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
    console.log(compras);
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
    const comprasOrdenadas = comprasTotales.sort(
      (a, b) => b.timestamp.toMillis() - a.timestamp.toMillis()
    );

    setCompras(comprasOrdenadas);
    console.log(comprasOrdenadas);
  };
  const eliminarCompra = async (id) => {
    const result = await Swal.fire({
      title: 'Estas seguro?',
      text: 'Esta accion no puede ser revertida!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrala!',
    });

    if (result.isConfirmed) {
      try {
        await deleteDoc(doc(dataBase, 'compras', id));
        setCompras((prevCompras) =>
          prevCompras.filter((compra) => compra.id !== id)
        );
        Swal.fire('Deleted!', 'Orden eliminada.', 'success');
      } catch (error) {
        Swal.fire('Error', 'Hubo un error al eliminar la compra', 'error');
      }
    }
  };
  const confirmarCompra = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Esta acción confirmará la compra!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, confírmala!',
    });

    if (result.isConfirmed) {
      try {
        const compraRef = doc(dataBase, 'compras', id);
        await updateDoc(compraRef, { confirmacion: true });
        Swal.fire('¡Confirmada!', 'Compra confirmada.', 'success');
        verCompras();
      } catch (error) {
        Swal.fire('Error', 'Hubo un error al confirmar la compra', 'error');
      }
    }
  };

  return (
    <>
      <NavBar />
      <div style={{ minHeight: '35vh' }} className="container">
        <div className="col-12 d-flex justify-content-end">
          <span className="pull-right text-right ">
           Historial de Pedidos
          </span>
        </div>

        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Nombre del Plato</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Total</th>
                <th>Estado</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {compras.map((item, index) => (
                <tr className={`comprasU`} key={index}>
                  <TimestampTable timestamp={item.timestamp} />
                  <td>{item.platoName}</td>
                  <td>${item.price}</td>
                  <td>{item.quantity}</td>
                  <td>${item.total}</td>
                  <td className={`${item.confirmacion ? 'confirmada' : 'pendiente'}`}
                  
                  >
                    {item.confirmacion ? 'Confirmada' : 'Pendiente'}
                  </td>
                  <td className="d-flex text-center">
                    <button
                      title="eliminar"
                      className="col-6 btn btn"
                      onClick={() => eliminarCompra(item.id)}
                    >
                      <img
                        src="https://png.pngtree.com/png-vector/20190927/ourmid/pngtree-trash-icon-png-image_1753315.jpg"
                        width={30}
                      />{' '}
                    </button>
                    <button
                      className="col-6 btn btn"
                      onClick={() => confirmarCompra(item.id)}
                    >
                      <img
                        src="https://png.pngtree.com/png-vector/20191113/ourmid/pngtree-green-check-mark-icon-flat-style-png-image_1986021.jpg"
                        width={30}
                      />{' '}
                    </button>
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
