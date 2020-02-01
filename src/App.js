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
    container: {
        maxWidth: '960px'
    },
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
            <div className="paper">
                <BDiv bg="light" style={style}>
                    <Container style={style.container}>
                          <BHr mb="4" />
                                      <Container>
                                          <BH4 mb="3">Бронирование атомобиля</BH4>
                                          <label htmlFor="ControlsSelect1">Выберите автомобиль</label>
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
                                      <BHr mb="4" />
                                      <DateSelector/>
                                      <BHr mb="4" />
                                      <Calendar/>
                                      <BHr mb="4" />
                                      <Booking  i={2} y={6}/>
                                <BHr mb="4" />
                    </Container>
                </BDiv>
            </div>
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
