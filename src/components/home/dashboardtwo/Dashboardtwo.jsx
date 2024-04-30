import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionFiltrarRestaurantes } from "../../../redux/actions/restaurantesActions";
import "./style.scss";
const category = [
  "All",
  "fast food",
  "pizza",
  "hamburguers",
  "pasta",
  "mexican",
  "salads",
  "vegetarian",
];
const Dashboardtwo = () => {
  const dispatch=useDispatch()
  const { filtroRestaurantes } = useSelector((store) => store.restaurantStore);
  const {restaurantes}=  useSelector((store) => store.restaurantStore);
  const filtrarRstaurantes = (categoria) => {
   const filtrado= restaurantes.filter((item)=>item.category === categoria )
   console.log(filtrado);
   dispatch(actionFiltrarRestaurantes(filtrado))

  };
  return (
    <aside>
    {category.map((categoria,index)=>(
      <button key={index} onClick={()=>{filtrarRstaurantes(categoria)}  }>{categoria} </button>

    ))}
    
    </aside>
  );
};

export default Dashboardtwo;
