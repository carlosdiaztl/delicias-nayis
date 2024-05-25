import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/firebaseconfig';
import { actionGetPlatosAsync } from '../../redux/actions/platosActions';
import Footer from '../home/footer/Footer';
import './style.scss';
import NavBar from '../navbar/NavBar';
import NewFooter from '../home/footer/NewFooter';

const Search = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [busqueda, setBusqueda] = useState(false);
  const [msj, setMsj] = useState(false);
  const { platos } = useSelector((store) => store.platosStore);
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.displayName) {
        console.log(user?.displayName);
      } else {
        navigate(`/createaccount/${user.uid}`);
        console.log(user);
      }
    });
  }, []);
  useEffect(() => {
    dispatch(actionGetPlatosAsync());
  }, [dispatch]);
  const SearchInput = ({ target }) => {
    const parametro = target.value;
    setValue(parametro);
  };

  const platosFind = platos.filter((plato) =>
  plato.name.toLowerCase().includes(value.toLowerCase())
);

  useEffect(() => {
    console.log(value);
    if (value === '') {
      setBusqueda(false);
      setMsj(false);
    } else {
      console.log(platosFind);
      setBusqueda(true);
    }
    if (value !== '' && !platosFind.length) {
      setMsj(true);

      console.log('sin reultados');
    }
  }, [value]);
  const goProduct = (name) => {
    navigate(`/plato${name}`);
  };

  return (
    <div>
      <NavBar/>

      <span className="input">
        <input
          onChange={SearchInput}
          value={value}
          placeholder=" Busca un plato..."
        />
      </span>
      
      {/* <p className="p"> Recent Searches</p> */}
      <section style={{ minHeight: "30vh" }} className='container row'>
        {busqueda && platosFind.length ? (
          platosFind.map((plate, index) => (
            <div key={index} className="col-md-4 col-sm-6 platos p-3" onClick={() => goProduct(plate.name)}>
            <img src={plate.image} alt={plate.name} className="img-fluid" />
            <p>{plate.name}</p>
            <h6>${plate.price}</h6>
          </div>
          ))
        ) : (
          <></>
        )}
        {msj ? (
          <span>
            <h2>Sin resultados</h2>
          </span>
        ) : (
          <></>
        )}
      </section>
      {/* <Footer /> */}
      <NewFooter />
    </div>
  );
};

export default Search;
