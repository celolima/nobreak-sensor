const uuidv4 = require('uuid/v4');

const newDevice = (attrs = {}) => {
  const device = {
    id: uuidv4(), // eslint-disable-line no-undef
    desc: attrs.desc,        
    elapsed: 0,
  };

  return device;
};

const findById = (array, id, cb) => {
    array.forEach((el) => {
      if (el.id === id) {
        cb(el);
        return;
      }
    });
};

export { newDevice, findById };