import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';

import { renderField } from '../../common/RenderField';
// import '../../assets/SigninStyles.scss';

class SigninForm extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  render() {    
    const {
      handleSubmit
    } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <div className='signIn'>Sign in</div>
        <div className='container'>
          <div className='signIn__label'><label>Username:  </label> </div>
          <div className='signIn__field' ref={this.setTextInputRef}>
            <Field
              name='username'
              component={renderField}
              type='text'
              placeholder='username'
              classNameStyle='userName'         
            />
          </div>
        </div>
        <div className='container'>
          <div className='signIn__label'><label>Password:  </label></div>
          <div className='signIn__field'>
            <Field
              name='password'
              component={renderField}
              type='password'
              placeholder='password'
              classNameStyle='userName'
            />
          </div>
        </div>
        <div className='signIn__submit__form'>
          <button type='submit' className='signIn__submit__btn'>Sign in</button>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'SigninForm',
  fields: ['username', 'password'],
  enableReinitialize: true,
})(SigninForm);
