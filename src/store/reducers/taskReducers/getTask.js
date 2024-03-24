import { FILTER_TASK, GET_TASK } from "../actions/task/getTask";
import { DONE_TASK } from "../actions/task/getTask";
import { EDIT_TASK } from "../actions/task/getTask";
import { ADD_TASK } from "../actions/task/getTask"
import { DELETE_TASK } from "../actions/task/getTask"

const initstate = {
    task: [],
}

const taskReducer = (state = initstate, action) => {
   
    switch (action.type) {
        case GET_TASK:
            return {
                ...state,
                task: action.payload.task
            }
        case FILTER_TASK:
            return {
                ...state,
                task: action.payload.task
            }
        case ADD_TASK:
            return {
                ...state,
                task: [...state.task, action.payload.task]
            }
        case DONE_TASK:
            return {
                ...state,
                task: [...state.task, action.payload.task]
            }
        case EDIT_TASK:
            return {
                ...state,
                task: [...state.task, action.payload.task]
            }
        case DELETE_TASK:
            return {
                ...state,
                task: [...state.task, action.payload.task]
            }

        default:
            return state;
    }
}


export default taskReducer