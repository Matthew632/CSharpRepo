import React from 'react';
import {
  Animated,
  asset,
  Image,
  View,
  VrButton,
} from 'react-vr';
import { Easing } from 'react-native'
import Pointer from './Pointer'


class Pointers extends React.Component {

  constructor(props) {
    super();

    this.state = {
      // animatedTranslation: new Animated.Value(0),
      animationValue: new Animated.Value(1.5),
      pointerEntered: false
      
    };
  }

  componentDidMount(){
    this.animation();
    console.log('locatio data', this.props.pointerData.tables);

  }

  animation(){

    if(!this.state.pointerEntered)

    Animated.sequence([
      Animated.timing(
        this.state.animationValue,
        {
          toValue: 0,
          duration: 400
        }
      ),
      Animated.timing(
        this.state.animationValue,
        {
          toValue: 0.15,
          duration: 400,
          easing: Easing.elastic(0)
        }
      )
    ]).start(()=> {
      this.animation();
    });

  }

  onPointerClick = (key) => {
    console.log('clicky', key);
  }

  onPointerEnter = () => {
    console.log('enter')
    this.setState({pointerEntered: true})
  }

  onPointerExit = () => {
    console.log('on exit')
    Promise.resolve(this.setState({pointerEntered: false}))
    .then(() => {
      this.animation()
    })
    
  }

  

  render () {
    console.log('locatio data', this.props.pointerData.tables);

    // const hardCodedTables = {
    //   tables: [
    //     { id: 1, coordinates: [3.5, -2.5, -4] },
    //     { id: 2, coordinates: [2.5, -1.5, 0.25] },
    //     { id: 3, coordinates: [7, -1, -0.5] },
    //     { id: 4, coordinates: [8, -0.25, 3.5] },
    //     { id: 5, coordinates: [2.5, 0.5, 3.5] },
    //     { id: 6, coordinates: [8, 1, 9] },
    //     { id: 7, coordinates: [4, 1.6, 10] },
    //     { id: 8, coordinates: [-3, 2, 10] },
    //     { id: 9, coordinates: [-5, 3, -10] },
    //   ]
    // }
    
    return (
     <View>
        
        { this.props.pointerData.map(table => {
          
          return(
            <Pointer restaurantId={this.props.restaurantId} key={table.id} tableId={table.id} coords={table.coordinates}/>
            
          )
        })}

        {/* { hardCodedTables.tables.map(table => {
          console.log(table)
          return(
            <Pointer restaurantId={this.props.restaurantId} key={table.id} tableId={table.id} coords={table.coordinates}/>
            
          )
        })} */}
        
      </View>
    );
  }


};

export default Pointers;