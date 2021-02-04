import React, { Component } from 'react';

class LibraryMenuItem extends Component {

  render() {
    return (
      <div className={this.props.isActive ? "card activeCard" : "card"} onClick={() => this.props.onMenuClick(this.props.material.name)}>
        <span className="dot" style={{'background-color': this.props.material.color}}> </span>
        <div className="cardText">
          <div className="label">{this.props.material.name}</div>
          <div className="label">{this.props.material.volume + ' m3'}</div>
        </div>
      </div>
    );
  }
  
}

export default LibraryMenuItem;