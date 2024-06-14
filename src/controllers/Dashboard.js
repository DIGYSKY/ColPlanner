import axios from 'axios';
import dashboard from '../views/app/dashboard';
import coockieManager from '../models/cookieManager';

const Dashboard = class {
  constructor(id) {
    this.el = document.querySelector('#root');
    this.apiLinks = 'http://localhost:81';
    this.apiKey = coockieManager.getCookie('apikey');
    this.user = JSON.parse(coockieManager.getCookie('user'));
    this.currentColoc = this.user.current_coloc ? this.user.current_coloc : false;
    this.run(id);
  }

  async getTasks() {
    try {
      const request = await axios.get(`${this.apiLinks}/task/this`, {
        headers: { 'Api-Key': this.apiKey }
      });
      return request.data;
    } catch (error) {
      return [];
    }
  }

  async getExpenceOwe() {
    const request = await axios.get(`${this.apiLinks}/expence/this`, {
      headers: { 'Api-Key': this.apiKey }
    });
    return request.data.success;
  }

  async getComunicate() {
    try {
      const request = await axios.get(`${this.apiLinks}/comunicate/this`, {
        headers: { 'Api-Key': this.apiKey }
      });
      return request.data;
    } catch (error) {
      return [];
    }
  }

  async renderDashboard(id) {
    const mainButtons = Array.from(document.querySelectorAll('.main-col'));
    const main = document.querySelector('#app-corp');
    const tasks = await this.getTasks();
    const expenceOwe = await this.getExpenceOwe();
    const comunicate = await this.getComunicate();

    let select = false;

    main.innerHTML = dashboard(tasks, expenceOwe, comunicate, this.user);

    if (main.innerHTML) {
      select = true;
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

  run(id) {
    this.renderDashboard(id);
  }
};

export default Dashboard;
