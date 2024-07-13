//***************************VARIABLES*****************************
// Variable globale pour stocker les travaux afin d'éviter des requêtes API multiples inutiles.
// let data = null;

// Fonction asynchrone pour récupérer les projets depuis l'API.
 async function getWorks() {
  // Vérifie si les travaux ont déjà été récupérés et stockés dans la variable globale.
  // if (!window.works) {
    try {
      // envoi la requête à l'API.
      const response = await fetch("http://localhost:5678/api/works");
      // Convertit la réponse en JSON et la stocke dans la variable globalWorks
      let data = await response.json();
      console.log("Projets récupérés:", data);

      return data;
    } catch (error) {
      console.error("la récupération des projets a échoué:", error.message);
      // Assigner un tableau vide en cas d'échec de la récupération des données.
      // data = [];
    }
  // }
}


// Fonction asynchrone pour effacer des projets.
 async function deleteWork(id) {
  try {
    let resp = await fetch("http://localhost:5678/api/works/" + id, {
      method: "DELETE",
    });

    return resp.OK;
    console.log(data);
  } catch (error) {
    console.error("l'effacement du projet a échoué:", error.message);
  }
}

// fonction asynchrone pour ajouter un projet
 async function addWork(title, description, imgURL) {
  try {
    let form = new formData();
    form.append(title);
    form.append(description);
    form.append(imgURL);

    let resp = await fetch("http://localhost:5678/api/works/", {
      method: "POST",
      "content-type": "multipart/form-data",
      body: form,
    });

    return resp.OK;
  } catch (error) {
    console.error("l'ajout du projet a échoué:", error.message);
  }
}

