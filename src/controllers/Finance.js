import axios from 'axios';
import finance from '../views/app/finance';
import coockieManager from '../models/cookieManager';

const Finance = class {
  constructor(id) {
    this.apiLinks = 'http://localhost:81';
    this.apiKey = coockieManager.getCookie('apikey');
    this.user = JSON.parse(coockieManager.getCookie('user'));
    this.currentColoc = coockieManager.getCookie('currentColoc') ?? false;
    this.eventListeners = [];
    this.run(id);
  }

  async getCurrentColoc() {
    let request;
    try {
      request = await axios.get(`${this.apiLinks}/user/coloc/current/this`, {
        headers: { 'Api-Key': this.apiKey }
      });
    } catch (error) {
      return false;
    }
    const currentColoc = request.data.success.current_coloc;
    coockieManager.setCookie('current_coloc', currentColoc, 7);
    return currentColoc;
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

  async getExpenceOwe() {
    const request = await axios.get(`${this.apiLinks}/expence/this`, {
      headers: { 'Api-Key': this.apiKey }
    });
    return request.data.success;
  }

  async renderFinance(id) {
    const mainButtons = Array.from(document.querySelectorAll('.main-col'));
    const main = document.querySelector('#app-corp');
    let select = false;
    const expenceOwe = await this.getExpenceOwe();

    main.innerHTML = finance(expenceOwe, this.user.id);

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

  actionExpence() {
    this.addEventListeners([document.querySelector('.send-expence')], 'submit', this.actionSendExpence.bind(this));
    this.addEventListeners(document.querySelectorAll('.delete-expence'), 'click', this.actionDeleteExpence.bind(this));
    this.addEventListeners(document.querySelectorAll('.pay-expence'), 'click', this.actionPayExpence.bind(this));
  }

  async actionPayExpence(e) {
    const id = e.target.dataset.idPay;
    try {
      const request = await axios.patch(`${this.apiLinks}/expence/${id}`, {
        paid: true
      }, {
        headers: { 'Api-Key': this.apiKey }
      });

      if (request.data.success) {
        this.run();
      } else {
        e.target.classList.add('error');
      }
    } catch (error) {
      window.location.reload();
    }
  }

  actionSendExpence(e) {
    e.preventDefault();
    const expence = e.target.querySelector('input[name="expence"]').value.trim();
    const price = e.target.querySelector('input[name="price"]').value.trim();
    const description = e.target.querySelector('textarea[name="description"]').value.trim();

    if (expence === '' || price === '' || description === '') {
      return;
    }

    const request = this.postExpence(expence, price, description);
    if (request) {
      this.run();
    }
  }

  async actionDeleteExpence(e) {
    const id = e.target.dataset.idDelete;
    const request = await axios.delete(`${this.apiLinks}/expence/${id}`, {
      headers: { 'Api-Key': this.apiKey }
    });
    if (request.data.success) {
      this.run();
    }
  }

  async postExpence(expence, price, description) {
    try {
      const request = await axios.post(`${this.apiLinks}/expence/this`, {
        expence,
        price,
        description
      }, {
        headers: { 'Api-Key': this.apiKey }
      });
      return request.data.success;
    } catch (error) {
      return false;
    }
  }

  addEventListeners(elements, event, callback) {
    elements.forEach((element) => {
      if (element) {
        element.addEventListener(event, callback);
        this.eventListeners.push({ element, event, callback });
      }
    });
  }

  async run(id = 'finance-col') {
    if (this.currentColoc && (await this.getLog())) {
      await this.renderFinance(id);
      this.actionExpence();
    } else {
      this.currentColoc = await this.getCurrentColoc();
      this.run();
    }
  }

  destroy() {
    this.eventListeners.forEach(({ element, event, callback }) => {
      element.removeEventListener(event, callback);
    });
    this.eventListeners = [];
  }
};

export default Finance;
