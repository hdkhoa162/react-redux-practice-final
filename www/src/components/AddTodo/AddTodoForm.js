import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import moment from 'moment';

import { renderField, maxLength50, maxLength20, required, renderDatePicker, renderTimeSelect, select } from '../../common/RenderField';


class AddTodoForm extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      setDate: new Date(),
      setHour: ''
    }
  }

  handleDateChange = (date) => {
    this.setState({
      setDate: date
    })
  }

  handleHourChange = (hour) => {
    this.setState({
      setHour: moment(hour)
    })
  }

  render() {
    const {
      handleSubmit,
      fields: { Description, Priority, StartAt, TaskDate },
    } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <div className='addTodo-task-title'>Add Todo Tasks</div>
        <div className='container'>
          <div className='addTodo__label'><label>Description:  </label> </div>
          <div className='addTodo__field'>
            <Field
              name='Description'
              component={renderField}
              placeholder='Description'
              value='Test'
              validate={[required, maxLength50]}
            />
          </div>
        </div>
        <div className='container'>
          <div className='addTodo__label'><label>Start At:  </label></div>
          <div className='addTodo__field'>
            <Field
              name='StartAt'
              component={renderTimeSelect}
              onChange={this.handleHourChange.bind(this)}
              placeholder='Start At'
              validate={[required, maxLength20]}
            />
          </div>
        </div>
        <div className='container'>
          <div className='addTodo__label'><label>Priority: </label></div>
          <div className='addTodo__field'>
            <Field name='Priority' component='select' style={{height: '37px', width: '150px'}}>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </Field>
          </div>
        </div>
        <div className='container'>
          <div className='addTodo__label'><label>Task Date: </label></div>
          <div className='addTodo__field'>
            <Field
              name='TaskDate'
              component={renderDatePicker}
              placeholder='Task Date'
              dateFormat='yyyy/MM/dd'
              onChange={this.handleDateChange.bind(this)}
              validate={[required, maxLength20]}
            />
          </div>
        </div>
        <div className='addTodo-btn-container'>
          <button type='submit' className='addTodo-submit-btn'>Submit</button>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'AddTodoForm',
  fields: ['Description', 'StartAt', 'Priority', 'TaskDate'],
  enableReinitialize: true,
})(AddTodoForm);
