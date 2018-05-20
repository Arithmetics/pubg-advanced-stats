import React, { Component } from 'react';
import './App.css';
import api from './api/pubgApi';
import PlayerSelector from './PlayerSelector'
import Match from './Match'
import { BrowserRouter as Router, NavLink } from 'react-router-dom'
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
        console.log(res)
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
        <link rel="stylesheet" href="https://unpkg.com/react-rangeslider/umd/rangeslider.min.css" />
        <Router>
          <div>

            <PlayerSelector action={this.updatePlayer}/>
            <p>{this.state.playerName}</p>
            {this.state.matchIds.length > 0 ?
            <div className="scroll-list">
              <ol className="match-links">
                {this.state.matchIds.map((id) => {
                  return (
                    <li key={id}>
                      <NavLink  to={`/match/${id}`} key={id}>
                        <button key={id}>
                          {id}
                        </button>
                      </NavLink>
                    </li>
                  )
                })}
              </ol>
            </div> : null }
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
