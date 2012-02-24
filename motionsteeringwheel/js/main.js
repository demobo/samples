/* setting */
if (DEMOBO) {
	DEMOBO.developer = 'developer@demobo.com';
	DEMOBO.controller = {"page": "wheel"};
	DEMOBO.init = function () {
		$.demobo();
		window.addEventListener('phone_update',function(e) {
			accel_pool.push({
							ax: -e.y,
							ay: -e.x,
							az: e.z
						});	
		},false);
	};
}

var delay = 10;
var accel_pool = [];
function addStatus(text){
    $('#status').prepend($('<div>' + text + '</div>'));
}
setInterval(function() {
	var wheel = document.getElementById("wheel");
	var p = accel_pool.shift();
	if (p && p.ax && p.ay) {
		var x = p.ax;
		var y = p.ay;
		var a = (Math.atan2(x, y) + Math.PI) * (180 / Math.PI);
		if (x * x + y * y > 5 && a > 0 && a < 360) 
			wheel.style.webkitTransform = "rotate(" + String(a) + "deg)";
		else 
			wheel.style.webkitTransform = "";
	}

},delay);