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

const deleteDevice = (data) => {
  console.log(data);
  axios.delete('/devices/', data)
  .then(response => {
      console.log('Deleted');
  });
};

export { getDevices, createDevice, updateDevice, deleteDevice };
