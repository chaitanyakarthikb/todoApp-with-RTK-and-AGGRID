import { addTodo, apiCallBegan, deleteTodo, updateTodo, updateTodoCellName } from "../store/actions";

export const apiMiddleWare = (store) => (next) => async action => {
    if (action.type === apiCallBegan.type) {
        let { apiURL, onSuccess, onError, onStart } = action.payload;
        if (onStart) {
            store.dispatch({ type: onStart })
        }
        try {
            const apiResponse = await fetch(apiURL);
            if (apiResponse && apiResponse.status === 200) {
                const data = await apiResponse?.json();
                store.dispatch({ type: onSuccess, payload: data })
            }
        } catch (error) {
            console.log("=======inside error ", error)
            store.dispatch({ type: onError, payload: "======SOMETHING WENT WRONG=====" })
        }
        return;
    } else if (action.type === addTodo.type) {
        let { apiURL, onSuccess, onError, onStart } = action.payload;
        if (onStart) {
            store.dispatch({ type: onStart })
        }
        try {
            const apiResponse = await fetch(apiURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: `${Math.floor(Math.random() * 10000)}`,
                    task: action.payload.data,
                    completed: false
                })
            });
            if (apiResponse && apiResponse.status === 201) {
                const data = await apiResponse?.json();
                store.dispatch({ type: onSuccess, payload: data })
            }
        } catch (error) {
            console.log("=======inside error ", error)
            store.dispatch({ type: onError, payload: "======SOMETHING WENT WRONG=====" })
        }
    } else if (action.type === updateTodo.type) {
        let { apiURL, onSuccess, onError, onStart } = action.payload;
        if (onStart) {
            store.dispatch({ type: onStart })
        }
        try {
            const apiResponse = await fetch(apiURL, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: action.payload.data.id,
                    task: action.payload.data.task,
                    completed: action.payload.data.completed
                })
            });
            if (apiResponse && apiResponse.status === 200) {
                const data = await apiResponse?.json();
                console.log("=======================data", data)
                store.dispatch({ type: onSuccess, payload: data })
            }
        } catch (error) {
            console.log("=======inside error ", error)
            store.dispatch({ type: onError, payload: "======SOMETHING WENT WRONG=====" })
        }
    } else if (action.type === deleteTodo.type) {
        let { apiURL, onSuccess, onError, onStart } = action.payload;
        if (onStart) {
            store.dispatch({ type: onStart })
        }
        try {
            const apiResponse = await fetch(apiURL, {
                method: "DELETE",
            });
            console.log("============apiResponse", apiResponse);
            if (apiResponse && apiResponse.status === 200) {
                const data = await apiResponse?.json();
                console.log("=======================data", data)
                store.dispatch({ type: onSuccess, payload: data })
            }
        } catch (error) {
            console.log("=======inside error ", error)
            store.dispatch({ type: onError, payload: "======SOMETHING WENT WRONG=====" })
        }
    } else if (action.type === updateTodoCellName.type) {
        let { apiURL, onSuccess, onError, onStart } = action.payload;
        if (onStart) {
            store.dispatch({ type: onStart })
        }
        try {
            const apiResponse = await fetch(apiURL, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: action.payload.data.id,
                    task: action.payload.data.task,
                    completed: action.payload.data.completed
                })
            });
            console.log("============apiResponse", apiResponse);
            if (apiResponse && apiResponse.status === 200) {
                const data = await apiResponse?.json();
                console.log("=======================data", data)
                store.dispatch({ type: onSuccess, payload: data })
            }
        } catch (error) {
            console.log("=======inside error ", error)
            store.dispatch({ type: onError, payload: "======SOMETHING WENT WRONG=====" })
        }
    }
    return next(action);
}