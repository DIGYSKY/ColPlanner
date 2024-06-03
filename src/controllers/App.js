import axios from 'axios';
import coockieManager from '../models/cookieManager';
import app from '../views/app.view';
import dashboard from '../views/app/dashboard';
import finance from '../views/app/finance';
import myColoc from '../views/app/myColoc';
import tasks from '../views/app/tasks';
import comunicate from '../views/app/comunicate';
import calandar from '../views/app/calandar';
import profile from '../views/app/profile';

const App = class {
  constructor() {
    this.el = document.querySelector('#root');
    this.apiLinks = 'http://localhost:81';
    this.apiKey = coockieManager.getCookie('apikey');
    this.user = JSON.parse(coockieManager.getCookie('user'));
    this.run();
  }

  async getLog() {
    let success = false;
    if (this.apiKey) {
      try {
        await axios.get(`${this.apiLinks}/login`, {
          headers: {
            'Api-Key': this.apiKey
          }
        });
        success = true;
      } catch (error) {
        coockieManager.deleteCookie('apikey');
        coockieManager.deleteCookie('user');

        this.apiKey = false;

        localStorage.removeItem('page');

        success = false;
      }
    }
    return success;
  }

  render() {
    return app();
  }

  logout() {
    const logoutButton = document.querySelector('#logout-col');

    logoutButton.addEventListener('click', async (event) => {
      event.preventDefault();

      try {
        await axios.delete(`${this.apiLinks}/login`, {
          headers: {
            'Api-Key': this.apiKey
          }
        });

        coockieManager.deleteCookie('apikey');
        coockieManager.deleteCookie('user');

        this.apiKey = false;

        localStorage.removeItem('page');

        window.location.href = '/login';
      } catch (error) {
        window.location.href = '/dashboard';
      }
    });
  }

  main() {
    const mainButtons = Array.from(document.querySelectorAll('.main-col'));
    const curentPage = localStorage.getItem('page');

    // default page
    this.selectMenu(curentPage !== null ? curentPage : 'dashboard-col');

    mainButtons.forEach((mainButton) => {
      mainButton.addEventListener('click', async (event) => {
        event.preventDefault();
        await this.selectMenu(event.target.id);
      });
    });
  }

  async selectMenu(id) {
    const mainButtons = Array.from(document.querySelectorAll('.main-col'));
    const main = document.querySelector('#app-corp');

    let select = false;

    const renderFunctions = {
      'dashboard-col': this.renderDashboard,
      'finance-col': this.renderFinance,
      'mycoloc-col': this.renderMyColoc,
      'tasks-col': this.renderTasks,
      'comunicate-col': this.renderComunicate,
      'calandar-col': this.renderCalandar,
      'profile-col': this.renderProfile
    };

    if (renderFunctions[id]) {
      main.innerHTML = '';
      main.innerHTML = await renderFunctions[id].call(this);
      if (main.innerHTML) {
        select = true;
      }
    }

    if (select && mainButtons) {
      localStorage.setItem('page', id);
      document.querySelector(`#${id}`).classList.add('select');

      mainButtons.forEach((button) => {
        if (button.id !== id) {
          button.classList.remove('select');
        }
      });
    }
  }

  async renderFinance() {
    return finance();
  }

  async renderDashboard() {
    return dashboard(this.user);
  }

  async renderMyColoc() {
    let response;

    try {
      response = await axios.get(`${this.apiLinks}/coloc`, {
        headers: {
          'Api-Key': this.apiKey
        }
      });
    } catch (error) {
      this.selectMenu('dashboard-col');
    }

    const colocData = {
      users: response.data[1].users,
      coloc: response.data
    };

    return myColoc(colocData);
  }

  async renderTasks() {
    return tasks();
  }

  async renderComunicate() {
    return comunicate();
  }

  async renderCalandar() {
    return calandar();
  }

  async renderProfile() {
    return profile();
  }

  async run() {
    if (!(await this.getLog())) {
      window.location.href = '/login';
    }
    this.el.innerHTML = this.render();
    this.logout();
    this.main();
  }
};

export default App;
