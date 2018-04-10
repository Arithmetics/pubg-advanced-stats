import React, { Component } from 'react';
import api from './api/pubgApi'
import Graph from 'react-graph-vis'


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

    const graph = {
      nodes: [
          {id: 0, label: 'Node 0'},
          {id: 1, label: 'Node 1', color: "#e04141"},

          {id: 435, label: 'Node X'},
          {id: 66, label: 'Node 66'},
          {id: 4, label: 'Node 4'},
          {id: 5, label: 'Node 5'},
          {id: 6, label: 'Node 6'},
          {id: 7, label: 'Node 7'},
          {id: 3, label: 'Node 3'},
          {id: 8, label: 'Node 8'},
          {id: 9, label: 'Node 9'}
        ],
      edges: [
          {from: 0, to: 1, label: 'Kar-98'},
          {from: 0, to: 66, label: 'SCAR-L'},
          {from: 1, to: 435},
          {from: 1, to: 4},
          {from: 1, to: 5},
          {from: 1, to: 6},
          {from: 1, to: 3},
          {from: 1, to: 7},
          {from: 1, to: 8},
          {from: 1, to: 9}
        ]
    };

    const options = {
        layout: {
            hierarchical: {
              sortMethod: 'directed'
            }
        },
        edges: {
            color: "#000000"
        }
    };

    const events = {
        select: function(event) {
            const { nodes, edges } = event;
        }
    }







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
        <Graph graph={graph} options={options} events={events} style={{ height: "640px" }}/>
      </div>
    )
  }

}
