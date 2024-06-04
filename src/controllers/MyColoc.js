import axios from 'axios';
import myColoc from '../views/app/myColoc';
import coockieManager from '../models/cookieManager';

const MyColoc = class {
  constructor(id) {
    this.apiLinks = 'http://localhost:81';
    this.apiKey = coockieManager.getCookie('apikey');
    this.user = JSON.parse(coockieManager.getCookie('user'));
    this.currentColoc = this.user.current_coloc ? this.user.current_coloc : false;
    this.eventListeners = []; // Stocker les références des eventListeners
    this.run(id);
  }

  async renderMyColoc(id) {
    const mainButtons = Array.from(document.querySelectorAll('.main-col'));
    const main = document.querySelector('#app-corp');
    let response;
    let select = false;

    try {
      response = await axios.get(`${this.apiLinks}/coloc/all`, {
        headers: {
          'Api-Key': this.apiKey
        }
      });
      select = true;
    } catch (error) {
      select = false;
    }

    const colocData = {
      users: response.data[this.currentColoc].users,
      coloc: response.data
    };

    main.innerHTML = myColoc(colocData, this.currentColoc);

    if (main.innerHTML) {
      this.actionMyColoc();
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

  actionMyColoc() {
    this.addEventListeners(document.querySelectorAll('[data-user-id]'), 'click', async (event) => {
      event.preventDefault();
      this.showConfirmationPopup(event.target.dataset.userId, event.target.dataset.userName);
    });
  }

  async showConfirmationPopup(userId, userName) {
    document.querySelector('.user-name').textContent = userName;
    document.querySelector('.confirmation-popup').classList.remove('hidden');

    this.addEventListeners([document.querySelector('.confirm-button')], 'click', (event) => {
      event.preventDefault();
    });

    this.addEventListeners([document.querySelector('.cancel-button')], 'click', (event) => {
      event.preventDefault();
      document.querySelector('.confirmation-popup').classList.add('hidden');
    });
  }

  addEventListeners(elements, event, callback) {
    elements.forEach((element) => {
      element.addEventListener(event, callback);
      this.eventListeners.push({ element, event, callback });
    });
  }

  run(id) {
    this.renderMyColoc(id);
  }

  destroy() {
    this.eventListeners.forEach(({ element, event, callback }) => {
      element.removeEventListener(event, callback);
    });
    this.eventListeners = [];
  }
};

export default MyColoc;
