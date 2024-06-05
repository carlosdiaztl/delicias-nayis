import React, { useEffect, useState } from 'react';
import Dashboard from './dashboard/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { actionUserLogOutAsync } from '../../redux/actions/userActions';
import './style.scss';
// import Footer from './footer/Footer';
import { actionGetrestaurantesAsync } from '../../redux/actions/restaurantesActions';
import { auth } from '../../firebase/firebaseconfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { actionGetPlatosAsync } from '../../redux/actions/platosActions';
import NavBar from '../navbar/NavBar';
import './style.scss';
import about_img from './../../assets/aquitania1.jpg';
import NewFooter from './footer/NewFooter';
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
      <NavBar />
      <Dashboard />

      <div className="main p-1">
        <section className="main_dashboard">{/* <Dashboardtwo /> */}</section>
        <div className="about_section layout_padding">
          <div className="container">
            <div className="about_section_2">
              <div className="row">
                <div className="col-md-6">
                  <div className="about_taital_box">
                    <h1 className="about_taital">Sobre nuestra tienda</h1>
                    <h1 className="about_taital_1">
                      Venta de comidas rapidas{' '}
                    </h1>
                    <p className=" about_text">
                      Mas informacion de la aplicacion Esta aplicacion se creo
                      con el fin de facilitar la entrega de los pedidos de
                      comidas rapidas para asi disminuir el tiempo de espera
                      para los clientes y esto permite que el pedido sea
                      realizado rapidamente en lugar de esperar para su entrega
                    </p>
                    <div className="readmore_btn">
                      <a href="/restaurantedelicias%20nayis">Leer mas...</a>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="image_iman">
                    <img src={about_img} className="about_img" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="col-12">
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
                              Horario {item.apertureTime}:00 AM-{item.closeTime}
                              :00 PM
                            </p>
                            <p className="card-text">
                              <small className="text-muted">
                                Desde {item.minPrice}$
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
                              Horario {item.apertureTime}:00 AM-{item.closeTime}
                              :00 PM
                            </p>
                            <p className="card-text">
                              <small className="text-muted">
                                Desde {item.minPrice}$
                              </small>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div> */}
      </div>
      {comprasStore.length ? (
        <button onClick={irCompras} className="botonCompras">
          <span> Ver carrito</span>{' '}
        </button>
      ) : (
        ''
      )}
      {/* <Footer /> */}

      {/* <div className="coffee_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="coffee_taital">Nuestras Ofertas</h1>
            </div>
          </div>
        </div>
        <div className="coffee_section_2">
          <div>
            <div>
              <div>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-lg-3 col-md-6">
                      <div className="coffee_img">
                        <img src={burguerespecial} />
                      </div>
                      <div className="coffee_box">
                        <h3 className="types_text">Perro Burguer</h3>
                        <div className="read_bt">
                          <a href="">Ver mas</a>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <div className="coffee_img">
                        <img className="coffee_img_2" src={chorizo} />
                      </div>
                      <div className="coffee_box">
                        <h3 className="types_text">Chorizo</h3>
                        <div className="read_bt">
                          <a href="">Ver mas</a>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <div className="coffee_img">
                        <img src={perro} />
                      </div>
                      <div className="coffee_box">
                        <h3 className="types_text">Perro con todo</h3>
                        <div className="read_bt">
                          <a href="">Ver mas</a>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                      <div className="coffee_img">
                        <img src={hamburguesa} />
                      </div>
                      <div className="coffee_box">
                        <h3 className="types_text">Hamburguesa</h3>

                        <div className="read_bt">
                          <a href="">Ver mas</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="map_main">
      <div className="map-responsive">
        <iframe
          src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc&q=Boyaca+aquitania"
          width="220"
          height="400"
          style={{ border: 0, width: '100%' }}
          allowFullScreen
        ></iframe>
      </div>
    </div>
      <NewFooter />
    </div>
  );
};

export default Home;
