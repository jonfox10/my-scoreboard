import React, { Component } from 'react'
import './UserHome.css';
import GameCreator from './GameCreator'
import axios from 'axios'
import Login from './Login'



class UserHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userGames: [],
            newGameToggle: true,
            userLoggedIn: false,
            user: {},

        }    
    }

    getMyGames = () => {
        axios
        .get(`/api/games/user`)
        .then( games => {
            this.setState({
                userGames: games.data            
            });
        })
        .catch(error => alert(error.response.request.response));
        // console.table(this.state.userGames);
    }
    
    componentDidMount(){
        // this.mounted = true;
        this.getMyGames();
        console.log(this.state);
        
    }

    toggleHandler = () => {
        this.setState({
            newGameToggle: !this.state.newGameToggle
        })
        console.log(this.state);
    }

    logout = () => {
        axios
          .get('/auth/logout')
          .then(() => {
            this.props.updateUser({});
          })
          .catch(err => console.log(err));
        this.setState({userLoggedIn: false})
    }

    updateUser = (user) => {
        this.setState({
          user,
        })
        this.setState({userLoggedIn: true});
        this.getMyGames();
        
        console.log(this.state);

    }

    handleInputChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    deleteGame = (id) => {
        axios.delete(`/api/game/${id}`)
        .then(response => {
            // console.log(games.data);
            this.setState({userGames: response.data});
        })
       
        // this.getMyGames();
    }




    componentDidUpdate(prevState) {
        if (this.state.userGames !== prevState.userGames){
            this.getMyGames();
        }
    }
    

    render(){

        // let login = null;
        // if (!this.state.userLoggedIn){
        //     login = (
        //         <>
        //          <Login userLoggedIn={this.state.userLoggedIn} 
        //          updateUser={this.updateUser}
        //          logout={this.logout}
        //          />
        //         </>
        //     )
        // } else {
        //     login = (
        //         <>
        //             {/* <button className='loginBtn' id='logoutBtn' onClick={this.logout} >LOGOUT</button> */}
        //         </>
        //     )
        // }


        return(
            <div className='user-container'>
                <div>
                    <Login userLoggedIn={this.state.userLoggedIn} 
                    updateUser={this.updateUser}
                    logout={this.logout}
                    />
                    <GameCreator 
                    userGames={this.state.userGames}
                    deleteGame={this.deleteGame}/>
                </div>
            </div>
        )
    }
}

export default UserHome;