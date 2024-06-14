import axios from 'axios';
import comunicate from '../views/app/comunicate';
import coockieManager from '../models/cookieManager';

const Comunicate = class {
  constructor(id) {
    this.apiLinks = 'http://localhost:81';
    this.apiKey = coockieManager.getCookie('apikey');
    this.user = JSON.parse(coockieManager.getCookie('user'));
    this.currentColoc = this.user.current_coloc ? this.user.current_coloc : false;
    this.eventListeners = [];
    this.run(id);
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

  async renderComunicate(id) {
    const mainButtons = Array.from(document.querySelectorAll('.main-col'));
    const main = document.querySelector('#app-corp');
    const getComunicates = await this.getComunicate();

    let select = false;

    main.innerHTML = comunicate(getComunicates);

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

  async actionComunicate() {
    this.addEventListeners(document.querySelectorAll('.delete-comunicate'), 'click', async (e) => {
      e.preventDefault();
      if (await this.deleteComunicate(e.target.dataset.id)) {
        this.run();
      }
    });

    this.addEventListeners([document.querySelector('.add-comunicate')], 'submit', async (e) => {
      e.preventDefault();
      const title = e.target.querySelector('input[name="title"]').value;
      const content = e.target.querySelector('textarea[name="content"]').value;
      if (
        title && content
        && await this.addComunicate(title, content)
      ) {
        this.run();
      }
    });
  }

  async addComunicate(title, content) {
    try {
      const request = await axios.post(`${this.apiLinks}/comunicate/this`, {
        title,
        content
      }, {
        headers: { 'Api-Key': this.apiKey }
      });
      return request.data;
    } catch (error) {
      return false;
    }
  }

  async deleteComunicate(id) {
    try {
      const request = await axios.delete(`${this.apiLinks}/comunicate/${id}`, {
        headers: { 'Api-Key': this.apiKey }
      });
      return request.data;
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

  async run(id = 'comunicate-col') {
    await this.renderComunicate(id);
    this.actionComunicate();
  }

  destroy() {
    this.eventListeners.forEach(({ element, event, callback }) => {
      element.removeEventListener(event, callback);
    });
    this.eventListeners = [];
  }
};

export default Comunicate;
