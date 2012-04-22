/* setting */
if (DEMOBO) {
	DEMOBO.developer = 'developer@demobo.com';
	DEMOBO.controller = {"page": "drawing", "gestureName": "demo", "gestureType": "2d"};
	DEMOBO.maxPlayers = 1;
	DEMOBO.init = function () {
		$.demobo.addEventListener('button',function(e) {
			var messageCss = {'font-size':300,'color':'#433','position':'absolute','text-align':'center','width':'90%','top':'10%'};
			$('#message').text(e.value).css(messageCss).show().fadeOut(1000);
		},false);
		$('input').click(function() {
		    	switch (this.value) {
		    	case 'c':
		    		$.demobo.setPage();
		    		$('#sourcecode pre').text("$.demobo.setPage();");
		    		break;
		    	case 'spi':
		    		$.demobo.setPage({
						url: 'http://appmodo.com/wp-content/uploads/2010/10/iPhone-Screenshot-3.jpeg'
					});
		    		$('#sourcecode pre').text("$.demobo.setPage({\n"+
						"\turl: 'http://appmodo.com/wp-content/uploads/2010/10/iPhone-Screenshot-3.jpeg',\n"+
					"});");
		    		break;
		    	case 'spp':
//		    		$.demobo.setController({ page: 'webview' });
		    		$.demobo.setPage({ url: 'http://google.com' });
		    		$('#sourcecode pre').text("$.demobo.setController({ page: 'webview' });\n"+
							"$.demobo.setPage({ url: 'http://google.com' });"
					);
		    		break;
		    	case 'op':
		    		$.demobo.openPage({ url: 'http://www.google.com/maps' });
		    		$('#sourcecode pre').text(
							"$.demobo.openPage({ url: 'http://www.google.com/maps' });"
					);
		    		break;
		    	case 'sh':
		    	default:
		    		$.demobo.setController({ page: 'webview' });
	    			$.demobo.setHTML({ html: '<div style=\'padding:20%;\'><a>button1</a><button onClick=\'fireButtonEvent(\"start\");\'>button2</button></div>' });
	    			$('#sourcecode pre').text(
							"$.demobo.setController({ page: 'webview' });\n"+
							"$.demobo.setHTML({ html: '<div style=\'padding:20%;\'><a>button1</a><button onClick=\'fireButtonEvent(\"start\");\'>button2</button></div>' });"
					);
		    	}
		    });
	};
}