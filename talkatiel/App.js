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
const url = "https://aidangrimshaw.pythonanywhere.com/Posts/Top";
const tempUrl = "https://aidangrimshaw.pythonanywhere.com/Posts/";

import { StyleSheet, View } from 'react-native';
import React, { Component } from 'react';
import { AppRegistry, Image, TextInput, Alert} from 'react-native';
import { Badge, Text, Button, Card, ButtonGroup, Header, List, ListItem, Input, Divider } from 'react-native-elements'
import {ScrollView} from 'react-native-gesture-handler';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';

/**
 * [handler description]
 * @type {[type]}
 */
export default class App extends React.Component {
  constructor(props) {
        super(props);
        this.handler = this.handler.bind(this)
        this.state = {
          postPage: false,
          urlEnd: tempUrl+"New"
        };
  }
  handler(e) {
   e.preventDefault()
   this.setState({
     postPage: true,
     // urlEnd: tempUrl+"New"
   })
   // this.child.componentDidMount(this.state.urlEnd)
 }
  urlChange = (type) => {
      this.setState({urlEnd: tempUrl+type})
      this.child.componentDidMount(this.state.urlEnd)
      console.log(this.state.urlEnd+'\n')
  }
  render() {
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Header
          backgroundColor='#03A9F4'
          outerContainerStyles={{height: 100, marginBottom: 20}}
          leftComponent={{
            icon: 'menu',
            color: '#fff',
            onPress: () => this.setState(previousState => {
              return { postPage: false };
            }),
          }}
          centerComponent={{
            text: 'TalkaTiel',
            style: { color: '#fff', fontSize: 35, fontWeight: 'bold' },
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
          <CreatePost handler = {this.handler}/>
        }
        { !this.state.postPage &&
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
              <Button
                title='Hot'
                backgroundColor='#03A9F4'
                buttonStyle={{width: 100, borderWidth: 0, marginRight: -15, borderColor: 'transparent', borderRadius: 0}}
                onPress={() => this.urlChange("Hot") }
              />
              <Button
                title='Top'
                loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
                backgroundColor='#03A9F4'
                buttonStyle={{width: 100, borderWidth: 0, borderColor: 'transparent', borderRadius: 0}}
                onPress={() => this.urlChange("Top") }
              />
              <Button
                title='New'
                backgroundColor='#03A9F4'
                buttonStyle={{width: 100, borderWidth: 0, marginLeft: -15, borderColor: 'transparent', borderRadius: 0}}
                onPress={() => this.urlChange("New") }
              />
            </View>
        }

        { !this.state.postPage &&
          <Test
            ref={instance => { this.child = instance; }}
            urlEnd={this.state.urlEnd}
          >
          <BadgeButton/></Test>
        }
      </ScrollView>
    );
  }
}
/**
 * [Test description]
 * @extends Component
 */
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
          onPress={ () => this.componentDidMount(this.props.urlEnd) }
        />
      </View>
    );
  }
  componentDidMount = (urlEnd) => {
    this.setState({
        list: [],
    })
    console.log(urlEnd);
    axios
      .get(url)
      .then(response => {
        for (i = 0; i < 10;/*response.data.length;*/ i++){
          let post = [
            {
              "title" : response.data[i].title,
              "content" : response.data[i].content,
              "upvotes" : (response.data[i].upvotes - response.data[i].downvotes).toString(),
              "postID" : response.data[i].postID.toString(),
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
                postID={item.postID}
              />
          );
      });
  }
}
/**
 * [CreatePost description]
 * @extends Component
 */
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
      url: 'https://aidangrimshaw.pythonanywhere.com/Posts',
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
          style={{marginBottom:15, color: '#C0C0C0' }}
          >
            Title
          </Text>

          <AutoGrowingTextInput
            style={{ color: '#C0C0C0', marginTop: 0 }}
            placeholder={''}
            onChangeText={(title) => this.setState({title})}
          />

          <Text h4
          style={{marginBottom:15, color: '#C0C0C0' }}
          >Content</Text>

          <AutoGrowingTextInput
            style={{ color: '#C0C0C0', marginTop: 0 }}
            placeholder={''}
            onChangeText={(title) => this.setState({title})}
          />

        </Card>
        <Button
          title='Submit'
          backgroundColor='#03A9F4'
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
          onPress={ () => uploadPost() }
        />
      </View>
    )
  }
}
/**
 * [BadgeButton description]
 * @extends Component
 */
