

let initialState = {
    cars: [],
    carsCalendar: [],
    currentCar: '',
    months: new Date().getMonth(),
    year: new Date().getFullYear(),
    dates: []
}


export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'DEL_BOOKING':
            let Calendar = state.carsCalendar.slice()
            Calendar = Calendar.filter(e => e._id !== action.payload)
            return {
                ...state, carsCalendar: Calendar,
            }

        case 'GET_CARCALENDAR':
            let carCalendar = []
            action.payload.data.forEach(e => {
                carCalendar.push(e)
            })
            return {
                ...state,
                carsCalendar: carCalendar,
                currentCar: action.payload.id
            }

        case 'GET_CAR':
            let data = []
            action.payload.forEach(e => {
                data.push(e)
            })
            return {
                ...state, cars: data.slice()
            }

        case 'SET_MONTH':
            let dateC=[]
            let cCalendar = state.carsCalendar.slice()
            cCalendar.forEach(e => {
                if (new Date(e.dateFrom).getMonth() === action.payload.month &&
                    new Date(e.dateFrom).getFullYear() === action.payload.year) {
                    for (let i = new Date(e.dateFrom).getDate(); i<new Date(e.dateTo).getDate()+1; i++)
                    {dateC.push(i);}
                }
            })
            return {
                ...state, months: action.payload.month, dates: dateC, year: action.payload.year
            }

        case 'ADD_BOOKING':
            let calendarAdd = state.carsCalendar.slice()
            calendarAdd.push(action.payload[0])
            return {
                ...state, carsCalendar: calendarAdd
            }
        default: return state
    }
}
