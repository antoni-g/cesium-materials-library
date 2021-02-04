import React, { Component } from 'react';
import axios from 'axios';

import LibraryMenu from './LibraryMenu';
import MaterialPane from './MaterialPane';
import AddDeleteDialog from './AddDeleteDialog';

import './css/Dashboard.css'

axios.defaults.headers.common = {
  "Content-Type": "application/json"
}

axios.interceptors.request.use(
  config => {
    config.headers.authorization = `Bearer test`;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      materials: undefined,
      active: undefined,
      totalCost: '$0.00'
    };
  }

  async componentDidMount() {
    this.revalidateComponents();
  }

  revalidateComponents = async (newActive) => {
    const materials = (await axios.get('http://localhost:3001/material/all')).data;
    this.setState({
      materials,
      activeMaterial : newActive,
      totalCost : this.calculateTotalCost(materials)
    });
  }

  deleteMat = async (name, newActive) => {
    let delReq = {'name' : name}
    await axios.delete('http://localhost:3001/material/', {data: delReq})
    .then((response) => {
        this.revalidateComponents(newActive);
    }, (e) => {

    })
  }

  onDelete = async () => {
    if (this.state.activeMaterial) {
      this.deleteMat(this.state.activeMaterial, undefined);
    }
  }

  onUpdate = async (obj) => {
    if (!(obj.name === 'New Material' && this.state.activeMaterial === 'New Material')) {
      obj['volume'] = Number.parseFloat(obj['volume'])
      obj['cost'] = Number.parseFloat(obj['cost'])
      let req = {material : obj} 
      await axios.post('http://localhost:3001/material/', req)
      .then((response) => {
        if (this.state.activeMaterial === 'New Material') {
          this.deleteMat('New Material', response.data.result.name);
        } else {
          this.revalidateComponents(response.data.result.name);
        }
      }, (e) => {
        console.log(e);
      });
    }
  }

  onMenuClick = (name) => {
    this.setState({
      activeMaterial: name
    })
  }

  calculateTotalCost(materials) {
    return "$0.00"
  }

  render() {
    let currentMaterial = (this.state.materials && this.state.activeMaterial) ? 
        this.state.materials.find((m) => m.name === this.state.activeMaterial) : {}

    return (
      <div className="dashboard">
        <h1>Materials</h1>
        <AddDeleteDialog material = {currentMaterial} onUpdate = {this.onUpdate} onDelete = {this.onDelete}/>
        <div className="innerDashboard">
          <LibraryMenu materials = {this.state.materials} activeMaterial = {this.state.activeMaterial} onMenuClick = {this.onMenuClick}/>
          <div className="innerDashboardSpacer"></div>
          <MaterialPane material = {currentMaterial} key = {this.state.activeMaterial} onUpdate = {this.onUpdate}/>
        </div>
        <h3> Total Cost: { this.state.totalCost }</h3>
      </div>
    );
  }
}

export default Dashboard;