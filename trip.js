const modes = { bus: "bus", tube: "tube" };
const maxFare = 3.2;

class Trip {
  constructor(card) {
    this.zonesTravelled = [];
    this.fare = 3.2;
    this.card = card;
    this.mode = "";
  }
  enterFrom(station, mode) {
    if (this.card.balance > this.fare) {
      this.zonesTravelled.push(...findZone(station));
      this.mode = mode;
      console.log(
        `--------------\nStarting ${this.mode.toUpperCase()} from ${station.toUpperCase()}`
      );
      return 1;
    } else return 0;
  }

  exitAt(station) {
    console.log(
      `Exiting ${this.mode.toUpperCase()} at ${station.toUpperCase()}`
    );
    if (this.mode === "bus") {
      this.fare = 1.8;
      this.zonesTravelled = [];
      this.card.debitAmount(this.fare);
      return;
    } else {
      this.zonesTravelled.push(...findZone(station));
      this.fare = this.calculateFare();
      this.zonesTravelled = [];
      this.card.debitAmount(this.fare);
    }
  }

  calculateFare() {
    let uniqueZones = [...new Set(this.zonesTravelled)];
    // console.log("uniqueZones: ", uniqueZones);
    if (uniqueZones.length === 3) {
      // All three zones
      return maxFare;
    }

    if (uniqueZones.includes(1) && !uniqueZones.includes(2)) {
      // Anywhere in Zone 1
      return 2.5;
    }

    if (
      uniqueZones.includes(2) &&
      uniqueZones.includes(2) &&
      uniqueZones.length === 2
    ) {
      // Any one zone outside zone 1
      // can happen only within zone 2
      return 2;
    }
    if (uniqueZones.includes(1) && uniqueZones.length >= 2) {
      // Any two zones including zone 1
      return 3;
    }

    if (!uniqueZones.includes(1) && uniqueZones.length >= 2) {
      // Any two zones excluding zone 1
      return 2.25;
    } else {
      return maxFare;
    }
  }
}

const findZone = station => {
  switch (station) {
    case "Holborn":
      return [1];
    case "Earl’s Court":
      return [1, 2];
    case "Hammersmith":
      return [2];
    case "Wimbledon":
      return [3];
    default:
      return [19];
  }
};

module.exports = Trip;
