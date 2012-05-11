/* setting */
if (DEMOBO) {
	DEMOBO.developer = 'developer@demobo.com';
	DEMOBO.controller = {"page": "webview"};
	DEMOBO.maxPlayers = 1;
	var imgID=0;
	DEMOBO.init = function () {
		var dpiAdjust = 0.79;
		$('#iphoneDock').css({bottom: -232, left: 400, zoom: dpiAdjust});
		$('#iphoneDockScreen').css({height:324*dpiAdjust, width: 484*dpiAdjust, bottom: -112*dpiAdjust, left: 537*dpiAdjust});
		$.demobo.addEventListener('input',function(e) {
			var curtop = parseInt(e.value.top)*dpiAdjust;
			var curleft= parseInt(e.value.left)*dpiAdjust;
			var prevTop = parseInt(e.value.prevTop)*dpiAdjust;
			var prevLeft= parseInt(e.value.prevLeft)*dpiAdjust;
			var target = $(e.value.html);
			target.css({top:curtop, left:curleft, width: 60*dpiAdjust, height: 60*dpiAdjust});
			$('#iphoneDockScreen').append(target);
			var deltaTop = 10*(curtop-prevTop);
			var deltaLeft = 10*(curleft-prevLeft);
			target.animate({top: "+="+deltaTop+"px", left: "+="+deltaLeft+"px"}, 500);
			target.draggable();
			target.bind("mousemove", function(e) {
				var targetLeft = parseInt(target.css('left'))/dpiAdjust;
				var targetTop = parseInt(target.css('top'))/dpiAdjust;
				if (!(targetLeft<0 || targetTop<0 || targetLeft>480 || targetTop>320)) {
					if (!(targetLeft<60 || targetTop<60 || targetLeft>420 || targetTop>260)) {
						target.css({width: 60, height: 60});
						$.demobo.fireEvent({eventType: 'drag', left: targetLeft, top: targetTop, prevTop: target[0].prevTop, preLeft: target[0].prevLeft, html: target[0].outerHTML});
						target.remove();
					} else {
						target[0].prevTop = targetTop;
						target[0].prevLeft = targetLeft;
					}
				}
			});
		},false);
		$.demobo.addEventListener('connected',function(e){
			$.demobo.setHTML({url:"http://touchball.playableitem.demobo.com/draggable.html", touchEnabled: true});
		},false);
		setTimeout(function() {$.demobo.setHTML({url:"http://touchball.playableitem.demobo.com/draggable.html", touchEnabled: true});},1000);
	};
}
