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

export { getJsonDevs, getTopics }