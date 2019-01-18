import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { addTodoList } from '../../actions/TodoListAction';
import AddTodoForm from './AddTodoForm';

class AddTodo extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      addedTaskStatus: ''
    }
  }

  submitForm = (values) => {
    const token = JSON.parse(localStorage.getItem('__user')).token;
    const data = values.toObject();
    data.StartAt = moment(data.StartAt).format('HH:mm');

    if (_.isEmpty(data.Priority)) {
      data.Priority = 'high';
    }

    this.insertData(data, token);
  }

  insertData = async (task, token) => {
    await this.props.addTodoList(task, token);

    if (this.props.addedTasksState.addedTasks.message === 'TOKEN_EXPIRED') {
      this.props.history.push({
        pathname: '/signin'
      })
    } else {
      if (this.props.addedTasksState.addedTasks._rs === 200) {
        this.setState({
          addedTaskStatus: 'success'
        })
        this.formReference.reset();
      } else {
        this.setState({
          addedTaskStatus: 'fail'
        })
      }
    }

  }

  render() {
    let addedTaskStatus = '';
    let addedTaskStyle = '';

    if (this.state.addedTaskStatus !== '') {
      if (this.state.addedTaskStatus === 'success') {
        addedTaskStatus = 'The added task is done successfully';
        addedTaskStyle = 'addTodo__addedTask__success';
      } else {
        addedTaskStatus = 'The added task failed';
        addedTaskStyle = 'addTodo__addedTask__fail';
      }
    }

    return (

      <div className='addTodo-form-container'>
        <AddTodoForm onSubmit={this.submitForm} ref={form => this.formReference = form} />
        <div className='addTodo__navigation'>
          <Link to='/todo' style={{ fontSize: '18px', color: 'red' }}>TodoList</Link>
        </div>
        <div className={addedTaskStyle}>
          <span>{addedTaskStatus}</span>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  addedTasksState: state.toObject().addTodoList.toObject()/*.data*/ // TODO: Status
});

const mapDispatchToProps = (dispatch) => {
  return {
    addTodoList: async (task, token) => {
      dispatch(await addTodoList(task, token));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTodo);

