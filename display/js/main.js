/* setting */
if (DEMOBO) {
	DEMOBO.developer = 'developer@demobo.com';
	DEMOBO.controller = {"page": "webview"};
	DEMOBO.maxPlayers = 1;
	var imgID=0;
	DEMOBO.init = function () {
		$.demobo.addEventListener('input',function(e) {
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
		    		var imgArray = ['http://touchball.playableitem.demobo.com/bootscreen.gif',
		    		                'http://tctechcrunch2011.files.wordpress.com/2012/04/tapcity-splashscreen.png',
		    		                'http://ycombinator.com/images/yc500.gif'];
		    		$.demobo.setPage({url: imgArray[imgID]});
		    		$('#sourcecode pre').text("$.demobo.setPage({\n"+
						"\turl: '"+imgArray[imgID]+"',\n"+
					"});");
		    		imgID = (imgID+1)%imgArray.length;
		    		break;
		    	case 'spp':
		    		var imgArray = ['http://maps.google.com/maps?saddr=san+francisco&daddr=mountain+view',
		    		                'http://hackpad.com',
		    		                'http://ycombinator.com'];
		    		$.demobo.setPage({url: imgArray[imgID], touchEnabled: true});
		    		$('#sourcecode pre').text(
							"$.demobo.setPage({ url: '"+imgArray[imgID]+"', touchEnabled: true });"
					);
		    		imgID = (imgID+1)%imgArray.length;
		    		break;
		    	case 'op':
		    		$.demobo.openPage({ url: 'http://www.google.com/maps' });
		    		$('#sourcecode pre').text(
							"$.demobo.openPage({ url: 'http://www.google.com/maps' });"
					);
		    		break;
		    	case 'sh':
		    	default:
		    		var imgArray = ["<div style='padding:20%;'>\n"+
		    		                "<button value='Start' style='font-size: 30px;'>Start</button>\n" +
		    		                "<button id='button2' value='Cancel' style='font-size: 30px;'>Cancel</button>\n"+
		    		                "</div>",
		    		                
		    		                "<div style='padding:20%;'>\n"+
		    		                "<select id='dropdown' style='font-size: 30px;'>\n"+
									"  <option value='volvo'>Volvo</option>\n"+
									"  <option value='saab'>Saab</option>\n"+
									"  <option value='mercedes'>Mercedes</option>\n"+
									"  <option value='audi'>Audi</option>\n"+
									"</select></div>",
									
									"<div style='padding:20%;'>\n"+
		    		                //"<input id='range_notworking' type='range' min='0' max='100' value='50' step='5' onchange='demobo.fire(this);'/>\n"+
		    		                "<input id='lastname' type='text' name='lname' style='font-size: 30px;'/>\n"+
		    		                "</div>"
		    		                ];
		    		$.demobo.setController({ page: 'webview' });
	    			$.demobo.setHTML({ html: imgArray[imgID] });
	    			$('#sourcecode pre').text(
							"$.demobo.setHTML({ html: '"+imgArray[imgID]+"'\n});"
					);
	    			imgID = (imgID+1)%imgArray.length;
		    	}
		    });
	};
}
