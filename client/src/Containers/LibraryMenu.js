import React, { Component } from 'react';

import LibraryMenuItem from './LibraryMenuItem'

class LibraryMenu extends Component {

  render() {
    return (
      <div className="libraryMenuOuter">
        {
          this.props.materials && this.props.materials.map(material => (
            <LibraryMenuItem key = {material.name} material = {material} 
              onMenuClick = {this.props.onMenuClick} isActive = {material.name===this.props.activeMaterial} />
          ))
        }
      </div>
    );
  }
}

export default LibraryMenu;