var logger = require('tracer').console();
var http = require('http');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var MinoDB = require('minodb');

var db_address = '<%=mongodb_url%>';
var project_name = '<%=project_name%>';

var minodb_username = 'my_app';
var minodb_email = 'email@example.com';
var minodb_password = 'my_password';
var example_server_port = 5002;

var mino = new MinoDB({
    api: true,
    ui: true,
    db_address: db_address
}, minodb_username);

var server = express();
server.set('port', example_server_port);
server.use(bodyParser());

server.use('/mino/', mino.server())

server.get('/*', function(req, res) {
    res.send("Example server for " + project_name + " plugin");
})

mino.create_user({
	"username": minodb_username,
	"email": minodb_email,
	"password": minodb_password
}, function(err, res){
	logger.log(err, res);

	var <%=class_name%> = require('./' + project_name);
	var plugin = new <%=class_name%>({
		user: minodb_username
	});

	mino.add_plugin(plugin);

	http.createServer(server).listen(server.get('port'), function() {
	    console.log('Server started on port ' + server.get('port'));
	});
});