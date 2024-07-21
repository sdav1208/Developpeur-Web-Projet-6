async function login(email, password) {
  try {
    let response = await fetch("http://localhost:5678/api/users/login", {
      // Envoie une requête POST vers l'endpoint de connexion
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Définit l'en-tête de la requête pour indiquer des données JSON
      },
      body: JSON.stringify({ email, password }), // Convertit l'email et le mot de passe en JSON et les inclut dans le corps de la requête
    });

    if (!response.ok) {
      // Si le statut de la réponse n'est pas OK (200), lance une erreur
     return false
    }
    let data = await response.json(); // Analyse le corps de la réponse en tant que JSON

    sessionStorage.setItem("token", data.token); // Stocke le jeton dans le stockage de session
    return true
  } catch (e) {
    return false
  }
}

function logout() {
    sessionStorage.removeItem("token")
}

