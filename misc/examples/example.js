var http = require('http')
var mqtt = require('mqtt')
var sqlite = require('sqlite-sync')
var client  = mqtt.connect('mqtt://test.mosquitto.org')

console.log('\nScript que testa mosquitto, sqlite-sync:\n');

client.on('offline', function () {
  console.log('\nNot able to connect on MQTT\n')
  client.end()
})

sqlite.connect('..\misc\sql\dump.sql')

console.log('Obtendo registros: ')

//Assíncrono
sqlite.runAsync("SELECT * FROM TB_DEVICE", function(rows) {
    for( var key in rows ) {
        console.log('Id  : %d', rows[key].ID)
        console.log('Nome: %s', rows[key].DESC)
    }
});

client.on('connect', function () {
  client.subscribe('presence')
  client.publish('presence', 'Hello mqtt')
})
 
client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})