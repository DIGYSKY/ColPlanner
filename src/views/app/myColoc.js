export default (colocData, invitation, currentColocId, currentUserId) => (`
<h2 class="mx-auto mt-5 mb-5">${colocData.coloc[currentColocId]?.coloc_name ?? 'Aucune colocation sélectionnée'}</h2>
<div class="mx-5 mt-0 flex flex-col gap-5 w-full">

<!-- Card pour afficher les personnes de la colocation -->
<div class="bg-white p-6 rounded shadow w-full">
  <h3 class="text-xl font-semibold mb-4 text-yellow-500">Personnes dans la colocation</h3>
  <ul id="coloc-members" class="space-y-2 max-h-64 overflow-auto">
    ${colocData.users && colocData.users.length > 0 ? colocData.users.map((user) => `
      <li class="flex justify-between items-center bg-gray-200 p-4 rounded text-black font-bold">
        <span>${user.user_name}</span>
        <button class="bg-red-600 text-white px-4 py-2 rounded" data-user-id="${user.user_id}" data-user-name="${user.user_name}">${user.user_id === currentUserId ? 'Quitter' : 'Retirer'}</button>
      </li>
    `).join('') : '<li class="text-center text-gray-500">Aucun utilisateur trouvé</li>'}
  </ul>
</div>

<!-- Card pour ajouter des personnes -->
<div class="bg-white p-6 rounded shadow w-full">
  <h3 class="text-xl font-semibold mb-4 text-yellow-500">Ajouter une personne</h3>
  <form id="add-member-form" class="space-y-4">
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700">Name</label>
      <input type="email" name="email"
        class="mt-1 block w-full border border-gray-300 rounded py-2 px-3 text-black email">
      <div class="hidden bg-gray-100 border border-gray-300 rounded mt-2 p-2 text-black email-suggestions"></div>
    </div>
  </form>
</div>

<!-- Card pour rejoindre la colocation -->
<div class="bg-white p-6 rounded shadow w-full">
  <h3 class="text-xl font-semibold mb-4 text-yellow-500">Vos invitations</h3>
  <div class="flex flex-col items-center space-y-4 mb-3">
  ${invitation && invitation.length > 0 ? invitation.map((inv) => `
    <div class="flex justify-between items-center bg-gray-200 p-4 rounded text-black font-bold w-full">
      <p class="flex flex-col"><span>Vous êtes invité à rejoindre "${inv.coloc_name}"</span><sapn>Par "${inv.inviter_name}"</span></p>
      <div class="flex flex-col space-y-2">
        <button class="bg-green-600 text-white px-4 py-2 rounded" data-invitation-id-accept="${inv.invitation_id}" data-coloc-id="${inv.coloc_id}">Accepter</button>
        <button class="bg-red-600 text-white px-4 py-2 rounded" data-invitation-id-reject="${inv.invitation_id}">Refuser</button>
      </div>
    </div>
  `).join('') : '<div class="text-center text-gray-500">Aucune invitation trouvée</div>'}
  </div>
</div>

<!-- Card sélectionner une colocation modifier le nom -->
<div class="bg-white p-6 rounded shadow h-auto w-full">
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
  <form class="edit-coloc-name-form space-y-4">
    <div>
      <input type="text" name="coloc-name" class="coloc-name mt-1 block w-full border border-gray-300 rounded py-2 px-3 text-black" placeholder="Entrez le nouveau nom" value="${colocData.coloc[currentColocId]?.coloc_name ?? ''}">
    </div>
    <button type="submit" class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">Modifier</button>
  </form>
</div>

<!-- Card colocation -->
<div class="bg-white p-6 rounded shadow h-auto w-full mb-5">
  <h3 class="text-xl font-semibold mb-4 text-yellow-500">Créer une nouvelle colocation</h3>
  <form class="create-coloc-form space-y-4">
    <div>
      <label for="new-coloc-name" class="block text-sm font-medium text-gray-700">Nom de la colocation</label>
      <input type="text" name="new-coloc-name" class="new-coloc-name mt-1 block w-full border border-gray-300 rounded py-2 px-3 text-black" placeholder="Entrez le nom de la colocation">
    </div>
    <button type="submit" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">Créer</button>
  </form>
</div>

<!-- pop-up -->
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
