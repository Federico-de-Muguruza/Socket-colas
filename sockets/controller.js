const TicketControl = require('../models/ticket-control');

const tc = new TicketControl(); 

const socketController = (socket) => {

    socket.emit('last-ticket', tc.lastTicket);
    socket.emit('status', tc.lastFourTickets);
    socket.emit('tickets-remaining', tc.tickets.length);

    socket.on('next-ticket', ( payload, callback ) => {
       
        const nextTicket = tc.nextTicket();
        callback(nextTicket);
        socket.broadcast.emit('tickets-remaining', tc.tickets.length);
    })

    socket.on('listen-ticket', ({desktop}, callback) => {
        if ( ! desktop) {
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            })
        }

        const ticket = tc.listenTicket(desktop);
        socket.broadcast.emit('status', tc.lastFourTickets);
        socket.broadcast.emit('tickets-remaining', tc.tickets.length);
        socket.emit('tickets-remaining', tc.tickets.length);
        
        if ( ! ticket) {
            return callback({
                ok: false,
                msg: 'Ya no hay tickets'
            })
        }

        return callback({
            ok: true,
            ticket
        });
    })
}

module.exports = {
    socketController
}

