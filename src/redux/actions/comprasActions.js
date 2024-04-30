import { comprasTypes } from "../types/compraTypes"
import { addDoc, collection } from 'firebase/firestore';
import { dataBase } from "../../firebase/firebaseconfig";
export const actionAddCompra=(compra)=>{
    return{
        type:comprasTypes.ADD_COMPRA,
        payload:compra
    }
}
export const actionDeleteCompra=(newList)=>{
    return{
        type:comprasTypes.DELETE_COMPRA,
        payload:newList
    }
}
export const actionCambioConfirm=(nuevaLista)=>{
    return{
       type:comprasTypes.CONFIRM_COMPRA,
       payload:nuevaLista
    }
}
export const actionBorrarTodo=()=>{
    return{
        type:comprasTypes.ALL_DELETE
    }
}


export const agregarComprasAsync = (compras) => {
  return async (dispatch) => {
    try {
      const comprasCollection = collection(dataBase, 'compras');
      const batch = [];
      compras.forEach((compra) => {
        const docRef = addDoc(comprasCollection, compra);
        batch.push(docRef);
      });
      await Promise.all(batch);
      dispatch({ type: comprasTypes.CONFIRM_COMPRA, });
    } catch (error) {
      console.error('Error al agregar las compras:', error);
      dispatch({ type: comprasTypes.ERROR_COMPRA, payload: error });
    }
  };
};
