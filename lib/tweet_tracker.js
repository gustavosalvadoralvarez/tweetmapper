var shoe = require('shoe');
var es = require('event-stream');

module.exports = function tweet_tracker(keywords, fields) {
	var self = this, Twitter, t, _track, tweet_stream;

	Twitter = require('node-tweet-stream');

	tweet_stream = es.map(gather_fields);

	t = new Twitter({
	    consumer_key: 'PDGxTGvsJX9izwVabovCYRDs7',
	    consumer_secret: '95nzRlAyfYAA48RgfVvkGBjlNHFqETiNJlA0ITqA0D8EM4NrKD',
	    token: '1884216877-vOfwuTxyE9I83kfg6rcXJghvuxFfUfifsExUP6Y',
	    token_secret: 'uVh2W475slG23tqgd7B90HAQUoMbyKuHPSYbkVDWxvZAU'
  	});

	t.on('tweet', tweet_stream.write);

	t.on('error', console.log);

	_track = t.track.bind(t)

	self.tweet_stream = tweet_stream;

	self.add_keywords = add_keywords;

	self.add_fields = add_fields;

	self.install = install_server;

	if (keywords){ 
		track_keywords(keywords); 
	}

	fields = fields || [];
	
	return self;

	function install_server(server, path){
		var sock = shoe(function(stream){
			console.log('socket connected');
			tweet_stream.pipe(stream);
		});
		sock.install(server, path);
		console.log("Tweet stream server installed @ path: "+path+"\n tracking: "+JSON.stringify(keywords));
	}

	function gather_fields(tweet, callback){
		var item, field, res = {};
		if(!fields.length){
			res = tweet;
		} else {
			fields.forEach(function add(field){
				res[field] = tweet[field];
			})
		}
		callback(null, JSON.stringify(res));
	}

	function add_fields(nfields){
		fields = fiels.concat(nfields)
	}

	function add_keywords(keywords){
		var _track = track_keywords.bind(null, keywords); 
		setTimeout(_track, 300000);
	}
	
	function track_keywords(keywords){
		if (Array.isArray(keywords) && keywords.length){
			keywords.forEach(_track);
		}
	}
}