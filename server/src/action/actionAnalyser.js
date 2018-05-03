import * as mail from 'mail';

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
        let msg = '<h3>Alerta!</h3>'        
            .concat('<h4>' + data.name + '</h4>')
            .concat('<p>')
            .concat(data.param)
            .concat(' é ' + data.condition)
            .concat(data.conditionVal)
            .concat('</p>')
            .concat('<p>Valor atual é: ' + data.currVal)
            .concat('</p>');        
        const mailOptions = {
            from: 'tel73n@gmail.com', // sender address
            to: data.action.email, // list of receivers
            subject: '['.concat(data.name,']','Alerta!',data.param, data.condition, data.conditionVal), // Subject line
            html: msg// plain text body
        };
        sendEmail(mailOptions);
    }
};

const sendEmail = (mailOptions) => {
    console.log('enviando email');
    mail.sendEmail(mailOptions);
};

export { checkAndAct };