// const users = [
//  {
//     name: 'brynn',
//     avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
//  },
// ]
// var post = [
//   {
//     title: '',
//     content: '',
//     upvotes: ''
//   },
// ]
// <AutoGrowingTextInput style={styles.textInput} placeholder={'Your Message'} />
const axios = require("axios");
const url = "http://aidangrimshaw.pythonanywhere.com/Posts/Top";
const tempUrl = "http://aidangrimshaw.pythonanywhere.com/Posts/";

import { StyleSheet, View } from 'react-native';
import React, { Component } from 'react';
import { AppRegistry, Image, TextInput, Alert} from 'react-native';
import { Badge, Text, Button, Card, ButtonGroup, Header, List, ListItem } from 'react-native-elements'
import {ScrollView} from 'react-native-gesture-handler';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';

export default class App extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
          postPage: false,
          urlEnd: tempUrl+"New"
        };
  }
  urlHot = () => {
      this.setState({urlEnd: tempUrl+'Hot'})
      console.log(this.state.urlEnd+'\n')
  }
  urlTop = () => {
      this.setState({urlEnd: tempUrl+'Top'})
      console.log(this.state.urlEnd+'\n')
  }
  urlNew = () => {
      this.setState({urlEnd: tempUrl+'New'})
      console.log(this.state.urlEnd+'\n')
  }
  render() {
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Header
          backgroundColor='#03A9F4'
          leftComponent={{
            icon: 'menu',
            color: '#fff',
            onPress: () => this.setState(previousState => {
              return { postPage: false };
            }),
          }}
          centerComponent={{
            text: 'TalkaTiel',
            style: { color: '#fff', fontSize: 25 },
            onPress: () => this.setState(previousState => {
              return { postPage: false };
            }),
          }}
          rightComponent={{
            icon: 'create',
            color: '#fff',
            onPress: () => this.setState(previousState => {
              return { postPage: true };
            }),
          }}
        />
        { this.state.postPage &&
          <CreatePost/>
        }
        { !this.state.postPage &&
          <Card>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
              <Button
                title='Hot'
                backgroundColor='#03A9F4'
                buttonStyle={{width: 100, borderWidth: 0, borderColor: 'transparent', borderRadius: 0}}
                onPress = { this.urlHot }
              />
              <Button
                title='Top'
                loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
                backgroundColor='#f4c703'
                buttonStyle={{width: 50, borderWidth: 0, borderColor: 'transparent', borderRadius: 0}}
                onPress = { this.urlTop }
              />
              <Button
                title='New'
                backgroundColor='#f44e03'
                buttonStyle={{width: 100, borderWidth: 0, borderColor: 'transparent', borderRadius: 0}}
                onPress={() => this.urlNew("blah") }
              />
            </View>
          </Card>
        }

        { !this.state.postPage &&
          <Test
            url={this.state.urlEnd}
          >
          <BadgeButton/></Test>
        }
      </ScrollView>
    );
  }
}
class Test extends Component {
  constructor(props) {
        super(props);
        this.state = {
          list: []
        };
  }
  render() {
    var postNames = ['test','firstPost','secondPost']
    return (
      <View>
        {
          this.renderButtons()
        }
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
          let post = [
            {
              "title" : response.data[i].title,
              "content" : response.data[i].content,
              "upvotes" : (response.data[i].upvotes - response.data[i].downvotes).toString(),
            },
          ];
          this.setState({
              list: this.state.list.concat(post),
          })
          // console.log(this.state.list[i]);
          // console.log(response.data[i].upvotes);
        }
    })
    .catch(error => {
      console.log(error);
    });
  }
  renderButtons() {
      return this.state.list.map((item,key) => {
          return (
              <BadgeButton
                key={key}
                title={item.title}
                content={item.content}
                upvotes={item.upvotes}
              />
          );
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
class CreatePost extends Component {
  constructor(props) {
        super(props);
        this.state = {
          title: '',
          content: ''
        };
  }
  uploadPost() {
    console.log(this.state.content)
    console.log(this.state.title)
    axios({
      method: 'post',
      url: 'http://aidangrimshaw.pythonanywhere.com/Posts',
      data: {
        content: this.state.content,
        upvotes: 0,
        downvotes: 0,
        postID: 2,
        userID: 1,
        title: this.state.title
      }
    });
  }
  render() {
    return (
      <View>
        <Card
          title={"Create Post"}
          titleStyle={{fontSize: 25, color: '#03A9F4'}}
          containerStyle={{marginBottom: 15}}
        >
          <Text h4
          style={{marginBottom:15, color: '#03A9F4' }}
          >Title</Text>

          <AutoGrowingTextInput style={styles.textInput} placeholder={''} onChangeText={(title) => this.setState({title})}/>

          <Text h4
          style={{marginBottom:15, color: '#03A9F4' }}
          >Content</Text>

          <AutoGrowingTextInput style={styles.textInput} placeholder={''} onChangeText={(content) => this.setState({content})}/>

        </Card>
        <Button
          title='Submit'
          backgroundColor='#03A9F4'
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
          onPress={ () => this.uploadPost() }
        />
      </View>
    )
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
              title={this.props.upvotes}
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

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 20
  }
});
