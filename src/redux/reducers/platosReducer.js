import { platosTypes } from "../types/platosTypes"

const initialState = {
    platos:[],
    platoRestaurant:[],
    filtroPlatos:[]
}

export const platosReducer=(state=initialState,action)=>{
    switch (action.type) {
        case platosTypes.PLATOS_GET:
            return {
                ...state,
                platos:action.payload.platos
            }
        case platosTypes.ADD_PLATO:
            
            return {
                ...state,
                platos:[...state.platos,
                action.payload ]
            }
        case platosTypes.PLATOSRESTAURANTE_GET:
            return {
                platos:[...state.platos ],
                platosRestaurant:[action.payload],

                
            }
            
        default:
            return state
    }
}