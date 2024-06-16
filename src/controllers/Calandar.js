import axios from 'axios';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import calandar from '../views/app/calandar';
import coockieManager from '../models/cookieManager';

const Calandar = class {
  constructor(id) {
    this.apiLinks = 'http://localhost:81';
    this.apiKey = coockieManager.getCookie('apikey');
    this.user = JSON.parse(coockieManager.getCookie('user'));
    this.currentColoc = this.user.current_coloc ? this.user.current_coloc : false;
    this.eventListeners = [];
    this.calendar = null;
    this.run(id);
  }

  async renderCalandar(id) {
    const mainButtons = Array.from(document.querySelectorAll('.main-col'));
    const main = document.querySelector('#app-corp');

    let select = false;

    main.innerHTML = calandar(this.user);

    if (main.innerHTML) {
      this.initializeCalendar();
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

  initializeCalendar() {
    const calendarEl = document.getElementById('calendar');

    this.calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      firstDay: 1,
      initialView: 'dayGridMonth',
      locale: 'fr',
      headerToolbar: {
        left: 'prev,next today myCustomButton',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      events: [],
      customButtons: {
        myCustomButton: {
          text: 'Ajouter un événement',
          click: (event) => {
            event.preventDefault();
            this.addEventPopup();
          }
        }
      },
      buttonText: {
        today: 'Aujourd\'hui',
        month: 'Mois',
        week: 'Semaine',
        day: 'Jour'
      },
      themeSystem: 'standard',
      height: '90vh',
      eventClick: (info) => {
        this.eventSelected(info);
      }
    });

    this.calendar.render();
  }

  async getEvents() {
    try {
      const events = await axios.get(`${this.apiLinks}/events/this`, {
        headers: { 'Api-Key': this.apiKey }
      });

      if (events.data.length === 0) {
        this.noEvents();
      } else {
        this.addEvents(events.data);
      }
    } catch (error) {
      this.noEvents();
    }
  }

  noEvents() {
    const noEventPopup = document.querySelector('.no-event-popup');
    const closeNoEventPopup = document.querySelector('.close-no-event-popup');
    noEventPopup.classList.remove('hidden');
    noEventPopup.classList.add('flex');

    this.addEventListeners([closeNoEventPopup], 'click', () => {
      noEventPopup.classList.remove('flex');
      noEventPopup.classList.add('hidden');
    });
  }

  addEvents(events) {
    events.forEach((event) => {
      this.calendar.addEvent(event);
    });
    this.calendar.refetchEvents();
  }

  eventSelected(info) {
    const eventPopup = document.getElementById('event-popup');
    const eventTitle = document.getElementById('event-title');
    const eventDescription = document.getElementById('event-description');
    const closePopup = document.getElementById('close-popup');
    const deleteEvent = document.querySelector('.delete-event');
    deleteEvent.dataset.id = info.event.extendedProps.event_id;

    eventTitle.textContent = info.event.title;
    eventDescription.textContent = info.event.extendedProps.description || 'Pas de description disponible';

    eventPopup.classList.remove('hidden');
    eventPopup.classList.add('flex');

    this.addEventListeners([closePopup], 'click', () => {
      eventPopup.classList.remove('flex');
      eventPopup.classList.add('hidden');
    });

    this.addEventListeners([deleteEvent], 'click', () => {
      this.deleteEvent(deleteEvent.dataset.id);
      eventPopup.classList.remove('flex');
      eventPopup.classList.add('hidden');
    });
  }

  async deleteEvent(id) {
    await axios.delete(`${this.apiLinks}/events/${id}`, {
      headers: { 'Api-Key': this.apiKey }
    });
    const event = this.calendar.getEventById(id);
    if (event) {
      event.remove();
    }
    this.getEvents();
  }

  addEventPopup() {
    const addEventPopup = document.querySelector('.add-event-popup');
    const closeAddEventPopup = document.querySelector('.close-add-event-popup');
    addEventPopup.classList.remove('hidden');
    addEventPopup.classList.add('flex');

    this.addEventListeners([closeAddEventPopup], 'click', () => {
      addEventPopup.classList.remove('flex');
      addEventPopup.classList.add('hidden');
    });

    this.addEventListeners([addEventPopup], 'submit', async (event) => {
      event.preventDefault();
      await this.addEvent(event);
    });
  }

  async addEvent(event) {
    const title = event.target.querySelector('input[name="title"]').value.trim();
    const description = event.target.querySelector('textarea[name="description"]').value.trim();
    const start = event.target.querySelector('input[name="start"]').value;
    const end = event.target.querySelector('input[name="end"]').value;
    const color = event.target.querySelector('input[name="color"]').value;

    if (title === '' || start === '' || end === '') {
      return;
    }

    let request = false;

    try {
      await axios.post(`${this.apiLinks}/events/this`, {
        title,
        description,
        start,
        end,
        color
      }, {
        headers: { 'Api-Key': this.apiKey }
      });

      request = true;
    } catch (error) {
      request = false;
    }

    if (request) {
      this.getEvents();

      const addEventPopup = document.querySelector('.add-event-popup');

      addEventPopup.classList.remove('flex');
      addEventPopup.classList.add('hidden');
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

  async run(id) {
    await this.renderCalandar(id);
    await this.getEvents();
  }

  destroy() {
    this.eventListeners.forEach(({ element, event, callback }) => {
      element.removeEventListener(event, callback);
    });
    this.eventListeners = [];
  }
};

export default Calandar;
