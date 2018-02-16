window.helpers = (function () {
    function newDevice(attrs = {}) {
      const device = {
        id: uuid.v4(), // eslint-disable-line no-undef
        desc: attrs.desc,        
        elapsed: 0,
      };
  
      return device;
    }

    function findById(array, id, cb) {
        array.forEach((el) => {
          if (el.id === id) {
            cb(el);
            return;
          }
        });
      }

      return {
        newDevice,
        findById,
      };
}());
          