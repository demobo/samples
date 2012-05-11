/* setting */
if (DEMOBO) {
	DEMOBO.developer = 'developer@demobo.com';
	DEMOBO.controller = {"page": "tennis", "gestureName": "motion gesture", "gestureType": "3d"};
	DEMOBO.init = function () {
		$.demobo.addEventListener('gesture',function(e) {
			addEvent(e);
		},false);
		addStatus('Use racquet to create 3d gestures.');
	};
}

function addStatus(text){
	$('#status').prepend($('<div>'+text+'</div>'));
}
function addEvent(evt){
	$('#status').prepend($('<div>gestureType: '+evt.gestureType+'</div>'));
	if (evt.gestureName && evt.score) {
		$('#status').prepend($('<h1>'+evt.gestureName+' '+evt.score+'</h1>'));
		var messageCss = {'font-size':300,'color':'#433','position':'absolute','text-align':'center','width':'90%','top':'10%', 'z-index':100};
		$('#message').text(evt.gestureName).css(messageCss).show().fadeOut(1000);
	}
}