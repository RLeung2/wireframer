import * as actionCreators from '../actions/actionCreators';

const initState = {
    todoLists: [],
    id: ""
};

const todoListReducer = (state = initState, action) => {
    switch (action.type) {
        case actionCreators.GO_HOME:
            return {
                ...state,
                id: ''
            }
        case actionCreators.CREATE_TODO_LIST:
            console.log("at the reducer, the id is " + action.payload);
            return {
                ...state,
                id: action.payload  // getting the new todoList id
        };
        case actionCreators.CREATE_TODO_LIST_ERROR:
            return {
                ...state
        }
        /* IF YOU HAVE ANY TODO LIST EDITING REDUCERS ADD THEM HERE */ 
        default:
            return state;
    }
};


export default todoListReducer;