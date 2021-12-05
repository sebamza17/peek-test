import EmberObject from '@ember/object';
import { computed } from '@ember/object';
import { equal } from '@ember/object/computed';

export const EventStatus = {
  new: 'new',
  created: 'created',
  cancelled: 'cancelled',
};

/**
 The key things a timeslot should involve include:

 An activity name (string)
 A date (YYYY-MM-DD format)
 A start time (hh:mm format)
 An end time (hh:mm format)
 Maximum number of guests (number)
 */
export default EmberObject.extend({
  activityName: undefined,
  date: undefined,
  startTime: undefined,
  endTime: undefined,
  numMaxGuests: 0,
  status: 'new',

  isNew: equal('status', EventStatus.new),
  isCancelled: equal('status', EventStatus.cancelled),

  /**
   * returns duration in minutes
   */
  duration: computed('startTime', 'endTime', function () {
    return (this.endTime - this.startTime) / 1000 / 60;
  }),

  errors: computed('activityName', 'date', 'startTime', 'endTime', function () {
    let errors = {
      activityName: undefined,
      date: undefined,
      startTime: undefined,
      endTime: undefined,
    };

    if (!this.activityName) {
      errors.activityName = 'Required';
    }

    if (!this.date) {
      errors.date = 'Required';
    }

    if (!this.startTime) {
      errors.startTime = 'Required';
    }

    if (!this.endTime) {
      errors.endTime = 'Required';
    }

    return errors;
  }),

  isSameAsDate(date) {
    return (
      this.date.getFullYear() === date.getFullYear() &&
      this.date.getMonth() === date.getMonth() &&
      this.date.getDate() === date.getDate()
    );
  },
});
