let newDevice = function(attrs = {}) {
  const device = {
    id: uuid.v4(), // eslint-disable-line no-undef
    desc: attrs.desc,        
    elapsed: 0,
  };

  return device;
};

let findById = function(array, id, cb) {
    array.forEach((el) => {
      if (el.id === id) {
        cb(el);
        return;
      }
    });
};

exports.newDevice = newDevice;
exports.findById = findById;