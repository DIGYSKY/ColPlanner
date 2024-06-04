import axios from 'axios';
import coockieManager from '../models/cookieManager';
import app from '../views/app.view';
import MyColoc from './MyColoc';
import Dashboard from './Dashboard';
import Finance from './Finance';
import Tasks from './Tasks';
import Comunicate from './Comunicate';
import Calandar from './Calandar';
import Profile from './Profile';

const App = class {
  constructor() {
    this.el = document.querySelector('#root');
    this.apiLinks = 'http://localhost:81';
    this.apiKey = coockieManager.getCookie('apikey');
    this.user = JSON.parse(coockieManager.getCookie('user'));
    this.currentColoc = this.user.current_coloc ? this.user.current_coloc : false;
    this.run();
  }

  async getLog() {
    if (!this.apiKey) return false;
    try {
      await axios.get(`${this.apiLinks}/login`, {
        headers: { 'Api-Key': this.apiKey }
      });
      return true;
    } catch (error) {
      this.handleLogout();
      return false;
    }
  }

  handleLogout() {
    coockieManager.deleteCookie('apikey');
    coockieManager.deleteCookie('user');
    this.apiKey = false;
    localStorage.removeItem('page');
    window.location.href = '/login';
  }

  main() {
    const mainButtons = Array.from(document.querySelectorAll('.main-col'));
    const curentPage = localStorage.getItem('page') || 'dashboard-col';
    this.selectMenu(curentPage);

    mainButtons.forEach((mainButton) => {
      mainButton.addEventListener('click', async (event) => {
        event.preventDefault();
        await this.selectMenu(event.target.id);
      });
    });
  }

  async selectMenu(id) {
    const main = document.querySelector('#app-corp');
    const renderFunctions = {
      'dashboard-col': Dashboard,
      'finance-col': Finance,
      'mycoloc-col': MyColoc,
      'tasks-col': Tasks,
      'comunicate-col': Comunicate,
      'calandar-col': Calandar,
      'profile-col': Profile
    };

    if (renderFunctions[id]) {
      if (this.currentInstance && this.currentInstance.destroy) {
        this.currentInstance.destroy();
      }
      main.innerHTML = '';
      this.currentPage = await new renderFunctions[id](id);
    }
  }

  async render() {
    return app();
  }

  async run() {
    if (!(await this.getLog())) {
      this.handleLogout();
    } else {
      this.el.innerHTML = await this.render();
      this.main();
    }
  }
};

export default App;
