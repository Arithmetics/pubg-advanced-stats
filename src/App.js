import React, { Component } from 'react';
import './App.css';
import api from './api/pubgApi';
import PlayerSelector from './PlayerSelector'
import Match from './Match'

class App extends Component {
  constructor(props){
    super();

    this.state = {
      playerName: '',
      matchIds: []
    }
  }


  updatePlayer = (playerName) => {
    api.getPlayer(playerName)
      .then((res) => {
        this.setState(() => {
          return {
            playerName: res.playerName,
            matchIds: res.matchIds
          }
        })
        console.log(this.state)
      }

    )

  }



  render() {

    return (
      <div className="App">
        <h1>Welcome to PUBG Advanced Stats</h1>
        <h3>Enter Your PUBG Username and Select a Match</h3>
        <PlayerSelector action={this.updatePlayer}/>
        <p>{this.state.playerName}</p>
          {this.state.matchIds.map((id) => {
            return (
              <button key={id}>
                {id}
              </button>
            )
          })}
          <div>
            <Match
              playerName={this.props.playerName}
              match={{params: {id: 'c7feef2b-a9cf-4ece-86ed-25dab9923375'}}} />
          </div>
      </div>
    );
  }
}

export default App;
