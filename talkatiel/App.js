const users = [
 {
    name: 'brynn',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
 },
]
import { StyleSheet, View } from 'react-native';
import React, { Component } from 'react';
import { AppRegistry, Image, TextInput, Alert} from 'react-native';
import { Badge, Text, Button, Card, ButtonGroup, Header } from 'react-native-elements'
import {ScrollView} from 'react-native-gesture-handler';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';

export default class App extends React.Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'TalkaTiel', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
        />
        <BadgeButton/>
        <BadgeButton/>
        <BadgeButton/>
        <BadgeButton/>
        <BadgeButton/>
        <BadgeButton/>
        <BadgeButton/>
      </ScrollView>
    // <View style={{
    //   flex: 1,
    //   flexDirection: 'column',
    //   justifyContent: 'center',
    //   alignItems: 'center',
    // }}>
    //    <View style={{flex: 1, backgroundColor: 'powderblue'}} >
    //    <Text>Open up App.js to start working on your app!</Text>
    //    </View>
    //    <View style={{flex: 2, backgroundColor: 'skyblue'}} />
    //    <View style={{flex: 3, backgroundColor: 'steelblue'}} />
    //  </View>
    );
  }
}
class MyTextInput extends Component {
  render() {
    return (
      <View>
        <TextInput
          {...this.props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
          editable = {true}
          maxLength = {40}
        />
      </View>
    );
  }
}
export class BadgeButton extends Component {
  constructor (props) {
    super(props);
    this.state = {
      upvotes: 0,
      selectedIndex: 1
    };
  }
  render() {
    const buttons = ['Upvote', 'Downvote']
    const backgroundColor = ['#03A9F4', '#03A9F4']
    const { selectedIndex } = this.state
    return (
      <View>
        <Card title="Post Name">
          <Badge
            value={this.state.upvotes}
            textStyle={{ color: 'orange' }}
            containerStyle={{width: 50}}
          />
          <Button
            icon={{name: 'code'}}
            backgroundColor='#03A9F4'
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='Upvote'
            onPress={this._addNum}
          />
          <ButtonGroup
            onPress={this.updateIndex}
            selectedIndex={this.state.index}
            buttons={buttons}
            containerStyle={{height: 30}}
            onPress={this._addNum}
          />
          <AutoGrowingTextInput style={styles.textInput} placeholder={'Your Message'} />
        </Card>
      </View>
    );
  }
  _addNum = () => {
    this.setState({
        upvotes: this.state.upvotes + 1,
    })
  }
  updateIndex = (index) => {
     this.setState({index})
  }
}
export class Bananas extends Component {
  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    return (
      <Image source={pic} style={{width: 193, height: 110}}/>
    );
  }
}
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 20
  }
});
// import React, { Component } from 'react';
// import { AppRegistry, View, TextInput } from 'react-native';
//
// class UselessTextInput extends Component {
//   render() {
//     return (
//       <TextInput
//         {...this.props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
//         editable = {true}
//         maxLength = {40}
//       />
//     );
//   }
// }
//
// export default class UselessTextInputMultiline extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       text: 'Useless Multiline Placeholder',
//     };
//   }
//
//   // If you type something in the text box that is a color, the background will change to that
//   // color.
//   render() {
//     return (
//      <View style={{
//        backgroundColor: this.state.text,
//        borderBottomColor: '#000000',
//        borderBottomWidth: 1 }}
//      >
//        <UselessTextInput
//          multiline = {true}
//          numberOfLines = {10}
//          onChangeText={(text) => this.setState({text})}
//          value={this.state.text}
//        />
//      </View>
//     );
//   }
// }
