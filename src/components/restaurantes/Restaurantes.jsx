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
import NewFooter from '../home/footer/NewFooter';

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
    <>

      <NavBar/>
    <div className="container">

      <h2>Bienvenido a {name}</h2>
      
      <div style={{ minHeight: "40vh" }} className="row">
        {platosRestaurante.map((plate, index) => (
          <div key={index} className="col-md-4 col-sm-6 platos" onClick={() => goProduct(plate.name)}>
            <img src={plate.image} alt={plate.name} className="img-fluid" />
            <p><strong className='text-dark'>{plate.name}</strong> </p>
            <p className='text-secondary'>{plate.description}</p>
            <p className='text-danger'>${plate.price}</p>
           
          </div>
        ))}
      </div>
      {/* <Footer /> */}
    </div>
      <NewFooter />
    </>
  );
};

export default Restaurantes;
