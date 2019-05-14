import React, { Component } from 'react';
import { View, Button, Fab } from 'native-base';
export default class FABExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 'true'
    };
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Fab
          active={this.state.active}
          direction="up"
          style={{ backgroundColor: '#5067FF' }}
          position="bottomRight"
          onPress={() => this.setState({ active: !this.state.active })}
        >
          <Image source={require('../res/icons/champagne-glass.png')} />
          <Button style={{ backgroundColor: '#34A34F' }}>
            <Image source={require('../res/icons/champagne-glass.png')} />
          </Button>
          <Button style={{ backgroundColor: '#3B5998' }}>
            <Image source={require('../res/icons/champagne-glass.png')} />
          </Button>
          <Button disabled style={{ backgroundColor: '#DD5144' }}>
            <Image source={require('../res/icons/champagne-glass.png')} />
          </Button>
        </Fab>
      </View>
    );
  }
}
