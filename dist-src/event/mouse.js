const mouse = ({ Default, THREE, domElement, event }) => {
  return class {
    static #eventList = {
      click: [],
      mousedown: [],
      mouseup: [],
      mousemove: []
    };
    static #id = 0;
    static #idMap = {};

    static {
      domElement.addEventListener("click", (e) => {
        const target = e.target;
        const rect = target.getBoundingClientRect();
        const pos = new THREE.Vector2(e.clientX - rect.x, e.clientY - rect.y);
        this.#eventList.click.forEach((callback) => {
          callback(pos, e);
        });
      });
      domElement.addEventListener("mousedown", (e) => {
        const target = e.target;
        const rect = target.getBoundingClientRect();
        const pos = new THREE.Vector2(e.clientX - rect.x, e.clientY - rect.y);
        this.#eventList.mousedown.forEach((callback) => {
          callback(pos, e);
        });
      });
      domElement.addEventListener("mouseup", (e) => {
        const target = e.target;
        const rect = target.getBoundingClientRect();
        const pos = new THREE.Vector2(e.clientX - rect.x, e.clientY - rect.y);
        this.#eventList.mouseup.forEach((callback) => {
          callback(pos, e);
        });
      });
      domElement.addEventListener("mousemove", (e) => {
        const target = e.target;
        const rect = target.getBoundingClientRect();
        const pos = new THREE.Vector2(e.clientX - rect.x, e.clientY - rect.y);
        this.#eventList.mousemove.forEach((callback) => {
          callback(pos, e);
        });
      });
      domElement.addEventListener("touchstart", (e) => {
        const target = e.target;
        const rect = target.getBoundingClientRect();
        const touch = e.changedTouches[0];
        const pos = new THREE.Vector2(touch.clientX - rect.x, touch.clientY - rect.y);
        this.#eventList.mousedown.forEach((callback) => {
          callback(pos, e);
        });
      });
      domElement.addEventListener("touchend", (e) => {
        const target = e.target;
        const rect = target.getBoundingClientRect();
        const touch = e.changedTouches[0];
        const pos = new THREE.Vector2(touch.clientX - rect.x, touch.clientY - rect.y);
        this.#eventList.mouseup.forEach((callback) => {
          callback(pos, e);
        });
      });
      domElement.addEventListener("touchmove", (e) => {
        const target = e.target;
        const rect = target.getBoundingClientRect();
        const touch = e.changedTouches[0];
        const pos = new THREE.Vector2(touch.clientX - rect.x, touch.clientY - rect.y);
        this.#eventList.mousemove.forEach((callback) => {
          callback(pos, e);
        });
      });

    }

    static #addMap(key, index) {
      if (this.#idMap[this.#id] === undefined) this.#idMap[this.#id] = {};
      if (this.#idMap[this.#id][key] === undefined) this.#idMap[this.#id][key] = [];
      this.#idMap[this.#id][key].push(index);
    }

    static add(callback = () => { }, {
      type = Default.event.type
    } = {}) {
      const listener = {
        once: "click",
        down: "mousedown",
        up: "mouseup",
        move: "mousemove"
      };
      if (typeof (type) === "string") {
        if (type === "all") {
          Object.entries(this.#eventList).forEach(([key, list]) => {
            this.#addMap(`${key}`, list.length);
            list.push(callback);
          });
          const _id = this.#id;
          const result = () => {
            event.mouse.remove(_id);
          }
          this.#id++;
          return result;
        }
        if (this.#eventList[listener[type]] !== undefined) {
          this.#addMap(listener[type], this.#eventList[listener[type]].length);
          this.#eventList[listener[type]].push(callback);
          const _id = this.#id;
          const result = () => {
            event.mouse.remove(_id);
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

export default mouse
