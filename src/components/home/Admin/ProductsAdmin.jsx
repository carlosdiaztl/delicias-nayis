import React, { Component } from 'react';
import NavBar from '../../navbar/NavBar';
import { useNavigate } from 'react-router-dom';
const AdminPanel = () =>  {
    const navigate = useNavigate();
   
        return (
            <>
        <NavBar />
      <div className="container mt-4 ">
        <h4 className="h4 text-center">Panel </h4>
        <ul className="d-flex flex-column gap-2 justify-content-center align-items-center list-group">
          <li  onClick={() => navigate('/admin/ordenes')}  className="col-md-4 list-group-item list-group-item-dark" >Pedidos</li>
          <li onClick={() => navigate('/admin/clientes')} className="col-md-4 list-group-item list-group-item-dark">Clientes</li>
          <li onClick={() => navigate('/admin/productos')} className="col-md-4 list-group-item list-group-item-dark">Eliminar Productos</li>
          <li onClick={() => navigate('/addPlato')} className="col-md-4 list-group-item list-group-item-dark">Nuevo Producto</li>
        </ul>
      </div>

            </>
    );
  }


export default AdminPanel;
