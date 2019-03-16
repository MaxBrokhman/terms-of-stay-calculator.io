//result.js
export default class{
    constructor(value, error){
        this.field = document.querySelector('.app-interface__app-result');
        this.value = value;
        this.error = error;
    }
    render(){
        this.field.querySelector('.app-result__content').textContent = this.value;
        this.field.querySelector('.app-result__icon').style.backgroundColor = 
            this.error ? '#EC2127' : '';
        this.field.querySelector('.app-result__header').textContent = 
            this.error ? 'Ошибка' : 'Результат';
        this.field.style.display = 'block';
    }
};