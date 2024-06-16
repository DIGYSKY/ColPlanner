export default (tasks, expenceOwe, comunicate, user, users) => (`
<h2 class="text-2xl font-bold text-yellow-500 mx-auto mt-5 mb-5">Bonjour, ${user.name}</h2>
<div class="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 w-full min-h-full">

  <!-- Card pour afficher les tâches -->
  <div class="bg-white p-6 rounded shadow w-full">
    <h3 class="text-xl font-semibold mb-4 text-yellow-500">Tâches</h3>
    <div class="overflow-auto h-full">
      <ul class="task-list space-y-2 h-full overflow-auto">
        ${tasks.length > 0 ? tasks.map((task) => `
        <li class="flex flex-col items-center bg-gray-200 p-4 rounded text-black font-bold mb-4">
          <span class="text-lg text-red-600">${task.title}</span>
          <span class="text-sm text-gray-600">${task.content}</span>
          <div class="flex flex-col items-center mt-2">
            ${task.at_before !== null ? `<span class="text-sm text-green-600">À faire avant le ${task.at_before}</span>` : ''}
            <span class="text-sm text-black">Créer le ${task.created_at}</span>
          </div>
          ${task.asigned_to !== null ? `<span class="text-sm text-blue-600">Assignée à ${users.find((userFind) => userFind.user_id === task.asigned_to).user_name}</span>` : ''}
        </li>
        `).join('') : '<li class="text-center text-gray-500">Aucune tâche disponible</li>'}
      </ul>
    </div>
  </div>

  <!-- Card pour afficher les finances -->
  <div class="bg-white p-6 rounded shadow w-full">
    <h3 class="text-xl font-semibold mb-4 text-yellow-500">Finance</h3>
    <p class="text-lg text-black">Votre solde: <span class="text-red-600">${expenceOwe && expenceOwe.solds && expenceOwe.solds[user.id] ? expenceOwe.solds[user.id].sold : '0'} €</span></p>
    <h4 class="text-lg font-semibold mt-4 text-black">Dernière dépenses :</h4>
    <div class="overflow-auto">
      ${expenceOwe && expenceOwe.expences && expenceOwe.expences.length > 0 ? expenceOwe.expences.map((expence) => `
      <div class="flex items-center justify-between bg-gray-200 p-4 rounded text-black font-bold mb-4">
        <span class="text-lg text-red-600">${expence.name}</span>
        <span class="text-sm text-gray-600">${expence.price} €</span>
      </div>
      `).join('') : '<p class="text-gray-600">Aucune dépense récente</p>'}
    </div>
  </div>

  <!-- Card pour afficher les communications -->
  <div class="bg-white p-6 rounded shadow w-full">
    <h3 class="text-xl font-semibold mb-4 text-yellow-500">Communications</h3>
    <div class="overflow-auto">
      <ul class="space-y-2 h-64 overflow-auto">
        ${comunicate.length > 0 ? comunicate.map((com) => `
        <li class="flex flex-col items-center bg-gray-200 p-4 rounded text-black font-bold mb-4">
          <span class="text-lg text-red-600">${com.title}</span>
          <span class="text-sm text-gray-600">${com.content}</span>
          <div class="flex flex-col items-left mt-2">
            <span class="text-sm text-green-600">Date: ${com.created_at}</span>
          </div>
        </li>
        `).join('') : '<p class="text-gray-600">Aucun message</p>'}
      </ul>
    </div>
  </div>

</div>
`);
