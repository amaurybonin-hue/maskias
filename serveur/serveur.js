const http = require('http');
const {Server} = require('socket.io');
const serveur = http.createServer();
const io = new Server(serveur,{
    cors: {origin: "*"}
});
const joueurs = {};
io.on('connection', (socket) => {
    console.log('Un joueur s est connecté :' + socket.id);

    socket.on('rejoindre', (nom) => {
        joueurs[socket.id] = {nom: nom, vies: 2, role: null};
        console.log(nom + ' a rejoint la partie !');
        console.log('Joueurs connectés : ' + Object.keys(joueurs).length);
        socket.emit('messageServeur', 'Bienvenue ' + nom + ' !');
        io.emit('messageServeur', nom + ' a rejoint la partie !');
    });

    socket.on('disconnect', () => {
        const joueur = joueurs[socket.id];
        if (joueur) {
            console.log(joueur.nom + ' a quitté la partie !');
            io.emit('messageServeur', joueur.nom + ' a quitté la partie !');
            delete joueurs[socket.id];
        }
    });
});
serveur.listen(3000, () => {
    console.log('Serveur Maskias démarré sur le port 3000');
});