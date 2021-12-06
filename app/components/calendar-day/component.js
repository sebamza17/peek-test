import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: ['calendar-day-container'],

  // params
  hourDivider: undefined,
  hourSize: undefined,
  selectedDate: undefined,

  timeSlotSize: computed('hourDivider', 'hourSize', function () {
    if (!this.hourDivider || !this.hourSize) {
      return 25;
    }

    return this.hourSize / this.hourDivider;
  }),

  // TODO try to improve starting time
  timeSlots: computed(function () {
    const quarterHours = ['00', '15', '30', '45'];
    const times = [];

    for (let i = 6; i < 24; i++) {
      for (let j = 0; j < 4; j++) {
        let time = i + ':' + quarterHours[j];

        if (i < 10) {
          time = '0' + time;
        }

        times.push(time);
      }
    }

    return times;
  }),
});
