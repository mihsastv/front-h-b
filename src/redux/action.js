import {url} from "../config/url";
import axios from "axios";

///асинхронное выполнение кода

export  function addCar(data) {
    return {
        type: 'GET_CAR',
        payload: data
    }
}

export  function getCars() {
    return async (dispatch) => {
        await axios.get(url+'cars')
            .then(function (response) {
                const data = response.data
                dispatch(addCar(data))
                dispatch(getCarsCalendar(data[0]._id))
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export  function addCarCalendar(data) {
    return {
        type: 'GET_CARCALENDAR',
        payload: data
    }
}

export  function getCarsCalendar(id) {
    return async (dispatch) => {

        await axios.get(url+'cars/'+id)
            .then(function (response) {
                const data = response.data
                dispatch(addCarCalendar(data))
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export  function deleteBooking(id) {
    return {
        type: 'DEL_BOOKING',
        payload: id
    }
}

export  function setMonth(id) {
    return {
        type: 'SET_MONTH',
        payload: id
    }
}

export  function deletedBooking(id) {
    return async (dispatch) => {
        await axios.delete(url+'cars/unbooking/'+id )
            .then(function (response) {
                const data = response.data
                if (data._id === id) dispatch(deleteBooking(id))
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}
