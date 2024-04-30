import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/firebaseconfig';
import { actionGetPlatosAsync } from '../../redux/actions/platosActions';
import { actionGetrestaurantesAsync } from '../../redux/actions/restaurantesActions';
import Footer from '../home/footer/Footer';
import './style.scss';
import NavBar from '../navbar/NavBar';

const Restaurantes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name } = useParams();
  const { restaurantes } = useSelector((state) => state.restaurantStore);
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

  const restaurante = restaurantes.find((restaurant) => restaurant.name === name);
  const platosRestaurante = platos.filter((plato) => plato.property === name);

  const goProduct = (platoName) => {
    navigate(`/plato${platoName}`);
  };

  return (
    <div className="container">
      <NavBar/>

      <h2>Bienvenido a {name}</h2>
      {restaurante && (
        <div className="row">
          <div className="col-md-6">
            <figure>
              <img src={restaurante.image} alt={restaurante.name} className="img-fluid" />
            </figure>
          </div>
          <div className="col-md-6">
            <h4>{restaurante.name}</h4>
            <p>{restaurante.description}</p>
          </div>
        </div>
      )}
      <div className="row">
        {platosRestaurante.map((plate, index) => (
          <div key={index} className="col-md-4 col-sm-6 platos" onClick={() => goProduct(plate.name)}>
            <img src={plate.image} alt={plate.name} className="img-fluid" />
            <p>{plate.name}</p>
            <h6>${plate.price}</h6>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Restaurantes;
