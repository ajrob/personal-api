var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	port = 3000;

//Express Middleware
app.use(bodyParser());

//CORS Middleware
app.all('*', function(req, res, next){
	res.header('Access-Control-Allow-Origin', '127.0.0.1');
	res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
	next();
});

app.get('/name', function(req, res){
	res.json({name: 'Alex'});
});

app.get('/location', function(req, res){
	res.json({location: 'SLC'});
});


//Hobbies
var hobbies = ['Running', 'Mountain biking', 'Climbing'];
app.get('/hobbies', function(req, res){
	var hobbiesList = hobbies,
		order = req.query.order;

	if(order === 'desc'){
		hobbiesList.sort().reverse();
	} else if (order === 'asc'){
		hobbiesList.sort();
	}

	res.json(hobbiesList);
});

app.get('/hobbies/:index', function(req, res){
	res.json({ hobby: hobbies[req.params.index] })
})


//Occupations
var occupations = ['EE', 'Software Developer'];
app.get('/occupations', function(req, res){
	var occupationsList = occupations,
		order = req.query.order;

	if(order === "desc"){
		occupationsList.sort().reverse();
	} else if (order === "asc"){
		occupationsList.sort();
	}

	res.json(occupationsList);
});

app.get('/occupations/:index', function(req, res){
	res.json({occupation: occupations[req.params.index]});
});

app.get('/occupations/latest', function(req, res){
	res.json({occupation: occupations[occupations.length - 1]});
});


//Mentions
var mentions = [];
app.get('/mentions', function(req, res){
	res.json(mentions);
});

app.post('/mentions', function(req, res){ 
	var newMention = {
		date: req.body.date,
		text: req.body.text,
		service: req.body.service
	};
	mentions.push(newMention);
	res.json(newMention);
});


//Friends
var friends = [];
app.get('/friends', function(req, res){
	res.json(friends);
})

app.post('/friends', function(req, res){
	var newFriend = {
		name: req.body.name
	};
	friends.push(newFriend);
	res.json(newFriend);
})


//Skills
var skills = [{
		id: 1,
		name: 'Frank',
		experience: 'Sauces'
	},
	{
		id: 2,
		name: 'Jill',
		experience: 'Lots'
	},
	{
		id: 3,
		name: 'Bernard',
		experience: 'Santas Helper'
	}];

app.get('/skills', function(req, res){
	res.json(skills);
});

app.get('/skills/:id', function(req, res){
	res.json(skills.filter(function(element){
		if(element.id == req.params.id){
			return element;
		}
	}));
});

app.post('/skills', function(req, res){
	var newSkill = {
		id: req.body.id,
		name: req.body.name,
		experience: req.body.experience
	};
	skills.push(newSkill);
	res.json(newSkill);
});

app.put('/skills/:id', function(req, res){
	//Get modified dataset from the request
	var modifiedSkill = {
		id: req.body.id,
		name: req.body.name,
		experience: req.body.experience
	};
	//Get the index for the appropriate object by id
	skills.filter(function(element, index){
		if(element.id == req.params.id){
			skills[index] = modifiedSkill;
		}
	});
	res.json(modifiedSkill);
});

app.delete('/skills/:id', function(req, res){
	//Get the index for the appropriate object by id
	skills.filter(function(element, index){
		if(element.id == req.params.id){
			skills.splice(index, 1); //Removes 1 element from index "id"
		}
	});
	res.json("Removed id: " + req.params.id);
});


//Listen
app.listen(port, function(){
	console.log("Listening on port " + port);
});