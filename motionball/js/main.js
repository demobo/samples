/* setting */
if (DEMOBO) {
	DEMOBO.developer = 'developer@demobo.com';
	DEMOBO.controller = {"page": "wheel"};
	DEMOBO.init = function () {
		$.demobo();
		window.addEventListener('phone_update',function(e) {
			accel_pool.push({
							ax: e.y,
							ay: -e.x,
							az: e.z
						});	
		},false);
	};
}

// Position Variables
var x = 0;
var y = 0;

// Speed - Velocity
var vx = 0;
var vy = 0;

// Acceleration
var ax = 0;
var ay = 0;

var delay = 10;
var vMultiplier = 0.01;
var animationType;
var accel_pool = [];
function addStatus(text){
    $('#status').prepend($('<div>' + text + '</div>'));
}
setInterval(function(){
	var ball = document.getElementById("ball");
	var p = accel_pool.shift();
	if (p && p.ax && p.ay) {
		if ($("input:checked").val()=='a') {
			ax = p.ax;
			ay = p.ay;
		} else if ($("input:checked").val()=='v') {
			ax = ay = 0;
			vx = p.ax*100;
			vy = p.ay*100;
		} else {
			ax = ay = vx = vy = 0;
			x =  document.documentElement.clientWidth*(0.5+p.ax/3);
			y =  document.documentElement.clientHeight*(0.5+p.ay/3);
		}
	}
    vy = vy + (ay);
    vx = vx + (ax);
    y = parseInt(y + vy * 0.01);
    x = parseInt(x + vx * 0.01);
	if (x < 0) {
        x = 0;
        vx = 0;
    }
    if (y < 0) {
        y = 0;
        vy = 0;
    }
	if (x > document.documentElement.clientWidth - 40) {
        x = document.documentElement.clientWidth - 40;
        vx = 0;
    }
    if (y > document.documentElement.clientHeight - 40) {
        y = document.documentElement.clientHeight - 40;
        vy = 0;
    }
    ball.style.bottom = y + "px";
    ball.style.left = x + "px";
}, delay);