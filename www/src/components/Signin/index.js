import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signIn } from '../../actions/SigninAcion';
import SigninForm from './SigninForm';

class Signin extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      user: 'undefined'
    }
  }

  submitForm = async (values) => {
    const data = values.toObject();
    await this.props.signIn(data);
    if (this.props.user._rs !== 500) {
      localStorage.setItem('__user', JSON.stringify(this.props.user));
      this.renderRedirect();
    } else {
      this.setState({
        user: this.props.user
      });
    }
  }

  renderRedirect = () => {
    global.isSignedIn = true;
    this.props.history.push({
      pathname: '/todo',
      state: { isSignedIn: true }
    })
  }

  showErrors = (message) => (
    <div>{message}</div>
  )

  render() {
    const error = (this.state.user._rs == 500) ? this.showErrors('Your username or password is incorrect') : '';

    return (
      <div style={{ width: '50%', background: '#fff', position: 'relative', 'margin': '150px 500px' }}>
        <SigninForm onSubmit={this.submitForm} />
        <div style={styles.error}>{error}</div>
      </div>
    )
  }
}

const styles = {
  error: {
    margin: '30px',
    paddingLeft: '260px'
  }
}

const mapStateToProps = state => ({
  user: state.toObject().userSignIn.user
});

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: async (data) => {
      dispatch(await signIn(data));
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signin);

