import * as mail from './mail'
import * as dao from '../dao/dao'

// const conditions = ['maior que','maior ou igual que','menor que','menor ou igual que', 'igual a', 'diferente de'];

const checkAndAct = (data) => {
    const currVal = parseFloat(data.valor_lido);
    const conditionVal = parseFloat(data.valor_ref);
    
    switch(data.condition) {
        case 'maior que':
            if(currVal > conditionVal) {
                checkAndSendEmail(data);
            }
            // console.log(currVal > conditionVal); 
            break;
        case 'maior ou igual que':
            if(currVal >= conditionVal) {
                checkAndSendEmail(data);
            }
            // console.log(currVal >= conditionVal); 
            break;
        case 'menor que':
            if(currVal < conditionVal) {
                checkAndSendEmail(data);
            }
            // console.log(currVal < conditionVal); 
            break;
        case 'menor ou igual que':
            if(currVal <= conditionVal) {
                checkAndSendEmail(data);
            }
            // console.log(currVal <= conditionVal); 
            break;
        case 'igual a':
            if(currVal === conditionVal) {
                checkAndSendEmail(data);
            }
            // console.log(currVal === conditionVal); 
            break;
        case 'diferente de':
            if(currVal !== conditionVal) {
                checkAndSendEmail(data);
            }
            // console.log(currVal !== conditionVal); 
            break;
        default: console.log('invalid condition action: ', data.condition);
    }
};

/*
 name: 'Tensão entrada',
 key: 'c83036a4-124a-4fa4-b635-5f53ec1c8d04',
 unMed: 'V',
 id: 1,
 tipo: 'Inteiro',
 condition: 'maior que',
 valor_ref: 127,
 fk_param: 1,
 action_type: 'e-mail',
 endereco: 'celorsl@yahoo.com.br',
 message: ''
*/

const checkAndSendEmail = (data) => {
    if(data.action_type === "e-mail") {
        let msg = '<font color="red"><h3>Alerta!</h3></font>'        
            .concat('<h4>' + data.dev_name + '</h4>')
            .concat('<p> Foi detectado um valor não desejado no parâmetro ', data.param_name)
            .concat(' ', 'do dispositivo ', data.dev_name,'</p>')
            .concat('<p>', data.param_name, ' é ', data.condition, ' ', data.valor_ref, data.unMed, '</p>')
            .concat('<p> Valor atual: ', data.valor_lido, data.unMed, '</p>')
            .concat('<p> Para sanar o problema, favor entrar em contato com a equipe responsável pelo dispositivo: </p>')
            .concat('<div>','<b>Dispositivo: </b>',data.dev_name,'</div>')
            .concat('<div>','<b>ID: </b>',data.key,'</div>');
        const mailOptions = {
            from: 'tel73n@gmail.com', // sender address
            to: data.endereco, // list of receivers
            subject: '['.concat(data.dev_name,']',' Alerta! ',data.param_name, ' ', data.condition, ' ', data.valor_ref, data.unMed), // Subject line
            html: msg
        };
        dao.createLogEmail(data);
        sendEmail(mailOptions);
    }
};

const sendEmail = (mailOptions) => {
    console.log('enviando email');
    mail.sendEmail(mailOptions);
};

export { checkAndAct };