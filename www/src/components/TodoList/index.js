import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { createStructuredSelector } from 'reselect';
import DatePicker from "react-datepicker";
import moment from 'moment';

import { /*todoList,*/ loadTasksByDate } from '../../actions/TodoListAction';
import TodoItems from './TodoItems';
import { selectAllTodoItemsByDate } from '../../selectors/Tasks';


class ToDoList extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      payload: '',
      selectedDate: new Date(),
      filteredDate: this.formatDate(new Date()),
      date: moment(new Date()).format('YYYY/MM/DD'),
      jwt: JSON.parse(localStorage.getItem('__user')).token
    };
  }

  componentWillMount = () => {    
    this.filterTasksByDate(this.state.filteredDate, this.state.jwt);
  }

  formatDate = (date) => {
    return moment(date).format('YYYY/MM/DD');
  }

  handleSelectedDate = (date) => {    
    this.setState({
      selectedDate: date,
      filteredDate: this.formatDate(date),
      date: this.formatDate(date)
    }, () => {
      this.filterTasksByDate(this.state.filteredDate, this.state.jwt);
    })
  }

  filterTasksByDate = async (filteredDate, jwt) => {
    await this.props.loadTasksByDate(filteredDate, jwt);

    if (this.props.allListItemsByDate.message === 'TOKEN_EXPIRED') {
      this.props.history.push({
        pathname: '/signin'
      })
    }

    this.setState({
      payload: this.props.allListItemsByDate
    })
  }

  renderAction = (listItem) => {
    if (listItem._rs !== 500) {
      return (
        <TodoItems listItem={listItem.data} />        
      )
    }
    return ( // TODO: Fix
      <h1>Nothing to show</h1>
    )
  }

  showSelectedDate = (filteredDate) => {    
    let selectedDate = moment(moment(filteredDate).format('YYYY/MM/DD')).format('LL');
    
    return (
      <p>{selectedDate}</p>
    )
  }

  render() {
    const activities = (!_.isEmpty(this.state.payload)) ? this.renderAction(this.state.payload) : undefined;

    return (
      <div className='todoIndex'>
        <div>
          <h2>
            <span className='todoIndex__title'>Things Todo:</span> <br />
            <span className='todoIndex__title' style={{marginLeft: '30px'}}>*********</span>
          </h2>
        </div>
        <div className='todoIndex__selectedDate__datePicker'>
          <div className='todoIndex__selectedDate'>{this.showSelectedDate(this.state.filteredDate)}</div>
          <div className='todoIndex__datePicker'>
            <DatePicker dateFormat="yyyy/MM/dd" selected={this.state.selectedDate} onChange={this.handleSelectedDate.bind(this)} />
          </div>
        </div>
        <ul>
          {activities}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({  
  allListItemsByDate: selectAllTodoItemsByDate()
});

const mapDispatchToProps = (dispatch) => {
  return {   
    loadTasksByDate: async (taskDate, token) => {
      dispatch(await loadTasksByDate(taskDate, token))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ToDoList)
