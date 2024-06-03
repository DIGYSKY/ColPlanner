export default () => (`
<div class="container mx-auto p-4">
  <div class="flex justify-between items-center mb-4">
    <button id="prev-week" class="bg-blue-500 text-white px-4 py-2 rounded">Semaine Précédente</button>
    <h2 id="current-week" class="text-xl font-bold">Semaine du 1 Jan - 7 Jan</h2>
    <button id="next-week" class="bg-blue-500 text-white px-4 py-2 rounded">Semaine Suivante</button>
  </div>
  <div class="flex justify-end mb-4">
    <button id="add-event" class="bg-green-500 text-white px-4 py-2 rounded">+</button>
  </div>
  <div class="grid grid-cols-7 gap-2">
    <div class="bg-blue-900 p-2 rounded text-center">
      <h3 class="text-white">Lundi</h3>
    </div>
    <div class="bg-blue-900 p-2 rounded text-center">
      <h3 class="text-white">Mardi</h3>
    </div>
    <div class="bg-blue-900 p-2 rounded text-center">
      <h3 class="text-white">Mercredi</h3>
    </div>
    <div class="bg-blue-900 p-2 rounded text-center">
      <h3 class="text-white">Jeudi</h3>
    </div>
    <div class="bg-blue-900 p-2 rounded text-center">
      <h3 class="text-white">Vendredi</h3>
    </div>
    <div class="bg-blue-900 p-2 rounded text-center">
      <h3 class="text-white">Samedi</h3>
    </div>
    <div class="bg-blue-900 p-2 rounded text-center">
      <h3 class="text-white">Dimanche</h3>
    </div>
  </div>
  <div class="grid grid-cols-7 gap-2 mt-4">
    <div class="bg-blue-200 p-2 rounded text-center">
      <div class="horaire">
        <p class="text-black text-sm">08:00 - 09:00: <span class="text-nowrap">Événement 1</span></p>
        <p class="text-black text-sm">10:00 - 11:00: <span class="text-nowrap">Événement 2</span></p>
      </div>
    </div>
    <div class="bg-blue-200 p-2 rounded text-center">
      <div class="horaire">
        <p class="text-black">09:00 - 10:00: <span class="text-nowrap">Événement 3</span></p>
        <p class="text-black">11:00 - 12:00: <span class="text-nowrap">Événement 4</span></p>
      </div>
    </div>
    <div class="bg-blue-200 p-2 rounded text-center">
      <div class="horaire">
        <p class="text-black">08:00 - 09:00: <span class="text-nowrap">Événement 5</span></p>
        <p class="text-black">10:00 - 11:00: <span class="text-nowrap">Événement 6</span></p>
      </div>
    </div>
    <div class="bg-blue-200 p-2 rounded text-center">
      <div class="horaire">
        <p class="text-black">09:00 - 10:00: <span class="text-nowrap">Événement 7</span></p>
        <p class="text-black">11:00 - 12:00: <span class="text-nowrap">Événement 8</span></p>
      </div>
    </div>
    <div class="bg-blue-200 p-2 rounded text-center">
      <div class="horaire">
        <p class="text-black">08:00 - 09:00: <span class="text-nowrap">Événement 9</span></p>
        <p class="text-black">10:00 - 11:00: <span class="text-nowrap">Événement 10</span></p>
      </div>
    </div>
    <div class="bg-blue-200 p-2 rounded text-center">
      <div class="horaire">
        <p class="text-black">09:00 - 10:00: <span class="text-nowrap">Événement 11</span></p>
        <p class="text-black">11:00 - 12:00: <span class="text-nowrap">Événement 12</span></p>
      </div>
    </div>
    <div class="bg-blue-200 p-2 rounded text-center">
      <div class="horaire">
        <p class="text-black">08:00 - 09:00: <span class="text-nowrap">Événement 13</span></p>
        <p class="text-black">10:00 - 11:00: <span class="text-nowrap">Événement 14</span></p>
      </div>
    </div>
  </div>
</div>
`);
