import React, { Component } from 'react';
import {Container, Form, BDiv, BHr, BH4} from 'bootstrap-4-react';
import Calendar from "./component/calendar";
import Booking from "./component/booking";
import DateSelector from "./component/dateSelector"
import { getCars, getCarsCalendar} from "./redux/action"
import {connect} from 'react-redux'


const style = {
    textAlign: 'center',
    minWidth: '400px',
    minHeight: '100vh',
    lhCondensed: {
        lineHeight: '1.25'
    }
}

class App extends Component {
    componentDidMount() {
        this.props.getCars()
    }

    onHandleChange = (event) => {
        this.props.getCarsCalendar(event.target.value)

    }
    render() {
        return (

                <BDiv shadow p="3" bg="light" style={style}>
                    <Container style={style.container}>
                          <BHr mb="1" />
                                      <Container shadow p="3">
                                          <BH4 mb="3">Бронирование автомобиля</BH4>
                                          <label  htmlFor="ControlsSelect1">Выберите автомобиль</label>
                                          <Form.Select id="ControlsSelect1"
                                                       onChange={this.onHandleChange}
                                          >
                                              {this.props.state.cars.map((car, idn) => {
                                                    return (
                                                        <option key={idn} value={car._id}>Модель {car.model} номер {car.license}</option>
                                                    )
                                              })}
                                          </Form.Select>
                                      </Container>
                                      <BHr/>
                                      <DateSelector/>
                                      <BHr/>
                                      <Calendar/>
                                      <BHr/>
                                      <Booking/>
                                      <BHr/>
                    </Container>
                </BDiv>
        );
    }
}

function mapStateToProps(state) {
    return{
        state: state
    }
}

function mapDispatchToProps(dispatch) {
    return{
        getCars: () => dispatch(getCars()),
        getCarsCalendar: (id) => dispatch(getCarsCalendar(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
