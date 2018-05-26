import axios from './axiosInst';

const getDevices = () => {
  return axios.get('/devices')
    .then((response) => {return response.data;});
};

const createDevice = (data) => {
  return axios.post('/devices/', data);
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

const getParam = (id) => {
  return axios.get('/devices/param/' + id)
    .then(response => {return response.data;});
};

const getSendMails = (id) => {
  return axios.get('/devices/param/emails/' + id)
    .then(response => {return response.data;});
};

export { getDevices, getDeviceId, createDevice, updateDevice, deleteDevice, createReaction, getParam, getSendMails};
