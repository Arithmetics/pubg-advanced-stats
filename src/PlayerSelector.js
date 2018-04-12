import React, { Component } from 'react';


export default class PlayerSelector extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.state.value)
    this.props.action(this.state.value)
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  render(){

    return(
      <div>
        <h1>Welcome to PUBG Advanced Stats</h1>
        <h3>Enter Your PUBG Username and Select a Match</h3>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input type='text' value={this.state.value} onChange={this.handleChange}/>
          </label>
          <input type="submit" value="Get Recent Matches" />
        </form>
      </div>
    )
  }

}
