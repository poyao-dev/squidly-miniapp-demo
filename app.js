// app.js
class SquidlyDemoApp {
  constructor() {
    this._counter = 0; // consistent with the backing field
    this.counterButton = null;
    this.init();
  }
  init() {
    this.createUI();
    this.addListeners();
    this.initDefaultFirebaseValues();
    this.addSideBarButtons();
  }

  createUI() {
    // Create a container to hold button and value in a row
    const container = document.createElement("div");
    // flex row, centered items, with gap, positioned absolute center
    container.className =
      "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-4 bg-gray-900/50 p-4 rounded-xl backdrop-blur-sm shadow-xl border border-white/10";

    this.counterButton = document.createElement("button");
    this.counterButton.textContent = "Increment Counter";
    // Tailwind classes for button (removed absolute positioning)
    this.counterButton.className =
      "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transform transition hover:-translate-y-0.5 active:translate-y-0";
    // add a wrapper element "access-button"
    this.accessCounterButton = document.createElement("access-button");
    this.accessCounterButton.addEventListener("access-click", () => {
      this.incrementCounter();
    });
    this.accessCounterButton.appendChild(this.counterButton);
    container.appendChild(this.accessCounterButton);

    // a counter value
    this.counterValue = document.createElement("div");
    // Tailwind classes for value text (removed absolute positioning)
    this.counterValue.className =
      "text-2xl font-mono font-bold text-cyan-400 min-w-[3ch] text-center";
    this.counterValue.textContent = this.counter;
    container.appendChild(this.counterValue);

    document.body.appendChild(container);
  }

  initDefaultFirebaseValues() {
    SquidlyAPI.firebaseSet("counter", 0);
  }
  // Listeners
  addListeners() {
    SquidlyAPI.firebaseOnValue("counter", (value) => {
      console.log("Counter changed to", value);
      this.counter = value;
    });
  }
  addSideBarButtons() {
    SquidlyAPI.setIcon(
      1,
      0,
      {
        symbol: "add",
        displayValue: "Sending data",
        type: "action",
      },
      () => {
        console.log("Sending data");
      },
    );
  }

  incrementCounter() {
    // this.counter++;
    SquidlyAPI.firebaseSet("counter", this.counter + 1);
  }

  decrementCounter() {
    // this.counter--;
    SquidlyAPI.firebaseSet("counter", this.counter - 1);
  }

  get counter() {
    return this._counter;
  }

  set counter(value) {
    this._counter = value;
    if (this.counterValue) {
      this.counterValue.textContent = value;
    }
  }
}

// Instantiate the app to run it
window.onload = () => {
  new SquidlyDemoApp();
};
