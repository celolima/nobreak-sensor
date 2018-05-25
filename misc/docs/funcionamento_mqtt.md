O que � MQTT? 

- Um protocolo de troca de mensagens M2M (Machine to Machine) desenvolvido pela IBM

- Necessita de pouca banda

- Utilizado por hardwares extremamente simples

- � baseado no TCP/IP

- Mais voltado e adaptado para sistemas de supervis�o e coleta de dados do tipo SCADA (Supervisory Control and Data Acquisition)

- Amplamente utilizado no mercado de IOT

- Simples o suficiente sem deixar de contemplar caracter�sticas como seguran�a, qualidade de servi�o e facilidade de implementa��o

- O padr�o de troca de mensagens no MQTT � o publish/subscriber (publicador/subscritor) via o elemento Broker

Image...

- A identifica��o das mensagens no MQTT se d� atrav�s de t�picos (URI)

- Formato:
	/<device>/<deveice_key>/<param>/<value>
	/dev-15/c1234513-cd3252345-h123983/temperatura/�C
	/dev-15/c1234513-cd3252345-h123983/tens�o-entrada/V
	/dev-15/c1234513-cd3252345-h123983/tens�o-saida/V
	/dev-15/c1234513-cd3252345-h123983/tens�o-saida/V

- Usu�rio entra em contato com a empresa, negocia os par�metros desejados

- Empresa cadastra o dispositivo e parametros, definidos pelo cliente, no sistema, al�m dos 'reacts' - envio de email

- Sistema gera a t�pico(URI) dos parametros

- Empresa configura a NodeMCU ESP-8266 - Configura��o da rede e os t�picos/portas dos par�metros contratados

- Cliente tem acesso ao sistema, visualizando os dispositivos e monitorando os par�mentros contratados



