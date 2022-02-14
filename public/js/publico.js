const socket = io();

const lblTicket1 = document.querySelector('#lblTicket1');
const lblTicket2 = document.querySelector('#lblTicket2');
const lblTicket3 = document.querySelector('#lblTicket3');
const lblTicket4 = document.querySelector('#lblTicket4');
const lblEscritorio1 = document.querySelector('#lblEscritorio1');
const lblEscritorio2 = document.querySelector('#lblEscritorio2');
const lblEscritorio3 = document.querySelector('#lblEscritorio3');
const lblEscritorio4 = document.querySelector('#lblEscritorio4');

socket.on('status', (payload) => {

    const audio = new Audio('../audio/new-ticket.mp3');
    audio.play();

    const [ticket1, ticket2, ticket3, ticket4] = payload;
   
    if (ticket1) {
        lblTicket1.innerHTML = 'Ticket ' + ticket1.number;
        lblEscritorio1.innerHTML = 'Escritorio '  + ticket1.desktop;
    }

    if (ticket2) {
        lblTicket2.innerHTML = 'Ticket ' + ticket2.number;
        lblEscritorio2.innerHTML = 'Escritorio '  + ticket2.desktop;
    }

    if (ticket3) {
        lblTicket3.innerHTML = 'Ticket ' + ticket3.number;
        lblEscritorio3.innerHTML = 'Escritorio '  + ticket3.desktop;
    }

    if (ticket4) {
        lblTicket4.innerHTML = 'Ticket ' + ticket4.number;
        lblEscritorio4.innerHTML = 'Escritorio '  + ticket4.desktop;
    }

})