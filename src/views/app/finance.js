export default (expences, userId) => `
  <div class="col-span-2">
    <p class="text-2xl font-bold text-yellow-500">Votre solde ${expences.solds[userId].sold} €</p>
  </div>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 w-full min-h-full">
    <!-- Vous devez à -->
    <div class="bg-white p-6 rounded shadow w-full">
      <p class="text-xl font-semibold mb-4 text-yellow-500">Vous devez à</p>
      <div class="overflow-auto">
        ${expences.owes.length > 0 ? expences.owes.map((owe) => (owe.from === userId ? `
          <div class="flex justify-between items-center bg-gray-200 p-4 rounded text-black font-bold mb-1">
            <p>${owe.name_to}</p>
            <p>${owe.amount} €</p>
          </div>
        ` : '')).join('') : '<p class="text-gray-600">Vous ne devez pas d\'argent</p>'}
      </div>
    </div>

    <!-- Dernière dépense -->
    <div class="bg-white p-6 rounded shadow w-full">
      <p class="text-xl font-semibold mb-4 text-yellow-500">Dernière dépense</p>
      <div class="overflow-auto">
        ${expences.expences.length > 0 ? expences.expences.map((expence) => `
          <div class="flex flex-col items-center bg-gray-200 p-4 rounded text-black font-bold mb-4">
            <p class="text-red-500 mb-1 text-center text-2xl">${expence.name}</p>
            <div class="flex justify-between w-full items-center">
              <p class="text-black w-1/3 text-center">${expence.description}</p>
              <p class="text-blue-500 w-1/3 text-center">${expence.price} €</p>
              <p class="w-1/3 text-center">Par ${expence.user_name}</p>
            </div>
            <div class="flex justify-center mt-4 w-full">
              <button class="delete-expence bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-2" data-id-delete="${expence.id}">Supprimer</button>
              ${expence.user_id !== userId && (expences.expencesPay.userPay[expence.id] ? !expences.expencesPay.userPay[expence.id].includes(userId) : true) ? `<button class="pay-expence bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2" data-id-pay="${expence.id}">Payer</button>` : ''}
            </div>
          </div>
        `).join('') : '<p class="text-gray-600">Aucune dépense récente</p>'}
      </div>
    </div>

    <!-- On vous doit -->
    <div class="bg-white p-6 rounded shadow w-full">
      <p class="text-xl font-semibold mb-4 text-yellow-500">On vous doit</p>
      <div class="overflow-auto">
        ${expences.owes.length > 0 ? expences.owes.map((owe) => (owe.to === userId ? `
          <div class="flex justify-between items-center bg-gray-200 p-4 rounded text-black font-bold mb-1">
            <p>${owe.name_from}</p>
            <p>${owe.amount} €</p>
          </div>
        ` : '')).join('') : '<p class="text-gray-600">Personne ne vous dois d\'argent</p>'}
      </div>
    </div>

    <!-- Ajouter une dépense -->
    <div class="bg-white p-6 rounded shadow w-full">
      <p class="text-xl font-semibold mb-4 text-yellow-500">Ajouter une dépense</p>
      <form class="send-expence space-y-4">
        <div class="flex gap-4 items-center">
          <input type="text" name="expence" placeholder="Dépense" class="mt-1 block w-full border border-gray-300 rounded py-2 px-3 text-black">
          <input type="text" name="price" placeholder="Prix" class="mt-1 block w-full border border-gray-300 rounded py-2 px-3 text-black">
        </div>
        <textarea name="description" placeholder="Description" class="mt-1 block w-full border border-gray-300 rounded py-2 px-3 text-black resize-vertical"></textarea>
        <input type="submit" value="Soumettre" class="mt-2 p-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600">
      </form>
    </div>
  </div>
`;
