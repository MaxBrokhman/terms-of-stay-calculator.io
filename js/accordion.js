//accordion.js
const isOpen = (elem) => elem.classList.contains('open');

export default class Accordion {
    constructor(accordionItems, button, body){
        this.accordionItems = accordionItems;
        this.button = button;
        this.body = body;
    }
    buttonHandler(item){
        item.classList.toggle('open');
        const body = item.querySelector(this.body);
        body.style.height = isOpen(item)? body.scrollHeight + 'px' : 0;
    }
    init(){
        this.accordionItems.forEach((item) => {
            item.addEventListener('click', (evt)=>{
                evt.preventDefault();
                this.buttonHandler(item);
            });
        })
    }
}