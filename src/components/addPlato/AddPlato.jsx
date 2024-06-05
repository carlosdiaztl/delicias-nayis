import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { actionGetrestaurantesAsync } from '../../redux/actions/restaurantesActions';
import { fileUpLoad } from '../../services/fileUpLoad';
import { actionAddPlatoAsync } from '../../redux/actions/platosActions';
import NavBar from '../navbar/NavBar';

const category = [
  {
    label: 'favoritas',
    value: 1,
  },
  {
    label: 'pizza',
    value: 2,
  },
  {
    label: 'hamburguesas',
    value: 3,
  },
  {
    label: 'picadas',
    value: 4,
  },
  {
    label: 'perros',
    value: 5,
  },
  {
    label: 'ensaladas',
    value: 6,
  },
  {
    label: 'vegetariano',
    value: 7,
  },
  {
    label: 'bebidas',
    value: 8,
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
    label: 'Propiedad de',
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
    if (!userStore.admin) {
      navigate('/home');
    } 
  }, [userStore]);
  useEffect(() => {
    dispatch(actionGetrestaurantesAsync());
  }, [dispatch]);

  const restaurantesProperty = restaurantes;
  const {
    register,
    handleSubmit,
    required,
    formState: { errors },
  } = useForm({});
  const onSubmit = async (data) => {
    const image = await fileUpLoad(data.image[0]);
    const newPlate = {
      name: data.name.trim(),
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
  return (
    <div className="p-5">
      <NavBar />
      <h1>Agregar nuevo plato</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {inputList.map((item, index) => {
          if (item.type === 'select') {
            return (
              <FloatingLabel key={index} label={item.label} className="mb-3">
                <Form.Select
                  aria-label="Default select example"
                  {...register(item.name, { required: 'Campo requerido' })}
                >
                  <option value="">Abrir menu de seleccion</option>
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
                  <option value="">Abrir menu de seleccion</option>
                  {restaurantesProperty.map((item, index) => (
                    <option
                      key={index}
                      value={item.id}
                      className="text-capitalize"
                    >
                      {item.name}
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
                {...register(item.name, {
                  required: 'Campo requerido',
                  validate: (value) =>
                    item.type === 'text' && value.trim().length === 0
                      ? 'No puede estar vacío o solo contener espacios'
                      : true,
                })}
              />
              {errors[item.name] && <p>{errors[item.name].message}</p>}
            </FloatingLabel>
          );
        })}

        <Button variant="warning" type="submit" className="mb-3">
          Agregar plato
        </Button>
      </Form>
      {/* <Footer /> */}
    </div>
  );
};

export default AddPlato;
