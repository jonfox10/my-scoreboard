import React, { Component } from 'react'
// import './App.css';
import './Login.css'
import axios from 'axios'



class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            login: false,
            register: false,
            

        }    
    }


    showLogin = () => {
        if(!this.state.login){
            this.setState({
                login: !this.state.login,
                register: false
            })
        } else if (this.state.login){
            this.setState({
                login: false,
                register: false
            })
        }
    }

    showRegister = () => {
        if(!this.state.register){
            this.setState({
                register: !this.state.reister, 
                login: false
            })
        } else if(this.state.register){
            this.setState({
                login: false,
                register: false
            })
        }
    }

    handleClear = () => {
        this.setState({
            email: '',
            password: '',
        })
        this.showLogin();
        this.showRegister();
    }

    handleSubmitNew = () => {
        const { email, password } = this.state;
        axios   
            .post('/auth/register', { email, password })
            .then(user => {
                this.setState({email: '', password: ''});
                alert('Success! Please log in with your newly created credentials.');
            })
            .catch(err => {
                this.setState({email: '', password: ''});
                alert(err.response.request.response);
            })
    };

    handleSubmitLogin = () => {
        // e.preventDefault();
        const { email, password } = this.state;
        axios.post('/auth/login', { email, password })
            .then(res => {
                const user = res.data;
                this.props.updateUser(user);
                this.setState({email: '', password: '', });
                this.props.getMyGames();
            
            })
            .catch(err => console.log(err.response.request.response));
            
    }




    handleInputChange = (event) => {
        this.setState({[event.target.name]: event.target.value });
        console.log(this.state);
    }




  render() {
    let form = null;
    if(this.state.login){
        form = (
            <>
                <div className='login-form' id='login'>
                    <h3>login:</h3>
                    <div>
                    email: <input 
                                className='frmInput'
                                type='text'
                                name='email'
                                value={this.state.email}
                                onChange={this.handleInputChange}>
                            </input>
                    </div>
                    <div>
                    password: <input 
                                className='frmInput'
                                type='text'
                                name='password'
                                value={this.state.password}
                                onChange={this.handleInputChange}>
                              </input>
                    </div>
                    <div>
                        <button className='loginBtn' id='btnL2' onClick={this.handleSubmitLogin}>SUBMIT</button>
                        <button className='loginBtn' id='btnR2' onClick={this.handleClear} >CANCEL</button>
                    </div>
                </div>
            </>
        )
    } else if(this.state.register){
        form = (
            <>
                <div className='login-form' id='register'>
                    <h3>new account:</h3>
                    <div>
                    email: <input 
                                className='frmInput'
                                type='text'
                                name='email'
                                value={this.state.email}
                                onChange={this.handleInputChange}>
                            </input>
                    </div>
                    <div>
                    password: <input 
                                className='frmInput'
                                type='text'
                                name='password'
                                value={this.state.password}
                                onChange={this.handleInputChange}>
                              </input>
                    </div>
                    <div>
                        <button className='loginBtn' id='btnL2' onClick={this.handleSubmitNew}>SUBMIT</button>
                        <button className='loginBtn' id='btnR2' onClick={this.handleClear}>CANCEL</button>
                    </div>
                </div>
            </>
        )
    }



    return (
      <div className='login-container'>
          <div className='loginButtons'>
              <button className='loginBtn' id='btnL' onClick={this.showLogin}>LOGIN</button>
              <button className='loginBtn' id='btnM' onClick={this.showRegister}>CREATE ACCOUNT</button>
              <button className='loginBtn' id='btnR' onClick={this.props.logout}>LOG OUT</button>
          </div>
          <div className='login-forms'>
              {form}
          </div>
      </div>
    );
  }
}

export default Login;