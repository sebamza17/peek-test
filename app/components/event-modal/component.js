import Component from '@ember/component';
import { computed, get, set } from '@ember/object';
import { alias } from '@ember/object/computed';
import Event, { EventStatus } from '../../utils/event';

export default Component.extend({
  classNames: ['event-modal-container'],

  // local vars
  eventErrors: [],

  // params
  event: undefined,
  isNew: alias('eventChangeset.isNew'),

  eventChangeset: computed('event', function() {
    const changeset = Event.create(this.event.getData());
    return changeset;
  }),

  startTimepickerOptions: computed('eventChangeset.{date,startTime,endTime}', function() {
    const startHour = new Date(this.eventChangeset.startTime);
    const startMinutes = new Date(this.eventChangeset.startTime);

    return {
      minHour: 6,
      minMinutes: 0,
      maxHour: 23,
      maxMinutes: 59,
      dynamic: true,
      timeFormat: 'HH:mm',
      defaultTime: `${startHour.getHours()}:${startMinutes.getMinutes()}`,
      interval: 15,
      zindex: 10000
    };
  }),

  endTimepickerOptions: computed('eventChangeset.{startTime,endTime}', function() {
    const endStartHour = new Date(this.eventChangeset.endTime);
    const endStartMinutes = new Date(this.eventChangeset.endTime);

    return {
      minHour: 6,
      minMinutes: 0,
      maxHour: 23,
      maxMinutes: 59,
      dynamic: true,
      timeFormat: 'HH:mm',
      defaultTime: `${endStartHour.getHours()}:${endStartMinutes.getMinutes()}`,
      interval: 15,
      zindex: 10000
    };
  }),

  actions: {
    setStartTime(time) {
      set(this, 'eventChangeset.startTime', time);
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
      set(this, 'eventChangeset.endTime', time);
    },

    save() {
      const eventErrors = Object.values(get(this, 'eventChangeset.errors')).filter(Boolean);

      if (eventErrors && eventErrors.length > 0) {
        set(this, 'errors', get(this, 'eventChangeset.errors'));
        return;
      }

      if (this.onSave) {
        this.event.setDataFromChangeset(this.eventChangeset);

        if (this.event.isNew) {
          set(this, 'event.status', EventStatus.created);
          this.onSave(this.event);
        } else {
          this.onClose();
        }
      }
    },

    delete() {
      if (this.onDelete) {
        this.onDelete(this.event);
      }
    },
  },
});
