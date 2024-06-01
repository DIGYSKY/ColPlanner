export default (user) => (`
<h2>Bonjour, ${user.name}</h2>
<div class="card-col">
  <p class="card-title-col">Tasks</p>
  <div class="card-content-col" id="tasks-dash-col">
    <div class="task-view-col">
      <p class="task-title-col">Course</p>
      <p class="task-description-col">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia impedit corporis alias voluptatum minus esse.</p>
      <p class="task-create-col">20 juin 2024</p>
      <p class="task-make-befor-col">À faire avant le 23 juin 2024</p>
    </div>
    <div class="task-view-col">
      <p class="task-title-col">Sortire la poubelle</p>
      <p class="task-description-col">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia impedit corporis alias voluptatum minus esse.</p>
      <p class="task-create-col">20 juin 2024</p>
      <p class="task-make-befor-col">À faire avant le 23 juin 2024</p>
    </div>
  </div>
</div>
<div class="card-col">
  <p class="card-title-col">Finance</p>
  <p class="finance-yoursold-col">Your solde: <span class="finance-sold-col neg">-35 €</span></p>
  <p class="finance-youpaye-col">To return to zero, pay Robert 25 €</p>
  <p class="finance-last-col">Last expense :</p>
  <div class="card-content-col" id="finance-dash-col">
    <div class="finance-view-col">
      <p class="finance-title-view">Course</p>
      <p class="finance-solde-view">135 €</p>
    </div>
  </div>
</div>
<div class="card-col">
  <p class="card-title-col">Comunicate</p>
  <div class="card-content-col" id="comunicate-dash-col">
    <div class="comunicate-col">
      <p class="comunicate-title-col">Absant</p>
      <p class="comunicate-content-col">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus autem hic numquam, optio deleniti voluptatem dolore perferendis cupiditate corporis nemo?</p>
      <p class="comunicate-date-col">29, mai 2024</p>
    </div>
  </div>
</div>
`);
