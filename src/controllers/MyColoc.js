import axios from 'axios';
import myColoc from '../views/app/myColoc';
import coockieManager from '../models/cookieManager';

const MyColoc = class {
  constructor(id) {
    this.apiLinks = 'http://localhost:81';
    this.apiKey = coockieManager.getCookie('apikey');
    this.user = JSON.parse(coockieManager.getCookie('user'));
    this.eventListeners = [];
    this.current_coloc = null;
    this.run(id);
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

  async getColoc() {
    let response;

    try {
      response = await axios.get(`${this.apiLinks}/coloc/all`, {
        headers: {
          'Api-Key': this.apiKey
        }
      });
    } catch (error) {
      coockieManager.deleteCookie('current_coloc');
      response = [];
    }

    return response;
  }

  async getInvitation() {
    let response;

    try {
      response = await axios.get(`${this.apiLinks}/invitation/this`, {
        headers: {
          'Api-Key': this.apiKey
        }
      });
      response = response.data;
    } catch (error) {
      response = [];
    }

    return response;
  }

  async renderMyColoc(id) {
    const mainButtons = Array.from(document.querySelectorAll('.main-col'));
    const main = document.querySelector('#app-corp');
    let select = false;

    const coloc = await this.getColoc();
    const invitation = await this.getInvitation();

    const colocData = {
      users: this.current_coloc && coloc.data
        && this.current_coloc in coloc.data
        ? coloc.data[this.current_coloc].users
        : [],
      coloc: coloc.data ?? []
    };

    main.innerHTML = myColoc(colocData, invitation, this.current_coloc, this.user.id);

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

    return select;
  }

  actionMyColoc() {
    this.addEventListeners(document.querySelectorAll('[data-user-id]'), 'click', async (event) => {
      event.preventDefault();
      this.userIdDelete = event.target.dataset.userId;
      const { userName } = event.target.dataset;

      document.querySelector('.user-name').textContent = userName;
      document.querySelector('.confirmation-popup').classList.remove('hidden');
    });

    this.addEventListeners([document.querySelector('.confirm-button')], 'click', async (event) => {
      event.preventDefault();
      try {
        await axios.delete(`${this.apiLinks}/colocuser/user/${this.userIdDelete}`, {
          headers: { 'Api-Key': this.apiKey }
        });
        document.querySelector('.confirmation-popup').classList.add('hidden');
        this.run('mycoloc-col');
      } catch (error) {
        window.location.reload();
      }
    });

    this.addEventListeners([document.querySelector('.cancel-button')], 'click', (event) => {
      event.preventDefault();
      document.querySelector('.confirmation-popup').classList.add('hidden');
    });

    this.addEventListeners([document.querySelector('.email')], 'input', this.handleEmailInput.bind(this));

    this.addEventListeners([document.querySelector('.email')], 'keypress', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        this.handleEmailInput(event);
      }
    });

    this.addEventListeners([document.querySelector('#select-coloc-form')], 'submit', async (event) => {
      event.preventDefault();
      const selectedColocId = document.querySelector('#coloc').value;
      try {
        await axios.patch(`${this.apiLinks}/user/coloc/current/${selectedColocId}`, {}, {
          headers: { 'Api-Key': this.apiKey }
        });
      } catch (error) {
        window.location.reload();
      }
      this.run('mycoloc-col');
    });

    this.addEventListeners([document.querySelector('.edit-coloc-name-form')], 'submit', async (event) => {
      event.preventDefault();
      const newColocName = document.querySelector('.coloc-name').value;
      try {
        await axios.patch(`${this.apiLinks}/coloc/name`, {
          name: newColocName,
          id: this.current_coloc
        }, {
          headers: { 'Api-Key': this.apiKey }
        });
        this.run('mycoloc-col');
      } catch (error) {
        window.location.reload();
      }
    });

    this.addEventListeners(document.querySelectorAll('[data-invitation-id-reject]'), 'click', async (event) => {
      event.preventDefault();
      const invitationId = event.target.dataset.invitationIdReject;
      await this.deleteInvitation(invitationId);
      this.run('mycoloc-col');
    });

    this.addEventListeners(document.querySelectorAll('[data-invitation-id-accept]'), 'click', async (event) => {
      event.preventDefault();
      const invitationId = event.target.dataset.invitationIdAccept;
      const { colocId } = event.target.dataset;
      if (await this.addUserToColoc(colocId)) {
        if (await this.deleteInvitation(invitationId)) {
          this.run('mycoloc-col');
        }
      }
    });

    this.addEventListeners([document.querySelector('.create-coloc-form')], 'submit', async (event) => {
      event.preventDefault();
      const newColocName = document.querySelector('.new-coloc-name').value;
      try {
        await axios.post(`${this.apiLinks}/coloc/new`, {
          name: newColocName
        }, {
          headers: { 'Api-Key': this.apiKey }
        });
        this.run('mycoloc-col');
      } catch (error) {
        window.location.reload();
      }
    });
  }

  async deleteInvitation(invitationId) {
    try {
      await axios.delete(`${this.apiLinks}/invitation/${invitationId}`, {
        headers: { 'Api-Key': this.apiKey }
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async addUserToColoc(colocId) {
    try {
      await axios.post(`${this.apiLinks}/colocuser/add/this`, {
        colocId
      }, {
        headers: { 'Api-Key': this.apiKey }
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async handleEmailInput(event) {
    event.preventDefault();

    const query = String(event.target.value).replace(/ /g, '');
    if (query.length > 1) {
      try {
        const response = await axios.get(`${this.apiLinks}/user/search/name/${query}`, {
          headers: { 'Api-Key': this.apiKey }
        });
        this.displayEmailSuggestions(response.data);
      } catch (error) {
        this.displayEmailSuggestions([]);
      }
    } else {
      this.displayEmailSuggestions([]);
    }
  }

  displayEmailSuggestions(users) {
    const suggestionsContainer = document.querySelector('.email-suggestions');
    suggestionsContainer.innerHTML = users.map((user) => (
      `<button class="email-suggestion-list w-full bg-yellow-500 p-2 mb-2 rounded-md" data-user-add-id="${user.id}">${user.name}</button>`
    )).join('');
    if (users.length > 0) {
      suggestionsContainer.classList.remove('hidden');
    } else {
      suggestionsContainer.classList.add('hidden');
    }

    this.addEventListeners(suggestionsContainer.querySelectorAll('.email-suggestion-list'), 'click', (event) => {
      event.preventDefault();
      const userId = event.target.dataset.userAddId;
      this.postInvitation(userId);
    });
  }

  async postInvitation(userId) {
    try {
      await axios.post(`${this.apiLinks}/invitation/this`, {
        userId
      }, {
        headers: { 'Api-Key': this.apiKey }
      });
    } catch (error) {
      window.location.reload();
    }
  }

  addEventListeners(elements, event, callback) {
    elements.forEach((element) => {
      element.addEventListener(event, callback);
      this.eventListeners.push({ element, event, callback });
    });
  }

  async run(id) {
    if (!this.getLog()) {
      window.location.href = '/';
    }
    await this.getCurrentColoc();
    this.current_coloc = parseInt(coockieManager.getCookie('current_coloc') ?? null, 10);
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
