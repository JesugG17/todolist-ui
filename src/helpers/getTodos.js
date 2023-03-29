
export const getTodos = async( token ) => {
    const url = 'http://localhost:8080/v1/api/todos';
    const resp = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    });

    const { todos } = await resp.json();
    console.log( todos );
    return todos;
}