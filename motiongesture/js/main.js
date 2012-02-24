/* setting */
if (DEMOBO) {
	DEMOBO.developer = 'developer@demobo.com';
	DEMOBO.controller = {"page": "tennis", "gestureName": "motion gesture", "gestureType": "3d"};
	DEMOBO.init = function () {
		$.demobo({
			open: function(){
                addStatus("demobo connected!");
                addStatus('Start phone motion gesture detection.');
			},
			close: function(){
                addStatus("demobo was closed");
            }
		});
		window.addEventListener('phone_gesture',function(e) {
			addEvent(e);
		},false);
	};
}

function addStatus(text){
	$('#status').prepend($('<div>'+text+'</div>'));
}
function addEvent(evt){
	$('#status').prepend($('<div>gestureType: '+evt.gestureType+'</div>'));
	if (evt.gestureName && evt.score) $('#status').prepend($('<h1>'+evt.gestureName+' '+evt.score+'</h1>'));
}