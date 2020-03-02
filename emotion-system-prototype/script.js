
const submitAction = document.getElementById("submit-action");
const playerActions = document.getElementById("actions");
const textbox = document.getElementById("textbox");

window.addEventListener("DOMContentLoaded", () => {
  textbox.innerHTML += "<p>You encounter " + npc.name + "!</p>";
  textbox.innerHTML += "<p>What will you do?</p>";
})


submitAction.addEventListener("click", e => {
  const command = playerActions.options[playerActions.selectedIndex].value;
  const action = actions[command];
  npc.valence += action.valenceMod;
  npc.activity += action.activityMod;
  npc.setMood();
  npc.setActions();
  textbox.innerHTML += `<p>${action.message + npc.name + "!"}</p>`;
  textbox.innerHTML += `<p>${npc.performAction()}</p>`;;
  textbox.innerHTML += `What will you do?`;

  console.log(npc.valence, npc.activity);
  textbox.scrollTop = textbox.scrolLHeight - textbox.clientHeight;
});

const actions = {
  play: {
    activityMod: 1,
    valenceMod: 1,
    message: "You play with "
  },
  bark: {
    activityMod: 1,
    valenceMod: -1,
    message: "You bark at "
  },
  growl: {
    activityMod: -1,
    valenceMod: -1,
    message: "You growl at "
  },
  "lie-down": {
    activityMod: -1,
    valenceMod: 1,
    message: "You roll over on the ground for "
  },
  wag: {
    activityMod: 0,
    valenceMod: 2,
    message: "You wag your tail at "
  },
  bite: {
    activityMod: 0,
    valenceMod: -2,
    message: "You bite "
  },
  jump: {
    activityMod: 2,
    valenceMod: 0,
    message: "You jump at "
  },
  sniff: {
    activityMod: -2,
    valenceMod: 0,
    message: "You sniff up "
  },
  watch: {
    activityMod: 0,
    valenceMod: 0,
    message: "You intently watch "
  },
  "run-away": {
    activityMod: 0,
    valenceMod: 0,
    message: "You run away from "
  }
}

const npc = {
  name: "The Angry Chihuahua",
  valence: 0,
  activity: 0,
  mood: "neutral",
  actions: [`${this.name} is watching you intently.`],
  setMood() {
    switch (true) {
      case this.valence <= 1 && this.valence >= -1 && this.activity <= 1 && this.activity >= 1:
        this.mood = "neutral";
        break;
      case this.valence <= 4 && this.valence >= 2 && this.activity <= 1 && this.activity >= -1:
        this.mood = "curious";
        break;
      case this.valence <= -2 && this.valence >= -4 && this.activity <= 1 && this.activity >= -1:
        this.mood = "frightened";
        break;
      case this.valence <= 1 && this.valence >= -1 && this.activity <= 4 && this.activity >= 2:
        this.mood = "alert";
        break;
      case this.valence <= 4 && this.valence >= 2 && this.activity <= 4 && this.activity >= 2:
        this.mood = "playful";
        break;
      case this.valence <= -2 && this.valence >= -4 && this.activity <= 4 && this.activity >= 2:
        this.mood = "aggressive";
        break;
      case this.valence <= 1 && this.valence >= -1 && this.activity <= -2 && this.activity >= -4:
        this.mood = "????";
        break;
      case this.valence <= 4 && this.valence >= 2 && this.activity <= -2 && this.activity >= -4:
        this.mood = "relaxed";
        break;
      case this.valence <= -2 && this.valence >= -4 && this.activity <= -2 && this.activity >= -4:
        this.mood = "submissive";
        break;
      default:
        break;
    }
  },
  setActions() {
    switch (this.mood) {
      case "neutral":
        this.actions = [`${this.name} is watching you intently.`];
        break;
      case "curious":
        this.actions = [`${this.name} is watching you intently.`, `${this.name} sniffs you up.`, `${this.name} is wagging its tail.`, `${this.name} barks at you!`];
        break;
      case "frightened":
        this.actions = [`${this.name} is growling at you.`, `${this.name} barks at you!`, `${this.name} ran away!`];
        break;
      case "alert":
        this.actions = [`${this.name} sniffs you up.`, `${this.name} is watching you intently.`, `${this.name} barks at you!`];
        break;
      case "playful":
        this.actions = [`${this.name} is playing with you!`, `${this.name} barks at you!`, `${this.name} jumps onto you playfully.`, `${this.name} is wagging its tail.`, `${this.name} sniffs you up.`];
        break;
      case "aggressive":
        this.actions = [`${this.name} is growling at you.`, `${this.name} barks at you!`, `${this.name} bites you!!`, `${this.name} jumps at you aggressively.`];
        break;
      case "????":
        this.actions = [`${this.name} is watching you intently.`];
        break;
      case "relaxed":
        this.actions = [`${this.name} is watching you calmly.`, `${this.name} rolled over!`, `${this.name} is wagging its tail.`];
        break;
      case "submissive":
        this.actions = [`${this.name} rolled over!`, `${this.name} is watching you intently.`, `${this.name} ran away!`];
        break;
    }
  },
  performAction() {
    return this.actions[rng(0, this.actions.length - 1)];
  }
}



/*** helper methods ***/
const rng = (min, max) => Math.floor(Math.random() * (max - min + 1) - min);