O que é MQTT? 

- Um protocolo de troca de mensagens M2M (Machine to Machine) desenvolvido pela IBM

- Necessita de pouca banda

- Utilizado por hardwares extremamente simples

- É baseado no TCP/IP

- Mais voltado e adaptado para sistemas de supervisão e coleta de dados do tipo SCADA (Supervisory Control and Data Acquisition)

- Amplamente utilizado no mercado de IOT

- Simples o suficiente sem deixar de contemplar características como segurança, qualidade de serviço e facilidade de implementação

- O padrão de troca de mensagens no MQTT é o publish/subscriber (publicador/subscritor) via o elemento Broker

Image...

- A identificação das mensagens no MQTT se dá através de tópicos (URI)

- Formato:
	/<device>/<deveice_key>/<param>/<value>
	/dev-15/c1234513-cd3252345-h123983/temperatura/°C
	/dev-15/c1234513-cd3252345-h123983/tensão-entrada/V
	/dev-15/c1234513-cd3252345-h123983/tensão-saida/V
	/dev-15/c1234513-cd3252345-h123983/tensão-saida/V

- Usuário entra em contato com a empresa, negocia os parâmetros desejados

- Empresa cadastra o dispositivo e parametros, definidos pelo cliente, no sistema, além dos 'reacts' - envio de email

- Sistema gera a tópico(URI) dos parametros

- Empresa configura a NodeMCU ESP-8266 - Configuração da rede e os tópicos/portas dos parâmetros contratados

- Cliente tem acesso ao sistema, visualizando os dispositivos e monitorando os parâmentros contratados



