export default () => (`
<h2 class="mx-auto mt-5 mb-5">Communicate</h2>
<div class="mx-auto mt-0 flex justify-center align-center gap-5 flex-wrap">

<!-- Card pour afficher tous les messages -->
<div class="card-col w-full sm:w-1/2">
  <h3 class="card-title-col">Messages</h3>
  <div class="card-content-col">
    <ul id="message-list" class="space-y-2 h-64 overflow-auto">
      <li class="flex flex-col bg-gray-200 p-4 rounded text-black font-bold">
        <span class="text-lg text-red-600">Titre du message</span>
        <span class="text-sm text-gray-600">Description du message</span>
        <div class="flex flex-col items-left mt-2">
          <span class="text-sm text-green-600">Date: 20/10/2023</span>
        </div>
        <div class="flex justify-end mt-2">
          <button class="bg-red-600 text-white px-4 py-2 rounded">Supprimer</button>
        </div>
      </li>
    </ul>
  </div>
</div>

<!-- Card pour ajouter un message -->
<div class="card-col w-full sm:w-1/2">
  <h3 class="card-title-col">Ajouter un message</h3>
  <div class="card-content-col p-8">
    <form id="add-message-form" class="space-y-4">
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700">Titre</label>
        <input type="text" id="title" name="title"
          class="mt-1 block w-full border border-gray-300 rounded py-2 px-3 text-black">
      </div>
      <div>
        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
        <textarea id="description" name="description"
          class="mt-1 block w-full border border-gray-300 rounded py-2 px-3 text-black"></textarea>
      </div>
      <button type="submit" class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">Ajouter</button>
    </form>
  </div>
</div>

</div>
`);
