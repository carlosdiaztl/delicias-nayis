import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { actionGetrestaurantesAsync } from '../../redux/actions/restaurantesActions';
import { fileUpLoad } from '../../services/fileUpLoad';
import { actionAddPlatoAsync } from '../../redux/actions/platosActions';

const category = [
  {
    label: 'fast food',
    value: 1,
  },
  {
    label: 'pizza',
    value: 2,
  },
  {
    label: 'hamburguers',
    value: 3,
  },
  {
    label: 'pasta',
    value: 4,
  },
  {
    label: 'mexican',
    value: 5,
  },
  {
    label: 'salads',
    value: 6,
  },
  {
    label: 'vegetarian',
    value: 7,
  },
];

const inputList = [
  {
    label: 'Nombre',
    type: 'text',
    name: 'name',
  },
  {
    label: 'Categoría',
    type: 'select',
    name: 'category',
  },
  {
    label: 'Descripción',
    type: 'textarea',
    name: 'description',
  },
  {
    label: 'Precio',
    type: 'number',
    name: 'price',
  },
  {
    label: 'Propiedad',
    type: 'selectTwo',
    name: 'property',
  },
  {
    label: 'Imagen',
    type: 'file',
    name: 'image',
  },
];
const AddPlato = () => {
  const dispatch = useDispatch();
  const { restaurantes } = useSelector((store) => store.restaurantStore);

  const navigate = useNavigate();
  const userStore = useSelector((store) => store.userStore);
  useEffect(() => {
    if (userStore.admin) {
      console.log(true);
    } else {
      navigate('/home');
    }
  }, [userStore]);
  useEffect(() => {
    dispatch(actionGetrestaurantesAsync());
  }, [dispatch]);

  const restaurantesProperty = restaurantes.map((item, index) => item.name);
  const {
    register,
    handleSubmit,
    required,
    formState: { errors },
  } = useForm({});
  const onSubmit = async (data) => {
    const image = await fileUpLoad(data.image[0]);
    const newPlate = {
      name: data.name,
      category: data.category,
      description: data.description,
      price: Number(data.price),
      property: data.property,
      image: image,
    };
    console.log(newPlate);
    dispatch(actionAddPlatoAsync(newPlate));
    navigate('/home');
  };
  const goHome = () => {
    navigate('/home');
  };
  return (
    <div className="p-5">
      <button onClick={goHome}>home </button>
      <h1>Agregar nuevo plato</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {inputList.map((item, index) => {
          if (item.type === 'select') {
            return (
              <FloatingLabel key={index} label={item.label} className="mb-3">
                <Form.Select
                  aria-label="Default select example"
                  {...register(item.name, { required: true })}
                >
                  <option value="">Open this select menu</option>
                  {category.map((item) => (
                    <option
                      key={item.value}
                      value={item.label}
                      className="text-capitalize"
                    >
                      {item.label}
                    </option>
                  ))}
                </Form.Select>
                <p>{errors[item.name]?.message}</p>
              </FloatingLabel>
            );
          }
          if (item.type === 'selectTwo') {
            return (
              <FloatingLabel key={index} label={item.label} className="mb-3">
                <Form.Select
                  aria-label="Default select example"
                  {...register(item.name, { required: true })}
                >
                  <option value="">Open this select menu</option>
                  {restaurantesProperty.map((item, index) => (
                    <option
                      key={index}
                      value={item}
                      className="text-capitalize"
                    >
                      {item}
                    </option>
                  ))}
                </Form.Select>
                <p>{errors[item.name]?.message}</p>
              </FloatingLabel>
            );
          }
          if (item.type === 'textarea') {
            return (
              <FloatingLabel key={index} label={item.label} className="mb-3">
                <Form.Control
                  as="textarea"
                  {...register(item.name, { required: true })}
                />
                <p>{errors[item.name]?.message}</p>
              </FloatingLabel>
            );
          }

          return (
            <FloatingLabel key={index} label={item.label} className="mb-3">
              <Form.Control
                type={item.type}
                size={item.type === 'file' ? 'sm' : ''}
                {...register(item.name, { required: true })}
              />
              <p>{errors[item.name]?.message}</p>
            </FloatingLabel>
          );
        })}

        <Button variant="warning" type="submit" className="mb-3">
          Agregar plato
        </Button>
      </Form>
    </div>
  );
};

export default AddPlato;
