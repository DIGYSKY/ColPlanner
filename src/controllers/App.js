import axios from 'axios';
import coockieManager from '../models/cookieManager';
import app from '../views/app.view';
import dashboard from '../views/app/dashboard';
import finance from '../views/app/finance';

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
      mainButton.addEventListener('click', (event) => {
        event.preventDefault();
        this.selectMenu(event.target.id);
      });
    });
  }

  selectMenu(id) {
    const mainButtons = Array.from(document.querySelectorAll('.main-col'));
    const main = document.querySelector('#app-corp');

    let select = false;

    if (id === 'dashboard-col') {
      main.innerHTML = '';
      main.innerHTML = this.renderDashboard();
      if (main.innerHTML) {
        select = true;
      }
    } else if (id === 'finance-col') {
      main.innerHTML = '';
      main.innerHTML = this.renderFinance();
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

  renderFinance() {
    return finance();
  }

  renderDashboard() {
    return dashboard(this.user);
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
