import { module, test } from "qunit";
import { click, fillIn, visit, currentURL, pauseTest } from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";

module("Acceptance | events", function(hooks) {
  setupApplicationTest(hooks);

  test("visiting /events", async function(assert) {
    await visit("/events");

    assert.equal(currentURL(), "/events");
  });

  test("can add, update and remove an event", async function(assert) {
    await visit("/events");
    await click("[data-test-button='add-event'] a");

    await fillIn("[data-test-input='activity-name'] input", "Test Event");
    await click("[data-test-button='save'] a");

    await click(".sm-event-container");

    assert.equal(
      document.querySelector(".event-modal__title").textContent.includes("Update Existing Event"),
      true
    );

    await fillIn("[data-test-input='activity-name'] input", "Test Event Updated");
    await click("[data-test-button='save'] a");

    const eventList = document.querySelectorAll(".sm-event-container");
    assert.equal(eventList.length, 1);

    await click(".sm-event-container");

    assert.equal(
      document.querySelector(".event-modal__title").textContent.includes("Update Existing Event"),
      true
    );

    await click("[data-test-button='delete'] a");

    const eventListAfter = document.querySelectorAll(".sm-event-container");
    assert.equal(eventListAfter.length, 0);
  });

  test("updating date of an event removes it from current list", async function(assert) {
    await visit("/events");
    await click("[data-test-button='add-event'] a");

    await fillIn("[data-test-input='activity-name'] input", "Test Event");
    await click("[data-test-button='save'] a");

    const eventList = document.querySelectorAll(".sm-event-container");
    assert.equal(eventList.length, 1);

    await click(".sm-event-container");

    await fillIn("[data-test-input='date'] input", "12/07/2022");
    await click("[data-test-button='save'] a");

    const eventListAfter = document.querySelectorAll(".sm-event-container");
    assert.equal(eventListAfter.length, 0);
  });

  test('overlapping events are displayed on calendar and both are visibile', async function (assert) {
    await visit("/events");

    await click("[data-test-button='add-event'] a");
    await fillIn("[data-test-input='activity-name'] input", "Test Event");
    await click("[data-test-button='save'] a");

    await click("[data-test-button='add-event'] a");
    await fillIn("[data-test-input='activity-name'] input", "Test Event 2");
    await click("[data-test-button='save'] a");

    const eventElements = document.querySelectorAll(".sm-event-container");

    assert.equal(eventElements[0].getAttribute('style').includes('width: 50%'), true);
    assert.equal(eventElements[0].getAttribute('style').includes('left: 0'), true);
    assert.equal(eventElements[1].getAttribute('style').includes('width: 50%'), true);
    assert.equal(eventElements[1].getAttribute('style').includes('left: 50%'), true);
  });
});
