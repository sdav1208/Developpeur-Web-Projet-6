// Pour afficher la fenêtre login

const submit = document.getElementById("submit");
console.log(submit);
submit.addEventListener("click", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value; // Récupère la valeur du champ d'entrée de l'email
  const password = document.getElementById("password").value; // Récupère la valeur du champ d'entrée du mot de passe
console.log(email,password);
  let isConnect = await login(email, password);

   if (isConnect) {
   window.location.href = "./index.html"; // Redirige l'utilisateur vers la page index.html
 } else {
  alert("L’authentification a échoué. Veuillez vérifier votre identifiant et votre mot de passe et réessayer.");
}

});


