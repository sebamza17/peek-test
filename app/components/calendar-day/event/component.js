import Component from '@ember/component';
import { computed } from '@ember/object';
import { lt } from '@ember/object/computed';

export default Component.extend({
  tagName: '',

  // params
  hourDivider: 4,
  hourSize: 120,
  event: undefined,
  eventList: [],

  hasShortDuration: lt('event.duration', 30),

  height: computed('event.duration', 'hourSize', 'hourDivider', function () {
    const eventDurationInHours = this.event.duration / 60;

    return `${eventDurationInHours * this.hourSize}px`.htmlSafe();
  }),

  width: computed('overlappingEvents.[]', function () {
    const overlappingEventCount = this.overlappingEvents.length;
    const width = 100 / overlappingEventCount;
    return `${width}%`.htmlSafe();
  }),

  horizontalPosition: computed('overlappingEvents.[]', function () {
    const overlappingEventCount = this.overlappingEvents.length;
    const eventIndex = this.overlappingEvents.indexOf(this.event);
    const leftOffset = (100 / overlappingEventCount) * eventIndex;
    return `${leftOffset}%`.htmlSafe();
  }),

  verticalPosition: computed('event.startTime', function () {
    const eventStartTime = this.event.startTime;
    // - 6 to account for calendar starting hour at 06:00
    const eventStartTimeInHours = (eventStartTime.getHours() - 6) + eventStartTime.getMinutes() / 60;

    return `${eventStartTimeInHours * this.hourSize}px`.htmlSafe();
  }),

  overlappingEvents: computed('eventList.[]', 'event', function () {
    return this.eventList.filter((event) => {
      return (
        event.startTime <= this.event.endTime &&
        event.endTime >= this.event.startTime
      );
    });
  }),
});
