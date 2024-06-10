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

    const calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      locale: 'fr',
      headerToolbar: {
        left: 'prev,next today myCustomButton',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      events: [
        {
          title: 'Événement 1',
          start: '2024-06-06',
          end: '2024-06-07',
          url: 'https://example.com',
          classNames: ['custom-class'],
          editable: true,
          extendedProps: {
            description: 'Description de l\'événement 1'
          }
        },
        {
          title: 'Événement 2',
          start: '2024-06-05',
          end: '2024-06-07'
        }
      ],
      customButtons: {
        myCustomButton: {
          text: 'Custom!',
          click: (event) => {
            event.preventDefault();
          }
        }
      },
      buttonText: {
        today: 'Aujourd\'hui',
        month: 'Mois',
        week: 'Semaine',
        day: 'Jour'
      },
      themeSystem: 'standard'
    });

    calendar.render();
  }

  addEventListeners(elements, event, callback) {
    elements.forEach((element) => {
      element.addEventListener(event, callback);
      this.eventListeners.push({ element, event, callback });
    });
  }

  run(id) {
    this.renderCalandar(id);
  }

  destroy() {
    this.eventListeners.forEach(({ element, event, callback }) => {
      element.removeEventListener(event, callback);
    });
    this.eventListeners = [];
  }
};

export default Calandar;
