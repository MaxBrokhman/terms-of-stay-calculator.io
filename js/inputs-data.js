//inputs-data.js

export default class {
    constructor(inInputs, outInputs){
        this['in-dates'] = {};
        this['out-dates'] = {};
        inInputs.forEach(input => {
            this['in-dates'][input.name] = input.value;
        });
        outInputs.forEach(input => {
            this['out-dates'][input.name] = input.value;
        });
    }
    get(newInInputs, newOutInputs){
        newInInputs.forEach(input => {
            input.value = this['in-dates'][input.name];
        });
        newOutInputs.forEach(input => {
            input.value = this['out-dates'][input.name];
        });
    }
}