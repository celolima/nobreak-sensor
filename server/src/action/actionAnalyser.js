// data['param'] = incomeObj.param;
// data['currVal'] = incomeObj.value;
// data['condition'] = react.condition;
// data['conditionVal'] = react.value;    
// const conditions = ['maior que','maior ou igual que','menor que','menor ou igual que', 'igual a', 'diferente de'];

const checkAndAct = (data) => {
    const currVal = parseInt(data.currVal);
    const conditionVal = parseInt(data.conditionVal);
    console.log(data.param.concat(' = ', data.currVal, ' is ', data.condition, ' ', data.conditionVal, ' ?'));

    switch(data.condition) {
        case 'maior que':
            if(currVal > conditionVal) {

            }
            console.log(currVal > conditionVal); 
            break;
        case 'maior ou igual que':
            if(currVal >= conditionVal) {

            }
            console.log(currVal >= conditionVal); 
            break;
        case 'menor que':
            if(currVal < conditionVal) {

            }
            console.log(currVal < conditionVal); 
            break;
        case 'menor ou igual que':
            if(currVal <= conditionVal) {

            }
            console.log(currVal <= conditionVal); 
            break;
        case 'igual a':
            if(currVal === conditionVal) {

            }
            console.log(currVal === conditionVal); 
            break;
        case 'diferente de':
            if(currVal !== conditionVal) {

            }
            console.log(currVal !== conditionVal); 
            break;
        default: console.log('invalid condition action');
    }
};

export { checkAndAct };