var logger = require('tracer').console();
var generators = require('yeoman-generator');
var FieldVal = require('fieldval');
var BasicVal = FieldVal.BasicVal;

module.exports = generators.Base.extend({
	initializing: function() {
		this.project_name = 'minodb_plugin';
		this.class_name = 'MinoDbPlugin';
		this.mongodb_url = 'mongodb://127.0.0.1:27017/minodb';
	},
	prompting: function() {
		var done = this.async();
		this.prompt([
			{
			    type    : 'input',
		    	name    : 'project_name',
			    message : 'Plugin project name',
			    default : this.project_name // Default to current folder name
		   	},
		   	{
			    type    : 'input',
		    	name    : 'class_name',
			    message : 'Plugin class name',
			    default : this.class_name // Default to current folder name
		   	},
		   	{
		   		type: "checkbox",
		   		message: "Which frameworks/libraries would you like to include for the Config Server? ",
		   		name: "config_server_frontend",
				choices: [{
		   	      name: "SAFE",
		   	      checked: true
		   	    },
		   	    {
		   	    	name: "<ARCUS"
		   	    }]
		   	},
		   	{
			    type: "input",
			    message: "Enter MongoDB URL for example server",
			    name: "mongodb_url",
			    default: this.mongodb_url,
			    validate: function(value) {
			    	var error = BasicVal.prefix("mongodb://").check(value);
			    	if (error) {
			    		return error.error_message;
			    	}
			    	return true;
			    }
			}
	   	], function (answers) {

		    var include_safe = answers.config_server_frontend.indexOf("SAFE") != -1;

	   		this.options = {
	   			include_safe: include_safe,
	   			project_name: answers.project_name,
	   			class_name: answers.class_name,
	   			mongodb_url: answers.mongodb_url
	   		}

	   		var example_server_port = '<%=example_server_port%>';

		    done();
		}.bind(this));
	},
	writing: function () {
		var copy_file = function(path, destination_path) {
			if (arguments.length == 1) {
				destination_path = path;
			}

			this.fs.copyTpl(
				this.templatePath(path),
		     	this.destinationPath(destination_path),
		    	this.options
		    );
		}.bind(this);

		copy_file('plugin.js', this.options.project_name+'.js');
		copy_file('server.js');
		copy_file('package.json');
		copy_file('bower.json');
		copy_file('gulpfile.js');
		copy_file('config_server/ConfigServer.js');
		copy_file('config_server/views/index.mustache');
		copy_file('config_server/public_src/init.js');
		copy_file('config_server/public_src/style/style.less');
		if (this.options.include_safe) {
			copy_file('config_server/public_src/pages');
		}
	},
	install: function() {
		var generator = this;
		this.npmInstall(undefined, undefined, function() {
			generator.spawnCommand('gulp', ['js']);
			generator.spawnCommand('gulp', ['less']);		
		});
	}

});