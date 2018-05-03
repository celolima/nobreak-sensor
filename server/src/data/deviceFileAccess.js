import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(__dirname, 'data.json');

const getJsonDevs = () => {
    var data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
};

const getTopics = () => {
    const devices = getJsonDevs();
    
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
};

const getDeviceTopic = (deviceId, param) => {
    const devices = getJsonDevs();
    let obj = {};
    if(devices) {
        const device = devices.find((dev) => {            
            return dev.id === deviceId
        });
        if(device.topics) {
            obj = device.topics.find((top) => {
                return top.param.toLowerCase() === param; 
            });
        }
    }
    return obj;
};

const getReactsFromTopic = (deviceId, param) => {
    let reacts = [];
    const topic = getDeviceTopic(deviceId, param);
    if(topic && topic.reacts) {
        reacts = topic.reacts;
        // add unidade de Medida
    }
    return reacts;
}

export { getJsonDevs, getTopics, getDeviceTopic, getReactsFromTopic }