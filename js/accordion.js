(function(){
    const accordionButtons = document.querySelectorAll('.app-description__accordion-button');
    const accordionBodies = document.querySelectorAll('.app-description__accordion-body');
    for(let i=0; i < accordionButtons.length; i++){
        accordionButtons[i].addEventListener('click', ()=>{
            accordionBodies[i].classList.toggle('open');
            if(accordionBodies[i].classList.contains('open')){
                accordionButtons[i].querySelector('.app-description__accordion-icon').innerHTML="&#9658;";
            } else{
                accordionButtons[i].querySelector('.app-description__accordion-icon').innerHTML="&#9660;";
            }
        }); 
    }
})();