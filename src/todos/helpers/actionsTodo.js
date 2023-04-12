import axios from 'axios';

const { token } = JSON.parse(localStorage.getItem('user')) || { token: 'no-token' };
console.log(token);
const instance = axios.create({
    baseURL: 'http://localhost:8080/v2/api/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'x-token': token
    }
});

export const deleteTodo = async( todoid ) => {
    await instance.delete(`todos/${todoid}`);
}

export const postTodo = async( description ) => {

    try {
        const { data } = await instance.post('todos', {
            description
        });
        
        const { todo } = data;

        return todo;
    } catch (error) {
        console.log('Algo salio mal');
    }

}

export const getTodos = async() => {
    const { data } = await instance.get('todos');
    const { todos } = data;
    return todos;
}