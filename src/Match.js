import React, { Component } from 'react';
import api from './api/pubgApi'


export default class Match extends Component {
  constructor(props){
    super(props);
    this.state = {
      match: null,
      telemetry: null
    }
  }



  updateMatch = (matchId) => {
    api.getMatch(matchId)
      .then((res) => {
        this.setState(() => {
          return {
            match: res.match
          }
        })
        return res.match
      }
    ).then((match) => this.updateTelemetry(match.telemetry_link))
  }

  updateTelemetry = (link) => {
    api.getTelemetry(link)
      .then((res) => {
        this.setState(() => {
          return {
            telemetry: res
          }
        })
      }
    )
  }

  componentDidMount = () => {
    this.updateMatch(this.props.match.params.id)
  }


  render(){
    const match = this.state.match;


    return(
      <div>
        <h3>Match Info:</h3>
        {match != null &&
          <ul>
            <li>Date/Time: {match.created}</li>
            <li>Map: {match.map}</li>
            <li>Mode: {match.mode.charAt(0).toUpperCase() + match.mode.substr(1)}</li>
            <li>Players: {match.player_count}</li>
            <li>Won?: {
                match.winners.names
                .filter(name => {
                  return name === this.props.playerName
                }).length > 0 ? 'You Won!' : 'You Lost!'
              }
              </li>
          </ul>
        }
      </div>
    )
  }

}
