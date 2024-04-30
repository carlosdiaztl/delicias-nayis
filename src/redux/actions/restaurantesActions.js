import { addDoc, collection, getDocs } from "firebase/firestore";
import { dataBase } from "../../firebase/firebaseconfig";
import { restaurantesTypes } from "../types/restaurantesTypes";


const collectionName = "restaurantes";

export const actionGetrestaurantesAsync = () => {
  return async (dispatch) => {
    const restaurantesCollection = collection(dataBase, collectionName);
    const querySnapshot = await getDocs(restaurantesCollection);
    const restaurantes = [];
    try {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        restaurantes.push({
          id: doc.id,
          ...doc.data(),
        });
        //   console.log(doc.id, " => ", doc.data());
      });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(actionGetRestaurantesSync(restaurantes));
    }
  };
};

const actionGetRestaurantesSync = (restaurantes) => {
  return {
    type: restaurantesTypes.RESTAURANTES_GET ,
    payload: {
      restaurantes: restaurantes,
    },
  };
};

export const actionAddRestaurantesAsync = (restaurant) => {
  return async (dispatch) => {
    try {
      const restaurantesCollection = collection(dataBase, collectionName);
      const docs = await addDoc(restaurantesCollection, restaurant);
      dispatch(actionAddRestaurantesync({ id: docs.id, ...restaurant}));
    } catch (error) {
      console.log(error);
      dispatch(actionAddRestaurantesync({}));
    }
  };
};

const actionAddRestaurantesync = (restaurant) => {
  return {
    type: restaurantesTypes.RESTAURANTES_ADD ,
    payload: restaurant,
  };
};
export const actionFiltrarRestaurantes=(filtroRestaurantes)=>{
  return{
    type:restaurantesTypes.RESTAURANTES_FILTRO,
    payload:filtroRestaurantes
  }
}
