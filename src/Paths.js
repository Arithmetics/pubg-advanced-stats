import React, { Component } from 'react';
import {ScatterChart, Scatter, XAxis, YAxis} from 'recharts';
import Slider from 'react-rangeslider'
import DragAndZoom from 'react-drag-and-zoom';
import Erangel from './erangel.jpg'
import Miramar from './miramar.png'

export default class Paths extends Component {
  constructor(props){
    super(props);
    this.state = {
      lowValue: 0,
      highValue: 2000
    }
  }


  handleChangeStart = () => {

  };

  handleLowChange = value => {
    this.setState({
      lowValue: value
    })
  };

  handleHighChange = value => {
    this.setState({
      highValue: value
    })
  };

  handleChangeComplete = () => {

  };

  handleCheckboxListChange = (values) => {
  // values is array of selected item. e.g. ['apple', 'banana']
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

    const graphStyle = {}

    const telemetry = this.props.telemetry
    const playerPositions = {}

    if(telemetry){

      const posLogEvents = telemetry.filter(
        (tel) => tel._T === "LogPlayerPosition"
      )

      posLogEvents.forEach((event) => {
        if (!playerPositions[event.character.name] ) {
          playerPositions[event.character.name] = []
        }
        if(event.elapsedTime > 10 && event.elapsedTime > this.state.lowValue && event.elapsedTime < this.state.highValue ){

          if(this.props.mapName === 'Erangel'){
            playerPositions[event.character.name].push(
              {
                name: event.character.name,
                x: ((event.character.location.x * (1/1000) * 0.892 ) - 2),
                y: ((event.character.location.y * (-1/1000) * 0.89 ) + 412) ,
                z: event.character.location.z,
                time: event.elapsedTime
              }
            )
          } else if (this.props.mapName === 'Miramar'){
            playerPositions[event.character.name].push(
              {
                name: event.character.name,
                x: ((event.character.location.x * (1/1000) * 0.892 ) - 7),
                y: ((event.character.location.y * (-1/1000) * 0.89   ) + 415) ,
                z: event.character.location.z,
                time: event.elapsedTime
              }
            )
          } else {
            playerPositions[event.character.name].push(
              {
                name: event.character.name,
                x: ((event.character.location.x * (1/1000) * 0.892 ) - 2),
                y: ((event.character.location.y * (-1/1000) * 0.89   ) + 412) ,
                z: event.character.location.z,
                time: event.elapsedTime
              }
            )
          }




        }
      })

      if(this.props.mapName === "Miramar"){
        graphStyle.backgroundImage = `url(${Miramar})`
        console.log(this.props.mapName)
        console.log('LOADEDEDED')
      } else if (this.props.mapName === "Erangel") {
        graphStyle.backgroundImage = `url(${Erangel})`
        console.log(this.props.mapName)
        console.log('LOADEDEDED')
      } else {
        graphStyle.backgroundImage = `url(${Miramar})`
        console.log(this.props.mapName)
        console.log('JUST HERE')
      }


    }

    const SmallDot = (props) =>{
      const radius = 1;
      const diameter = radius * 2;
      return (
          <svg width={diameter} height={diameter} style={{"overflow": "visible"}}>
              <circle cx={props.cx} cy={props.cy} r={radius} stroke="green" strokeWidth="0" fill={props.color} />
          </svg>
      );
    }








    // const checkboxNames = Object.keys(playerPositions).map((item, i) => (
    //   {value: playerPositions[item], label: playerPositions[item], checked: true }
    // ))

    return(
      <div>
      <div className="no-overflow">
        <DragAndZoom zoomStep={2}>
          <span>
              <div className="pos-graph" style={graphStyle}>
                  <div>
                    <ScatterChart width={800} height={800} >
                      <XAxis allowDataOverflow={true}  hide={true} domain={[10,710]} dataKey={'x'} type="number" name='x-dist' unit='pubg'/>
                      <YAxis allowDataOverflow={true} hide={true}  domain={[-300, 400]} dataKey={'y'} type="number" name='y-dist' unit='pubg'/>
                      {playerPositions && (
                        Object.keys(playerPositions).map((item, i) => (
                          <Scatter key={i} name='player1' line={{stroke: colorArray[i], strokeWidth: 1}} data={playerPositions[item]} shape={<SmallDot color={colorArray[i]} />} fill={colorArray[i]}/>
                        ))
                      )}
                    </ScatterChart>
                  </div>
              </div>
            </span>
        </DragAndZoom>
    </div>
    <div className='slider'>
      <p className='label'>Min Time</p>
      <Slider
        min={0}
        max={2000}
        value={this.state.lowValue}
        onChangeStart={this.handleChangeStart}
        onChange={this.handleLowChange}
        onChangeComplete={this.handleChangeComplete}
      />
    <p className='label'>Max Time</p>
      <Slider
        min={0}
        max={2000}
        value={this.state.highValue}
        onChangeStart={this.handleChangeStart}
        onChange={this.handleHighChange}
        onChangeComplete={this.handleChangeComplete}
      />
    </div>
  </div>
    )
  }

}
