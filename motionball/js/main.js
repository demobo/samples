/* setting */
if (DEMOBO) {
	DEMOBO.developer = 'developer@demobo.com';
	DEMOBO.controller = {"page": "drawing", "gestureName": "demo", "gestureType": "2d"};
	DEMOBO.init = function () {
		var ondoubletap = function(){
	        $(this).effect('pulsate', { times:3 }, 300);
	    };
	    $('input').click(function() {
	    	switch (this.value) {
	    	case 'a':
	    		$.demobo.setController({'page': 'wheel'});
	    		$.demobo.setCursor($('#ball'), {
					sensor: 'accelerometer',
					motionType: 'acceleration',
					ondoubletap: ondoubletap
				});
	    		$('#sourcecode pre').text("$.demobo.setCursor($('#ball'), {\n"+
					"\tsensor: 'accelerometer',\n"+
					"\tmotionType: 'acceleration',\n"+
					"\tondoubletap: ondoubletap\n"+
				"});");
	    		break;
	    	case 'vxyz':
	    		$.demobo.setController({'page': 'wheel'});
	    		$.demobo.setCursor($('#ball'), {
					sensor: 'accelerometer',
					motionType: 'velocity',
					ondoubletap: ondoubletap
				});
	    		$('#sourcecode pre').text("$.demobo.setCursor($('#ball'), {\n"+
						"\tsensor: 'accelerometer',\n"+
						"\tmotionType: 'velocity',\n"+
						"\tondoubletap: ondoubletap\n"+
					"});");
	    		break;
	    	case 'vzyx':
	    		$.demobo.setController({'page': 'wheel'});
	    		$.demobo.setCursor($('#ball'), {
					sensor: 'accelerometer',
					motionType: 'velocity',
					ondoubletap: ondoubletap,
					plane: 'zxy'
				});
	    		$('#sourcecode pre').text("$.demobo.setCursor($('#ball'), {\n"+
						"\tsensor: 'accelerometer',\n"+
						"\tmotionType: 'velocity',\n"+
						"\tondoubletap: ondoubletap,\n"+
						"\plane: 'zyx',\n"+
					"});");
	    		break;	
	    	case 'd':
	    		$.demobo.setController({'page': 'wheel'});
	    		$.demobo.setCursor($('#ball'), {
					sensor: 'accelerometer',
					motionType: 'displacement',
					ondoubletap: ondoubletap
				});
	    		$('#sourcecode pre').text("$.demobo.setCursor($('#ball'), {\n"+
						"\tsensor: 'accelerometer',\n"+
						"\tmotionType: 'displacement',\n"+
						"\tondoubletap: ondoubletap\n"+
					"});");
	    		break;
	    	case 'tr':
	    	default:
	    		$.demobo.setController({'page': 'drawing', 'gestureName': 'demo', 'gestureType': '2d'});
		    	$.demobo.setCursor($('#ball'), {
					sensor: 'touch',
					source: 'dpad',
					touchPosition: 'relative',
					ondoubletap: ondoubletap
				});
		    	$('#sourcecode pre').text("$.demobo.setCursor($('#ball'), {\n"+
						"\tsensor: 'touch',\n"+
						"\tsource: 'dpad',\n"+
						"\ttouchPosition: 'relative'\n"+
						"\tondoubletap: ondoubletap\n"+
					"});");
	    	}
	    });
	};
}