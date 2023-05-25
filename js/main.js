/* navBar Responsive Apparition */

const menuToggle = document.querySelector('.menu-toggle');
const navResponsive = document.querySelector('#nav_responsive');
const burgerLine1 = document.querySelector('.burgerline1');
const burgerLine2 = document.querySelector('.burgerline2');
const burgerLine3 = document.querySelector('.burgerline3');

document.addEventListener("click", function(e){
    var eTarget = e.target;
    navResponsiveOpenOrNot(eTarget);
});

function navResponsiveOpenOrNot(e){

        //open
    if ( navResponsive.style.transform != 'translateX(0px)' && (e === menuToggle || e === burgerLine1 || e === burgerLine2 || e === burgerLine3 )){
        navResponsive.style.transform = ("translateX(0px)");
        burgerLine1.style.transform = ('translateY(3px) rotate(45deg)');
        burgerLine2.style.display =("none");
        burgerLine3.style.transform = ('translateY(-3px) rotate(-45deg)');

        //close
    } else if (navResponsive.style.transform = 'translateX(0px)' && e != navResponsive) {
        navResponsive.style.transform = ("translateX(100%)");
        burgerLine1.style.transform = ('unset');
        burgerLine2.style.display =("unset");
        burgerLine3.style.transform = ('unset');
    }
}

/* navBar Responsive Apparition */
// Form to Email start

// All Const Form
const form = document.querySelector('#form');
const inputName = document.querySelector('#name');
const inputFirstName = document.querySelector('#first_name');
const inputEmail = document.querySelector('#email');
const inputTel = document.querySelector('#tel');
const inputDate = document.querySelector('#date');
const inputTextForm = document.querySelector('#text_form');

const inputSubmit = document.querySelector("#submit");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const telRegex = /^(0|\+33|0033)[1-9]([-. ]?[0-9]{2}){4}$/;

const spanConfirm = document.querySelector('#confirm');
const allInput = document.querySelectorAll(".input");
const allError = document.querySelectorAll(".error");
const errorEmail = document.querySelector('#error_email');
const errorTel = document.querySelector('#error_tel');


// J'écoute le click du submit et non le submit sinon le navigateur
// envoit déjà le submit, et donc fait les vérif de requiered et pattern dans les inputs
//Avant de faire ma vérif JS et donc j'ai pas les messages personnalisé...
//L'écoute de cet event marche quand même avec la touche entrée tkt
inputSubmit.addEventListener('click', function(e){    

    //empeche l'envoit du submit + rafraichissement de la page
    e.preventDefault();

    //Reset des message d'error
    resetError();

    //Lance la vérification JS du Form et de ses inputs
    checkValidityForm();
  })

 //Function vérification inputs du Form
function checkValidityForm(){

    //initialisation d'une variable validate + i
    let validate = true;
    let i = 0;

    // validity match en fonction des attribut de tes inputs, si ton input
    //dispose d'un requiered, valueMissing va renvoyer true ou false, mais
    //si tu n'as pas de requiered, alors np. Il "skip" et renvoit true
    // Par contre ca marche pas bien avec les pattern... Le regex des pattern est pas
    //compatible avec celui de JS. Donc bon, je fais du regex en JS classique XD

    if (!telRegex.test(inputTel.value)){
        errorTel.textContent = "le champ n'est pas valide";
        validate = false;
    }

    if(!emailRegex.test(inputEmail.value)){
        errorEmail.textContent = "le champ mail n'est pas valide";
        validate = false;
    }

    // Verification des inputs + message d'erreur
    allInput.forEach(input => {

        if(input.validity.valueMissing){
            allError[i].textContent = "Le champ est obligatoire.";
            validate = false;
        } else if(input.validity.typeMismatch){
            allError[i].textContent = "Le champ n'est pas valide";
            validate = false;
        }

        // Incrémentation du i
        i++
    });

    if(validate){
        //Création du FormData pour envoyer en php etc
        createAjaxForFormToEmail();
    }
}

function createAjaxForFormToEmail(){

    //Création d'un FormData pour récup les infos de notre Form
    const formData = new FormData(form);
  
    //J'envoie mon formData en méthod POST au fichier formToEmail.php
    fetch("php/formToEmail.php", { method: "POST", body: formData})
  
    //Je récupère ensuite la réponse de mon fichier php (en Json)
    //Donc traduction =>
    .then(response =>response.json())
  
    //Je récupère le résultat et l'exploite
    .then((result) => {

  
      if(result === true){
  
        spanConfirm.style.color= "#1BBA02"
        spanConfirm.textContent = "Votre message à bien été transmis, merci beaucoup";
  
        //Reset des error
        resetError();

        //Reset du Form
        form.reset();
  
      } else if(result === false){
  
        spanConfirm.style.color= "#FF3C30";
        spanConfirm.textContent = "Une erreur s'est produite";
  
      } else if(result.includes('inputEmailNonValide')) {
        
        spanConfirm.style.color= "#FF3C30";
        spanConfirm.textContent = "Le champs mail n'est pas valide.";

      } else if(result.includes('inputTelNonValide')) {
        
        spanConfirm.style.color= "#FF3C30";
        spanConfirm.textContent = "Les champs téléphone n'est pas valide.";
  
      } else {
  
        spanConfirm.style.color= "#FF3C30";
        spanConfirm.textContent = "Les champs ne peuvent pas être vides.";
      }
    })
  }
 
//Fonction reset des errors et du confirm
function resetError(){

    // le caractère '\u00A0' est l'espace insécable. Utile pour les malvoyents
    allError.forEach(error => {
        error.textContent = '\u00A0';
    });
}


// Form to Email stop 