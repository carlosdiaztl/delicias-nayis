import { restaurantesTypes } from "../types/restaurantesTypes";

const initialState = {
  restaurantes: [],
  filtroRestaurantes: [],
};

export const restaurantesReducer = (state = initialState, action) => {
  switch (action.type) {
    case restaurantesTypes.RESTAURANTES_GET:
      return {
        ...state,
        restaurantes: action.payload.restaurantes,
      };
    case restaurantesTypes.RESTAURANTES_ADD:
      return {
        ...state,
        restaurantes: [...state.restaurantes, action.payload],
      };
    case restaurantesTypes.RESTAURANTES_FILTRO:
      return {
        restaurantes: [...state.restaurantes],
        filtroRestaurantes: action.payload,
      };
    default:
      return state;
  }
};
