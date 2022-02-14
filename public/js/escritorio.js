const searchParams = new URLSearchParams(window.location.search);
const title = document.querySelector('h1');
const listenBtn = document.querySelector('button');
const listenTo = document.querySelector('small');
const alert = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes');

if ( ! searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}

const desktop = searchParams.get('escritorio');
title.innerHTML = 'Escritorio ' + desktop;

alert.style.display = 'none';

const socket = io();

socket.on('connect', () => {
    listenBtn.disabled = false;
});

socket.on('disconnect', () => {
    listenBtn.disabled = true;
});

socket.on('tickets-remaining', (payload) => {
    lblPendientes.innerHTML = payload;
})

listenBtn.addEventListener( 'click', () => {
    
    socket.emit('listen-ticket',  {desktop}, ({ok, msg, ticket}) => {
        if ( ! ok) {
            alert.style.display = '';
            return alert.innerHTML = msg;
        } 

        listenTo.innerHTML = 'Ticket ' + ticket.number;
    }) 

});