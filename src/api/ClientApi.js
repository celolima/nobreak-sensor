import axios from 'axios';  
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL= 'https://jsonplaceholder.typicode.com';

const getDevices = () => {
  return axios.get('/posts')
    .then(response => {
      const posts = response.data;
      const serverDevices = posts.map(p =>{
        return {
          id: p.id,
          desc: p.title
        }        
      });
      return serverDevices;
    });
};

const createDevice = (data) => {
  axios.post('/posts', data)
  .then(response => {
      console.log('Created' + response);
  });
};

const updateDevice = (data) => {
  axios.put('/posts/' + data.id)
  .then(response => {
      console.log('Updated' + response);
  });
};

const deleteDevice = (data) => {
  axios.delete('/posts/' + data.id)
  .then(response => {
      console.log('Deleted' + response);
  });
};

export { getDevices, createDevice, updateDevice, deleteDevice };
