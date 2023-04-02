
export const deleteTodo = async( todoid, token ) => {
    const deleteUrl = `http://localhost:8080/v2/api/todos/${todoid}`;
    const resp = await fetch(deleteUrl, {
        method: 'DELETE',
        headers: {
            "Content-Type": 'application/json',
            "x-token": token
        },
        
    });

    const { todo } = await resp.json();
    return todo;
}

export const postTodo = async( description, token ) => {
    const url = 'http://localhost:8080/v2/api/todos';
    const resp = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            "x-token": token
        },
        body: JSON.stringify({description})
    });

    const { todo } = await resp.json();

    return todo;
}

export const getTodos = async( token ) => {
    const url = 'http://localhost:8080/v2/api/todos';
    const resp = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    });

    const { todos } = await resp.json();
    return todos;
}