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
      highValue: 2000,
      winnerView: false,
      playerView: true,
      killsOnly: false,

    }
  }

  pickColor = (i, item, colorArray) => {
    if (this.state.playerView){

      if(this.props.playerName === item){
        return "#21ff00"
      } else {
        return "#ff0000"
      }
    } else {
      return colorArray[i]
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

  handlePlayerViewToggle = () => {
    const current = this.state.playerView;
    this.setState({
      playerView: !current
    })
  };



  render(){

    const colorArray =
        ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black",
        "BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse",
        "Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan",
        "DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta",
        "DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen",
        "DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink",
        "DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen",
        "Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow",
        "HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush",
        "LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow",
        "LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen",
        "LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow",
        "Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue",
        "MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen",
        "MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin",
        "NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid",
        "PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff",
        "Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue",
        "SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver",
        "SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue",
        "Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"
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
                y: ((event.character.location.y * (-1/1000) * 0.89 ) + 415) ,
                z: event.character.location.z,
                time: event.elapsedTime
              }
            )
          } else {
            playerPositions[event.character.name].push(
              {
                name: event.character.name,
                x: ((event.character.location.x * (1/1000) * 0.892 ) - 2),
                y: ((event.character.location.y * (-1/1000) * 0.89 ) + 412) ,
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
        <DragAndZoom zoomStep={5}>
          <span>
              <div className="pos-graph" style={graphStyle}>
                  <div>
                    <ScatterChart width={800} height={800} >
                      <XAxis allowDataOverflow={true}  hide={true} domain={[10,710]} dataKey={'x'} type="number" name='x-dist' unit='pubg'/>
                      <YAxis allowDataOverflow={true} hide={true}  domain={[-300, 400]} dataKey={'y'} type="number" name='y-dist' unit='pubg'/>
                      {playerPositions && (
                        Object.keys(playerPositions).map((item, i) => (
                          <Scatter key={i} name='player1' line={{stroke: this.pickColor(i, item,colorArray), strokeWidth: 1}} data={playerPositions[item]} shape={<SmallDot color={this.pickColor(i, item, colorArray)} />} fill={this.pickColor(i, item, colorArray)}/>
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
    <button onClick={this.handlePlayerViewToggle}>PlayerView</button>
  </div>
    )
  }

}
