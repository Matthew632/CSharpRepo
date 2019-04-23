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
       
        
        {this.state.pointer_location &&  <Pointers pointerData={this.state.pointer_location} restaurantId={this.state.restaurantId}/>}
        {/* <Pointers pointerData={this.state.pointer_location} restaurantId={this.state.restaurantId}/> */}

      </View>
    );
  }
  
  componentDidMount(){
    axios.get('https://finalproject20190421104640.azurewebsites.net/api/communication')
    .then(response => {
      this.setState({ restaurantId: response.data.patched_id })

    }).then(() =>{
      this.setUrlToState()
    })

  
  }

 
  
setUrlToState=()=>{
      axios.get(`https://finalproject20190421104640.azurewebsites.net/api/restaurants/${this.state.restaurantId}`)
    .then(restaurantData => {
      this.setState(
        {
          panoImage: {uri:`${'https://cors-anywhere.herokuapp.com/'}${restaurantData.data.link_to_360}`},
          pointer_location: JSON.parse(restaurantData.data.pointer_location)
        })
    })
    }
};

AppRegistry.registerComponent('GDVR_REACTVR_SITEPOINT_GALLERY', () => GDVR_REACTVR_SITEPOINT_GALLERY);