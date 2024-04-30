import React, { useEffect } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { fileUpLoad } from '../services/fileUpLoad';
import { useDispatch, useSelector } from 'react-redux';
import { actionAddRestaurantesAsync } from '../redux/actions/restaurantesActions';
import { useNavigate } from 'react-router-dom';

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
    label: 'Precio Minimo',
    type: 'number',
    name: 'minPrice',
  },
  {
    label: 'aperture time',
    type: 'number',
    name: 'open',
  },
  {
    label: 'close time',
    type: 'number',
    name: 'close',
  },
  {
    label: 'Imagen',
    type: 'file',
    name: 'image',
  },
];

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

const schema = yup.object({
  name: yup.string().required('Debe ingresar el nombre del restaurante'),
  category: yup.string().required('Debe seleccionar una categoría'),
  description: yup
    .string()
    .required('Debe incluir una descripción del restaurante'),
  minPrice: yup.number().required('Debe incluir el precio base de sus comidas'),
  open: yup.number().required('Debe incluir la hora de apertura'),
  close: yup.number().required('Debe incluir la hora de cierre'),
});

const AddRestaurant = () => {
  const navigate = useNavigate();
  const userStore = useSelector((store) => store.userStore);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userStore.admin) {
      console.log(true);
    } else {
      navigate('/home');
    }
  }, [userStore]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    const image = await fileUpLoad(data.image[0]);
    const newRestaurant = {
      name: data.name,
      category: data.category,
      description: data.description,
      minPrice: data.minPrice,
      apertureTime: data.open,
      closeTime: data.close,
      image: image,
    };
    dispatch(actionAddRestaurantesAsync(newRestaurant));
  };
  const goHome = () => {
    navigate('/home');
  };
  return (
    <div className="p-5">
      <button onClick={goHome}>home </button>
      <h1>Agregar nuevo restaurante</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {inputList.map((item, index) => {
          if (item.type === 'select') {
            return (
              <FloatingLabel key={index} label={item.label} className="mb-3">
                <Form.Select
                  aria-label="Default select example"
                  {...register(item.name)}
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
          if (item.type === 'textarea') {
            return (
              <FloatingLabel key={index} label={item.label} className="mb-3">
                <Form.Control as="textarea" {...register(item.name)} />
                <p>{errors[item.name]?.message}</p>
              </FloatingLabel>
            );
          }

          return (
            <FloatingLabel key={index} label={item.label} className="mb-3">
              <Form.Control
                type={item.type}
                size={item.type === 'file' ? 'sm' : ''}
                {...register(item.name)}
              />
              <p>{errors[item.name]?.message}</p>
            </FloatingLabel>
          );
        })}

        <Button variant="warning" type="submit" className="mb-3">
          Agregar restaurante
        </Button>
      </Form>
    </div>
  );
};

export default AddRestaurant;
