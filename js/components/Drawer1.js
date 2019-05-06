import React, { Component } from "react";
import { Text, Image } from "react-native";
import View from "react-native-view";
import BouncyDrawer from "react-native-bouncy-drawer";
import MAIcon from "react-native-vector-icons/FontAwesome5";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedView: 0
    };
  }
  renderItem = (text, color, iconName) => (
    <View smp row vcenter>
      <View lgpr>
        <Image
          style={{ width: 50, height: 50 }}
          source={{
            uri:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeVGEhMnznomjVDENbc6nHJYILQFX8bMDnv2Yg049fMa0oA3B5uA"
          }}
        />
      </View>
      <Text style={{ fontSize: 16, color, fontWeight: "600" }}>{text}</Text>
    </View>
  );

  renderContent = () => (
    <View flex hcenter mdpr style={{ backgroundColor: "#3F3C4C" }}>
      <View flex>
        <View style={{ flex: 1 }} />
        {this.renderItem("PROFILE", "#fff", "search")}
        {this.renderItem("FRIENDS", "#fff", "search")}
        {this.renderItem("ACTIVITY", "#2FCACE", "search")}
        <View mdp />
        {this.renderItem("SETTINGS", "#fff", "search")}
        <View style={{ flex: 3 }} />
      </View>
    </View>
  );

  render() {
    return (
      <View flex>
        <BouncyDrawer
          willOpen={() => console.log("will open")}
          didOpen={() => console.log("did open")}
          willClose={() => console.log("will close")}
          didClose={() => console.log("did close")}
          title="Activity"
          titleStyle={{
            color: "#fff",
            fontFamily: "Helvetica Neue",
            fontSize: 20,
            marginLeft: -3
          }}
          closedHeaderStyle={{ backgroundColor: "#3F3C4C" }}
          defaultOpenButtonIconColor="#fff"
          defaultCloseButtonIconColor="#fff"
          renderContent={this.renderContent}
          openedHeaderStyle={{ backgroundColor: "#3F3C4C" }}
        />
      </View>
    );
  }
}
