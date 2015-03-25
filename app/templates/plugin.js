var logger = require('tracer').console();
var express = require('express');
var ConfigServer = require('./config_server/ConfigServer');

function <%=class_name%>(options) {
	var plugin = this;
    plugin.config_server = new ConfigServer();
}

<%=class_name%>.prototype.get_config_server = function(){
    var plugin = this;
    return plugin.config_server.express_server;
}

<%=class_name%>.prototype.info = function(){
    var plugin = this;

    return {
        name: "<%=project_name%>",
        display_name: "<%=class_name%>"
    };
}

<%=class_name%>.prototype.init = function(minodb){
    var plugin = this;
    plugin.minodb = minodb;
}

module.exports = <%=class_name%>;