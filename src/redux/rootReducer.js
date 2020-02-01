

let initialState = {
    cars: [],
    carsCalendar: [],
    months: new Date().getMonth(),
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
            action.payload.forEach(e => {
                carCalendar.push(e)
            })
            return {
                ...state, carsCalendar: carCalendar.slice()
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
                if (new Date(e.dateFrom).getMonth() === action.payload) {
                    for (let i = new Date(e.dateFrom).getDate(); i<new Date(e.dateTo).getDate()+1; i++)
                    {dateC.push(i);}
                }
            })
            return {
                ...state, months: action.payload, dates: dateC
            }
        default: return state
    }
}
