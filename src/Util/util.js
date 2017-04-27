export default {
  serializeJSON: (data) => {
    return Object.keys(data).map((keyName) => {
      return encodeURIComponent(keyName) + '=' + encodeURIComponent(data[keyName]);
    }).join('&');
  }
};
