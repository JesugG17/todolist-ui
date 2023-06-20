import { api } from "../../api/api";


export const getTodos = async() => {
    const { data } = await api.get('/todos');
    const { todos } = data;
    return todos;
}

export const postTodo = async( description ) => {
    
    try {
        const { data } = await api.post('/todos', {
            description
        });
        
        const { todo } = data;
        
        return todo;
    } catch (error) {
        console.log('Algo salio mal');
    }    
}

export const updateTodo = async( todoId, newDescription) => {
    const { data } = await api.put(`/todos/${todoId}`, {
        description: newDescription
    });

    console.log(data);
}

export const deleteTodo = async( todoid ) => {
    await api.delete(`/todos/${todoid}`);
}
