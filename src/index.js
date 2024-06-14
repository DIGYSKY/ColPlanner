import ColPlanner from './controllers/ColPlanner';
import Login from './controllers/Login';
import App from './controllers/App';
import Router from './Router';
import logo from './assets/img/ColPlanner.png';
import './index.scss';

const faviconLink = document.querySelector("link[rel='icon']");

faviconLink.href = logo;

const routes = [{
  url: '/',
  controller: ColPlanner
},
{
  url: '/login',
  controller: Login
},
{
  url: '/app',
  controller: App
}];

new Router(routes);
