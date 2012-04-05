/* setting */
if (DEMOBO) {
	DEMOBO.developer = 'developer@demobo.com';
	DEMOBO.controller = {"page": "drawing", "gestureName": "demo", "gestureType": "2d"};
	DEMOBO.maxPlayers = 1;
	DEMOBO.init = function () {
		var ondoubletap = function(){
	        var cursor = $(this);
	        cursor.effect("pulsate", { times:3 }, 300);
	    };
		$('#ball').cursor({
			source: 'dpad',
			duration: 0.01,
			touchPosition: 'relative',
			ondoubletap: ondoubletap
		});
	};
}