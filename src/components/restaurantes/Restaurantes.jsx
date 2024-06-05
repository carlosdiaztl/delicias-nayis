import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/firebaseconfig';
import { actionGetPlatosAsync } from '../../redux/actions/platosActions';
import { actionGetrestaurantesAsync } from '../../redux/actions/restaurantesActions';
import './style.scss';
import NavBar from '../navbar/NavBar';
import NewFooter from '../home/footer/NewFooter';

const Restaurantes = () => {
  const [filter, setFilter] = useState('Todos');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name } = useParams();
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

  // const restaurante = restaurantes.find((restaurant) => restaurant.id === 'V8CvDhdeC8jAWXRLHyyU');
  const platosRestaurante = platos.filter(
    (plato) => plato.property === 'V8CvDhdeC8jAWXRLHyyU'
  );
  const filteredPlatos =
    filter === 'Todos'
      ? platosRestaurante
      : platosRestaurante.filter((plato) => plato.category === filter);
  console.log(platosRestaurante);

  const goProduct = (platoName) => {
    navigate(`/plato${platoName}`);
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <h2 className="h4 text-center">Bienvenido a {name}</h2>
        <div className="row">
          <div className="col-md-2 col-12 d-flex flex-md-column  gap-2 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              className="bi bi-filter "
              viewBox="0 0 16 16"
            >
              <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
            </svg>
            <button
              type="button"
              className="btn btn-light"
              onClick={() => setFilter('Todos')}
            >
              Todos
            </button>
            <button
              type="button"
              className="btn btn-light"
              onClick={() => setFilter('bebidas')}
            >
              Bebidas
            </button>
            <button
              type="button"
              className="btn btn-light"
              onClick={() => setFilter('favoritas')}
            >
              Favoritas
            </button>
          </div>

          <div
            style={{ minHeight: '40vh' }}
            className="row col-md-10 col-12 mt-2"
          >
            {filteredPlatos.map((plate, index) => (
              <div
                key={index}
                className="col-md-4 col-sm-6 platos"
                onClick={() => goProduct(plate.name)}
              >
                <img src={plate.image} alt={plate.name} className="img-fluid" />
                <p>
                  <strong className="text-dark">{plate.name}</strong>{' '}
                </p>
                {/* <p className='text-secondary'>{plate.description}</p> */}
                <p className="text-danger">${plate.price}</p>
              </div>
            ))}
          </div>
        </div>
        {/* <Footer /> */}
      </div>
      <NewFooter />
    </>
  );
};

export default Restaurantes;
