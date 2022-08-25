module.exports = YetAnotherSet

function YetAnotherSet(iterator = []) {

  const array = [];

  if(typeof iterator === 'string') iterator = iterator.split('');

  for(const item of iterator)
    if(!array.includes(item)) array.push(item);

  const newSet = {
    add(item) {
      if(!array.includes(item)) array.push(item);

      return this;
    },

    has(item) {
      return (array.includes(item)) ? true : false;
    },

    delete(item) {
      if(array.includes(item)) {
        if (Number.isNaN(item)) {
          array.splice(array.findIndex(e => e != e), 1)
        } else {
          array.splice(array.indexOf(item), 1)
        }

        return true;
      }

      return false;
    },

    clear() {
      array.length = 0;

      return this;
    },

    get size(){ return array.length },

    entries() {
      return array.map(item => [item, item]);
    },

    values() {
      return Array.from(array);
    },

    keys(){return this.values()},

    forEach(cb, thisArg) {
      array.forEach(cb, thisArg);
    },

    [Symbol.toPrimitive](hint) {
      switch(hint) {
          case "string": return "[object ^_^]";
          case "number": return '[object ^_^]';
          default: return '[object ^_^]';
      }
    },

    [Symbol.iterator]() {
      return {
        index: 0,
        to: newSet.size,

        next() {
          if(this.index < this.to) return {done: false, value: array[this.index++]};
          return {done: true};
        }
      };
    },
  };

  return newSet;
}