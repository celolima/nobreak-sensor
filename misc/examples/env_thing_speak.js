const https = require('https');
const request = require('request');

const urlGet = {'url':'https://api.thingspeak.com/channels/456374/fields/1.json?api_key=P4LOM1CPTTVVP0LT&results=2','proxy': 'http://localhost:3129','rejectUnauthorized': false};
const urlPost = {'url':'https://api.thingspeak.com/update?api_key=8RC7JJV46R0B2B5C','proxy': 'http://localhost:3129','rejectUnauthorized': false};

const getError = (error, response, body) => {
    if(error) {
        console.log('error:', error); // Print the error if one occurred
    } else {
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
    }
}

//GET
//request(urlGet, (error, response, body) => getError(error, response, body));

setInterval(() => {
    let temperatura = Math.floor(Math.random() * (100+1));
    let umidade = Math.floor(Math.random() * (60+1));
    let data = {'field1': temperatura, 'field2': umidade};
    //POST
    request.post(urlPost).form(data);
}, 60 * 1000);