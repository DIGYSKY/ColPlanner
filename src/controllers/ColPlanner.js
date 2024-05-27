import accueil from '../views/accueil.view';

const ColPlanner = class {
  constructor() {
    this.el = document.querySelector('#root');
    this.run();
  }

  render() {
    return accueil();
  }

  run() {
    this.el.innerHTML = this.render();
  }
};

export default ColPlanner;