class BadgeButton extends Component {
  constructor (props) {
    super(props);
    this.state = {
      localUpvotes: this.props.upvotes,
      upVoted: false,
      downVoted: false,
      comments: false,
      postLink: '',
      selectedIndex: 1
    };
  }
  commentLoad() {
    if ( this.state.comments == false ){
      this.setState({
        comments: true
      })
    }
    else if ( this.state.comments == true ){
      this.setState({
        comments: false
      })
    }
  }
  vote(vote) {
    if (vote == -1 && this.state.downVoted == false){
      this.setState({
        localUpvotes: (parseInt(this.state.localUpvotes)+vote).toString(),
        downVoted: true,
        upVoted: false,
        postLink: "https://aidangrimshaw.pythonanywhere.com/Posts/"+this.props.postID.toString()+"/0"
      })
      axios
        .post("https://aidangrimshaw.pythonanywhere.com/Posts/"+this.props.postID.toString()+"/0")
        .then(response => {
          console.log(response.data)
        })
        .catch(error => {
          console.log(error);
        });
    }
    // else if (vote == -1 && this.state.downVoted == true){
    //   this.setState({
    //     localUpvotes: (parseInt(this.state.localUpvotes)-vote).toString(),
    //     downVoted: false,
    //     postLink: "http://aidangrimshaw.pythonanywhere.com/Posts/"+this.props.postID.toString()+"/0"
    //   })
    // }
    if (vote == 1 && this.state.upVoted == false){
      this.setState({
        localUpvotes: (parseInt(this.state.localUpvotes)+vote).toString(),
        upVoted: true,
        downVoted: false,
        postLink: "https://aidangrimshaw.pythonanywhere.com/Posts/"+this.props.postID.toString()+"/1"
      })
      axios
        .post("https://aidangrimshaw.pythonanywhere.com/Posts/"+this.props.postID.toString()+"/1")
        .then(response => {
          console.log(response.data)
        })
        .catch(error => {
          console.log(error);
        });
    }
    // else if (vote == 1 && this.state.upVoted == true){
    //   this.setState({
    //     localUpvotes: (parseInt(this.state.localUpvotes)-vote).toString(),
    //     upVoted: false,
    //     postLink: "http://aidangrimshaw.pythonanywhere.com/Posts/"+this.props.postID.toString()+"/1"
    //   })
    // }

    // this.setState({
    //   postLink: "http://aidangrimshaw.pythonanywhere.com/Posts/"+this.props.postID.toString()+"/1"
    // })
    //
    // console.log(this.state.postLink)

    // console.log(this.props.postID)
  }
  voteToAPI(){
    console.log(this.state.postLink)
    axios
      .post("https://aidangrimshaw.pythonanywhere.com/Posts/7/1")
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    return (
      <View>
        <Card
          title={this.props.title}
          titleStyle={{fontSize: 25, color: '#03A9F4'}}
          containerStyle={{marginBottom: 10,}}
        >
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
            <Text
            style={{fontSize: 16, marginBottom:15, color: '#C0C0C0' }}
            >{this.props.content}</Text>
          </View>
          <Divider style={{ backgroundColor: 'whitesmoke', marginBottom: 15,  }} />
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
            <Button
              icon={{name: 'thumb-up', raised: true }}
              backgroundColor='#DCDCDC'
              buttonStyle={{width: 50, borderWidth: 0, borderColor: 'transparent', borderRadius: 5}}
              onPress={() => this.vote(1)}
            />
            <Button
              title={this.state.localUpvotes}
              loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
              backgroundColor='#DCDCDC'
              buttonStyle={{width: 50, borderWidth: 0, borderColor: 'transparent', borderRadius: 5}}
              onPress={() => this.vote(5)}
            />
            <Button
              icon={{name: 'thumb-down'}}
              backgroundColor='#DCDCDC'
              buttonStyle={{width: 50, borderWidth: 0, borderColor: 'transparent', borderRadius: 5}}
              onPress={() => this.vote(-1)}
            />
            <Button
              icon={{name: 'comment'}}
              backgroundColor='#DCDCDC'
              buttonStyle={{width: 50, borderWidth: 0, borderColor: 'transparent', borderRadius: 5}}
              onPress={() => this.commentLoad()}
            />
          </View>
          { this.state.comments &&
            <CommentSection
              postID={this.props.postID}
            />
          }
        </Card>
      </View>
    );
  }
}
/**
 *       </Card>
 *             <Card>
 * [CommentSection description]
 * @extends Component
 */
class CommentSection extends Component {
  constructor (props) {
    super(props);
    this.state = {
      test: 1
    };
  }
  componentWillMount(){
    console.log("blah")
  }
  uploadComment(){

  }
  render() {
    return (
      <View>
        <Divider style={{ backgroundColor: 'whitesmoke', marginTop: 15,  }} />
        <AutoGrowingTextInput
          style={{ color: '#C0C0C0', marginTop: 30 }}
          placeholder={''}
          onChangeText={(title) => this.setState({title})}
        />
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
        <Button
          title='Post'
          backgroundColor='#D3D3D3'
          buttonStyle={{width: 150, borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, borderRadius: 5}}
          onPress={ () => this.uploadComment() }
        />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: 'whitesmoke'
    // paddingVertical: 20
  }
});
