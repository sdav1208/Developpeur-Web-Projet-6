//   démarrer le Backend  //
// ouvrir un terminal , se positionner dans le répertoire Backend et lancer npm install
// pour installer les dépendances
// lancer npm start pour lancer le projet

//----------           APPEL DE FONCTION--------------------------------------

(async()=>{
  window.works=await getWorks();
  console.log(window.works)
})();

// (async()=>{
// window.categories=await getCategories();
// console.log(window.categories)
// })();



//***************************VARIABLES*****************************************

//-----création d'une constante  gallery qui sera utilisé comme parent des works
let gallery = document.querySelector(".gallery");

//*****************************************************************************

 //----------------------CREATION DES BOUTONS-----------------------------------
async function createBtn() {
const categories = await getCategories();
categories.unshift({ id: 0, name: "Tous" });
  const filters= document.querySelector(".filters")
  categories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.classList.add("filter__btn");
    btn.id = cat.id;
    btn.innerText = cat.name;
    filters.appendChild(btn);
    btn.addEventListener("click", () => {
//----------Selectionne tous les éléments  ".filter__btn"--------------------
      document
        .querySelectorAll(".filter__btn")
//----- Supprime la classe 'filter__btn--active' de tous les éléments--------
        .forEach((item) => item.classList.remove("filter__btn--active")); 
//----- Ajoute la classe 'filter__btn--active' à l'élément cliqué------------
      btn.classList.add("filter__btn--active"); 
      console.log(cat.id);
//-------------// Filtre les travaux en fonction de la catégorie sélectionnée
      filterWorks(cat.id); 
    });
  });
//------------ Sélectionne par défaut le premier élément 'Tous'------------
  filters.firstChild.classList.add("filter__btn--active");
}

//---------- Fonction pour filtrer les travaux par catégorie.---------------
async function filterWorks(categoryId) {
  if (categoryId === 0) {
    console.log(categoryId);
    displayFilteredWorks(window.works);
    return;
  }

//------------- Filtrer les projets selon la catégorie sélectionnée.---------
  const filteredWorks =  window.works.filter(
  (projet) => projet.category.id === categoryId
  );
  console.log(categoryId);
  displayFilteredWorks(filteredWorks);
}

//----------- Affiche les projets filtrés dans la galerie--------------------
async function displayFilteredWorks(filteredWorks = null) {
 // Vide la galerie avant d'ajouter les nouveaux éléments pour éviter les doublons
  gallery.innerHTML = "";

// Si aucun projet filtré n'est fourni, on récupère tous les projets--------
  if (filteredWorks == null) {
    filteredWorks = await getWorks();
  }

//------------ Crée et ajoute chaque élément de projet à la galerie--------
  for (let projet of filteredWorks) {
    const figureElement = document.createElement("figure");
    const figcaptionElement = document.createElement("figcaption");
    const imgElement = document.createElement("img");
    imgElement.src = projet.imageUrl;
    figcaptionElement.innerText = projet.title;
    figureElement.appendChild(imgElement);
    figureElement.appendChild(figcaptionElement);
    gallery.appendChild(figureElement);
  }
}


//----------- Vérifie si l'utilisateur est connecté--------------------
function isConnected() {
  // Retourne vrai si le token existe dans le sessionStorage, faux sinon
  return sessionStorage.getItem("token") !== null;
}

// Gère le bouton de connexion/déconnexion en fonction de l'état 
function handleLoginButton() {
  const loginButton = document.querySelector("#login-button");

// ------------Redirige vers la page d'accueil après déconnexion-----------------
  if (isConnected()) {
    loginButton.innerText = "logout";
    loginButton.addEventListener("click", () => {
      sessionStorage.removeItem("token");
      window.location.href = "./index.html"; 
    });

 // -----Redirige vers la page de connexion-------------------------------------
  } else {
    loginButton.innerText = "login";
    loginButton.addEventListener("click", () => {
      window.location.href = "./login.html";
    });
  }
}

// Affiche ou masque les éléments  en fonction de l'état de connexion
function handleAdminElements() {
  const adminElements = document.querySelectorAll(".admin-element");
// ------------------Affiche les éléments --------------------------- 
  if (isConnected()) {
    adminElements.forEach((element) => {
      element.classList.remove("hidden"); 
    });
// -----------------Cache les éléments-------------------------------
  } else {
    adminElements.forEach((element) => {
      element.classList.add("hidden"); 
    });
  }
}

// Ajuste l'affichage d' éléments du DOM en fonction de l'état de connexion
function adjustDisplayBasedOnLogin() {
  const loggedIn = isConnected();
  const headerEdit = document.getElementById("header__edit");
  const editWorks = document.getElementById("edit__works");
  const filters = document.querySelector(".filters");

  // Si l'utilisateur est connecté, affiche les éléments d'édition et masque le conteneur de filtres
  if (loggedIn) {
    headerEdit.style.display = "flex";
    editWorks.style.display = "block";
     filters.style.display = "none";
  } else {
 // Si l'utilisateur n'est pas connecté , masque les éléments d'édition et affiche le conteneur de filtres
    headerEdit.style.display = "none";
    editWorks.style.display = "none";
     filters.style.display = "flex";
  }
}

// Initialisation des fonctions de connexion et d'affichage lors du chargement de la page
document.addEventListener("DOMContentLoaded", () => {
  adjustDisplayBasedOnLogin();
  handleLoginButton();
});

// Fonction d'initialisation principale lors chargement de la page
(function main() {
  handleLoginButton();
  displayFilteredWorks();
  createBtn();
  handleAdminElements();
})();

