var start_url = 'https://xkcd.com/info.0.json';
var explainxkcd_url = 'http://www.explainxkcd.com/wiki/index.php/';

function get(url) {
    return new Promise(function(resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('GET', url);

        req.onload = function() {
            if (req.status == 200) {
                resolve(req.response);
            } else {
                reject(Error(req.statusText));
            }
        };

        req.onerror = function() {
            reject(Error("Network Error"));
        };

        req.send();
    });
}

function get_num_comics(response) {
    var random_comic = Math.floor(Math.random() * JSON.parse(response).num);
    var url = 'https://xkcd.com/' + random_comic + '/info.0.json';
    return get(url);
}

function populate_dom(response) {
    var resp = JSON.parse(response);
    document.getElementById("image").setAttribute("src", resp.img);
    document.getElementById("link").setAttribute("href", explainxkcd_url + resp.num);
    document.getElementById("image").setAttribute("title", resp.alt);
    document.getElementById("title").innerHTML = resp.title;
}

// Main flow
get(start_url)
    .then(get_num_comics)
    .then(populate_dom);
