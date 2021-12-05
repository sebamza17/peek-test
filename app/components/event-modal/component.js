import Component from '@ember/component';
import { get, set } from '@ember/object';
import { alias } from '@ember/object/computed';
import { EventStatus } from '../../utils/event';

export default Component.extend({
  classNames: ['event-modal-container'],

  // local vars
  eventErrors: [],

  startTimepickerOptions: {
    timeFormat: 'HH:mm',
    defaultTime: '09:00',
    interval: 15,
    zindex: 10000,
  },

  endTimepickerOptions: {
    timeFormat: 'HH:mm',
    defaultTime: '09:30',
    interval: 15,
    zindex: 10000,
  },

  // params
  event: undefined,
  isNew: alias('event.isNew'),

  actions: {
    setStartTime(time) {
      set(this, 'event.startTime', time);
      const nearestEndTime = new Date(time.getTime() + 30 * 60000);

      // TODO trying to set a new starting time for endTime timepicker
      // is not currently working due to its ember component is just a wrapper
      // the wrapper is not calling the re-attaching of the configs
      // on the underlying jquery component
      set(
        this,
        'endTimepickerOptions.minTime',
        nearestEndTime.toLocaleTimeString()
      );
    },

    setEndTime(time) {
      set(this, 'event.endTime', time);
    },

    save() {
      const eventErrors = Object.values(get(this, 'event.errors')).filter(Boolean);

      if (eventErrors && eventErrors.length > 0) {
        set(this, 'errors', get(this, 'event.errors'));
        return;
      }

      set(this, 'event.status', EventStatus.created);

      if (this.onSave) {
        this.onSave(this.event);
      }
    },

    delete() {
      if (this.onDelete) {
        this.onDelete(this.event);
      }
    },
  },
});
