const Wrapper = require('./Wrapper')
const Events = require('events')

wsDummies = []
class TransportDummy extends Events.EventEmitter {
    constructor() {
        super()
    }

    createConnection() {
        this.emit('connection', wsDummies.push(new WebSocketDummy()), {})
    }
}

class ServerDummy {
    constructor() {
        this.Server = TransportDummy
    }
    
}

class WebSocketDummy extends Events.EventEmitter {
    constructor() {
        super()
    }

    send(data) {

    }

    close(event) {
        this.emit('close', event)
    }

    message() {
        this.emit('message')
    }
}

wrapper = new Wrapper({}, new ServerDummy())
wsDummies[0].message()
