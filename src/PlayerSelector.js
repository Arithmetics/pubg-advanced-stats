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
      <form onSubmit={this.handleSubmit}>
        <label>
          Username:
          <input type='text' value={this.state.value} onChange={this.handleChange}/>
        </label>
        <input type="submit" value="Get Recent Matches" />
      </form>
    )
  }

}
