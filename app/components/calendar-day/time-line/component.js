import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['calendar-day__time-line'],

  // local vars
  size: 0,

  sizeString: computed('size', function () {
    return `height: ${this.size}px`.htmlSafe();
  }),
});
