export default (user) => (`
<h2 class="mx-auto mt-5 mb-5">Profile</h2>
<div class="mx-auto mt-0 flex justify-center align-center gap-5 flex-wrap">

<!-- Card pour modifier le nom, l'email et le mot de passe -->
<div class="bg-white p-6 rounded shadow w-full sm:w-4/5">
  <h3 class="text-xl font-semibold mb-4 text-yellow-500">Modifier le profil</h3>
  <form class="update-profile space-y-4">
    <div>
      <label for="name" class="block text-sm font-medium text-gray-700">Nom</label>
      <input type="text" name="name" value="${user.name}"
        class="name mt-1 block w-full border border-gray-300 rounded py-2 px-3 text-black">
    </div>
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
      <input type="email" name="email" value="${user.email}"
        class="email mt-1 block w-full border border-gray-300 rounded py-2 px-3 text-black">
    </div>
    <div>
      <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
      <input type="password" name="password"
        class="password mt-1 block w-full border border-gray-300 rounded py-2 px-3 text-black">
      <p class="password-error hidden text-red-500">Mot de passe incorrecte</p>
    </div>
    <div>
      <label for="confirm-password" class="block text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
      <input type="password" name="confirm-password"
        class="confirm-password mt-1 block w-full border border-gray-300 rounded py-2 px-3 text-black">
      <p class="password-error hidden text-red-500">Mot de passe incorrecte</p>
    </div>
    <button type="submit" class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">Mettre à jour</button>
  </form>
</div>

<!-- Card pour le bouton de déconnexion -->
<div class="bg-white p-6 rounded shadow w-full sm:w-4/5 mb-5">
  <h3 class="text-xl font-semibold mb-4 text-yellow-500">Déconnexion</h3>
  <button class="bg-red-600 text-white px-4 py-2 rounded logout-profile">Se déconnecter</button>
</div>

</div>
`);
