import React, {Component} from 'react';
import {ScatterChart, Scatter, XAxis, YAxis} from 'recharts';
import Slider from 'react-rangeslider'
import DragAndZoom from 'react-drag-and-zoom';
import Erangel from './erangel.jpg'
import Miramar from './miramar.png'
import PubgButton from './PubgButton'
import colorArray from './utils.js'

export default class Paths extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lowValue: 0,
      highValue: 2000,
      playerView: false,
      winnersView: false,
      teamView: true,
      killsOnly: false
    }
  }

  pickColor = (i, item, colorArray, teamId) => {
    if (this.state.playerView) {

      if (this.props.playerName === item) {
        return "#21ff00"
      } else {
        return "#ff0000"
      }

    } else if (this.state.winnersView) {
      if (this.props.winners.includes(item)) {
        return "#00f2ff"
      } else {
        return "#ff0000"
      }
    } else if (this.state.teamView) {
      return colorArray[teamId]
    } else {
      return colorArray[i]
    }
  }

  handleChangeStart = () => {};

  handleLowChange = value => {
    this.setState({lowValue: value})
  };

  handleHighChange = value => {
    this.setState({highValue: value})
  };

  handleChangeComplete = () => {};

  handleCheckboxListChange = (values) => {
    // values is array of selected item. e.g. ['apple', 'banana']
  }

  handleTeamViewToggle = () => {
    this.setState({playerView: false, winnersView: false, teamView: true})
  };

  handlePlayerViewToggle = () => {
    const current = this.state.playerView;
    this.setState({
      playerView: !current,
      winnersView: false,
      teamView: false
    })
  };

  handleWinnersViewToggle = () => {
    const current = this.state.winnersView;
    this.setState({winnersView: true, playerView: false, teamView: false})
  };

  getTeamId = (arr) => {
    if (arr.length === 0) {
      return 140;
    } else {
      return arr[0].teamId
    }
  }

  render() {
    console.log("TELEMETRY", this.props.telemetry);

    const graphStyle = {}

    const telemetry = this.props.telemetry

    const playerPositions = {}

    if (telemetry) {

      const posLogEvents = telemetry.filter((tel) => tel._T === "LogPlayerPosition")

      posLogEvents.forEach((event) => {
        if (!playerPositions[event.character.name]) {
          playerPositions[event.character.name] = []
        }
        if (event.elapsedTime > 10 && event.elapsedTime > this.state.lowValue && event.elapsedTime < this.state.highValue) {

          if (this.props.mapName === 'Erangel') {
            playerPositions[event.character.name].push({
              name: event.character.name,
              teamId: event.character.teamId,
              x: ((event.character.location.x * (1 / 1000) * 0.892) - 2),
              y: ((event.character.location.y * (-1 / 1000) * 0.89) + 412),
              z: event.character.location.z,
              time: event.elapsedTime
            })
          } else if (this.props.mapName === 'Miramar') {
            playerPositions[event.character.name].push({
              name: event.character.name,
              teamId: event.character.teamId,
              x: ((event.character.location.x * (1 / 1000) * 0.892) - 7),
              y: ((event.character.location.y * (-1 / 1000) * 0.89) + 415),
              z: event.character.location.z,
              time: event.elapsedTime
            })
          } else {
            playerPositions[event.character.name].push({
              name: event.character.name,
              teamId: event.character.teamId,
              x: ((event.character.location.x * (1 / 1000) * 0.892) - 2),
              y: ((event.character.location.y * (-1 / 1000) * 0.89) + 412),
              z: event.character.location.z,
              time: event.elapsedTime
            })
          }

        }
      })

      if (this.props.mapName === "Miramar") {
        graphStyle.backgroundImage = `url(${Miramar})`
        console.log(this.props.mapName)
      } else if (this.props.mapName === "Erangel") {
        graphStyle.backgroundImage = `url(${Erangel})`
        console.log(this.props.mapName)
      } else {
        graphStyle.backgroundImage = `url(${Miramar})`
        console.log(this.props.mapName)
      }

    }

    const SmallDot = (props) => {
      const radius = 1;
      const diameter = radius * 2;
      return (<svg width={diameter} height={diameter} style={{
          "overflow" : "visible"
        }}>
        <circle cx={props.cx} cy={props.cy} r={radius} stroke="green" strokeWidth="0" fill={props.color}/>
      </svg>);
    }

    return (<div>
      <div className="no-overflow">
        <DragAndZoom zoomStep={5}>
          <span>
            <div className="pos-graph" style={graphStyle}>
              <div>
                <ScatterChart width={800} height={800}>
                  <XAxis allowDataOverflow={true} hide={true} domain={[10, 710]} dataKey={'x'} type="number" name='x-dist' unit='pubg'/>
                  <YAxis allowDataOverflow={true} hide={true} domain={[-300, 400]} dataKey={'y'} type="number" name='y-dist' unit='pubg'/> {
                    playerPositions && (Object.keys(playerPositions).map((item, i) => (<Scatter key={i} name='player1' line={{
                        stroke: this.pickColor(i, item, colorArray, this.getTeamId(playerPositions[item])),
                        strokeWidth: 1
                      }} data={playerPositions[item]} shape={<SmallDot
                      color = {
                        this.pickColor(i, item, colorArray, this.getTeamId(playerPositions[item]))
                      }
                      />} fill={this.pickColor(i, item, colorArray, this.getTeamId(playerPositions[item]))}/>)))
                  }
                </ScatterChart>
              </div>

            </div>
          </span>
        </DragAndZoom>
        <div className="controls">
          <div className='slider'>
            <p className='label'>Min Time</p>
            <Slider min={0} max={2000} value={this.state.lowValue} onChangeStart={this.handleChangeStart} onChange={this.handleLowChange} onChangeComplete={this.handleChangeComplete}/>

            <p className='label'>Max Time</p>
            <Slider min={0} max={2000} value={this.state.highValue} onChangeStart={this.handleChangeStart} onChange={this.handleHighChange} onChangeComplete={this.handleChangeComplete}/>
          </div>
          <div className="button-zone">
            <PubgButton toggle={this.handleTeamViewToggle} toggleState={this.state.teamView} text={"Team Paths"}  />
            <PubgButton toggle={this.handlePlayerViewToggle} toggleState={this.state.playerView} text={"Player Paths"}  />
            <PubgButton toggle={this.handleWinnersViewToggle} toggleState={this.state.winnersView} text={"Winners' Path "}  />
          </div>
        </div>
      </div>


    </div>)
  }

}
