module.exports = {
  invert: function(str) {
    var resultStr = "";
    for(var i = str.length - 1; i >= 0; i--) {
      resultStr += str[i];
    }
    return resultStr;
  },
  camelCase: function(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
      return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
    }).replace(/\s+/g, '');
  },
  longestWord: function(str) {
    var arr = str.split(" "),
        result = '',
        longest = 0;
    for(var i = 0; i < arr.length; i++) {
      if(arr[i].length > longest) {
        result = arr[i];
        longest = arr[i].length;
      }
    }
    return result;
  }
};