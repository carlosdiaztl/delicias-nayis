import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { auth } from '../../firebase/firebaseconfig';
import { actionAddCompra } from '../../redux/actions/comprasActions';
import { actionGetPlatosAsync } from '../../redux/actions/platosActions';
import { Card, Button } from 'react-bootstrap';
import './stylePlato.scss';
import NavBar from '../navbar/NavBar';
import NewFooter from '../home/footer/NewFooter';

const Plato = () => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { platos } = useSelector((state) => state.platosStore);
  const { name } = useParams();
  const platoSelect = platos.find((plato) => plato.name === name);
  console.log(platoSelect);

  useEffect(() => {
    dispatch(actionGetPlatosAsync());
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user?.displayName) {
        navigate(`/createaccount/${user?.uid}`);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const changeQuantity = (action) => {
    if (action === 'decrease') {
      setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : prevQuantity));
    } else if (action === 'increase') {
      setQuantity((prevQuantity) => (prevQuantity < 10 ? prevQuantity + 1 : prevQuantity));
    }
  };

  const agregarCompra = () => {
    const total = platoSelect?.price * quantity;
    const newBuy = {
      restaurante:'Delicias Nayis',
      platoName: platoSelect?.name,
      price: platoSelect?.price,
      quantity,
      total,
      confirmacion: false,
    };
    dispatch(actionAddCompra(newBuy));
    Swal.fire('Tu compra ha sido agregada con éxito', 'Que la disfrutes', 'success');
  };

  return (
    <>
      <NavBar />
      {platoSelect && (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <Card className='border-none border-0 border-radius-0'>
                <Card.Header className='border-none border-0 border-radius-0'>
                  <Card.Title>{platoSelect.name}</Card.Title>
                </Card.Header>
                <Card.Body className='border-none border-0 border-radius-0'>
                  <div className="row">
                    <div className="col-md-6">
                      <img
                        src={platoSelect.image}
                        alt={platoSelect.name}
                        className="img-fluid"
                        style={{ maxWidth: '100%', height: 'auto' }}
                      />
                    </div>
                    <div className="col-md-6">
                      <p>Precio: ${platoSelect.price}</p>
                      <p>Descripción: {platoSelect.description}</p>
                    </div>
                  </div>
                </Card.Body>
                <Card.Footer className='border-none border-0 border-radius-0'>
                  <div className="my-4 row">
                    <aside className="compraButtons col-md-6 d-flex justify-content-center gap-2 align-items-center">
                      <Button variant="outline-secondary mx-2" onClick={() => changeQuantity('decrease')}>-</Button>
                      <span className='text-center'>{quantity}</span>
                      <Button variant="outline-secondary mx-2" onClick={() => changeQuantity('increase')}>+</Button>
                    </aside>
                    <Button className='mt-4 col-md-6' variant="primary" onClick={agregarCompra}>
                      <span>Añadir </span>
                      <span>${platoSelect.price && quantity * platoSelect.price}</span>
                    </Button>
                  </div>
                </Card.Footer>
              </Card>
            </div>
          </div>
        </div>
      )}
      <NewFooter />
    </>
  );
};

export default Plato;
