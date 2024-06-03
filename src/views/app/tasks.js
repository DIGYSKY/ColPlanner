export default () => (`
<h2 class="mx-auto mt-5 mb-5">Tasks</h2>
<div class="mx-auto mt-0 flex justify-center align-center gap-5 flex-wrap">

<!-- Card pour afficher toutes les tâches -->
<div class="card-col w-full sm:w-1/2">
  <h3 class="card-title-col">Tâches</h3>
  <div class="card-content-col">
    <ul id="task-list" class="space-y-2 h-64 overflow-auto">
      <li class="flex flex-col bg-gray-200 p-4 rounded text-black font-bold">
        <span class="text-lg text-red-600">Faire les courses</span>
        <span class="text-sm text-gray-600">Acheter du lait, des œufs et du pain</span>
        <div class="flex flex-col items-left mt-2">
          <span class="text-sm text-green-600">À faire avant le 20/10/2023</span>
          <span class="text-sm text-black">Fait le 10 mai 2024</span>
        </div>
        <div class="flex justify-end mt-2">
          <button class="bg-red-600 text-white px-4 py-2 rounded">Fait</button>
        </div>
      </li>
    </ul>
  </div>
</div>

<!-- Card pour ajouter des tâches -->
<div class="card-col w-full sm:w-1/2">
  <h3 class="card-title-col">Ajouter une tâche</h3>
  <div class="card-content-col p-8">
    <form id="add-task-form" class="space-y-4">
      <div>
        <label for="task" class="block text-sm font-medium text-gray-700">Tâche</label>
        <input type="text" id="task" name="task"
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
