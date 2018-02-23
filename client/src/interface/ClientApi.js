let getDevices = function(success) {
  return fetch('/api/devices', {
    headers: {
      Accept: 'application/json',
    },
  }).then(checkStatus)
    .then(parseJSON)
    .then(success);
};

let createDevice = function(data) {
  return fetch('/api/devices', {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(checkStatus);
};

let updateDevice = function(data) {
  return fetch('/api/devices', {
    method: 'put',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(checkStatus);
};

let deleteDevice = function(data) {
  return fetch('/api/devices', {
    method: 'delete',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(checkStatus);
};

let checkStatus = function(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error('HTTP Error ${response.statusText}');
    error.status = response.statusText;
    error.response = response;
    console.log(error);
    throw error;
  }
};

let parseJSON = function(response) {
  return response.json();
}

exports.getDevices = getDevices;
exports.createDevice = createDevice;
exports.updateDevice = updateDevice;
exports.deleteDevice = deleteDevice;