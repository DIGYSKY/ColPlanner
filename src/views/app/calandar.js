export default () => (`
  <div id="calendar" class="h-full p-4 w-11/12 bg-white shadow rounded-lg"></div>
  <div id="event-popup" class="hidden fixed inset-0 bg-gray-800 bg-opacity-75 items-center justify-center" style="z-index: 5;">
    <div class="bg-white p-6 rounded shadow-lg w-1/2">
      <h2 id="event-title" class="text-2xl font-bold mb-4"></h2>
      <p id="event-description" class="mb-4 text-black"></p>
      <button id="close-popup" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Fermer</button>
      <button class="delete-event bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700" data-id="">Supprimer</button>
    </div>
  </div>
  <div class="add-event-popup hidden fixed inset-0 bg-gray-800 bg-opacity-75 items-center justify-center" style="z-index: 6;">
    <div class="bg-white p-6 rounded shadow-lg w-1/2">
      <h2 class="text-2xl font-bold mb-4">Ajouter un événement</h2>
      <form class="add-event-form space-y-4">
        <div>
          <label for="add-event-title" class="block text-sm font-medium text-gray-700">Titre</label>
          <input type="text" name="title" class="mt-1 block w-full border border-gray-300 rounded py-2 px-3 text-black">
        </div>
        <div>
          <label for="add-event-description" class="block text-sm font-medium text-gray-7000">Description</label>
          <textarea name="description" class="mt-1 block w-full border border-gray-300 rounded py-2 px-3 text-black resize-vertical"></textarea>
        </div>
        <div>
          <label for="add-event-start" class="block text-sm font-medium text-gray-700">Début</label>
          <input type="datetime-local" name="start" class="mt-1 block w-full border border-gray-300 rounded py-2 px-3 text-black" value="${new Date().toISOString().slice(0, 10)}T09:00">
        </div>
        <div>
          <label for="add-event-end" class="block text-sm font-medium text-gray-700">Fin</label>
          <input type="datetime-local" name="end" class="mt-1 block w-full border border-gray-300 rounded py-2 px-3 text-black" value="${new Date().toISOString().slice(0, 10)}T18:00">
        </div>
        <div>
          <label for="add-event-color" class="block text-sm font-medium text-gray-700">Couleur</label>
          <input type="color" name="color" class="mt-1 block w-24 h-24 border border-gray-300 rounded py-2 px-3 text-black" value="#2563eb">
        </div>
        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Ajouter</button>
        <button type="button" class="close-add-event-popup bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Fermer</button>
      </form>
    </div>
  </div>
<div class="no-event-popup hidden fixed inset-0 bg-gray-800 bg-opacity-75 items-center justify-center" style="z-index: 7;">
  <div class="bg-white p-6 rounded shadow-lg w-1/2">
    <h2 class="text-2xl font-bold mb-4">Aucun événement</h2>
    <p class="mb-4 text-black">Il n'y a actuellement aucun événement à afficher.</p>
    <button class="close-no-event-popup bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Fermer</button>
  </div>
</div>
`);
