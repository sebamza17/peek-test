import { module, test } from 'qunit';
import { click, fillIn, visit, currentURL, pauseTest } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | events', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /events', async function (assert) {
    await visit('/events');

    assert.equal(currentURL(), '/events');
  });

  test('can add an event', async function (assert) {
    await visit('/events');
    await click('[data-test-button="add-event"] a');

    // modal should be visible, so we can assert its title
    assert.equal(
      document.querySelector('.event-modal__title').textContent.includes('Create New Event'),
      true
    );

    await fillIn('[data-test-input="activity-name"] input', 'Test Event');
    await click('[data-test-button="save"] a');

    const eventList = document.querySelectorAll('.sm-event-container');
    assert.equal(eventList.length, 1);
  });

  it('can update an event', async function () {

  });
});
