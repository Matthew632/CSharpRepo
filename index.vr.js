import React from 'react';
import {
  AppRegistry,
  View,
} from 'react-vr';
import Canvas from './components/Canvas';

import axios from 'axios'
import Pointers from './components/Pointers'








export default class GDVR_REACTVR_SITEPOINT_GALLERY extends React.Component {

  constructor() {
    super();

    this.state = {
      panoImage: {uri:''},
      restaurantId: '',
      pointer_location: null
      // tables: [
      //   {tableId: 1, coords: [-6, -1, -2]}, 
      //   {tableId: 2, coords: [-7, 0, 2]}, 
      //   {tableId: 3, coords: [-3, 0, 3]},
      //   {tableId: 4, coords: [-4, 1.5, 8]},
      //   {tableId: 5, coords: [-7.5, 2.25, 8]}
      // ]
    };
  }

  render() {

  
    return (
      <View>
        <Canvas panoImage={this.state.panoImage} />
       
        
        {this.state.pointer_location &&  <Pointers pointerData={this.state.pointer_location} restaurantId={this.state.restaurantId} />}
        {/* <Pointers pointerData={this.state.pointer_location} restaurantId={this.state.restaurantId}/> */}

      </View>
    );
  }
  
  componentDidMount(){
    let locs = [];
    axios.get('https://finalproject20190421104640.azurewebsites.net/api/communication')
    .then(response => {
      this.setState({ restaurantId: response.data.patched_id })
    }).then(() =>{
      this.setUrlToState()
    }).then(() => {
      axios.get(`https://finalproject20190421104640.azurewebsites.net/api/reservations/${this.state.restaurantId}/tables`).then(res => {console.log('this is locs', res);res.data.locations.forEach(loc => {
      locs.push({ id: loc.table_id, coordinates: [loc.x_axis, loc.y_axis, loc.z_axis] }) 
      });
    this.setState({pointer_location: locs})})
    })

  
  }

 
  
setUrlToState=()=>{
      axios.get(`https://finalproject20190421104640.azurewebsites.net/api/restaurants/${this.state.restaurantId}`)
    .then(restaurantData => {
      this.setState(
        {
          panoImage: {uri:`${'https://cors-anywhere.herokuapp.com/'}${restaurantData.data.link_to_360}`}
        })
    })
    }
};

AppRegistry.registerComponent('GDVR_REACTVR_SITEPOINT_GALLERY', () => GDVR_REACTVR_SITEPOINT_GALLERY);