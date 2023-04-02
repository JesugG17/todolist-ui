


export const todoReducer = (state = [], action = {}) => {

    switch (action.type) {
        case 'init':
            return [...action.payload]
        case 'add-todo':
            return [...state, action.payload];
        case 'delete-todo':
            return state.filter( todo => todo.todoId !== action.payload )
        case 'toggle-todo':
            break;
        default:
            return state;
    }

}