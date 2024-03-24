import axios from 'axios';
export const GET_TASK = 'GET_TASK'
export const DONE_TASK = 'DONE_TASK'
export const EDIT_TASK = 'EDIT_TASK'
export const ADD_TASK = 'EDIT_TASK'
export const DELETE_TASK = 'DELETE_TASK'
export const FILTER_TASK = 'FILTER_TASK'


export const getTask = (filter) => {

    return async (dispatch) => {
        await axios.get('http://localhost:3001/todos')
        .then(function (response) {
            if (response.status === 200) {
                if(filter === 'all'){
                    dispatch({
                        type: GET_TASK,
                        payload: {
                            task: response.data
                        }
                    })
                }
                else if(filter === 'done'){
                    dispatch({
                        type: GET_TASK,
                        payload: {
                            task: response.data.filter((a) => a.completed === true)
                        }
                    })
                }else if(filter === 'undone'){
                    dispatch({
                        type: GET_TASK,
                        payload: {
                            task: response.data.filter((a) => a.completed === false)
                        }
                    })
                }
                else{
                    dispatch({
                        type: GET_TASK,
                        payload: {
                            task: response.data
                        }
                    })
                }
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}
export const addTask = (data) => {
    return async (dispatch) => {
        await axios.post(`http://localhost:3001/todos`, data)
            .then(function (response) {
            
                // handle success
                // location.reload();
                if (response.status === 200) {
                    // getTask()
                    dispatch({
                        type: ADD_TASK,
                        payload: {
                            task: [...response.data]
                        }
                    })
                }
             
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
       
      
    }
}

export const doneTask = (item) => {
    const data = {
        completed: item.completed
    }
    return async (dispatch) => {
        await axios.patch(`http://localhost:3001/todos/${item.id}`, data)
            .then(function (response) {
                if (response.status === 200) {
                    dispatch({
                        type: DONE_TASK,
                        payload: {
                            task: [...response.data]
                        }
                    })
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }
}

export const editTask = (item, title) => {
  console.log(item)
    const data = {
        title: title,
        completed: item.completed
    }
    return async (dispatch) => {
        await axios.put(`http://localhost:3001/todos/${item.id}`, data)
            .then(function (response) {
                if (response.status === 200) {
                    dispatch({
                        type: EDIT_TASK,
                        payload: {
                            task: [...response.data]
                        }
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export const deleteTask = (item) => {
    return async (dispatch) => {
        await axios.delete(`http://localhost:3001/todos/${item}`)
            .then(function (response) {
                dispatch({
                    type: DELETE_TASK,
                    payload: {
                        task: [...response.data]
                    }
                })
            })
            .catch(function (error) {
                console.log(error);
            });  
    }
}

