import React, {Component} from 'react';
import './Scoreboard.css'



class Scoreboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            score1: 0,
            score2: 0,
            homePossession: true,
            awayPossession: false,
            time: this.props.time,
            period: 1
        }      
        
    }
    addOneT1 = (event) =>  {
        this.setState({ score1: this.state.score1 + 1})
    };
    addTwoT1 = (event) =>  {
        this.setState({
            score1: this.state.score1 + 2})
    };
    addThreeT1 = (event) =>  {
        this.setState({
            score1: this.state.score1 + 3})
    };
    minusOneT1 = (event) =>  {
        this.setState({
            score1: this.state.score1 - 1})
    };
    addOneT2 = (event, team) =>  {
        this.setState({
            score2: this.state.score2 + 1})
    };
    addTwoT2 = (event, team) =>  {
        this.setState({
            score2: this.state.score2 + 2})
    };
    addThreeT2 = (event, team) =>  {
        this.setState({
            score2: this.state.score2 + 3})
    };
    minusOneT2 = (event) =>  {
        this.setState({
            score2: this.state.score2 - 1})
    };

    addPeriod = (event) => {
        this.setState({
            period: this.state.period + 1
        })
        return this.props.newQtr;
    }
    minusPeriod = (event) => {
        this.setState({
            period: this.state.period - 1
        })
    }

    homePossessionToggle = () => {
        this.setState({
            homePossession: true,
            awayPossession: false
        })
    }
    awayPossessionToggle = () => {
        this.setState({
            homePossession: false,
            awayPossession: true
        })
    }


  render(){

    let possessionDisplay = null;
    if (this.state.homePossession) {
        possessionDisplay = (
        <>
            <h3 className='poss1' id='possYes'>POSS</h3>
            <h3 className='poss2' id='possNo'>POSS</h3>
        </>
        )
    } else if(!this.state.homePossession) {
        possessionDisplay = (
        <>
            <h3 className='poss1' id='possNo'>POSS</h3>
            <h3 className='poss2' id='possYes'>POSS</h3>
        </>
        )
    }

    let ctrlBtns = null;
    if (this.props.clockStarted){  
        ctrlBtns = (
        <>
            <button id='timeBtn'>start period</button>
            <button onClick={this.props.handleClockStop} id='timeBtn'>stop</button>
            <button onClick={this.props.contCountDown} id='timeBtn'>resume</button>
        </>
        )
    } else {
        ctrlBtns = (
            <>
            <button onClick={this.props.startCountDown} id='timeBtn'>start period</button>
            <button onClick={this.props.handleClockStop} id='timeBtn'>stop</button>
            <button onClick={this.props.contCountDown} id='timeBtn'>resume</button>
        </>
        )
    }
    let clock = null;
    if (this.props.visiable & this.props.minutes > 9){
        clock = (
            <h1 className='clock'>{this.props.minutes}:{this.props.seconds}</h1>
        )
    } else {
        clock = (
            <h1 className='clock'>0{this.props.minutes}:{this.props.seconds}</h1>
        )
    }

    

    return (
        <div>
            {/*scoreboard display*/}
            <div className='scoreboardBody'>
                <div className='scoreboardContainer'>
                        {clock}
                        {possessionDisplay} 
                      <div className='team1'>
                        <h3 id='team1'>{this.props.team1}</h3>
                        <h1>{this.state.score1}</h1>
                      </div>
                      <div className='per'>
                        <p>PER:</p>
                        <h1>{this.state.period}</h1>
                      </div>
                      <div className='team2'>
                        <h3 id='team2'>{this.props.team2}</h3>
                        <h1>{this.state.score2}</h1>
                      </div>
                </div>
            </div>
            {/* scoreboard control panel */}
            <div className='ctrls'>
                <div className='timeCtrl'>
                    <p>time:</p>
                    {ctrlBtns}
                    {/* <input type='time'></input> */}
                    <button onClick={this.props.newQtr} id='timeBtn'>reset</button>
                    p: <button className='perBtn' onClick={this.addPeriod}>+</button>
                    <button className='perBtn' onClick={this.minusPeriod}>-</button>
                </div>
                <div className='team1Ctrl'>
                {this.props.team1}
                <button className='possBtn' onClick={this.homePossessionToggle}>possession</button>
                    <div>
                        <button id='scoreBtnAdd' onClick={this.addOneT1}>+1</button>
                        <button id='scoreBtnAdd' onClick={this.addTwoT1}>+2</button>
                        <button id='scoreBtnAdd' onClick={this.addThreeT1}>+3</button>
                        <button id='scoreBtnMinus' onClick={this.minusOneT1}>-1</button>
                    </div>
                </div>
                <div className='team2Ctrl'>
                {this.props.team2}
                <button className='possBtn' onClick={this.awayPossessionToggle}>possession</button>
                    <div>
                        <button id='scoreBtnAdd' onClick={this.addOneT2}>+1</button>
                        <button id='scoreBtnAdd' onClick={this.addTwoT2}>+2</button>
                        <button id='scoreBtnAdd' onClick={this.addThreeT2}>+3</button>
                        <button id='scoreBtnMinus' onClick={this.minusOneT2}>-1</button>
                    </div>
                </div>
            </div>
                <button id='timeBtn' onClick={this.props.closeScoreboard}>close scoreboard</button>
                
        </div>
    )
  }
}

export default Scoreboard