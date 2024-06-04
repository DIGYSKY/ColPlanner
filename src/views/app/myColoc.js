export default (colocData, currentColocId) => (`
<h2 class="mx-auto mt-5 mb-5">My coloc</h2>
<div class="mx-5 mt-0 flex flex-col gap-5 w-full">

<!-- Card pour afficher toutes les personnes présentes dans la colocation -->
<div class="bg-white p-6 rounded shadow w-full">
  <h3 class="text-xl font-semibold mb-4 text-yellow-500">Personnes dans la colocation</h3>
  <ul id="coloc-members" class="space-y-2 max-h-64 overflow-auto">
    ${colocData.users.map((user) => `
      <li class="flex justify-between items-center bg-gray-200 p-4 rounded text-black font-bold">
        <span>${user.user_name}</span>
        <span>${user.user_solde}</span>
        <button class="bg-red-600 text-white px-4 py-2 rounded" data-user-id="${user.user_id}" data-user-name="${user.user_name}">Supprimer</button>
      </li>
    `).join('')}
  </ul>
</div>

<!-- Card pour ajouter des personnes via leur email -->
<div class="bg-white p-6 rounded shadow h-60 w-full">
  <h3 class="text-xl font-semibold mb-4 text-yellow-500">Ajouter une personne</h3>
  <form id="add-member-form" class="space-y-4">
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
      <input type="email" id="email" name="email"
        class="mt-1 block w-full border border-gray-300 rounded py-2 px-3 text-black">
    </div>
    <button type="submit" class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">Ajouter</button>
  </form>
</div>

<!-- Card pour afficher le lien pour rejoindre la colocation -->
<div class="bg-white p-6 rounded shadow h-64 w-full">
  <h3 class="text-xl font-semibold mb-4 text-yellow-500">Lien pour invité à la colocation</h3>
  <div class="flex items-center space-x-4 mb-3">
    <input type="text" value="http://example.com/join-coloc" readonly
      class="block w-full border border-gray-300 rounded py-2 px-3 text-black">
    <button class="bg-blue-500 text-white px-4 py-2 rounded">Copier</button>
  </div>
  <h3 class="text-xl font-semibold mb-4 text-yellow-500">Rejoindre la colocation</h3>
  <div class="flex items-center space-x-4">
    <input type="text" value=""
      class="block w-full border border-gray-300 rounded py-2 px-3 text-black">
    <button class="bg-blue-500 text-white px-4 py-2 rounded text-nowrap">Go !</button>
  </div>
</div>

<!-- Card pour sélectionner une colocation et modifier le nom -->
<div class="bg-white p-6 rounded shadow h-auto w-full mb-5">
  <h3 class="text-xl font-semibold mb-4 text-yellow-500">Sélectionner une colocation</h3>
  <form id="select-coloc-form" class="space-y-4">
    <div>
      <label for="coloc" class="block text-sm font-medium text-gray-700">Colocation</label>
      <select id="coloc" name="coloc" class="mt-1 block w-full border border-gray-300 rounded py-2 px-3 text-black">
        <option value="" disabled selected>Choisir une colocation</option>
        ${Object.values(colocData.coloc).map((coloc) => `
          <option value="${coloc.coloc_id}" ${coloc.coloc_id === currentColocId ? 'selected' : ''}>${coloc.coloc_name}</option>
        `).join('')}
      </select>
    </div>
    <button type="submit" class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">Sélectionner</button>
  </form>

  <h3 class="text-xl font-semibold mb-4 text-yellow-500 mt-6">Modifier le nom de la colocation</h3>
  <form id="edit-coloc-name-form" class="space-y-4">
    <div>
      <label for="coloc-name" class="block text-sm font-medium text-gray-700">Nouveau nom</label>
      <input type="text" id="coloc-name" name="coloc-name" class="mt-1 block w-full border border-gray-300 rounded py-2 px-3 text-black" placeholder="Entrez le nouveau nom">
    </div>
    <button type="submit" class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">Modifier</button>
  </form>
</div>

<!-- Code pour afficher un pop-up de confirmation au milieu de l'écran -->
<div class="confirmation-popup fixed inset-0 hidden items-center justify-center bg-black bg-opacity-50 z-50">
  <div class="bg-white p-6 rounded shadow-lg text-center">
    <p class="mb-4 text-black">Voulez-vous supprimer l'utilisateur : <span class="user-name"></span> ?</p>
    <div class="flex justify-center space-x-4">
      <button class="confirm-button bg-red-600 text-white px-4 py-2 rounded">Oui</button>
      <button class="cancel-button bg-blue-500 text-white px-4 py-2 rounded">Non</button>
    </div>
  </div>
</div>

</div>
`);
