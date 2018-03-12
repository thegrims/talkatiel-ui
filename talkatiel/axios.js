const axios = require("axios");
// 71.56.150.17
const url =
  "http://aidangrimshaw.pythonanywhere.com/Posts/New";

// axios
//   .get(url)
//   .then(response => {
//     for (i = 0; i < response.data.length; i++){
//       console.log(response.data[i]);
//       console.log(response.data[i].content);
//       console.log(response.data[i].upvotes - response.data[i].downvotes);
//       console.log(response.data[i].postID);
//     }
//   })
//   .catch(error => {
//     console.log(error);
//   });

try {
  // Send a POST request
  axios({
    method: 'post',
    url: 'http://aidangrimshaw.pythonanywhere.com/Posts',
    data: {
      content: 'Fred',
      upvotes: 5,
      downvotes: 0,
      postID: 2,
      userID: 1,
      title: 'Aidan'
    }
  });
}
catch (err) {
  // console.error(`Error received from axios.post: ${JSON.stringify(err)}`);
}

  // {postNames.map(function(name, index){
  //     return <li key={ index }>{name}</li>;
  //   })}
  //
  // {postNames.map(function(name, index){
  //     return (
  //       <Card title={name} key={index}>
  //       </Card>
  //     );
  // })}

  // {this.state.items.length ?
  //     this.state.items.map(item=><ListItem key={item.id} title={item.title}></ListItem>)
  //     : <ListItem title='loading'></ListItem>
  //   }
    // test() {
    //   var postNames = ['test','firstPost','secondPost']
    //   return (
    //     <ul>
    //         {postNames.map(function(name, index){
    //             return <li key={ index }>{name}</li>;
    //           })}
    //     </ul>
    //   )
    // }
