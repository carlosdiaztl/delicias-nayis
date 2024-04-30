import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import Intro from '../components/home/intro/Intro';
import Carousel from '../components/home/carousel/carousel';
import AddRestaurant from '../components/AddRestaurant';
import Search from '../components/search.jsx/Search';
import Recientes from '../components/recientes/Recientes';
import Perfil from '../components/perfil/Perfil';
import Restaurantes from '../components/restaurantes/Restaurantes';
import AddPlato from '../components/addPlato/AddPlato';
import Plato from '../components/plato/Plato';
import SignIn from '../components/SignIn';
import CodeVerificaction from '../components/CodeVerificaction';
import CreateAccount from '../components/CreateAccount';
import Home from '../components/home/Home';
import PublicRouter from './PublicRouter';
import PrivateRouter from './PrivateRouter';
import { auth, dataBase } from '../firebase/firebaseconfig';
import { actionSignPhoneSync } from '../redux/actions/userActions';

const Router = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const userStore = useSelector((store) => store.userStore);
  const dispatch = useDispatch();

  useEffect(() => {const handleAuthChange = async (user) => {
    if (user?.uid) {
      setIsLoggedIn(true);
      setLoading(true);
      if (Object.entries(userStore).length === 0) {
        const { displayName, email, phoneNumber } = user;
        const accessToken = await user.getIdToken(); // Obtener el token de acceso
        await fetchUserInfo(user.uid, accessToken);
        console.log(displayName, email, phoneNumber);
      }
    } else {
      setIsLoggedIn(false);
    }
    setLoading(false);
  };
    const fetchUserInfo = async (uid, accessToken) => {
      const docRef = doc(dataBase, `usuarios/${uid}`);
      const docu = await getDoc(docRef);
      const dataFinal = docu.data();
      dispatch(
        actionSignPhoneSync({
          name: dataFinal.name,
          email: dataFinal.email,
          accessToken,
          phoneNumber: dataFinal.phoneNumber,
          avatar: dataFinal.avatar,
          uid,
          admin: dataFinal.admin,
          error: false,
          address: dataFinal.address,
        })
      );
    };

    const unsubscribe = onAuthStateChanged(auth, handleAuthChange);

    return () => unsubscribe();
  }, [dispatch, userStore]);

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRouter isAuthentication={isLoggedIn} />}>
          <Route path="/" element={<Intro />} />
          <Route path="/intro" element={<Carousel />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/verification" element={<CodeVerificaction />} />
        </Route>
        <Route element={<PrivateRouter isAuthentication={isLoggedIn} />}>
          <Route path="/createaccount/:uid" element={<CreateAccount />} />

          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/recientes" element={<Recientes />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/addRestaurant" element={<AddRestaurant />} />
          <Route path="/restaurante:name" element={<Restaurantes />} />
          <Route path="/addPlato" element={<AddPlato />} />
          <Route path="/plato:name" element={<Plato />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
