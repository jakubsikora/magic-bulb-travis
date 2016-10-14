// import axios from 'axios';

// axios({
//   method: 'post',
//   url: 'https://api.travis-ci.com/auth/github',
//   data: {
//     github_token: 'xxx'
//   },
//   headers: {
//     Accept: 'application/vnd.travis-ci.2+json'
//   },
// })
//   .then(response => {
//     console.log(response);
//   })
//   .catch(error => {
//     console.log(error);
//   });
// var $ = require('jquery');

// $.ajax({
//   method: 'post',
//   url: 'https://api.travis-ci.com/auth/github',
//   headers: {
//     Accept: 'application/vnd.travis-ci.2+json'
//   },
//   data: { github_token: 'xxx' },
//   dataType: 'json',
//   success: function (data) {
//     const access_token = data.access_token;
//     console.log(access_token);

//     // setInterval(function(){
//     //   $.ajax({
//     //     method: 'get',
//     //     url: 'https://api.travis-ci.com/repos/Pure360/frontend/builds',
//     //     headers: {
//     //       Accept: 'application/vnd.travis-ci.2+json',
//     //       Authorization: 'token ' + access_token
//     //     },
//     //     dataType: 'json',
//     //     success: function (data) {
//     //       console.info(data.builds[0].state);
//     //     }
//     //   });
//     // }, 5000);
//   }
// });


class Travis {
  init() {

  }
}

export default Travis;