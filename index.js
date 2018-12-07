const Trip = require("./trip");
const Card = require("./card");

(function init() {
  const modes = {
    bus: "bus",
    tube: "tube"
  };
  // setting the card
  const card = new Card();
  card.setBalance(30);
  card.getBalance();

  // starting the trip series
  const trip = new Trip(card);
  trip.enterFrom("Holborn", modes.tube);
  trip.exitAt("Earl’s Court");
  card.getBalance();

  trip.enterFrom("Earl’s Court", modes.bus);
  trip.exitAt("Chelsea");
  card.getBalance();

  trip.enterFrom("Earl’s Court", modes.tube);
  trip.exitAt("Hammersmith");
  card.getBalance();
})();
