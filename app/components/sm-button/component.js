import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  router: service(),

  classNames: ['sm-button-container'],
  classNameBindings: [
    'block:sm-button-container_block',
    'isAlternative:sm-button-container_alternative',
  ],

  block: false,

  actions: {
    click() {
      if (this.onClick) {
        this.onClick();
      } else if (this.linkTo) {
        this.router.transitionTo(this.linkTo);
      }
    },
  },
});
