var shoe = require('shoe');
var through = require('through');
 
var stream = shoe('/tweets');

stream.pipe(through(function (msg) {
	tweet = JSON.parse(msg);
	if (tweet.coordinates){ 
		console.log(tweet.user.screen_name);
		console.log(tweet.text);
		console.log(tweet.coordinates);
		console.log(tweet.place);
		map_tweet(tweet)
	}
}));

var map = L.map('map').setView([19.4333, 99.1333], 5);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

function map_tweet(tweet){
	var popup = [
		'<h5>',
		tweet.user.screen_name,
		':</h5><p>',
		tweet.text , 
		'</p>'].join('');
	L.marker(reverse_coordinates(tweet.coordinates.coordinates)).addTo(map)
		.bindPopup(popup)
		.openPopup();
	function reverse_coordinates(coordinates){
		return [coordinates[1], coordinates[0]]
	}
}

