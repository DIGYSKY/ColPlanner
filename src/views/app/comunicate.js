export default (comunicates) => (`
<h2 class="text-2xl font-bold text-yellow-500 mx-auto mt-5 mb-5">Communicate</h2>
<div class="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 w-full min-h-full">

<!-- Card pour afficher tous les messages -->
<div class="bg-white p-6 rounded shadow w-full">
  <h3 class="text-xl font-semibold mb-4 text-yellow-500">Messages</h3>
  <div class="overflow-auto">
    <ul id="message-list" class="space-y-2 h-64 overflow-auto">
      ${comunicates.length > 0 ? comunicates.map((comunicate) => `
        <li class="flex flex-col items-center bg-gray-200 p-4 rounded text-black font-bold mb-4">
          <span class="text-lg text-red-600">${comunicate.title}</span>
          <span class="text-sm text-gray-600">${comunicate.content}</span>
          <div class="flex flex-col items-left mt-2">
            <span class="text-sm text-green-600">Date: ${comunicate.created_at}</span>
          </div>
          <div class="flex justify-center mt-4 w-full">
            <button class="delete-comunicate bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-2" data-id="${comunicate.id}">Supprimer</button>
          </div>
        </li>
      `).join('') : '<p class="text-gray-600">Aucun message</p>'}
    </ul>
  </div>
</div>

<!-- Card pour ajouter un message -->
<div class="bg-white p-6 rounded shadow w-full">
  <h3 class="text-xl font-semibold mb-4 text-yellow-500">Ajouter un message</h3>
  <form class="add-comunicate space-y-4">
    <div class="flex gap-4 items-center">
      <input type="text" name="title" placeholder="Titre" class="mt-1 block w-full border border-gray-300 rounded py-2 px-3 text-black">
    </div>
    <textarea name="content" placeholder="Description" class="mt-1 block w-full border border-gray-300 rounded py-2 px-3 text-black resize-vertical"></textarea>
    <input type="submit" value="Ajouter" class="mt-2 p-2 bg-yellow-500 text-white rounded cursor-pointer hover:bg-yellow-600">
  </form>
</div>

</div>
`);
