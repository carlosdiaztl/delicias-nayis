import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logout from '../../assets/logout.png';
import logo from '../../assets/logo3.png';
import { actionUserLogOutAsync } from '../../redux/actions/userActions';
import './style.scss';

const NavBar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userStore = useSelector((store) => store.userStore);

  const LogOutUser = () => {
    dispatch(actionUserLogOutAsync());
  };

  const renderNavItems = () => {
    console.log(userStore);

    if (userStore?.admin) {
      // Opciones para admin
      return (
        <>
          <li className="nav-item">
            <button
              className="btn btn-outline-danger"
              onClick={() => navigate('/admin/panel')}
            >
              Admin Panel
            </button>
          </li>
          <li className="nav-item">
            <button
              className="btn btn-outline-danger"
              onClick={() => navigate('/restaurantedelicias%20nayis')}
            >
              Productos
            </button>
          </li>
          <li className="nav-item">
            <button
              className="btn btn-outline-danger"
              onClick={() => navigate('/recientes')}
            >
              Ordenes
            </button>
          </li>
          <li className="nav-item">
            <button
              className="btn btn-outline-danger"
              onClick={() => navigate('/historial')}
            >
              Historial
            </button>
          </li>
          <li className="nav-item">
            <button
              className="btn btn-outline-danger"
              onClick={() => navigate('/perfil')}
            >
              Perfil
            </button>
          </li>
        </>
      );
    } else if (userStore && userStore?.uid) {
      // Opciones para usuarios logueados
      return (
        <>
          <li className="nav-item">
            <button
              className="btn btn-outline-danger"
              onClick={() => navigate('/restaurantedelicias%20nayis')}
            >
              Productos
            </button>
          </li>
          <li className="nav-item">
            <button
              className="btn btn-outline-danger"
              onClick={() => navigate('/recientes')}
            >
              Ordenes
            </button>
          </li>
          <li className="nav-item">
            <button
              className="btn btn-outline-danger"
              onClick={() => navigate('/historial')}
            >
              Historial
            </button>
          </li>
          <li className="nav-item">
            <button
              className="btn btn-outline-danger"
              onClick={() => navigate('/perfil')}
            >
              Perfil
            </button>
          </li>
        </>
      );
    } else {
      // Opciones para usuarios no autenticados
      return (
        <>
          <li className="nav-item">
            <button
              className="btn btn-outline-danger"
              onClick={() => navigate('/restaurantedelicias%20nayis')}
            >
              Productos
            </button>
          </li>
          <li className="nav-item">
            <button
              className="btn btn-outline-danger"
              onClick={() => navigate('/search')}
            >
              Buscar
            </button>
          </li>
        </>
      );
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img
            className="card-img card-img-left img-fluid logo-responsive"
            src={logo}
            alt="Restaurant logo"
          />
        </a>
        <button className="navbar-toggler" type="button" onClick={toggleNav}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-4">
            {renderNavItems()}
            {userStore && userStore?.uid ? (
              <li className="nav-item">
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={LogOutUser}
                >
                  <img width="22px" src={logout} alt="Logout" />
                </button>
              </li>
            ) : (
              <li className="nav-item">
            <button
              className="btn btn-outline-danger"
              onClick={() => navigate('/signIn')}
            >
              logueate
            </button>
          </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
