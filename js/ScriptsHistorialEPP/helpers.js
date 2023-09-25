function debounce(fn, delay) {
    if (typeof fn !== 'function') {
      throw new TypeError('El primer argumento debe ser una función');
    }
    
    if (typeof delay !== 'number' || delay < 0) {
      throw new TypeError('El segundo argumento debe ser un número no negativo');
    }
  
    let timeoutID;
    return function (...args) {
        clearTimeout(timeoutID);
        timeoutID = setTimeout(() => fn.apply(this, args), delay);
    };
  }