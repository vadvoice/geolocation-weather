'use strict'
var globalData = {};
// geolocation
var btnPosition = document.getElementById('getPosition');
let wrap = document.getElementsByClassName('output')[0];
// listener
btnPosition.addEventListener('click', getPosition)
// get position
function getPosition() {
  return new Promise( (resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => {
        resolve(position)
      },
      error => {
        reject(error, 'user is bad boy')
      })
  }).then(
    response => {
    showPosition(response)
  }),
  (error, massage) => {
    console.log(error, massage)
  }
}

function showPosition(position) {
  console.log(position);
  var infoWrap = document.getElementsByClassName('output')[0];
  infoWrap.innerHTML = `<span>${position.coords.latitude}</span> <span>${position.coords.longitude}</span>`
  var gitHubUserUrl = `https://api.github.com/users/willfulAversion`;
  let apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyDlT_lL5an8JHAJjv4CuGbC5Rbp9oDCMKA`
  // var weatherUrl = `https://api.darksky.net/forecast/f3acae9e479d32def347b5118e41bc60/${position.coords.latitude},${position.coords.longitude}`;
  // google api data
  getApiData(apiUrl);
  // github user fetcch
  fetch(gitHubUserUrl, {
    method: 'GET',
    headers: {
    "Accept": "application/json"
  }
  }).then(
    response => {
      if(response.ok) {
        return response.text();
      }
    }
  ).then(
    (jsonGithub) => {
      showUser(jsonGithub)
    }
  ).catch(
    (error) => {
      console.log(`Request faild ${error}`)
    }
  )
}
//
function showUser(data) {
  let parseData = JSON.parse(data);
  let userImg = document.createElement('img');

  userImg.setAttribute('class', 'userImg');

  userImg.setAttribute('src', parseData.avatar_url);
  wrap.appendChild(userImg);
}

// google API
function getApiData(url) {
  fetch(url, {
    method: 'GET',
    headers: {
      "Accept": 'application/json'
    }
  }).then(
    (response) => {
      if (response.ok) {
        return response.text()
      }
    }
  ).then(
    (geolocationData) => {
      console.log(geolocationData);

    }
  )
}
