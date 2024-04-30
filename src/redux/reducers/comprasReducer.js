import { comprasTypes } from '../types/compraTypes';

export const compras = (state = [], action) => {
  switch (action.type) {
    case comprasTypes.ADD_COMPRA:
      return [...state, action.payload];
    case comprasTypes.ALL_DELETE:
      return [];
    case comprasTypes.DELETE_COMPRA:
      return [...action.payload];
    case comprasTypes.CONFIRM_COMPRA:
      if (action.payload) {
        return [...action.payload];
      } else {
        return state;
      }

    default:
      return state;
  }
};
