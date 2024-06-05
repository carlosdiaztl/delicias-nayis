import React, { Component } from 'react';
import NavBar from '../../navbar/NavBar';
import { useNavigate } from 'react-router-dom';
const ProductsAdmin = () =>  {
    const navigate = useNavigate();
   
        return (
            <>
        <NavBar />
      <div className="container mt-4">
        <h4 className="h4">Administrador panel</h4>
        <ul className="list-group">
          <li  onClick={() => navigate('/admin/ordenes')}  className="list-group-item" >Pedidos</li>
          <li onClick={() => navigate('/admin/clientes')} className="list-group-item">Clientes</li>
          <li onClick={() => navigate('/addPlato')} className="list-group-item">Nuevo Producto</li>
        </ul>
      </div>

            </>
    );
  }


export default ProductsAdmin;
