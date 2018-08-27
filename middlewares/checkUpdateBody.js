module.exports = function (model, body) {
  const keys = Object.keys(body);
  if ( bodyObject [model] [keys[0]]) {
    console.log("true");
    return true;
  } else {
    console.log("false");
    return {required : bodyObject [model] };
  }
}

bodyObject = {
  service : {
    vehicle : true
  },
  route : {
    duration : true
  },
  trip : {
    departTime : true
  }
}
