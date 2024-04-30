import React from 'react';
import PropTypes from 'prop-types';

const TimestampTable = ({ timestamp }) => {
  // Convertir el timestamp a milisegundos multiplicándolo por 1000
  const milliseconds = timestamp.seconds * 1000;

  // Crear un nuevo objeto Date usando los milisegundos
  const date = new Date(milliseconds);

  // Obtener los componentes de fecha y hora
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Los meses van de 0 a 11, así que se suma 1
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // Formatear la fecha y hora según sea necesario
  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return (
    <>
      <td>{formattedDateTime}</td>
    </>
  );
};

TimestampTable.propTypes = {
  timestamp: PropTypes.shape({
    seconds: PropTypes.number.isRequired,
    nanoseconds: PropTypes.number.isRequired,
  }).isRequired,
};

export default TimestampTable;
