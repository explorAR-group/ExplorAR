import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { ViroARSceneNavigator } from "react-viro";
import { connect } from "react-redux";
import { setselectedPois } from "../store/poi";

const InitialARScene = require("./PointOfInterest");
export class AR extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: true
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ name: false });
    }, 6000);
  }

  removeName() {
    let temp = this.state.name;
    temp = !temp;
    this.setState({ name: temp });
  }
  render() {
    const { user } = this.props;
    return (
      <View style={styles.outer}>
        <ViroARSceneNavigator
          apiKey="C63BC372-68BB-4F10-B21A-7EC8E1ABFFC0"
          worldAlignment="GravityAndHeading"
          initialScene={{ scene: InitialARScene }}
        />
        {this.state.name && (
          <View
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.removeName();
              }}
            >
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: "bold",
                  color: "white",
                  textAlign: "center"
                }}
              >
                Welcome {user.firstName}!
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "white",
                  textAlign: "center"
                }}
              >
                Tap a point to interact
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 1,
            alignItems: "center",
            flexDirection: "row-reverse"
          }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.goToLogin();
            }}
          >
            <Image
              source={require("../res/times-circle.png")}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.setSelectedPois("Restaurants");
            }}
          >
            <Image
              style={styles.restaurant}
              source={require("../res/icons/restaurant.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.setSelectedPois("Bars");
            }}
          >
            <Image
              style={styles.bars}
              source={require("../res/icons/champagne-glass.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.setSelectedPois("Attractions");
            }}
          >
            <Image
              style={styles.attractions}
              source={require("../res/icons/statue-of-liberty.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  allPoi: state.poi.allPois,
  selectedPoi: state.poi.selectedPois
});

const mapDispatchToProps = dispatch => {
  return {
    setSelectedPois: function(category) {
      dispatch(setselectedPois(category));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AR);

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  button: {
    alignItems: "center",
    padding: 20,
    marginEnd: 10,
    justifyContent: "space-between"
  },
  image: {
    width: 30,
    height: 30,
    tintColor: "white"
  },
  restaurant: {
    width: 30,
    height: 30,
    tintColor: "#8fbc8f"
  },
  bars: {
    width: 30,
    height: 30,
    tintColor: "#1e90ff"
  },
  attractions: {
    width: 30,
    height: 30,
    tintColor: "#dc143c"
  }
});
