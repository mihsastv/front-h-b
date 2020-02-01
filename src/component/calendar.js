import React, { Component } from 'react';
import { Container, Row, Col, BDiv } from 'bootstrap-4-react';
import { getCars, getCarsCalendar } from "../redux/action";
import { connect } from "react-redux";

const days = ['ПН','ВТ','СР','ЧТ','ПТ','СБ','ВС']
const month = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Ноябрь','Декабрь'];

const boxStyle = {
    display: 'inline-block',
    backgroundColor: '#BCC0BD',
    border: '1px solid #2B2B2B',
    fontWeight: 'bold'
}

const boxStyle1 = {
    display: 'inline-block',
    backgroundColor: '#FBFFFC',
    border: '1px solid #2B2B2B',
}

function getDay(date) { // получить номер дня недели, от 0 (пн) до 6 (вс)
    let day = date.getDay();
    if (day === 0) day = 7; // сделать воскресенье (0) последним днем
    return day - 1;
}

function renderTable(mon) {
    let day = 0;
    let d = new Date(2020, mon);
    let count =[];
    for (let i=0; i<6; i++) {count.push(i)}

    return count.map (ind=>{
        return (
            <Row key={ind}>
                {days.map((item, ind) => {
                    if (d.getMonth() === mon)
                    {if (ind === getDay(d)) {d.setDate(d.getDate() + 1); day += 1}
                    else {day = 0}}
                    else {day = 0}
                    return <Col key={ind+100} style={boxStyle1}>{day === 0 ? '' : day}</Col>
                })}
            </Row>
        )
    })
}

class Calendar extends Component {
    render() {
        return (
            <Container>
                <label htmlFor="month">График на <b>{month[this.props.month]}</b></label>
                <Row>
                    {days.map((item, index)=>{
                        return(
                            <Col key={index} style={boxStyle}>{item}</Col>
                        )
                    })}
                    <BDiv w="100"></BDiv>
                </Row>
                {renderTable(this.props.month)}
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return{
        month: state.months
    }
}

function mapDispatchToProps(dispatch) {
    return{
        getCars: () => dispatch(getCars()),
        getCarsCalendar: (id) => dispatch(getCarsCalendar(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);



