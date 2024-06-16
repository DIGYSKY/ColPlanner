import axios from 'axios';
import profile from '../views/app/profile';
import coockieManager from '../models/cookieManager';

const Profile = class {
  constructor(id) {
    this.apiLinks = 'http://localhost:81';
    this.apiKey = coockieManager.getCookie('apikey');
    this.user = JSON.parse(coockieManager.getCookie('user'));
    this.currentColoc = this.user.current_coloc ? this.user.current_coloc : false;
    this.eventListeners = [];
    this.run(id);
  }

  logout() {
    const logoutButton = document.querySelector('.logout-profile');

    this.addEventListeners([logoutButton], 'click', async (event) => {
      event.preventDefault();

      try {
        await axios.delete(`${this.apiLinks}/login`, {
          headers: {
            'Api-Key': this.apiKey
          }
        });

        coockieManager.deleteCookie('apikey');
        coockieManager.deleteCookie('user');
        coockieManager.deleteCookie('current_coloc');

        this.apiKey = false;

        localStorage.removeItem('page');

        window.location.href = '/login';
      } catch (error) {
        window.location.href = '/dashboard';
      }
    });
  }

  async renderProfile(id) {
    const mainButtons = Array.from(document.querySelectorAll('.main-col'));
    const main = document.querySelector('#app-corp');

    let select = false;

    main.innerHTML = profile(this.user);

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

  actionsProfile() {
    this.addEventListeners([document.querySelector('.update-profile')], 'submit', (event) => {
      event.preventDefault();
      this.handleUpdateProfile();
    });
  }

  async handleUpdateProfile() {
    const name = document.querySelector('.name').value;
    const email = document.querySelector('.email').value;
    const password = document.querySelector('.password').value;
    const confirmPassword = document.querySelector('.confirm-password').value;

    let response = false;
    let passwordResponse = false;

    if (name && name !== '' && name !== this.user.name) {
      response = await this.updateName(name);
    }

    if (email && email !== '' && email !== this.user.email) {
      response = await this.updateEmail(email);
    }

    if (
      password
      && password !== ''
      && password !== this.user.password
      && confirmPassword
      && confirmPassword !== ''
      && confirmPassword === password
    ) {
      passwordResponse = await this.updatePassword(password, confirmPassword);
    }

    if (response) {
      this.user = response;
      coockieManager.setCookie('user', JSON.stringify(this.user));
    }

    if (passwordResponse === false && confirmPassword !== '') {
      document.querySelectorAll('.password-error').forEach((element) => {
        element.classList.remove('hidden');
      });
    } else {
      document.querySelectorAll('.password-error').forEach((element) => {
        element.classList.add('hidden');
      });
    }
  }

  async updateName(name) {
    try {
      const response = await axios.patch(`${this.apiLinks}/user/edit/name/${this.user.id}`, {
        name
      }, {
        headers: { 'Api-Key': this.apiKey }
      });

      return response.data.success;
    } catch (error) {
      return false;
    }
  }

  async updateEmail(email) {
    try {
      const response = await axios.patch(`${this.apiLinks}/user/edit/email/${this.user.id}`, {
        email
      }, {
        headers: { 'Api-Key': this.apiKey }
      });

      return response.data.success;
    } catch (error) {
      return false;
    }
  }

  async updatePassword(password, confirmPassword) {
    try {
      const response = await axios.patch(`${this.apiLinks}/user/edit/password/${this.user.id}`, {
        password,
        confirmPassword
      }, {
        headers: { 'Api-Key': this.apiKey }
      });

      return response.data.success;
    } catch (error) {
      return false;
    }
  }

  addEventListeners(elements, event, callback) {
    elements.forEach((element) => {
      element.addEventListener(event, callback);
      this.eventListeners.push({ element, event, callback });
    });
  }

  run(id) {
    this.renderProfile(id);
    this.logout();
    this.actionsProfile();
  }

  destroy() {
    this.eventListeners.forEach(({ element, event, callback }) => {
      element.removeEventListener(event, callback);
    });
    this.eventListeners = [];
  }
};

export default Profile;
