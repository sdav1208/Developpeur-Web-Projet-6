//fonction asynchrone pour récupérer les catégories depuis l'API

async function getCategories() {
    try {
      // envoi requête pour récupérer les catégories.
      const response = await fetch("http://localhost:5678/api/categories");
      console.log(response);
      const categories = await response.json();
      console.log(categories);
      return categories;
    } catch (error) {
      console.error("la récupération des catégories a échoué:", error.message);
      // Assigner un tableau vide en cas d'échec de la récupération des données.
      // categories = [];
    }
  }
  