import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logout from '../../assets/logout.png';
import logo from '../../assets/logonayis.png';
import { actionUserLogOutAsync } from '../../redux/actions/userActions';

const NavBar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userStore = useSelector((store) => store.userStore);
  const comprasStore = useSelector((store) => store.comprasStore);

  const LogOutUser = () => {
    dispatch(actionUserLogOutAsync());
  };

  const addRestaurant = () => {
    navigate('/addRestaurant');
  };

  const addDish = () => {
    navigate('/addPlato');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img
            className="card-img card-img-left img-fluid"
            src={logo}
            style={{ width: '200px' }}
            alt="Restaurant Image"
          />
        </a>
        <button className="navbar-toggler" type="button" onClick={toggleNav}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`}>
          <div className="row w-100 p-0 m-0">
            <div className="col">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-4 justify-content-center justify-content-md-start">
                <li className="nav-item ms-md-4">
                  <button
                    className="btn btn-outline-danger nav-link px-4 px-md-2"
                    onClick={() => navigate('/restaurantedelicias%20nayis')}
                  >
                    Productos
                  </button>
                </li>
                 
                <li className="nav-item">
                    <button
                      className="btn btn-outline-danger nav-link px-4 px-md-2"
                      onClick={() => navigate('/recientes')}
                    >
                      Ordenes
                    </button>
                </li>

                <li className="nav-item">
                  <button
                    className="btn btn-outline-danger nav-link px-4 px-md-2"
                    onClick={() => navigate('/search')}
                  >
                    Buscar
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-danger nav-link px-4 px-md-2"
                    onClick={() => navigate('/perfil')}
                  >
                    Perfil
                  </button>
                </li>
                <li className="nav-item">
                  {userStore.admin && (
                    <button
                      className="btn btn-outline-danger nav-link px-4 px-md-2"
                      onClick={addDish}
                    >
                      Añadir Plato
                    </button>
                  )}
                </li>
                <li className="nav-item ">
                  {userStore.admin && (
                    <button
                      className="btn btn-outline-danger nav-link px-4 px-md-2"
                      onClick={addRestaurant}
                    >
                      Añadir Restaurante
                    </button>
                  )}
                </li>
              </ul>
            </div>
            <div className="col-2">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <button
                    className="btn btn-sm btn-outline-danger nav-link col-12 "
                    onClick={LogOutUser}
                  >
                    <img width="22px" src={logout} alt="Logout" />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
