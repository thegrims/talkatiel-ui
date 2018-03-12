// const users = [
//  {
//     name: 'brynn',
//     avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
//  },
// ]
var post = [
  {
    title: '',
    content: '',
    upvotes: ''
  },
]

const axios = require("axios");
const url = "http://aidangrimshaw.pythonanywhere.com/Posts/New";
// const url = "http://aidangrimshaw.pythonanywhere.com/Posts/New";

import { StyleSheet, View } from 'react-native';
import React, { Component } from 'react';
import { AppRegistry, Image, TextInput, Alert} from 'react-native';
import { Badge, Text, Button, Card, ButtonGroup, Header, List, ListItem } from 'react-native-elements'
import {ScrollView} from 'react-native-gesture-handler';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';

export default class App extends React.Component {
  // componentDidMount() {
  //   console.log("starting")
  //   axios
  //     .get(url)
  //     .then(response => {
  //       for (i = 0; i < response.data.length; i++){
  //         console.log(response.data[i].title);
  //         console.log(response.data[i].content);
  //         console.log(response.data[i].upvotes - response.data[i].downvotes);
  //       }
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
  // }
  render() {
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Header
          backgroundColor='#03A9F4'
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'TalkaTiel', style: { color: '#fff', fontSize: 25 } }}
          rightComponent={{ icon: 'create', color: '#fff' }}
        />
        <Test><BadgeButton/></Test>
        <AutoGrowingTextInput style={styles.textInput} placeholder={'Your Message'} />
      </ScrollView>

      // <BadgeButton/>
      // <BadgeButton/>
      // <BadgeButton/>
      // <BadgeButton/>
      // <BadgeButton/>
      // <BadgeButton/>
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
class Test extends Component {
  constructor(props) {
        super(props);
        this.state = {
          list: [],
          title: "...",
          content: "...",
          upvotes: "",
          downvotes: ""
        };
  }
  render() {
    var postNames = ['test','firstPost','secondPost']
    return (
      <View>
        <BadgeButton
          title={this.state.title}
          content={this.state.content}
          upvotes={this.state.upvotes}
        />
        <Button
          icon={{name: 'refresh'}}
          backgroundColor='#03A9F4'
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
          onPress={ () => this.componentDidMount() }
        />
      </View>
    );
  }
  componentDidMount = () => {
    axios
      .get(url)
      .then(response => {
        for (i = 0; i < response.data.length; i++){
          // this.setState({list: this.state.list.concat([response.data[i]])});
          this.setState({
              list: this.state.list.concat(["adskjdvn"]),
              title: response.data[i].title,
              content: response.data[i].content,
              upvotes: response.data[i].upvotes
          })
          console.log(response.data[i].title);
          console.log(response.data[i].content);
          console.log(response.data[i].upvotes - response.data[i].downvotes);
        }
    })
    .catch(error => {
      console.log(error);
    });
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
class BadgeButton extends Component {
  constructor (props) {
    super(props);
    this.state = {
      upvotes: 0,
      selectedIndex: 1
    };
  }
  render() {
    // const buttons = ['Upvote', 'Downvote']
    // const backgroundColor = ['#03A9F4', '#03A9F4']
    // const { selectedIndex } = this.state
    return (
      <View>
        <Card
          title={this.props.title}
          titleStyle={{fontSize: 25, color: '#03A9F4'}}
          containerStyle={{marginBottom: 15}}
        >
        <Text h5
        style={{marginBottom:15 }}
        >{this.props.content}</Text>

          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
            <Button
              icon={{name: 'thumb-up', raised: true }}
              backgroundColor='#03A9F4'
              buttonStyle={{width: 100, borderWidth: 0, borderColor: 'transparent', borderRadius: 0}}
              onPress={this._addNum}
            />
            <Button
              title='50'//{this.props.upvotes}
              loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
              backgroundColor='#f4c703'
              buttonStyle={{width: 50, borderWidth: 0, borderColor: 'transparent', borderRadius: 0}}
            />
            <Button
              icon={{name: 'thumb-down'}}
              backgroundColor='#f44e03'
              buttonStyle={{width: 100, borderWidth: 0, borderColor: 'transparent', borderRadius: 0}}
              onPress={this._addNum}
            />
          </View>
        </Card>
      </View>
    );
  }
  _addNum = () => {
    axios
      .get(url)
      .then(response => {

    })
    .catch(error => {
      console.log(error);
    });
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
