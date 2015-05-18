var utilities = (function(){
  var API = {}
  API.replaceAt = function(string, index, newvalue){
    return string.substring(0,index) + newvalue + string.substring(index+newvalue.length)
  };
  return API
})()