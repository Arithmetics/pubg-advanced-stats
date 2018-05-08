import React, { Component } from 'react';
import api from './api/pubgApi'
import KillTree from './KillTree'
import Paths from './Paths'
import { DotLoader } from 'react-spinners';


export default class Match extends Component {
  constructor(props){
    super(props);
    this.state = {
      match: null,
      telemetry: null,
      loading: true
    }
  }



  updateMatch = (matchId) => {
    this.setState(() => {
      return {
        loading: true
      }
    })
    api.getMatch(matchId)
      .then((res) => {
        this.setState(() => {
          return {
            match: res.match
          }
        })
        return res.match
      }
    ).then((match) => this.updateTelemetry(match.telemetry_link)).then(() => this.setState(() => {
      return {
        loading: false
      }
    }))
  }

  updateTelemetry = (link) => {
    api.getTelemetry(link)
      .then((res) => {
        this.setState(() => {
          return {
            telemetry: res.telemetry
          }
        })
      }
    )
  }

  componentDidMount = () => {
    this.updateMatch(this.props.match.params.id)
  }

  componentWillReceiveProps = () => {
    this.updateMatch(this.props.match.params.id)
  }


  render(){
    const match = this.state.match;
    console.log(match);
    let teamRoster;
    if(this.state.match && this.state.match.rosters && this.props.playerName){
      const rosters = this.state.match.rosters
      teamRoster = (
        rosters.filter((roster) => (
          roster.names.includes(this.props.playerName)
        ))
      )[0].names
    }

    return(
      <div>
        <h3 className="subheader">Match Info:</h3>
        <DotLoader
          color={'#FECC4E'}
          loading={this.state.loading}
        />
      {match !== null && this.state.loading !== true &&
          <ul className="match-data">
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
        {match !== null && this.state.loading !== true &&
          <div>
            <Paths
              telemetry={this.state.telemetry}
              nodes={(this.state.match) ? this.state.match.names : null}
              mapName={(this.state.match) ? this.state.match.map : null}
              playerName={this.props.playerName}
              winners={(this.state.match) ? this.state.match.winners.names : null}
              teamRoster={this.state.match && this.state.match.rosters && this.props.playerName ? teamRoster : null}
              winners={(this.state.match) ? this.state.match.winners.names : null}
            />

            <KillTree
              telemetry={this.state.telemetry}
              nodes={(this.state.match) ? this.state.match.names : null}
              playerName={this.props.playerName}
              winners={(this.state.match) ? this.state.match.winners.names : null}
              teamRoster={this.state.match && this.state.match.rosters && this.props.playerName ? teamRoster : null}
            />

        </div>
        }
      </div>
    )
  }

}
