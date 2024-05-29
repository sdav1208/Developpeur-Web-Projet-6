//   démarrer le Backend  //

// ouvrir un terminal , se positionner dans le répertoire Backend et lancer npm install

// pour installer les dépendances

// lancer npm start pour lancer le projet

//***************************DECLARATION DES VARTIABLES*****************************

//-----création d'une constante  gallery qui sera utilisé comme parent des works
const gallery = document.querySelector(".gallery");


//----------------------Rapatrier les fiches du repertoire Works........

async function getWorks(){
    const response=await fetch("http://localhost:5678/api/works");
return await response.json();

// pour test sur console
    // const responseJson= await response.json();
// console.log(responseJson);
}
// getWorks();


//-----------------è-Afficher les fiches dans le DOM
//
async function printWorks(){

    const arrayWorks= await getWorks();

 //tester la présence du tableau dans la console   
// console.log(arrayWorks);

//----------On bouche sur le tableau arrayWorks pour créer 
//les éléments figure,fig et figcaption 

arrayWorks.forEach(arrayWork => {
    const figure=document.createElement("figure");
    const img=document.createElement("img");
    const figCaption=document.createElement("figcaption");
    
///----positionner les constantes dans la structure DOM
figure.appendChild(img);
figure.appendChild(figCaption);
gallery.appendChild(figure);

//------- sélectionner le contenu qui apparaitra à l'image
img.src=arrayWork.imageUrl;
figCaption.textContent=arrayWork.title;

});

}
printWorks();

// vérifier dans la console - réseau - works si état 200 = ok 


// voir encore la partie demandée par Sandro pour copie de la DB en local