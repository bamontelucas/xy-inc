var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var delay = require('express-delay');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(delay(1000));

var pois = [
    {
        name:"Lanchonete",
        x:27,
        y:12
    },
    {
        name:"Posto",
        x:31,
        y:18
    },
    {
        name:"Joalheria",
        x:15,
        y:12
    },
    {
        name:"Floricultura",
        x:19,
        y:21
    },
    {
        name:"Pub",
        x:12,
        y:8
    },
    {
        name:"Supermercado",
        x:23,
        y:6
    },
    {
        name:"Churrascaria",
        x:28,
        y:2
    }
];

app.get('/poi', function(req, res) {
    if((!req.query.data) || (!req.query.data.x) || (!req.query.data.y) || (!req.query.data.distance)) {
        res.send(pois);
        return;
    }
    var to_send = [];
    pois.forEach(function(p) {
        if ((Math.abs(p.x - req.query.data.x) < req.query.data.distance) && (Math.abs(p.y - req.query.data.y) < req.query.data.distance)) {
            to_send.push(p);
        }
    });
    res.send(to_send);  
});

app.post('/poi', function(req, res) {
    var new_poi = {
        name: (req.body.data.name || 'poi sem nome'),
        x: (req.body.data.x || 0),
        y: (req.body.data.y || 0),
    };
    pois.push(new_poi);
    res.send(new_poi);
});

app.use('/', express.static(__dirname+'/www'));
app.listen(3000);