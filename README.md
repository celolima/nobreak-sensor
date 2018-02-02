## PROJETO SENSOR DE NOBREAK

O prensente projeto tem por intuito realizar a medição do sensor de nobreak.

* A medição é realizada pelo microcontrolador
* O microcontrolador envia os dados lidos para o módulo wiFI(ESP8266)
* A ESP8266 envia os dados para o servidor MQTT
* O servidor nodejs escuta o broker e salva os dados no banco sqlite
* O cliente realiza a leitura dos dados do banco

### Tecnologia empregadas

* Mosquitto: Servidor MQTT
* Nodejs: Servidor da aplicação cliente e escuta o broker MQTT
* Reactjs: Interface com o usuário
