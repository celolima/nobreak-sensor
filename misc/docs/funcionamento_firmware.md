# Funcionamento FIRMWARE Node MCU - ESP8266

## O firmware da ESP8266 realiza as seguintes atividades:

- Conexão com a rede Wifi - disponível no ambiente onde a placa será instalada no cliente
- Conexão com o servidor MQTT - Message Queuing Telemetry Transport - protocolo leve de mensagens
- Leitura dos canais digitais, e analógico através do uso de multiplexador
- Envio dos dados lidos na entrada dos pinos digitais e analógico para o servidor MQTT

## Multiplexação

    Como o ESP8266 - possui uma limitação de apenas um pino analógico, optou-se por utilizar um CI 4051 na função de multiplexador.

## Definição dos pinos GPIO

### ESP8266

##### Entradas analógicas:

    A0  -   Entrada analógica do multiplexador

##### Entradas digitais:

    D1  -   Frequência da tensão da rede
    D8  -   Frequência da tensão de saída
    D2  -   Seletor multiplexador
    D3  -   Seletor multiplexador
    D4  -   Seletor multiplexador
    
##### Saídas digitais:

    D7  -   Led1
    D6  -   Led2
    D5  -   Led3

### Mux 4051

##### Entradas analógicas:

    M13 -   Tensão de entrada
    M14 -   Tensão de saída
    M15 -   Tensão da bateria
    M05 -   Corrente de saída
    M01 -   Temperatura

##### Saídas analógicas:

    M03 -   Saída analógica para a ESP8266

##### Entradas digitais:

    M11 -   Seletor - bit mais significativo
    M10 -   Seletor
    M09 -   Seletor - bit menos significativo


## Funcionamento dos LEDs

    Led1 - Wifi disponível
    Led2 - Tensão de entrada
    Led3 - Tensão da bateria interna

    Ao conectar na rede Wifi local do cliente e servidor Mqtt, o Led1 pisca.
    Caso exista tensão na entrada o Led2 acende.
    Caso não exista tensão na entrada e o a tensão da bateria seja menor do que a referência de 10V, o Led3 acende, indicando consumo da bateria interna do nobreak.

# Funcionamento Software - Monitoramento do nobreak

## O sistema Web possui as seguintes funcionalidades:

- Painel para verificação dos dispositivos cadastrados
- Painel do dispositivo para monitorar os parâmetros de um determinado dispositivo cadastrado    
- Cadastro do dispositivo e seus respectivos parâmetros monitoráveis através do MQTT
- Cadastro das ações a serem executadas quando um parâmetro atingir determinado valor, e envio de e-mail
- Cadastro no banco de dados quando um valor ultrapassar o valor configurado de um parâmetro

### Tabelas do Sistema WEB
```sql
TB_DEVICE
	ID
	DESC
	FK_CLIENT

TB_TOPIC
	ID
	PARAM
	UNMED
	TOPIC
	
TB_DEVICE_TOPIC
	FK_DEVICE
	FK_TOPIC

TB_REACT
	ID
	TYPE
	CONDITION
	VALUE
	FK_ACTION

TB_TOPIC_REACT
	FK_TOPIC
	FK_REACT

TB_ACTION
	ID
	ACTION_TYPE
	DESC
	MESSAGE

TB_LOGEMAIL
	ID
	EMAIL
	DATA_HORA
	DEVICE_ID
	DEVICE_NAME
	CONDITION
	PARAM
	VALOR_LIDO
	VALOR_DEF

TB_CLIENT
	ID
	NOME
	ENDERECO
	NR
	TEL

TB_DEVICE_CLIENTE
	FK_DEV
    FK_CLIENT
```    