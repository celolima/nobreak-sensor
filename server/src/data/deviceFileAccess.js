import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(__dirname, 'data.json');

const getJsonDevs = () => {
    return new Promise((resolve,reject) => {
        resolve(() => {
            fs.readFile(DATA_FILE, (err, data) => {      
                return JSON.parse(data);
            });
        });
    });
};

const getTopics = () => {
    return new Promise((resolve,reject) => {
        resolve(() => {
            const p = getJsonDevs();
            p.then((devices) => {
                console.log(devices);
                let topics = [];
                if(devices) {
                    devices.forEach(dev => {
                        if(dev.topics) {
                          dev.topics.forEach(top => {
                            if(top.topic) topics.push(top.topic);
                          });
                        }
                    });
                }
                return topics;
            }, (err) => console.log('rejected: ', err));
        });
    });

};

export { getJsonDevs, getTopics }