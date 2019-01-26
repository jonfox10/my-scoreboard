import React, { Component } from 'react';
// import './App.css';
import './Menu.css'
import {Link} from 'react-router-dom'




class Menu extends Component {
  constructor(){
    super()
    this.state = {
      open: true,
    }
  }

  handleClick = () => {
    this.setState({
        open: !this.state.open
    });
  }



//   handleClick = (x) => {
//     x.classList.toggle("change");
//   }

  render() {
    let hamMenu = null;
    if (!this.state.open) {
        hamMenu = (
            <div>
                <div className="hamburgerContainer" onClick={this.handleClick}>
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>
                <div className='menu-list-close'>
                    <ul>
                        <li><Link id='hamLink'to='/login'>login/Create account</Link></li>
                        <li><Link id='hamLink'to='/gamecreator'>quick start</Link></li>
                        <li><Link id='hamLink'to='/'>home</Link></li>
                    </ul>
                </div>
             </div>
        ) 
    } else {
        hamMenu = (
            <div>
                <div className="change" onClick={this.handleClick}>
                    <div className="bar1" id='bar1'></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>
                <div className='menu-list-open'>
                    <ul>
                        <li><Link id='hamLink'to='/gamecreator' onClick={this.handleClick}>quick start</Link></li>
                        <li><Link id='hamLink'to='/userhome' onClick={this.handleClick} >my games</Link></li>
                        <li><Link id='hamLink'to='/'onClick={this.handleClick} >home</Link></li>
                        <li><Link id='hamLink'to='/login' onClick={this.handleClick}>login</Link></li>
                    </ul>
                </div>
            </div>
        ) 
    }

    return (
      <div>

        <div className='menu-container'>
            <div className="menu-header">
                <h2>MY SCOREBOARD APP</h2>
                
                {hamMenu} 
            </div>
          
        </div>
        
      </div>  
        



    );
  }
}

export default Menu;