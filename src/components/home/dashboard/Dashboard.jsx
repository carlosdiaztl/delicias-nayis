import React, { useEffect, useState } from "react";
import Carousel from 'react-bootstrap/Carousel';
import promo2 from "../../../assets/carousel4.png";
import promo4 from "../../../assets/carousel5.png";
import promo5 from "../../../assets/restaurante1.jpg";
import "./style.scss";

const Dashboard = () => {
  const [carrusel, setCarrusel] = useState(0);
  const [alturaImagen, setAlturaImagen] = useState(500);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1200) {
        setAlturaImagen(400);
      } else if (width < 1200 && width >= 750) {
        setAlturaImagen(350);
      } else {
        setAlturaImagen(240);
      }
    };

    // Llamada inicial para establecer la altura de la imagen
    handleResize();

    // Escuchar cambios de tamaño de la ventana
    window.addEventListener("resize", handleResize);

    // Limpiar el listener al desmontar el componente
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCarrusel((carrusel + 1) % images.length); 
    }, 3400);

    return () => clearTimeout(timer);
  }, [carrusel]);

  const images = [promo2, promo4, promo5];

  return (
    <Carousel
      interval={3000} // Cambiar imagen cada 2 segundos
      activeIndex={carrusel}
      onSelect={(selectedIndex) => setCarrusel(selectedIndex)}
      className="dashboard-carousel"
      style={{
        height: `${alturaImagen}px`, // Altura dinámica
      }}
    >
      {images.map((image, index) => (
        <Carousel.Item key={index}>
          <div className="d-flex justify-content-center align-items-center carousel-image-container" style={{ height: '100%' }}>
            <img src={image} className="d-block w-100 object-fit-cover" alt={`Promo ${index + 1}`} style={{  height: `${alturaImagen}px`, objectFit: 'cover' }} />
          </div>
          <Carousel.Caption>
            {/* <h3>Promo {index + 1}</h3>
            <p>Descripción de la promoción {index + 1}</p> */}
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Dashboard;
