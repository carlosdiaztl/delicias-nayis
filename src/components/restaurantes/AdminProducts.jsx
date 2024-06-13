import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, dataBase } from '../../firebase/firebaseconfig';
import { actionGetPlatosAsync } from '../../redux/actions/platosActions';
import { actionGetrestaurantesAsync } from '../../redux/actions/restaurantesActions';
import './style.scss';
import NavBar from '../navbar/NavBar';
import { deleteDoc, doc } from 'firebase/firestore';
import Swal from 'sweetalert2';

const AdminProducts = () => {
  const [platosRestaurante, setPlatosRestaurante] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { platos } = useSelector((state) => state.platosStore);

  useEffect(() => {
    dispatch(actionGetPlatosAsync());
    dispatch(actionGetrestaurantesAsync());
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.displayName) {
        console.log(user.displayName);
      } else {
        navigate(`/createaccount/${user?.uid}`);
        console.log(user);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigate]);

  useEffect(() => {
    const filteredPlatos = platos.filter(
      (plato) => plato.property === 'V8CvDhdeC8jAWXRLHyyU'
    );
    setPlatosRestaurante(filteredPlatos);
  }, [platos]);

  const eliminarPlato = async (id) => {
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
        await deleteDoc(doc(dataBase, 'Platos', id));
        setPlatosRestaurante((prevPlatos) =>
          prevPlatos.filter((plato) => plato.id !== id)
        );
        Swal.fire('Deleted!', 'Producto eliminado.', 'success');
      } catch (error) {
        Swal.fire('Error', 'Hubo un error al eliminar el Producto', 'error');
      }
    }
  };

  const goProduct = (platoName) => {
    navigate(`/plato${platoName}`);
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="row">
          <div
            style={{ minHeight: '40vh' }}
            className="row col-md-12 col-12 mt-2"
          >
            {platosRestaurante.map((plate, index) => (
              <div
                key={index}
                className="col-md-4 col-sm-6 platos"
               
              >
              <div className='col-11 d-flex justify-content-end'>

               <button
                  className="btn btn-danger"
                  onClick={() => eliminarPlato(plate.id)}
                >
                  X
                </button>
              </div>
                <img src={plate.image} alt={plate.name} className="img-fluid" />
                
                <p className="text-center">
                  <strong className="text-dark text-center">
                    {plate.name}
                  </strong>{' '}
                </p>
                <p className="text-danger text-center">${plate.price}</p>
               
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProducts;
