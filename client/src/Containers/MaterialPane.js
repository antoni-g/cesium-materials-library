import React, { Component  } from 'react';

import TextForm from '../Components/TextForm';
import DateForm from '../Components/DateForm';
import ColorPicker from '../Components/ColorPicker';

class MaterialPane extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.material.name ? this.props.material.name : 'None selected',
      cost: this.props.material.cost ? this.props.material.cost : 0.0,
      volume: this.props.material.volume ? this.props.material.volume : 0.0,
      deliveryDate: this.props.material.deliveryDate ? this.props.material.deliveryDate : '__/__/____',
      color: this.props.material.color ? this.props.material.color : '#000000',
    }
  }

  handleChange(field, value) {
    let inNewMat = this.state.name === 'New Material' && field !== 'name';
    if (!inNewMat && 
        ((field === 'volume' || field === 'cost') && this.state[field] != value) ||
        (((field === 'color' || field === 'deliveryDate' || field === 'name') && this.state[field] !== value))) {

      let toUpdate = {} 
      Object.assign(toUpdate, this.props.material);
      toUpdate[field] = value;

      this.props.onUpdate(toUpdate)
    } 
  }

  render() {
    let noMaterial = 
    <div className="materialsPaneOuter">
      <div className="col">
        <div>
          <h3>No material selected.</h3>
        </div>
      </div>
    </div>

    let forms = 
      <div className="materialsPaneOuter">
        <div className="col">
         <div className="materialColItem">
          <p>Name</p>
          { this.state.name === 'New Material' ?
            <TextForm field={'name'} initialValue={this.state.name} handleChange={this.handleChange.bind(this)}/> :
            <h3>{this.state.name}</h3>
          }
         </div>
         <div className="materialColItem">
          <p>Volume (m3)</p>
          <TextForm field={'volume'} initialValue={this.state.volume} handleChange={this.handleChange.bind(this)}/>
         </div>
         <div className="materialColItem">
          <p>Delivery Date</p>
          <DateForm field={'deliveryDate'} initialValue={this.state.deliveryDate} handleChange={this.handleChange.bind(this)}/>
         </div>
        </div>
        <div className="col">
         <div className="materialColItem">
          <p>Color</p>
          <ColorPicker field={'color'} initialValue={this.state.color} handleChange={this.handleChange.bind(this)}/>
         </div>
         <div className="materialColItem">
          <p>Cost (USD per m3)</p>
          <TextForm field={'cost'} initialValue={this.state.cost} handleChange={this.handleChange.bind(this)}/>
         </div>
        </div>
      </div>

    return (
      this.state.name === 'None selected' ?
        noMaterial : forms
    );
  }
}

export default MaterialPane;