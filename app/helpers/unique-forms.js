import { helper } from "@ember/component/helper";
import { assert } from "@ember/debug";
import { tracked } from "@glimmer/tracking";

class AsyncData {
  /**
    @type {'LOADING' | 'LOADED' | 'ERROR'}
    @private
   */
  @tracked _state = "LOADING";

  /** @private */
  @tracked _value;

  /** @private */
  @tracked _error;

  get state() {
    return this._state;
  }

  get value() {
    assert(
      `You can only access 'value' when 'state' is 'LOADED', but it is ${this.state}`,
      this.state === "LOADED"
    );

    return this._value;
  }

  get error() {
    assert(
      `You can only access 'error' when 'state' is 'ERROR', but it is ${this.state}`,
      this.state === "ERROR"
    );

    return this._error;
  }

  get isLoading() {
    return this.state === "LOADING";
  }

  get isLoaded() {
    return this.state === "LOADED";
  }

  get isError() {
    return this.state === "ERROR";
  }

  resolveWith(value) {
    this._state = "LOADED";
    console.log(value);
    
      let selection = value
      console.log(selection)
      var arr = [];
      selection.forEach(function(item){
        var i = arr.findIndex(x => x.title == item.title);
        if(i <= -1){
          arr.push({id: item.id, title: item.title});
        }
      });
    
      arr = arr.map(function(item) {
          return item.id
      }) 
      console.log(arr);  
      
      const found = selection.filter(el => arr.includes(el.id));
       console.log(found)
                
    this._value = found;
  }

  rejectWith(error) {
    this._state = "ERROR";
    this._error = error;
  }
}

const MAP = new WeakMap();

export function load(somePromise) {
  let existingAsyncData = MAP.get(somePromise);
  if (existingAsyncData) {
    return existingAsyncData;
  }

  let asyncData = new AsyncData();
  MAP.set(somePromise, asyncData);

  somePromise.then(
    (value) => asyncData.resolveWith(value),
    (error) => asyncData.rejectWith(error)
  );

  return asyncData;
}

export default helper(([promise]) => load(promise));