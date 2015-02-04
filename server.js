
var http = require('http');
var ecstatic = require('ecstatic');
 
var server = http.createServer(
  ecstatic({ root: __dirname + '/public', cache : 0 })
)

var PORT = process.argv[2] || 3000;

server.listen(PORT, function(){
	console.log("Server listening @ :"+PORT)
})

var telenovelas = [
	'Mi Corazón Es Tuyo', 
	"Hasta El Fin Del Mundo", 
	"Muchacha Italiana Viene A Casarse", 
	"La Rosa de Guadalupe"
	];

var telenovelas_kw = ['MIVAC'];

telenovelas.forEach(function(nom){
	telenovelas_kw.push(nom.join(''));
})


var fields = ['coordinates', 'text', 'user', 'place']
var tweets = require('./lib/tweet_tracker.js')(telenovelas_kw, fields); 

tweets.install(server, '/tweets');

tweets.tweet_stream.pipe(process.stdout);
