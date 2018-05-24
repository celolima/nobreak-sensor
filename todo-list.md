## ESP8266

* Implementar a leitura de tensão de entrada e saida (maior q X == 110V ou 220V)

* Implementar condição minima para leitura da Corrente, atualmente sem carga está medindo em torno de 800mA

* Implementar cômputo de potência

* ~~Implementar a leitura de frequencia de entrada e saida no MUX -- Leitura conforme frequencia de entrada e salva em uma variável. Envio para MQTT de acordo com loop~~

* ~~Revisar portas do MUX~~

* ~~Implementar a leitura da tensão da bateria~~

* ~~Implementar o controle dos LEDs de acordo com status~~

## Software WEB

* Converter data hora do banco para valor legível

* Revisar tela cadastro de device, para gravar no banco utilziando a API

* Revisar tela cadastro de reacts, para gravar no banco utilziando a API

* Remover campo de msg no react

* Remover consulta synchronyzed da API, antes do retorno da requisição

* Adicionar tela de Login

* Adicionar permissões de vizualização da telas
    usuário root vizualiza todos os dispositivos, de todos os clientes

* Permitir exclusão de um device, e todos os topics e reacts

* Deve ser apenas permitido inserir um parametro distinto no device!

* ~~Aumentar visualização do valor dos parâmetros, na tela FullDevice~~

* ~~Adicionar gráficos das ultimas leituras, contendo data e hora~~ 

* ~~Criar tabela (html) contendo os dados do banco~~

* ~~Criar tabela de clientes~~

* ~~Criar tabela entre clientes <--> devices Via data.json~~ 

*   ~~No cadastro do dispositivo não pode colocar '/' no nome do parametro. Se tiver o caractere '/' não é possível obter o id
device via tópico!~~    

## Documentação

* Gravar CD com os fontes

* Gerar um desenho do funcionamento da aplicação ESP com WEB

* Verificar o que será falado na apresentação do sistema

* Fazer apresentação WINK (funcionamento do Software - export EXE) - Após implementação acima

* Adicionar explicação no plano de projeto - Explicar onde o software roda, e onde pode ser implantado (Firebase)

* Verificar viabilidade de um servidor MQTT remoto - ou implantar no Firebase

* Adicionar WINK gerado acima na apresentação

* ~~Revisar documentação gerada pelo Leo~~

* ~~Revisar documentação gerada pelo Gabriel~~

* ~~Revisar explicação do funcionamento da ESP e Software WEB~~

* ~~Adicionar printscreen do sistema WEB no plano de projeto~~