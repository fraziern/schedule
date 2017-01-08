import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { login } from "../actions";

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {email: "", pass: ""};

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeEmail(event) {
    this.setState({email: event.target.value});
  }

  handleChangePass(event) {
    this.setState({pass: event.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();

    const email = this.state.email;
    const pass = this.state.pass;
    
    this.props.handleLogin(email, pass, this.props.location);
  }

  render() {

    return (
        <div>
          <p>Please log in.</p>
          <form onSubmit={this.handleSubmit}>
            <label><input value={this.state.email} onChange={this.handleChangeEmail} placeholder="email" /></label>
            <label><input value={this.state.pass} onChange={this.handleChangePass} placeholder="password" /></label>
            <br />
            <button type="submit">login</button>
            {this.props.loginError && (
              <p>Bad login information</p>
            )}
          </form>
      </div>
    );
  }
}

Login.propTypes = {
  location: PropTypes.object.isRequired,
  loggedInUser: PropTypes.object,
  loginError: PropTypes.bool,
  handleLogin: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    loggedInUser: state.loggedInUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleLogin: (username, password, cb) => {
      dispatch(login(username, password, cb));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
