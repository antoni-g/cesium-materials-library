import React, { Component } from 'react';

import './css/AddDeleteDialog.css'
class AddDeleteDialog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayDialog : false
    }
  }

  handleSubmit() {
    let toUpdate = {
      name: 'New Material',
      volume: 0,
      color: '#FFFFFF',
      cost: 0,
      deliveryDate: new Date()
    } 
    this.props.onUpdate(toUpdate)
  }

  render() {
    return (
      <div className="addDeleteOuter">
        <button className="button addButton" type="button" onClick={ this.handleSubmit.bind(this) }>+ Add</button>
        <div className="spacer"></div>
        <button type="button" onClick = {this.props.onDelete}
          className={this.props.material && this.props.material.name ? 
          "button deleteButton" : "button deleteButton disabled"} >X Delete</button>
      </div>
    )
  }
}

export default AddDeleteDialog;