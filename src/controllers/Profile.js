import axios from 'axios';
import profile from '../views/app/profile';
import coockieManager from '../models/cookieManager';

const Profile = class {
  constructor(id) {
    this.el = document.querySelector('#root');
    this.apiLinks = 'http://localhost:81';
    this.apiKey = coockieManager.getCookie('apikey');
    this.user = JSON.parse(coockieManager.getCookie('user'));
    this.currentColoc = this.user.current_coloc ? this.user.current_coloc : false;
    this.run(id);
  }

  logout() {
    const logoutButton = document.querySelector('.logout-profile');

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

  run(id) {
    this.renderProfile(id);
    this.logout();
  }
};

export default Profile;
