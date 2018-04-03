import axios from './axiosInst';

const getDevices = () => {
  return axios.get('/devices')
    .then(response => response.data);
};

const createDevice = (data) => {
  return axios.post('/devices/', data)
  .then(response => {
      console.log('Created' + response);
  });
};

const createReaction = (data) => {
  return axios.post('/reacts/', data)
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
    .then(response => {return response.data;});
};

export { getDevices, getDeviceId, createDevice, updateDevice, deleteDevice, createReaction };
