import {url} from "../config/url";
import axios from "axios";



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
                const data = {data: response.data, id: id};
                dispatch(addCarCalendar(data))
                dispatch(setMonth({month: new Date().getMonth(), year: new Date().getFullYear()}))
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

export  function deletedBooking(data) {
    return async (dispatch) => {
        await axios.delete(url+'cars/unbooking/'+data.id )
            .then(function (response) {
                const rez = response.data
                if (rez._id === data.id) {dispatch(deleteBooking(data.id));
                dispatch(setMonth({month: data.months, year: data.year}))}
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export  function postBooking(data) {
    return {
        type: 'ADD_BOOKING',
        payload: data
    }
}

export  function addBooking(period) {
    return async (dispatch) => {
        const data = {
                dateFrom: period.dateFrom,
                dateTo: period.dateTo
        }
        await axios.post(url+'cars/booking/'+period.currentCar, data)
            .then(function (response) {
                const rez = response.data
                dispatch(postBooking(rez))
                dispatch(setMonth({month: new Date(period.dateFrom).getMonth(), year: new Date(period.dateFrom).getFullYear()}))
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export  function setMonth(data) {
    return {
        type: 'SET_MONTH',
        payload: data
    }
}
