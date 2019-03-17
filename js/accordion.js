//accordion.js
const isOpen = (elem) => elem.classList.contains('open');

export default class {
    constructor(accordionItems, body){
        this.accordionItems = accordionItems;
        this.body = body;
    }
    accordionHandler(item){
        item.classList.toggle('open');
        const body = item.querySelector(this.body);
        body.style.height = isOpen(item)? body.scrollHeight + 'px' : 0;
    }
    init(){
        this.accordionItems.forEach((item) => {
            item.addEventListener('click', (evt)=>{
                evt.preventDefault();
                this.accordionHandler(item);
            });
        })
    }
}