import React, { useEffect, useState } from 'react';
import location from '../../assets/location.png';
import logout from '../../assets/logout.png';
import restaurant1 from '../../assets/restaurant1.png';
import Dashboard from './dashboard/Dashboard';
import Dashboardtwo from './dashboardtwo/Dashboardtwo';
import fiveStars from '../../assets/5.png';
import fourStars from '../../assets/4.png';
import threeStars from '../../assets/3.png';
import { useDispatch, useSelector } from 'react-redux';
import { actionUserLogOutAsync } from '../../redux/actions/userActions';
import './style.scss';
import Footer from './footer/Footer';
import { actionGetrestaurantesAsync } from '../../redux/actions/restaurantesActions';
import { auth } from '../../firebase/firebaseconfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { actionGetPlatosAsync } from '../../redux/actions/platosActions';
import NavBar from '../navbar/NavBar';
const Home = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.displayName) {
        console.log(user);
      } else {
        navigate(`/createaccount/${user.uid}`);
        console.log(user);
      }
    });
  }, []);
  const [mostar, setMostrar] = useState(false);
  const irCompras = () => {
    navigate('/recientes');
    setMostrar(!mostar);
  };
  console.log(mostar);
  const userStore = useSelector((store) => store.userStore);
  const { restaurantes } = useSelector((store) => store.restaurantStore);
  const { filtroRestaurantes } = useSelector((store) => store.restaurantStore);
  const comprasStore = useSelector((store) => store.comprasStore);
  console.log(comprasStore);
  console.log(userStore);
  console.log(restaurantes);
  console.log(filtroRestaurantes);
  const dispatch = useDispatch();
  const LogOutUser = () => {
    // dispatch(actionUserCreateAsync({}))
    // dispatch(actionSignPhoneSync({}))
    //   signOut()
    //  .then(()=>{
    //   console.log('salir');
    //  })
    //  .catch((error)=>{console.log(error);})
    dispatch(actionUserLogOutAsync());
  };
  useEffect(() => {
    dispatch(actionGetrestaurantesAsync());
    dispatch(actionGetPlatosAsync());
  }, [dispatch]);
  const addRestaurant = () => {
    navigate('/addRestaurant');
  };
  const addDish = () => {
    navigate('/addPlato');
  };

  return (
    <div className="body">
      <NavBar/>
        <Dashboard />

      <div className="main p-4">
        <h1>Restaurantes y cafes </h1>
        <section className="main_dashboard">
          {/* <Dashboardtwo /> */}
        </section>
        <div className="col-12">
          <div className="row">
            {filtroRestaurantes.length
              ? filtroRestaurantes.map((item, index) => (
                  <div key={index} className="col-md-12 mb-3">
                    <div
                      className="card h-100 cursor-pointer"
                      onClick={() => {
                        navigate(`/restaurante${item.name}`);
                      }}
                    >
                      <div className="row g-0">
                        <div className="col-md-5">
                          <img
                            className="card-img card-img-left img-fluid"
                            src={item.image}
                            alt="Restaurant Image"
                          />
                        </div>
                        <div className="col-md-7">
                          <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <img
                              className="stars"
                              width="50px"
                              src={fourStars}
                              alt="Rating"
                            />
                            <p className="card-text">
                              Work time {item.apertureTime}:30-{item.closeTime}
                              :00
                            </p>
                            <p className="card-text">
                              <small className="text-muted">
                                Before you {item.minPrice}$
                              </small>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : restaurantes.map((item, index) => (
                  <div key={index} className="col-lg-4 col-md-6 mb-3">
                    <div
                      className="card h-100 cursor-pointer"
                      onClick={() => {
                        navigate(`/restaurante${item.name}`);
                      }}
                    >
                      <div className="row g-0">
                        <div className="col-md-5">
                          <img
                            className="card-img card-img-left img-fluid"
                            src={item.image}
                            alt="Restaurant Image"
                          />
                        </div>
                        <div className="col-md-7">
                          <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <img
                              className="stars"
                              width="50px"
                              src={fourStars}
                              alt="Rating"
                            />
                            <p className="card-text">
                              Work time {item.apertureTime}:30-{item.closeTime}
                              :00
                            </p>
                            <p className="card-text">
                              <small className="text-muted">
                                Before you {item.minPrice}$
                              </small>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
      {comprasStore.length ? (
        <button onClick={irCompras} className="botonCompras">
          <span> Ver carrito</span>{' '}
        </button>
      ) : (
        ''
      )}
      <Footer />
    </div>
  );
};

export default Home;
