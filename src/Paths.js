import React, { Component } from 'react';
import {ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';



export default class Paths extends Component {
  constructor(props){
    super(props);
    this.state = {
      low: 10,
      high: 2000
    }
  }



  render(){

    const colorArray =
      [
      '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
		  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF','#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
  		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
  		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
  		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
  		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
  		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
  		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
  		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
  		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
  		  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'
      ];


    const telemetry = this.props.telemetry
    const playerPositions = {}
    if(telemetry){
      const posLogEvents = telemetry.filter(
        (tel) => tel._T === "LogPlayerPosition"
      )
      posLogEvents.forEach((event) => {
        if (!playerPositions[event.character.name]) {
          playerPositions[event.character.name] = []
        }
        if(event.elapsedTime > 10 && event.elapsedTime > this.state.low && event.elapsedTime < this.state.high){
          playerPositions[event.character.name].push(
            {
              name: event.character.name,
              x: ((event.character.location.x * (1/1000) * 0.892 ) - 2),
              y: ((event.character.location.y * (-1/1000) * 0.96   ) + 470) ,
              z: event.character.location.z,
              time: event.elapsedTime
            }
          )
        }
      })
      console.log(playerPositions)
    }

    const SmallDot = (props)=>{
      const radius = 1;
      const diameter = radius * 2;
      return (
          <svg width={diameter} height={diameter} style={{"overflow": "visible"}}>
              <circle cx={props.cx} cy={props.cy} r={radius} stroke="green" strokeWidth="0" fill={props.color} />
          </svg>
      );
    }

    return(
      <div className="pos-graph">
        <h3>Player Paths</h3>
          <div className="shift-graph">
          <ScatterChart width={800} height={760} >

          <XAxis allowDataOverflow={true}  hide={true} domain={[10,710]} dataKey={'x'} type="number" name='x-dist' unit='pubg'/>
          <YAxis allowDataOverflow={true} hide={true}  domain={[-300, 400]} dataKey={'y'} type="number" name='y-dist' unit='pubg'/>
          {playerPositions && (

            Object.keys(playerPositions).map((item, i) => (
              <Scatter key={i} name='player1' line={{stroke: colorArray[i], strokeWidth: 1}} data={playerPositions[item]} shape={<SmallDot color={colorArray[i]} />} fill={colorArray[i]}/>
            ))
            // <Scatter key={4} name='player1' line={{stroke: colorArray[3], strokeWidth: 1}} data={playerPositions['Arithmetics']} shape={<SmallDot color={colorArray[3]} />} fill={colorArray[3]}/>

          )
          }

        </ScatterChart>
      </div>
      </div>
    )
  }

}
