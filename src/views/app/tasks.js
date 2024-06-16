export default (getTasks, users) => (`
<h2 class="mx-auto mt-5 mb-5 text-2xl font-bold text-yellow-500">Tâches</h2>
<div class="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 w-full min-h-full">

<!-- Card pour afficher toutes les tâches -->
<div class="card-display-tasks bg-white p-6 rounded shadow w-full">
  <h3 class="text-xl font-semibold mb-4 text-yellow-500">Tâches</h3>
  <div class="overflow-auto h-full">
    <ul class="task-list space-y-2 h-full overflow-auto">
      ${getTasks.length > 0 ? getTasks.map((task) => `
      <li class="flex flex-col items-center bg-gray-200 p-4 rounded text-black font-bold mb-4" data-task-id="${task.id}">
        <span class="text-lg text-red-600">${task.title}</span>
        <span class="text-sm text-gray-600">${task.content}</span>
        <div class="flex flex-col items-center mt-2">
          ${task.at_before !== null ? `<span class="text-sm text-green-600">À faire avant le ${task.at_before}</span>` : ''}
          <span class="text-sm text-black">Créer le ${task.created_at} par ${task.user_name}</span>
        </div>
        ${task.asigned_to !== null ? `<span class="text-sm text-blue-600">Assignée à ${users.find((user) => user.user_id === task.asigned_to).user_name}</span>` : ''}
        <div class="flex justify-center mt-4 w-full space-x-2">
  ${task.make === 0
    ? `   <button class="make-task bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" data-make="1" data-id="${task.id}">Fait</button>`
    : `   <button class="make-task bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700" data-make="0" data-id="${task.id}">Non fait</button>`
  }
          <button class="delete-task bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700" data-id="${task.id}">Supprimer</button>
        </div>
      </li>
      `).join('') : '<li class="text-center text-gray-500">Aucune tâche disponible</li>'}
    </ul>
  </div>
</div>

<!-- Card pour ajouter des tâches -->
<div class="bg-white p-6 rounded shadow w-full">
  <h3 class="text-xl font-semibold mb-4 text-yellow-500">Ajouter une tâche</h3>
  <form class="add-task-form space-y-4">
    <div>
      <label for="title" class="block text-sm font-medium text-gray-700">Tâche</label>
      <input type="text" name="title"
        class="mt-1 block w-full border border-gray-300 rounded py-2 px-3 text-black">
    </div>
    <div>
      <label for="content" class="block text-sm font-medium text-gray-700">Description</label>
      <textarea name="content"
        class="mt-1 block w-full border border-gray-300 rounded py-2 px-3 text-black resize-vertical"></textarea>
    </div>
    <div>
      <label for="date" class="block text-sm font-medium text-gray-700">Date d'échéance (laissez vide si pas de date d'échéance)</label>
      <input type="date" name="date"
        class="mt-1 block w-full border border-gray-300 rounded py-2 px-3 text-black">
    </div>
    <div>
      <label for="user" class="block text-sm font-medium text-gray-700">Assigner à</label>
      <select name="user" class="mt-1 block w-full border border-gray-300 rounded py-2 px-3 text-black">
        <option value="" disabled selected>Choisir un utilisateur</option>
        ${users.map((user) => `
          <option value="${user.user_id}">${user.user_name}</option>
        `).join('')}
      </select>
    </div>
    <button type="submit" class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">Ajouter</button>
  </form>
</div>

</div>
`);
