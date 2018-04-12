import React, { Component } from 'react';
import './App.css';
import api from './api/pubgApi';
import PlayerSelector from './PlayerSelector'
import Match from './Match'
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom'
import { PropsRoute } from 'react-router-with-props'


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
      }

    )

  }



  render() {

    return (
      <div className="App">
        <Router>
          <div>

            <PlayerSelector action={this.updatePlayer}/>
            <p>{this.state.playerName}</p>
              {this.state.matchIds.map((id) => {
                return (
                  <NavLink to={`/match/${id}`} key={id}>
                  <button key={id}>
                    {id}
                  </button>
                  </NavLink>
                )
              })}

            <PropsRoute
              path='/match/:id'
              component={Match}
              playerName={this.state.playerName}
            />


          </div>
        </Router>
      </div>
    );
  }
}

export default App;
