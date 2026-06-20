const socket = io('http://localhost:3000');
const bouton = document.getElementById('boutonRejoindre');
const input = document.getElementById('nomJoueur');
bouton.addEventListener('click', () => {
    const nom = input.value;
    socket.emit('rejoindre', nom);
});
socket.on('messageServeur', (message) => {
    document.getElementById('messages').innerHTML += '<p>' + message + '</p>';
});