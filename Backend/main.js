const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const RRWS = require('./WebSocketWrapper/Wrapper')
const User = require('./User')
const uuid = require('uuid/v4')

let expressapp = express();
const PORT = process.env.PORT || 8000;
expressapp.use(express.static(__dirname + "/"));
expressapp.use(bodyParser.urlencoded({extended: true}));
expressapp.use(bodyParser.json())
var server = http.createServer(expressapp)
server.listen(PORT)

var wss  = new RRWS({server: server, verifyClient : verify})

//temp usage, will be stored in a database.
let users = new Map()

function verify(info, cb) {
    let user = users[info.req.headers['key']]
    if (!user) {
        cb(false, 403, 'invalid key')
        return
    }
    cb(true)
}

expressapp.post('/login', (req, res) => {
    let data = req.body
    let username = data.username
    let key = uuid()
    let newTempUser = new User(username, key)
    users[key] = newTempUser
    res.send({key: key})
})

wss.on('connection', (connectionKey, headers) => {
    let key = headers["key"]
    let user = users[key]
    if (user == undefined) {
        
    }
})

/*req:
    id: String,
    data: JSON

resp: 
    data: JSON
    send(data) : function
    */

/
wss.onCommand('createGame', ['name', 'key'], (req, resp) => {

})