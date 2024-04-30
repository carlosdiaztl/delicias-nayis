import { addDoc, collection, getDocs } from "firebase/firestore";
import { dataBase } from "../../firebase/firebaseconfig";
import { platosTypes } from "../types/platosTypes";

const collectionName = "Platos";

export const actionGetPlatosAsync=()=>{
    return async(dispatch)=>{
        const platoscCollection=collection(dataBase,collectionName)
        const querySnapshot = await getDocs(platoscCollection);
        const platos = [];
        try {
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              platos.push({
                id: doc.id,
                ...doc.data(),
              });
              //   console.log(doc.id, " => ", doc.data());
            });
          } catch (error) {
            console.error(error);
          } finally {
            dispatch(actionGetPlatosSync(platos));
          }
    }
}

const actionGetPlatosSync = (platos) => {
    return {
      type: platosTypes.PLATOS_GET ,
      payload: {
        platos: platos
      },
    };
  };

export const actionAddPlatoAsync=(plato)=>{
  return async (dispatch)=>{
    try {
      const platoscCollection=collection(dataBase,collectionName);
    const docs= await addDoc(platoscCollection,plato)
    dispatch(actionAddPlatoSync({id:docs.id,...plato}))
      
    } catch (error) {
      console.log(error);
      dispatch(actionAddPlatoSync({}))
    }
    

  }

}
const actionAddPlatoSync=(plato)=>{
return {
  type:platosTypes.ADD_PLATO ,
  payload:plato
}
}