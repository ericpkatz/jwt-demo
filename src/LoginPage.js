import React, { Component } from 'react';
import { login } from './authReducer';
import { connect } from 'react-redux';

const LoginForm = ({ login, name, password, onNameChange, onPasswordChange})=> (
  <form onSubmit={ login }>
    <div className='form-group'>
      <input onChange={ onNameChange} className='form-control' value={ name} placeholder='name' name='name'/>
    </div>
    <div className='form-group'>
      <input onChange={ onPasswordChange } className='form-control' value={ password} placeholder='password'/>
    </div>
    <button className='btn btn-primary'>Login</button>
  </form>
);
class LoginPage extends Component{
  constructor(){
    super();
    this.state = { name: '', password: '' };
    this.onNameChange = this.onNameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }
  onLogin(ev){
    ev.preventDefault();
    console.log(this.state);
    this.props.login(this.state);
  }
  onNameChange(ev){
    this.setState({ name: ev.target.value });
  }
  onPasswordChange(ev){
    this.setState({ password: ev.target.value });
  }
  render(){
    return (
      <LoginForm login={ this.onLogin} name={ this.state.name } password={ this.state.password } onNameChange={ this.onNameChange } onPasswordChange={ this.onPasswordChange} />
    );
  }
}

const mapDispatchToProps = (dispatch)=>(
  {
    login: (credentials)=> dispatch(login(credentials))
  }
);

export default connect(null, mapDispatchToProps)(LoginPage);
