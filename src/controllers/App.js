import axios from 'axios';
import coockieManager from '../models/cookieManager';
import login from '../views/login.view';

const App = class {
  constructor() {
    this.el = document.querySelector('#root');
    this.apiLinks = 'http://localhost:81';
    this.run();
  }

  render() {
    return login();
  }

  getFormDataSU() {
    return {
      name: document.querySelector('#fullname').value,
      email: document.querySelector('#email').value,
      password: document.querySelector('#password').value,
      passwordConfirm: document.querySelector('#passwordconfirm').value
    };
  }

  getFormDataSI() {
    return {
      email: document.querySelector('#emaillogin').value,
      password: document.querySelector('#passwordlogin').value
    };
  }

  singIn() {
    const singInForm = document.querySelector('#singIn');

    singInForm.addEventListener('click', async (event) => {
      event.preventDefault();
      const formData = this.getFormDataSI();

      if (Object.values(formData).every((value) => value.trim() !== '')) {
        const request = await axios.post(`${this.apiLinks}/login`, formData);
        const error = document.querySelector('#error-singIn');

        if (request.data.error) {
          error.innerHTML = 'Email ou mots de passe incorrecte !';
        } else if (request.data.apikey) {
          coockieManager.setCookie('apikey', request.data.apikey, 7);
          coockieManager.setCookie('user', request.data.user, 7);
          error.innerHTML = '';
          window.location.href = '/login';
        } else if (request.status >= 500) {
          error.innerHTML = 'Erreur du serveur veuillez rééseyer plus tards !';
        }
      }
    });
  }

  singUp() {
    const singUpForm = document.querySelector('#singUp');

    singUpForm.addEventListener('click', async (event) => {
      event.preventDefault();
      const formData = this.getFormDataSU();

      if (Object.values(formData).every((value) => value.trim() !== '')) {
        const request = await axios.post(`${this.apiLinks}/register`, formData);
        const error = document.querySelector('#error-singUp');

        if (request.status === 200) {
          error.innerHTML = 'Email ou mots de passe incorrecte !';
        } else if (request.status === 201) {
          error.innerHTML = '';
          window.location.href = '/login';
        } else if (request.status >= 500) {
          error.innerHTML = 'Erreur du serveur veuillez rééseyer plus tards !';
        }
      }
    });
  }

  run() {
    this.el.innerHTML = this.render();
    this.singUp();
    this.singIn();
  }
};

export default App;
