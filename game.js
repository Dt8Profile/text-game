class Location {
  constructor(name) {
    this._name = name;
    this._description = "";
    this._linkedLocation = {};
    this._character = "";
    this._linkedItem = "";
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get character() {
    return this._character;
  }

  set name(value) {
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }

  set description(value) {
    if (value.length < 4) {
      alert("Description is too short.");
      return;
    }
    this._description = value;
  }

  set character(value) {
    this._character = value;
  }

  describe() {
    return `You can see ${this._description}, You Enter the ${this._name} `;
  }

  linkLocation(direction, locationToLink) {
    this._linkedLocation[direction] = locationToLink;
  }

  getDetails() {
    const entries = Object.entries(this._linkedLocation);
    let details = [];
    for (const [direction, location] of entries) {
      let text = `The ${location._name} is to the ${direction}`;
      details.push(text);
    }
    return details;
  }

  move(direction) {
    if (direction in this._linkedLocation) {
      return this._linkedLocation[direction];
    } else {
      alert("You can't go that way");
      return this;
    }
  }
}

class Item {
  constructor(name) {
    this._name = name;
    this._description = "";
  }

  set name(value) {
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }

  set description(value) {
    if (value.length < 4) {
      alert("Description is too short.");
      return;
    }
    this._description = value;
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  describe() {
    return `The ${this._name} is ${this._description}`;
  }
}

class Character {
  constructor(name) {
    this._name = name;
    this._description = "";
    this._conversation = "";
  }

  set name(value) {
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }

  set description(value) {
    if (value.length < 4) {
      alert("Description is too short.");
      return;
    }
    this._description = value;
  }

  set conversation(value) {
    if (value.length < 4) {
      alert("Conversation is too short.");
      return;
    }
    this._conversation = value;
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get conversation() {
    return this._conversation;
  }

  describe() {
    return `You have met ${this._name}, ${this._name} is ${this._description}`;
  }

  converse() {
    return `${this._name} says '${this._conversation}'`;
  }
}

class Guardian extends Character {
  constructor(name, description, question, correctAnswer) {
    super(name);
    this._name = name;
    this._description = description;
    this._question = question;
    this._correctAnswer = correctAnswer;
    this._hasKey = false;
  }

  get name() {
    return this._name;
  }

  askQuestion() {
    return `${this._description}\n${this._question}`;
  }

  checkAnswer(answer) {
    if (answer.toLowerCase() === this._correctAnswer.toLowerCase()) {
      this._hasKey = true;
      return `Correct! ${this._name} gives you a key.`;
    } else {
      return `Wrong answer. ${this._name} doesn't give you the key.`;
    }
  }

  get hasKey() {
    return this._hasKey;
  }
}

class Player {
  constructor() {
    this._keys = [];
  }

  collectKey(key) {
    this._keys.push(key);
  }

  get keys() {
    return this._keys;
  }
}

const cave = new Location("Cave");
cave.description = "a dark and mysterious cave with stalactites.";

const forest = new Location("Forest");
forest.description = " a lush green forest with tall trees and wildlife.";

const abandonedHut = new Location("Abandoned Hut");
abandonedHut.description = "an abandoned hut with a thatched roof.";

const boatHouse = new Location("Boat House");
boatHouse.description = "a small boat floating on a tranquil lake.";

const starlitClearing = new Location("Starlit Clearing");
starlitClearing.description =
  "a serene clearing bathed in the soft light of twinkling stars, creating a peaceful atmosphere.";

const mysticalGrove = new Location("Mystical Grove");
mysticalGrove.description =
  "a magical grove filled with enchanting plants and mystical creatures.";

const crypt = new Location("Crypt");
crypt.description = "a dimly lit crypt with ancient tombs and eerie echoes.";

const lake = new Location("Lake");
lake.description =
  "a peaceful lake surrounded by lush greenery, with crystal-clear water reflecting the blue sky.";

// Link the locations together
cave.linkLocation("north", forest);
forest.linkLocation("east", boatHouse);
forest.linkLocation("west", mysticalGrove);
forest.linkLocation("north", abandonedHut);
mysticalGrove.linkLocation("east", forest);
mysticalGrove.linkLocation("south", crypt);
crypt.linkLocation("north", mysticalGrove);
boatHouse.linkLocation("west", forest);
boatHouse.linkLocation("south", lake);
lake.linkLocation("north", boatHouse);
lake.linkLocation("south", starlitClearing);
abandonedHut.linkLocation("south", forest);
starlitClearing.linkLocation("north", lake);
// Define guardian characters
const guardian1 = new Guardian(
  "Guardian 1",
  "<p>A Red glowing Guardian appears, it looks like he has a key!",
  "<p class='text-red-500 font-bold'>The Guardian's Question: You must answer before you can move on</p> <p class='text-blue-500 font-bold text-lg mb-2'>What has keys but can't open locks?</p>",
  "A piano"
);

const guardian2 = new Guardian(
  "Guardian 2",
  "A Blue glowing Guardian appears, it looks like he has a key!",
  "<p class='text-red-500 font-bold'>The Guardian's Question: You must answer before you can move on</p><p class='text-blue-500 font-bold text-lg mb-2'>The more you take, the more you leave behind. What am I?</p>",
  "Footsteps"
);

const guardian3 = new Guardian(
  "Guardian 3",
  "<p>A Green glowing Guardian appears, it looks like he has a key!</p>",
  "<p>The Guardian's Question: You must answer before you can move on</p><p class='text-blue-500 font-bold text-lg mb-2'>What comes once in a minute, twice in a moment, but never in a thousand years?</p>",
  "The letter M"
);

// Add guardians to locations
crypt.character = guardian1;
abandonedHut.character = guardian2;
starlitClearing.character = guardian3;

// Initialize player
const player = new Player();

// Update the displayLocationInfo function to handle guardian interactions
function displayLocationInfo(location) {
  let occupantMsg = "";

  if (location.character !== "" && !location.character.hasKey) {
    occupantMsg = location.character.askQuestion();
  } else if (location.character !== "") {
    occupantMsg = `Hello! ${location.character.name} greets you.`;
  }

  const textContent =
    "<p>" +
    location.describe() +
    "</p>" +
    "<p>" +
    occupantMsg +
    "</p>" +
    "<p>" +
    location.getDetails() +
    "</p>";

  document.getElementById("textarea").innerHTML = textContent;
  document.getElementById("userInput").innerHTML =
    '><input type="text" id="userInput" />';
  document.getElementById("userInput").focus();
}
function restartGame() {
  // Reset player's keys
  player._keys = [];

  // Reset guardian keys
  guardian1._hasKey = false;
  guardian2._hasKey = false;
  guardian3._hasKey = false;

  // Reset player's location
  currentLocation = cave;

  // Update keys display
  updateKeysDisplay(player.keys);

  // Display the starting location information
  displayLocationInfo(currentLocation);
}

// Update the event listener to handle player responses to guardian questions and check for winning condition
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const command = document.getElementById("userInput").value;

    if (currentLocation.character !== "" && !currentLocation.character.hasKey) {
      const guardian = currentLocation.character;
      const response = guardian.checkAnswer(command);
      alert(response);

      if (currentLocation.character.hasKey) {
        player.collectKey(currentLocation.character.name + "'s Key");
        updateKeysDisplay(player.keys);

        // Check for winning condition
        if (player.keys.length === 3) {
          alert(
            "Congratulations! You have collected three keys and won the game!"
          );
          restartGame();
          return;
        }
      } else {
        // Incorrect answer, restart the game
        alert("Incorrect answer. Game over. Restarting...");
        restartGame();
        return;
      }
      // Clear the input box
      document.getElementById("userInput").value = "";
    } else {
      const directions = ["north", "south", "east", "west"];
      if (directions.includes(command.toLowerCase())) {
        currentLocation = currentLocation.move(command);
        document.getElementById("userInput").value = "";
        displayLocationInfo(currentLocation);
      } else {
        document.getElementById("userInput").value = "";
        alert("That is not a valid command. Please try again.");
      }

      // Move the winning condition check here
      if (player.keys.length === 3) {
        alert(
          "Congratulations! You have collected three keys and won the game!"
        );
        restartGame();
      }
    }
  }
});

// Start the game
function startGame() {
  currentLocation = cave;
  displayLocationInfo(currentLocation);
}

// Add HTML elements for the keys display
const keysContainer = document.getElementById("keys-container");
const keysDisplay = document.createElement("div");
keysDisplay.id = "keys-display";
keysContainer.appendChild(keysDisplay);

// Update the keys display
function updateKeysDisplay(keys) {
  keysDisplay.innerHTML = `
    <p class='text-lg font-bold'>Keys:</p>
    ${keys
      .map((key) => `<div class="bg-yellow-400 p-2 rounded">${key}</div>`)
      .join("")}
  `;
}

startGame();
