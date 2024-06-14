import axios from 'axios';
import tasks from '../views/app/tasks';
import coockieManager from '../models/cookieManager';

const Tasks = class {
  constructor(id) {
    this.apiLinks = 'http://localhost:81';
    this.apiKey = coockieManager.getCookie('apikey');
    this.user = JSON.parse(coockieManager.getCookie('user'));
    this.currentColoc = this.user.current_coloc ? this.user.current_coloc : false;
    this.eventListeners = [];
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

  async renderTasks(id) {
    const mainButtons = Array.from(document.querySelectorAll('.main-col'));
    const main = document.querySelector('#app-corp');
    const getTasks = await this.getTasks();

    let select = false;

    main.innerHTML = tasks(getTasks);

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

  actionsTasks() {
    this.addEventListeners([document.querySelector('.add-task-form')], 'submit', async (e) => {
      e.preventDefault();
      const title = e.target.querySelector('[name="title"]').value;
      const content = e.target.querySelector('[name="content"]').value;
      const date = e.target.querySelector('[name="date"]').value || null;
      if (title !== '' && content !== '') {
        if (await this.sendTask(title, content, date)) {
          this.run();
        }
      }
    });
    this.addEventListeners([document.querySelector('.make-task')], 'click', async (e) => {
      e.preventDefault();
      const { id, make } = e.target.dataset;
      if (await this.patchTask(id, make)) {
        this.run();
      }
    });
    this.addEventListeners([document.querySelector('.delete-task')], 'click', async (e) => {
      e.preventDefault();
      const { id } = e.target.dataset;
      if (await this.deleteTask(id)) {
        this.run();
      }
    });
  }

  async patchTask(id, make) {
    const request = await axios.patch(`${this.apiLinks}/task/${id}`, {
      make
    }, {
      headers: { 'Api-Key': this.apiKey }
    });
    return request.data;
  }

  async deleteTask(id) {
    const request = await axios.delete(`${this.apiLinks}/task/${id}`, {
      headers: { 'Api-Key': this.apiKey }
    });
    return request.data;
  }

  async sendTask(title, content, date) {
    try {
      const request = await axios.post(`${this.apiLinks}/task/new`, {
        title,
        content,
        date
      }, {
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

  async run(id = 'tasks-col') {
    await this.renderTasks(id);
    this.actionsTasks();
  }

  destroy() {
    this.eventListeners.forEach(({ element, event, callback }) => {
      element.removeEventListener(event, callback);
    });
    this.eventListeners = [];
  }
};

export default Tasks;
