const key = ({ Default, domElement, event }) => {
  return class {
    static #eventList = {
      keypress: [],
      keydown: [],
      keyup: []
    };
    static #id = 0;
    static #idMap = {};

    static {
      domElement.addEventListener("keypress", (e) => {
        this.#eventList.keypress.forEach((callback) => {
          callback(e.key, e);
        });
      });
      domElement.addEventListener("keydown", (e) => {
        this.#eventList.keydown.forEach((callback) => {
          callback(e.key, e);
        });
      });
      domElement.addEventListener("keyup", (e) => {
        this.#eventList.keyup.forEach((callback) => {
          callback(e.key, e);
        });
      });
    }

    static #addMap(key, index) {
      if (this.#idMap[this.#id] === undefined) this.#idMap[this.#id] = {};
      if (this.#idMap[this.#id][key] === undefined) this.#idMap[this.#id][key] = [];
      this.#idMap[this.#id][key].push(index);
    }

    static #wrapCallback(callback, trigger) {
      let result;
      if (trigger instanceof RegExp) result = (key, e) => {
        if (trigger.test(key)) callback(key, e);
      };
      else result = (key, e) => {
        if (key === trigger) callback(key, e);
      };

      return result;
    }

    static add(callback = () => { }, {
      type = Default.event.type,
      trigger = Default.event.keyTrigger
    } = {}) {
      const listener = {
        once: "keypress",
        down: "keydown",
        up: "keyup"
      };
      if (typeof (type) === "string") {
        if (type === "all") {
          Object.entries(this.#eventList).forEach(([key, list]) => {
            this.#addMap(`${key}`, list.length);
            list.push(this.#wrapCallback(callback, trigger));
          });
          const _id = this.#id;
          const result = () => {
            event.key.remove(_id);
          }
          this.#id++;
          return result;
        }
        if (this.#eventList[listener[type]] !== undefined) {
          this.#addMap(listener[type], this.#eventList[listener[type]].length);
          this.#eventList[listener[type]].push(this.#wrapCallback(callback, trigger));
          const _id = this.#id;
          const result = () => {
            event.key.remove(_id);
          }
          this.#id++;
          return result;
        }
      }
    }

    static remove(id) {
      Object.entries(this.#idMap[id])?.forEach(([key, list]) => {
        list.forEach(index => {
          this.#eventList[key][index] = () => { };
        });
      });
    }
  }
}

export default key
