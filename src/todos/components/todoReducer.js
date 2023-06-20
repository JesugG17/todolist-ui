


export const todoReducer = (state = [], action = {}) => {

    switch (action.type) {
        case 'init':
            return [...action.payload]
        case 'add-todo':
            return [...state, action.payload];
        case 'delete-todo':
            return state.filter( todo => todo.todoId !== action.payload )
        case 'update-todo':
            const newTodos = state.map( todo => {
                if (todo.todoId === action.payload.todoId) {
                    return action.payload
                }
                return todo;
            })
            return newTodos;
        case 'toggle-todo':
            break;
        default:
            return state;
    }

}