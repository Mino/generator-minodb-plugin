@import('../../bower_components/jquery/dist/jquery.js');
<%if (include_safe) {%>
@import("../../bower_components/safe/safe.js");
<%}%>
@import('../../bower_components/fieldval/fieldval.js');
@import('../../bower_components/fieldval-ui/fieldval-ui.js');
@import('../../bower_components/fieldval-rules/fieldval-rules.js');

<%if (include_safe) {%>
@import("pages/pages.js");

var page_title_append = "<%=class_name%>";

$(document).ready(function(){

	// This callback is called before the current page's resize function is called. Use this callback to resize elements other than the page and set values that pages could make use of.
	SAFE.on_resize = function(resize_obj){

		//Add properties based on the dimensions of the window
		resize_obj.large_screen = resize_obj.window_width > 700;

	}

	// Append the framework's body_contents element somewhere. This element will contain the page.
    var page_holder = SAFE.element.addClass("page_holder").appendTo("body");

	SAFE.transition_page = function(new_page,old_page){
		var title = new_page.get_title();
		if(title==null){
			document.title = page_title_append;
		} else {
			document.title = new_page.get_title() + " - " + page_title_append;
		}
	}

	//Set the 404 page class
	SAFE.set_404(NotFoundPage);

	SAFE.path = plugin_path;

	// SAFE.init loads the page for the current url.
	SAFE.init();
});

<%}%>