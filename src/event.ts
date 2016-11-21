export default class Event {
  private _events: { [event: string]: Array<Function> };
  subscribe(event: string, callback: Function) {
    this._events = this._events || {};
    this._events[event] = this._events[event] || [];
    this._events[event].push(callback);
  }

  unsubscribe(event: string, callback: Function) {
    this._events = this._events || {};
    if (event in this._events === false) { return; }
    this._events[event].splice(this._events[event].indexOf(callback), 1);
  }

  emit(event, ...args) {
    this._events = this._events || {};
    if (event in this._events === false) { return; }
    for (let i = 0; i < this._events[event].length; i++) {
      this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
    }
  }
}