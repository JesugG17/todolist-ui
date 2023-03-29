
export const deleteTodo = async( todoid, token ) => {
    const deleteUrl = `http://localhost:8080/v1/api/todos/${todoid}`;
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