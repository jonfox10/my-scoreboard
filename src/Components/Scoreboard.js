import React, {Component} from 'react';
import './Scoreboard.css'
import buzzer from '../sounds/Door Buzzer-SoundBible.com-1567875395.mp3'


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
    addOneT1 = () =>  {
        this.setState({ score1: this.state.score1 + 1})
    };
    addTwoT1 = () =>  {
        this.setState({
            score1: this.state.score1 + 2})
    };
    addThreeT1 = () =>  {
        this.setState({
            score1: this.state.score1 + 3})
    };
    minusOneT1 = () =>  {
        this.setState({
            score1: this.state.score1 - 1})
    };
    addOneT2 = () =>  {
        this.setState({
            score2: this.state.score2 + 1})
    };
    addTwoT2 = () =>  {
        this.setState({
            score2: this.state.score2 + 2})
    };
    addThreeT2 = () =>  {
        this.setState({
            score2: this.state.score2 + 3})
    };
    minusOneT2 = () =>  {
        this.setState({
            score2: this.state.score2 - 1})
    };

    addPeriod = () => {
        this.setState({
            period: this.state.period + 1
        })
        this.props.newQtr();
    }
    minusPeriod = () => {
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

    let clockBtns = null;
    if (this.props.clockStarted){  
        clockBtns = (
        <>
            <button id='timeBtn'>start period</button>
            <button onClick={this.props.handleClockStop} id='timeBtn'>stop</button>
            <button onClick={this.props.contCountDown} id='timeBtn'>resume</button>
        </>
        )
    } else {
        clockBtns = (
            <>
            <button onClick={this.props.startCountDown} id='timeBtn'>start period</button>
            <button onClick={this.props.handleClockStop} id='timeBtn'>stop</button>
            <button onClick={this.props.contCountDown} id='timeBtn'>resume</button>
        </>
        )
    }
    let clock = null;
    
    if (this.props.minutes < 1 & this.props.seconds === '00'){
    clock = (
        <>
        <h1 className='clock' id='scoreNum' style={{color: 'red', border: '2.5px solid red'}}>{this.props.minutes}:{this.props.seconds}</h1>
        <audio autoPlay src={buzzer} type="audio/mpeg" style={{display: 'none'}}/>
        </>

    )
    } else {
    clock = (
        <h1 className='clock'id='scoreNum' style={{color: 'rgb(255, 196, 0)', border: '2.5px solid white'}}>{this.props.minutes}:{this.props.seconds}</h1>
    )
    }
    

    

    return (
        <div className='scoreboardAndControlsContainer'>
            {/*scoreboard display*/}
            <div className='scoreboardBody' id='scoreboardBody'>
                <div className='scoreboardContainer'>
                    <div className='scoreboardTop'>
                        {clock}
                        {possessionDisplay} 
                    </div>
                    <div className='scoreBoardBottom'>
                      <div className='team1'>
                        <h3 id='team1'>{this.props.team1}</h3>
                        <h1 id='scoreNum'>{this.state.score1}</h1>
                      </div>
                      <div className='per'>
                        <p>PER:</p>
                        <h1>{this.state.period}</h1>
                      </div>
                      <div className='team2'>
                        <h3 id='team2'>{this.props.team2}</h3>
                        <h1 id='scoreNum'>{this.state.score2}</h1>
                      </div>
                    </div>
                </div>
            </div>
            {/* scoreboard control panel */}
            <div className='ctrls'>
                <div className='timeCtrl'>
                    <p>time:</p>
                    {clockBtns}
                    {/* <input type='time'></input> */}
                    <button onClick={this.props.newQtr} id='timeBtn'>reset</button>
                    <h4>p:</h4> <button className='perBtn' onClick={this.addPeriod}>+</button>
                    <button className='perBtn' onClick={this.minusPeriod}>-</button>
                </div>
                <div className='teamCtrls'>
                    <div className='team1Ctrl'>
                    <h4>{this.props.team1}</h4>
                    <button className='possBtn' onClick={this.homePossessionToggle}>possession</button>
                        <div>
                            <button id='scoreBtnAdd' onClick={this.addOneT1}>+1</button>
                            <button id='scoreBtnAdd' onClick={this.addTwoT1}>+2</button>
                            <button id='scoreBtnAdd' onClick={this.addThreeT1}>+3</button>
                            <button id='scoreBtnMinus' onClick={this.minusOneT1}>-1</button>
                        </div>
                    </div>
                    <div className='team2Ctrl'>
                    <h4>{this.props.team2}</h4>
                    <button className='possBtn' onClick={this.awayPossessionToggle}>possession</button>
                        <div>
                            <button id='scoreBtnAdd' onClick={this.addOneT2}>+1</button>
                            <button id='scoreBtnAdd' onClick={this.addTwoT2}>+2</button>
                            <button id='scoreBtnAdd' onClick={this.addThreeT2}>+3</button>
                            <button id='scoreBtnMinus' onClick={this.minusOneT2}>-1</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='closeContainer'>
                <button id='closeBtn' onClick={this.props.closeScoreboard}>close controls</button>
            </div>
        </div>
    )
  }
}

export default Scoreboard