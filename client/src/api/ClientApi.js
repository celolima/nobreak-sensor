import axios from 'axios';  
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';
axios.defaults.headers.delete['Content-Type'] = 'application/json';

axios.defaults.baseURL= 'http://localhost:3000/api';

const getDevices = () => {
  return axios.get('/devices')
    .then(response => response.data);
};

const createDevice = (data) => {
  axios.post('/devices/', data)
  .then(response => {
      console.log('Created' + response);
  });
};

const updateDevice = (data) => {
  axios.put('/devices/', data)
  .then(response => {
      console.log('Updated' + response);
  });
};

const deleteDevice = (device) => {
  console.log(device);
  axios.delete('/devices/',{ data: device } )
    .then(response => {
      console.log('Deleted');
    });
};

const getDeviceId = (id) => {
  return axios.get('/devices/' + id)
    .then(response => {console.log(response.data); return response.data;});
};

export { getDevices, getDeviceId, createDevice, updateDevice, deleteDevice };
