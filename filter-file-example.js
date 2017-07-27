//console.log('Start Filter File');

var filter = function(req, body, res) {
    var outValue = true;
    //console.log('req.url = ' + req.url);
    if (req.url.indexOf('/user') != -1) {
        res.statusCode = 500;
        res.end('');
    } else {
        outValue = false;
    }
    return outValue;
};

module.exports = filter;

//console.log('End Filter File');
