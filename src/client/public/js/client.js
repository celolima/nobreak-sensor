/* eslint-disable no-console */
/* eslint-disable no-undef */
window.client = (function () {
  function getDevices(success) {
    return fetch('/api/devices', {
      headers: {
        Accept: 'application/json',
      },
    }).then(checkStatus)
      .then(parseJSON)
      .then(success);
  }

  function createDevice(data) {
    return fetch('/api/devices', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(checkStatus);
  }

  function updateDevice(data) {
    return fetch('/api/devices', {
      method: 'put',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(checkStatus);
  }

  function deleteDevice(data) {
    return fetch('/api/devices', {
      method: 'delete',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(checkStatus);
  }

  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      var error = new Error('HTTP Error ${response.statusText}');
      error.status = response.statusText;
      error.response = response;
      console.log(error);
      throw error;
    }
  }

  function parseJSON(response) {
    return response.json();
  }

  return {
    getDevices,
    createDevice,
    updateDevice,
    deleteDevice
  };
}());
