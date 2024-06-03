export default () => (`
<h2 class="mx-auto mt-5 mb-5">Profile</h2>
<div class="mx-auto mt-0 flex justify-center align-center gap-5 flex-wrap">

<!-- Card pour modifier le nom, l'email et le mot de passe -->
<div class="bg-white p-6 rounded shadow w-full sm:w-4/5">
  <h3 class="text-xl font-semibold mb-4 text-yellow-500">Modifier le profil</h3>
  <form id="update-profile-form" class="space-y-4">
    <div>
      <label for="name" class="block text-sm font-medium text-gray-700">Nom</label>
      <input type="text" id="name" name="name"
        class="mt-1 block w-full border border-gray-300 rounded py-2 px-3 text-black">
    </div>
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
      <input type="email" id="email" name="email"
        class="mt-1 block w-full border border-gray-300 rounded py-2 px-3 text-black">
    </div>
    <div>
      <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
      <input type="password" id="password" name="password"
        class="mt-1 block w-full border border-gray-300 rounded py-2 px-3 text-black">
    </div>
    <div>
      <label for="confirm-password" class="block text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
      <input type="password" id="confirm-password" name="confirm-password"
        class="mt-1 block w-full border border-gray-300 rounded py-2 px-3 text-black">
    </div>
    <button type="submit" class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">Mettre à jour</button>
  </form>
</div>

<!-- Card pour le bouton de déconnexion -->
<div class="bg-white p-6 rounded shadow w-full sm:w-4/5 mb-5">
  <h3 class="text-xl font-semibold mb-4 text-yellow-500">Déconnexion</h3>
  <button id="logout" class="bg-red-600 text-white px-4 py-2 rounded">Se déconnecter</button>
</div>

</div>
`);
