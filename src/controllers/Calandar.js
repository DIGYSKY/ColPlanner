import calandar from '../views/app/calandar';
import coockieManager from '../models/cookieManager';

const Calandar = class {
  constructor(id) {
    this.el = document.querySelector('#root');
    this.apiLinks = 'http://localhost:81';
    this.apiKey = coockieManager.getCookie('apikey');
    this.user = JSON.parse(coockieManager.getCookie('user'));
    this.currentColoc = this.user.current_coloc ? this.user.current_coloc : false;
    this.run(id);
  }

  async renderCalandar(id) {
    const mainButtons = Array.from(document.querySelectorAll('.main-col'));
    const main = document.querySelector('#app-corp');

    let select = false;

    main.innerHTML = calandar(this.user);

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
    this.renderCalandar(id);
  }
};

export default Calandar;
