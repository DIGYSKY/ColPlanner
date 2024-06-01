import logo from '../assets/img/ColPlanner.png';

export default () => (`
<div class="body">
<header id="header-container-col">
<div id="header-col">
  <div class="logo-col">
    <img class="logo-app" src="${logo}" alt="">
    <h1>Col<span>Planner</span></h1>
  </div>
  <button id="dashboard-col" class="button-col main-col">DashBoard</button>
  <button id="tasks-col" class="button-col main-col">Tasks</button>
  <button id="finance-col" class="button-col main-col">Finance</button>
  <button id="comunicate-col" class="button-col main-col">Comunicate</button>
  <button id="calandar-col" class="button-col main-col">Calandar</button>
  <button id="mycoloc-col" class="button-col main-col">My coloc</button>
  <button id="profile-col" class="button-col main-col">Profile</button>
  <button id="logout-col" class="button-col">Logout</button>
</div>
</header>
<main id="app-corp">

</main>
</div>
`);
