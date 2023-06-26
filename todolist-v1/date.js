
exports.getDate = function(){
    var today = new Date();
    // var currentDay = today.getDay();
    
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    return today.toLocaleDateString('en-US', options);
}

exports.getDay = function(){
    const today = new Date();
    // var currentDay = today.getDay();
    
    const options = {
        weekday: "long",
    }
    return today.toLocaleDateString('en-US', options);
}