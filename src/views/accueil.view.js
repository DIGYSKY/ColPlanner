import logo from '../assets/img/ColPlanner.png';
import bannier from '../assets/img/bannier.png';

export default () => (`
<header class="header-acc ">
<img src="${logo}" alt="">
<h1>Col<span>Planner</span></h1>
</header>
<main>
<h2 class="slogan">Pour que votre colocation ne devienne <br> le prochain épisode de Saw, <br><span>mettez de l'ordre avec <br>ColPlanner !</span></h2>
<img class="bannier-acc" src="${bannier}" alt="">
<p class="description">Le projet "ColPlanner" consiste en une application destinée à faciliter la gestion des tâches et des dépenses au sein d'une colocation. Les colocataires pourront créer, attribuer et suivre les tâches domestiques, ainsi que saisir et répartir les dépenses communes telles que le loyer et les factures. L'application comprendra également un calendrier partagé pour visualiser les tâches à venir, ainsi qu'un tableau de bord personnalisé pour chaque colocataire.</p>
<a class="join-acc" href="/login">COMMANCER</a>
</main>
`);
