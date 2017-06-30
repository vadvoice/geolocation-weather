'use strict'
var globalData = {};
// geolocation
var btnPosition = document.getElementById('getPosition');
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
  var url = `https://api.darksky.net/forecast/f3acae9e479d32def347b5118e41bc60/${position.coords.latitude},${position.coords.longitude}`;
  // var url = `https://api.github.com/users/willfulAversion`;
  fetch(url,{
    // mode: 'no-cors',
    method: 'GET',
    headers: {
    Accept: 'application/json',
  }
  }).then(
    response => {
      if(response.ok) {
        globalData = response;
        console.log(response)
      } else {
        alert('error')
      }

    }
  )
}
