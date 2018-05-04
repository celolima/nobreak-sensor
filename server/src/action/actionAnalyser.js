import * as mail from './mail'
import * as dao from '../dao/dao'

// data['param'] = incomeObj.param;
// data['currVal'] = incomeObj.value;
// data['condition'] = react.condition;
// data['conditionVal'] = react.value;    
// const conditions = ['maior que','maior ou igual que','menor que','menor ou igual que', 'igual a', 'diferente de'];

const checkAndAct = (data) => {
    const currVal = parseFloat(data.currVal);
    const conditionVal = parseFloat(data.conditionVal);
    console.log(data.param.concat(' = ', data.currVal, ' is ', data.condition, ' ', data.conditionVal, ' ?'));

    switch(data.condition) {
        case 'maior que':
            if(currVal > conditionVal) {
                checkAndSendEmail(data);
            }
            console.log(currVal > conditionVal); 
            break;
        case 'maior ou igual que':
            if(currVal >= conditionVal) {
                checkAndSendEmail(data);
            }
            console.log(currVal >= conditionVal); 
            break;
        case 'menor que':
            if(currVal < conditionVal) {
                checkAndSendEmail(data);
            }
            console.log(currVal < conditionVal); 
            break;
        case 'menor ou igual que':
            if(currVal <= conditionVal) {
                checkAndSendEmail(data);
            }
            console.log(currVal <= conditionVal); 
            break;
        case 'igual a':
            if(currVal === conditionVal) {
                checkAndSendEmail(data);
            }
            console.log(currVal === conditionVal); 
            break;
        case 'diferente de':
            if(currVal !== conditionVal) {
                checkAndSendEmail(data);
            }
            console.log(currVal !== conditionVal); 
            break;
        default: console.log('invalid condition action');
    }
};

const checkAndSendEmail = (data) => {
    if(data.action && data.action.actionType === "e-mail") {
        dao.connect();
        let msg = '<font color="red"><h3>Alerta!</h3></font>'        
            .concat('<h4>' + data.name + '</h4>')
            .concat('<p> Foi detectado um valor não desejado no parâmetro ', data.param.toUpperCase())
            .concat(' ', 'do dispositivo ', data.name,'</p>')
            .concat('<p>', data.param.toUpperCase(), ' é ', data.condition, ' ', data.conditionVal, data.unMed, '</p>')
            .concat('<p> Valor atual: ', data.currVal, data.unMed, '</p>')
            .concat('<p> Favor entrar em contato com a equipe responsável pelo dispositivo ', data.name, ' id: ', data.id,' para sanar o problema','</p>')
        const mailOptions = {
            from: 'tel73n@gmail.com', // sender address
            to: data.action.email, // list of receivers
            subject: '['.concat(data.name,']',' Alerta! ',data.param.toLowerCase(), ' ', data.condition, ' ', data.conditionVal), // Subject line
            html: msg// plain text body
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