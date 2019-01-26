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
            register: false

        }    
    }

    handleClear = (event) => {
        this.setState({
            email: '',
            password: ''
        })
    }

    showLogin = (e) => {
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

    showRegister = (e) => {
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

    handleSubmitNew = async (e) => {
        // console.log('before', this.state)
        e.preventDefault();
        const { email, password } = this.state;
        if (email && password) {
          let res = await axios.post('/auth/register', { email, password });
          console.log(res.data)
          if (
            res.data ===
            "Account Already Exists. Please go back and log in, or use a different email address."
          ) {
            alert(res.data);
          } 
          else {
              // console.log('THIS ONE RIGHT HERE:', res)
              const user = res.data;
              if (user) {
                // this.props.updateUser(user);
                this.props.history.push('/userhome');
              } else {
                alert("Please enter a valid email and password");
              }
          }
    
          // .catch(err => {
          //     console.log(err);
          // });
        }
        
    };

    handleSubmitLogin = async (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        if (email && password) {
            axios.post('/auth/login', { email, password })
                .then(res => {
                    const user = res.data;
                    if (user.account_id) {
                        // this.props.updateUser(user);
                        this.props.history.push('/userhome')
                    } 
                    // else {
                    //     alert('Please enter a valid email and password')
                    // }
                })
                .catch(err => {
                    this.setState({warningVisible: true});
                    console.log(err);
                });
        }
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
                                type='text'
                                name='email'
                                value={this.state.email}
                                onChange={this.handleInputChange}>
                            </input>
                    </div>
                    <div>
                    password: <input 
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
                                type='text'
                                name='email'
                                value={this.state.email}
                                onChange={this.handleInputChange}>
                            </input>
                    </div>
                    <div>
                    password: <input 
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
          <div>
              <button className='loginBtn' id='btnL' onClick={this.showLogin}>LOGIN</button>
              <button className='loginBtn' id='btnR' onClick={this.showRegister}>CREATE ACCOUNT</button>
          </div>
          <div className='login-forms'>
              {form}
          </div>
      </div>
    );
  }
}

export default Login;