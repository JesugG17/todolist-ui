

export const postTodo = async( description, token ) => {
    const url = 'http://localhost:8080/v1/api/todos';
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