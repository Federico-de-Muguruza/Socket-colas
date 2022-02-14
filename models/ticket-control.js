const path = require('path');
const fs = require('fs');

class Ticket {

    constructor(number, desktop) {
        this.number = number;
        this.desktop = desktop;
    }
}

class TicketControl {
    
    constructor() {
        this.lastTicket = 0;
        this.day = new Date().getDate();
        this.tickets = [];
        this.lastFourTickets = [];
        this.init();
    }

    get toJson() {
        return {
            lastTicket : this.lastTicket,
            day : this.day,
            tickets : this.tickets,
            lastFourTickets : this.lastFourTickets
        }
    }

    init() {
        const {day, tickets, lastTicket, lastFourTickets} = require('../db/data.json');
        if (day === this.day) {
            this.tickets = tickets,
            this.lastTicket = lastTicket,
            this.lastFourTickets = lastFourTickets
        } else {
            this.saveDB();
        }
    }

    saveDB() {
        const dbPath = path.join(__dirname, '../db/data.json');
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
    }

    nextTicket() {
        this.lastTicket += 1;
        const ticket = new Ticket(this.lastTicket, null);
        this.tickets.push(ticket);
        this.saveDB();
        return 'Ticket: ' + ticket.number;
    }

    listenTicket(desktop) {

        if (this.tickets.length === 0) {
            return null;
        }

        const ticket = this.tickets.shift();
        ticket.desktop = desktop;
        this.lastFourTickets.unshift(ticket);

        if (this.lastFourTickets.length > 4) {
            this.lastFourTickets.splice(-1, 1);
        }

        this.saveDB();
        return ticket;
    }
}

module.exports = TicketControl;
