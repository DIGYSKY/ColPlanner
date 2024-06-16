import logo from '../assets/img/ColPlanner.png';

export default () => (`
<div class="body">
<header id="header-container-col">
<div id="header-col">
  <div class="logo-col">
    <img class="logo-app" src="${logo}" alt="">
    <h1>Col<span>Planner</span></h1>
  </div>
  <button id="dashboard-col" class="button-col main-col">Tableau de bord</button>
  <button id="tasks-col" class="button-col main-col">Tâches</button>
  <button id="finance-col" class="button-col main-col">Finance</button>
  <button id="comunicate-col" class="button-col main-col">Messages</button>
  <button id="calandar-col" class="button-col main-col">Calendrier</button>
  <button id="mycoloc-col" class="button-col main-col">My Coloc</button>
  <button id="profile-col" class="button-col main-col">Profile</button>
</div>
</header>
<main id="app-corp">

</main>
</div>
`);
