import * as mail from './mail'
import * as dao from '../dao/dao'

/*
data['devName'] = incomeObj.devName;    
data['currVal'] = incomeObj.valor_lido;
data['devKey'] = key;    
data['paramName'] = paramName;            
data['unMed'] = row.unidade;
data['condition'] = row.condition;
data['conditionVal'] = row.valor_ref;
data['action'] = row.action_type;
*/
// const conditions = ['maior que','maior ou igual que','menor que','menor ou igual que', 'igual a', 'diferente de'];

const checkAndAct = (data) => {
    const currVal = parseFloat(data.currVal);
    const conditionVal = parseFloat(data.conditionVal);
    //console.log(data.param.concat(' = ', data.currVal, ' is ', data.condition, ' ', data.conditionVal, ' ?'));

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
        default: console.log('invalid condition action');
    }
};

const checkAndSendEmail = (data) => {
    if(data.action && data.action.actionType === "e-mail") {
        let msg = '<font color="red"><h3>Alerta!</h3></font>'        
            .concat('<h4>' + data.devName + '</h4>')
            .concat('<p> Foi detectado um valor não desejado no parâmetro ', data.paramName.toUpperCase())
            .concat(' ', 'do dispositivo ', data.devName,'</p>')
            .concat('<p>', data.paramName.toUpperCase(), ' é ', data.condition, ' ', data.conditionVal, data.unMed, '</p>')
            .concat('<p> Valor atual: ', data.currVal, data.unMed, '</p>')
            .concat('<p> Para sanar o problema, favor entrar em contato com a equipe responsável pelo dispositivo: </p>')
            .concat('<div>','<b>Dispositivo: </b>',data.devName,'</div>')
            .concat('<div>','<b>ID: </b>',data.id,'</div>');
        const mailOptions = {
            from: 'tel73n@gmail.com', // sender address
            to: data.action.email, // list of receivers
            subject: '['.concat(data.devName,']',' Alerta! ',data.paramName.toLowerCase(), ' ', data.condition, ' ', data.conditionVal, data.unMed), // Subject line
            html: msg
        };
        dao.createLogEmail(data);
        //sendEmail(mailOptions);
    }
};

const sendEmail = (mailOptions) => {
    console.log('enviando email');
    mail.sendEmail(mailOptions);
};

export { checkAndAct };