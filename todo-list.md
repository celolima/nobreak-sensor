## ESP8266

* ~~Implementar a leitura de frequencia de entrada e saida no MUX -- Leitura conforme frequencia de entrada e salva em uma variável. Envio para MQTT de acordo com loop~~

* ~~Revisar portas do MUX~~

* Implementar a leitura de tensão de entrada e saida (maior q X == 110V ou 220V)

* ~~Implementar a leitura da tensão da bateria~~

* Implementar condição minima para leitura da Corrente, atualmente sem carga está medindo em torno de 800mA

* ~~Implementar o controle dos LEDs de acordo com status~~

## Software WEB

* ~~Aumentar visualização do valor dos parâmetros, na tela FullDevice~~

* ~~Adicionar gráficos das ultimas leituras, contendo data e hora~~ 

* Criar tabela (html) contendo os dados do banco

* Adicionar tela de Login

* ~~Criar tabela de clientes~~

* ~~Criar tabela entre clientes <--> devices Via data.json~~ 

* Adicionar permissões de vizualização da telas
    usuário root vizualiza todos os dispositivos, de todos os clientes

* Permitir exclusão de um device, e todos os topics e reacts

* Deve ser apenas permitido inserir um parametro distinto no device!

* Subscribe quando a API receber um novo tópico, de forma que analise os reacts e eventualmente envie email 
    [Ao gravar, realizar o subscribe no topico]
    [Atualmente o Subscribe é realizado quando o servidor é iniciado]    

*   ~~No cadastro do dispositivo não pode colocar '/' no nome do parametro. Se tiver o caractere '/' não é possível obter o id device via tópico!~~    

## Documentação

* Gravar CD com os fontes

* Revisar documentação gerada pelo Leo

* Revisar documentação gerada pelo Gabriel

* Revisar explicação do funcionamento da ESP e Software WEB

* Fazer apresentação WINK (funcionamento do Software - export EXE) - Após implementação acima

* Adicionar WINK gerado acima na apresentação

* ~~Adicionar printscreen do sistema WEB no plano de projeto~~

* Adicionar explicação no plano de projeto - Explicar onde o software roda, e onde pode ser implantado (Firebase)

* Verificar viabilidade de um servidor MQTT remoto - ou implantar no Firebase




* Calcular potência
* Verificar envio de email
