import React, { Component } from 'react';
import Graph from 'react-graph-vis'



export default class KillTree extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }



  render(){

    const graph = {
      nodes: [
        ],
      edges: [
          {from: 0, to: 1, label: 'Kar-98'},

        ]
    };

    if(this.props.nodes){
      const playerNodes = this.props.nodes.concat(["BlueZone"])
      const playerName = this.props.playerName
      const winners = this.props.winners
      const teamRoster = this.props.teamRoster

      playerNodes.forEach((player) => {
        const newNode = { id: player, label: player }
        if(player === playerName){
          newNode.color = '#00d8ff'
        } else if (winners.includes(player)) {
          newNode.color = '#ff0008'
        } else if (teamRoster && teamRoster.includes(player)) {
          newNode.color = '#4cff00'
        }  else {
          newNode.color = '#c4c4c4'
        }
        graph.nodes.push(newNode)
      })
    }


    const telemetry = this.props.telemetry

    if(telemetry){

      const killEvents = telemetry.filter(
        (tel) => tel._T === "LogPlayerKill"
      )
      console.log(killEvents)

      killEvents.forEach((kill) => {
        if(kill.damageTypeCategory === "Damage_BlueZone" && kill.killer.name === ""){
          const newEdge = {from: "BlueZone", to: kill.victim.name}
          graph.edges.push(newEdge)
        } else if(kill.killer.name === "") {
          const newEdge = {from: kill.victim.name, to: kill.victim.name}
          graph.edges.push(newEdge)
        } else {
          const newEdge = {from: kill.killer.name, to: kill.victim.name}
          graph.edges.push(newEdge)
        }

        console.log(kill.killer.name, kill.victim.name)
      })
    }


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
        {telemetry &&
        <Graph graph={graph} options={options} events={events} style={{ height: "640px" }}/> }
      </div>
    )
  }

}
