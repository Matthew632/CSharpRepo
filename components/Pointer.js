import React from 'react';
import {
  Animated,
  asset,
  Image,
  View,
  VrButton,
  Text
} from 'react-vr';
import { Easing } from 'react-native'
import axios from 'axios'




class Pointer extends React.Component {

  constructor(props) {
    super();

    this.state = {
      // animatedTranslation: new Animated.Value(0),
      animationValue: new Animated.Value(1.5),
      pointerEntered: false,
      pointerImg: 'pointer.png',
      bookingTextOpacity: 0
      
    };
  }

  componentDidMount(){
    this.animation();

  }

  animation(){

    if(!this.state.pointerEntered)

    Animated.sequence([
      Animated.timing(
        this.state.animationValue,
        {
          toValue: 1.5,
          duration: 400
        }
      ),
      Animated.timing(
        this.state.animationValue,
        {
          toValue: 1.65,
          duration: 400,
          easing: Easing.elastic(0)
        }
      )
    ]).start(()=> {
      this.animation();
    });

  }

  onPointerClick = () => {
    const tableId = this.props.tableId
    axios.patch('https://finalproject20190421104640.azurewebsites.net/api/communication', 
    {
      "patched_table_id": tableId,
    })
  }

  onPointerEnter = () => {
    
    this.setState({pointerEntered: true, pointerImg: 'reserve_table2.png', bookingTextOpacity: 100})

  }

  onPointerExit = () => {
    
    Promise.resolve(this.setState({pointerEntered: false, pointerImg: 'pointer.png', bookingTextOpacity: 0}))
    .then(() => {
      this.animation()
    })
    
  }

  render () {
    return (
            <View>
              <Animated.View 
                billboarding={'on'}
                style={{
                  transform: [
                    {translateY: this.state.animationValue},
                    {translate: this.props.coords},
                  ],
                  
                  width: 0.7,
                }}
              >
                <VrButton 
                  onClick={ () => {this.onPointerClick()} }
                  onEnter={this.onPointerEnter}
                  onExit={this.onPointerExit}
                >
                  <Image
                    style={{
                      width: 0.7,
                      height: 0.7,
                    }}
                    source={asset(this.state.pointerImg)}
                  >
                  {/* <Text
                    style={{
                        width: 2,
                        height: 2,
                        fontSize: 0.2,
                        opacity: this.state.bookingTextOpacity
                      }}
                  
                  >
                      Make Reservation?
                  </Text> */}
                  </Image>
                </VrButton>
              </Animated.View>
            </View>
    );
  }
};

export default Pointer;