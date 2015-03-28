var assert = require('assert');
var logger = require('tracer').console();
var <%=class_name%> = require('../<%=class_name%>');

describe('<%=class_name%>', function() {

	it('should return info', function() {
		var plugin = new <%=class_name%>();
		assert.deepEqual(plugin.info(), {
	        name: "<%=project_name%>",
	        display_name: "<%=class_name%>"
	    })
	})

})