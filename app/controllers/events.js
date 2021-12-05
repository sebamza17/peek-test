import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { set } from '@ember/object';
import { A } from '@ember/array';
import Event from '../utils/event';

export default Controller.extend({
  queryParams: ['date'],

  // local vars
  eventList: A(),
  eventModalOpen: false,
  hourDivider: 4,
  hourSize: 120,
  selectedEvent: undefined,
  selectedDate: undefined,

  init() {
    this._super(...arguments);

    set(this, 'selectedDate', new Date());
  },

  eventsToDisplay: computed('eventList.[]', 'selectedDate', function () {
    return this.eventList.filter(event => {
      return !event.isCancelled && event.isSameAsDate(this.selectedDate);
    });
  }),

  actions: {
    changeCalendarDate(date) {
      set(this, 'selectedDate', date);
      console.warn('this.eventList', this.eventList);
    },

    openEventModal() {
      set(this, 'eventModalOpen', true);
    },

    closeEventModal() {
      set(this, 'eventModalOpen', false);
      set(this, 'selectedEvent', undefined);
    },

    addEvent() {
      const event = Event.create({
        date: this.selectedDate,
      });

      set(this, 'selectedEvent', event);
      this.send('openEventModal');
    },

    updateEvent(event) {
      set(this, 'selectedEvent', event);
      this.send('openEventModal');
    },

    saveEvent(event) {
      this.eventList.addObject(event);
      this.send('closeEventModal');
    },

    deleteEvent(event) {
      this.eventList.removeObject(event);
      this.send('closeEventModal');
    },
  },
});
