/* setting */
if (DEMOBO) {
	DEMOBO.developer = 'developer@demobo.com';
	DEMOBO.controller = {"page": "drawing", "gestureName": "demobo world", "gestureType": "2d"};
	DEMOBO.init = function () {
		$.demobo.addEventListener('start',function(e) {
			connectPlayer(e.deviceID);
			$('#startButton').hide();
		},false);
		$.demobo.addEventListener('gesture',function(e) {
			if (e.gestureType=='2d') {
				var player = $('.player[deviceID="'+e.deviceID+'"]');
				if (player.length>0) {
					txtObj = e.gestureName;
					var p = player.position();
					createCanvasText(world, p.left, p.top, false, txtObj);
				}
			} else {
				console.log(e.gestureName);
				switch (e.gestureName) {
				case 'tornado':
					orientation.x = 0;
					orientation.y --;
					orientation.y = Math.max(orientation.y, -1);
					break;
				case '←':
					orientation.y = 0;
					orientation.x --;
					orientation.x = Math.max(orientation.x, -1);
					break;
				case '→':
					orientation.y = 0;
					orientation.x ++;
					orientation.x = Math.min(orientation.x, 1);
					break;
				case '↑':
					orientation.x = 0;
					orientation.y --;
					orientation.y = Math.max(orientation.y, -1);
					break;
				case '↓':
					orientation.x = 0;
					orientation.y ++;
					orientation.y = Math.min(orientation.y, 1);
					break;
				}
			}
		},false);
	};
}

//main entry point
$(document).ready(function () {
	// color theme
	theme = themes[ Math.random() * themes.length >> 0 ];
	document.body.style[ 'backgroundColor' ] = theme[ 0 ];
	bodies = [];
	elements = [];
	var canvasElm = $('#canvas')[0];
	ctx = canvasElm.getContext('2d');
	ctx.fillStyle = theme[ (Math.random() * 4 >> 0) + 1];
	canvasElm.width = window.innerWidth;
	canvasElm.height = window.innerHeight;
	canvasWidth = parseInt(canvasElm.width);
	canvasHeight = parseInt(canvasElm.height);
	canvasTop = parseInt(canvasElm.style.top);
	canvasLeft = parseInt(canvasElm.style.left);
	world = createWorld();
	createHelloWorld();
	$('#canvas').click( function(e) {
		createCanvasText(world, e.clientX, e.clientY, false, txtObj);
	});
	step();
});

var zodiac = '♈♉♊♋♌♍♎♏♐♑♒♓';
var themes = [ [ "#10222B", "#95AB63", "#BDD684", "#E2F0D6", "#F6FFE0" ],
		[ "#362C2A", "#732420", "#BF734C", "#FAD9A0", "#736859" ],
		[ "#2E2F38", "#FFD63E", "#FFB54B", "#E88638", "#8A221C" ],
		[ "#343F40", "#736751", "#F2D7B6", "#BFAC95", "#8C3F3F" ],
		[ "#333B3A", "#B4BD51", "#543B38", "#61594D", "#B8925A" ] ];
var theme;
var bodies, elements, text;
var delta = [ 0, 0 ];
var orientation = { x: 0, y: 1 };
var stage = [ window.screenX, window.screenY, window.innerWidth, window.innerHeight ];

var world;
var ctx;
var canvasWidth;
var canvasHeight;
var canvasTop;
var canvasLeft;
var PI2 = Math.PI * 2;

function drawWorld(world, context) {
	for ( var j = world.m_jointList; j; j = j.m_next) {
		drawJoint(j, context);
	}
	for ( var b = world.m_bodyList; b; b = b.m_next) {
		if (b.GetUserData()) continue;
		for ( var s = b.GetShapeList(); s != null; s = s.GetNext()) {
			drawShape(s, context);
		}
	}
}

function drawJoint(joint, context) {
	var b1 = joint.m_body1;
	var b2 = joint.m_body2;
	var x1 = b1.m_position;
	var x2 = b2.m_position;
	var p1 = joint.GetAnchor1();
	var p2 = joint.GetAnchor2();
	context.strokeStyle = '#00eeee';
	context.beginPath();
	switch (joint.m_type) {
	case b2Joint.e_distanceJoint:
		context.moveTo(p1.x, p1.y);
		context.lineTo(p2.x, p2.y);
		break;

	case b2Joint.e_pulleyJoint:
		// TODO
		break;

	default:
		if (b1 == world.m_groundBody) {
			context.moveTo(p1.x, p1.y);
			context.lineTo(x2.x, x2.y);
		} else if (b2 == world.m_groundBody) {
			context.moveTo(p1.x, p1.y);
			context.lineTo(x1.x, x1.y);
		} else {
			context.moveTo(x1.x, x1.y);
			context.lineTo(p1.x, p1.y);
			context.lineTo(x2.x, x2.y);
			context.lineTo(p2.x, p2.y);
		}
		break;
	}
	context.stroke();
}

function drawShape(shape, context) {
	context.strokeStyle = '#ffffff';
	if (shape.density == 1.0) {
		context.fillStyle = "red";
	} else {
		context.fillStyle = "black";
	}
	context.beginPath();
	switch (shape.m_type) {
	case b2Shape.e_circleShape: {
		var circle = shape;
		var pos = circle.m_position;
		var r = circle.m_radius;
		var segments = 16.0;
		var theta = 0.0;
		var dtheta = 2.0 * Math.PI / segments;

		// draw circle
		context.moveTo(pos.x + r, pos.y);
		for ( var i = 0; i < segments; i++) {
			var d = new b2Vec2(r * Math.cos(theta), r * Math.sin(theta));
			var v = b2Math.AddVV(pos, d);
			context.lineTo(v.x, v.y);
			theta += dtheta;
		}
		context.lineTo(pos.x + r, pos.y);

		// draw radius
		context.moveTo(pos.x, pos.y);
		var ax = circle.m_R.col1;
		var pos2 = new b2Vec2(pos.x + r * ax.x, pos.y + r * ax.y);
		context.lineTo(pos2.x, pos2.y);
	}
		break;
	case b2Shape.e_polyShape: {
		var poly = shape;
		var tV = b2Math.AddVV(poly.m_position, b2Math.b2MulMV(poly.m_R,
				poly.m_vertices[0]));
		context.moveTo(tV.x, tV.y);
		for ( var i = 0; i < poly.m_vertexCount; i++) {
			var v = b2Math.AddVV(poly.m_position, b2Math.b2MulMV(poly.m_R,
					poly.m_vertices[i]));
			context.lineTo(v.x, v.y);
		}
		context.lineTo(tV.x, tV.y);
	}
		break;
	}
	context.fill();
	context.stroke();
}

function createWorld() {
	var worldAABB = new b2AABB();
	worldAABB.minVertex.Set(-1000, -1000);
	worldAABB.maxVertex.Set(1000, 1000);
	var gravity = new b2Vec2(0, 300);
	var doSleep = true;
	world = new b2World(worldAABB, gravity, doSleep);
	world.m_gravity.x = orientation.x * 350 + delta[0];
	world.m_gravity.y = orientation.y * 350 + delta[1];
	createGround(world);
	return world;
}

function createGround(world) {
	var groundSd = new b2BoxDef();
	groundSd.extents.Set(400, 30);
	groundSd.restitution = 0.0;
	var groundBd = new b2BodyDef();
	groundBd.AddShape(groundSd);
	groundBd.position.Set(400, 470);
	return world.CreateBody(groundBd);
}
function createCanvasText(world, x, y, fixed, String) {
	text = document.createElement( 'div' );
	text.onSelectStart = null;
	text.innerHTML = '<div>'+String+'</div>';
//	style="color:' + theme[ (Math.random() * 4 >> 0) + 1] + ';font-size:40px;"
	text.style.color = theme[ (Math.random() * 4 >> 0) + 1];
	text.style.position = 'absolute';
	text.style.fontSize = '100px';
	text.style.fontFamily = 'Comic Sans MS';
	text.style.fontWeight = 'bold';
	text.style.textAlign = 'center';
		
	var x = x || Math.random() * stage[2];
	var y = y || Math.random() * -200;
	var element = document.createElement( 'div' );
		
	element.style.position = 'absolute';
	element.style.cursor = "default";
	element.style['left'] = -200 + 'px';
	element.style['top'] = -200 + 'px';
	
	canvasDiv.appendChild(element);
	elements.push( element );
	element.appendChild(text);
	
	var width=$(text).width()/5;
	var height=$(text).height()/7;
	text.style.left = -(width*2)+'px';
	text.style.top = -(height*4)+'px';
	element.width = width;
	element.height = height;
	bodies.push( createBox(world, x, y, width, height, fixed, element));
}
function createCanvasBall( world, x, y, size ) {
	var x = x || Math.random() * stage[2];
	var y = y || Math.random() * -200;
	var size = size || (Math.random() * 100 >> 0) + 20;
	var element = document.createElement("canvas");
	element.width = size;
	element.height = size;
	element.style['position'] = 'absolute';
	element.style['left'] = -200 + 'px';
	element.style['top'] = -200 + 'px';
	var graphics = element.getContext("2d");
	var num_circles = Math.random() * 10 >> 0;
	for (var i = size; i > 0; i-= (size/num_circles)) {
		graphics.fillStyle = theme[ (Math.random() * 4 >> 0) + 1];
		graphics.beginPath();
		graphics.arc(size * .5, size * .5, i * .5, 0, PI2, true); 
		graphics.closePath();
		graphics.fill();
	}
	canvasDiv.appendChild(element);
	elements.push( element );
	bodies.push( createBall(world, x, y, size >> 1, element));
}
function createBall(world, x, y, radius, element) {
	var ballSd = new b2CircleDef();
	ballSd.density = 1.0;
	ballSd.radius = radius;
	ballSd.restitution = 0.5;
	ballSd.friction = 0.5;
	var ballBd = new b2BodyDef();
	ballBd.AddShape(ballSd);
	ballBd.position.Set(x, y);
	if (typeof element != 'undefined') ballBd.userData = {element: element};
	return world.CreateBody(ballBd);
}
function createBox(world, x, y, width, height, fixed, element) {
	if (typeof (fixed) == 'undefined')
		fixed = true;
	var boxSd = new b2BoxDef();
	if (!fixed)
		boxSd.density = 1.0;
	boxSd.restitution = 0.0;
	boxSd.friction = 1.0;
	boxSd.extents.Set(width, height);
	var boxBd = new b2BodyDef();
	boxBd.AddShape(boxSd);
	boxBd.position.Set(x, y);
	if (typeof element != 'undefined') {
		boxBd.userData = {element: element};
		boxBd.linearVelocity.Set( Math.random() * 40 -20, Math.random() * 600 - 300 );
	}
	return world.CreateBody(boxBd);
}
function createHelloWorld() {
	// d
	createBox(world, 70, 450, 30, 5, false);
	createBox(world, 50, 430, 10, 16, false);
	createBox(world, 90, 430, 10, 16, false);
	createBox(world, 70, 405, 30, 5, false);
	createBox(world, 90, 380, 10, 20, false);

	// E
	createBox(world, 140, 435, 30, 5, false);
	createBox(world, 120, 420, 10, 10, false);
	createBox(world, 130, 405, 20, 5, false);
	createBox(world, 120, 390, 10, 10, false);
	createBox(world, 140, 375, 30, 5, true);

	// M
	createBox(world, 235, 400, 18, 60, false);
	createBox(world, 265, 400, 15, 60, false);
	createBox(world, 295, 400, 18, 60, false);
//	createCanvasText(world, 250, 100, false, 'M');

	// O
	createBox(world, 360, 435, 25, 5, false);
	createBox(world, 345, 405, 5, 25, false);
	createBox(world, 375, 405, 5, 25, false);
	createBox(world, 360, 375, 25, 5, false);

	// B
	createBox(world, 435, 435, 35, 5, false);
	createBox(world, 415, 395, 10, 30, false);
	createBox(world, 460, 395, 10, 30, false);
	createBox(world, 435, 375, 35, 5, false);
	createBox(world, 415, 345, 10, 30, false);

	// O
	createBox(world, 510, 435, 20, 5, false);
	createBox(world, 495, 405, 5, 25, false);
	createBox(world, 525, 405, 5, 25, false);
	createBox(world, 510, 375, 20, 5, false);

	// !
	createBox(world, 550, 430, 10, 10, false);
	createBox(world, 550, 380, 10, 40, false);
}

function step(cnt) {
//	delta[0] += (0 - delta[0]) * .5;
//	delta[1] += (0 - delta[1]) * .5;

	world.m_gravity.x = orientation.x * 350 + delta[0];
	world.m_gravity.y = orientation.y * 350 + delta[1];
	
	var stepping = false;
	var timeStep = 1.0 / 60;
	var iteration = 1;
	world.Step(timeStep, iteration);
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	drawWorld(world, ctx);
	for (i = 0; i < bodies.length; i++) {
		var body = bodies[i];
		var element = elements[i];
//		element.style.left = (body.m_position0.x - (element.width >> 1)) + 'px';
//		element.style.top = (body.m_position0.y - (element.height >> 1)) + 'px';
		element.style.left = (body.m_position0.x) + 'px';
		element.style.top = (body.m_position0.y) + 'px';
		if (element.tagName == 'DIV') {
			var rotationStyle = 'rotate(' + (body.m_rotation0 * 57.2957795) + 'deg)';
			text.style.WebkitTransform = rotationStyle;
			text.style.MozTransform = rotationStyle;
			text.style.OTransform = rotationStyle;
			// text.style.MsTransform = rotationStyle;
		}
	}
	setTimeout('step(' + (cnt || 0) + ')', 10);
}

var txtObj = 'O';

function connectPlayer(deviceID) {
	if ($('.player[deviceID="'+deviceID+'"]').length>0) return;
//	setupGesture('tpad', deviceID);
	$('.player').not('.active').first().cursor({
		deviceID: deviceID,
		source: 'dpad',
		duration: 0
	});
}

function setActionType() {
	var actionType = $("#actionType input:checked").val();
	if (actionType == 's') $.demobo.setController({"page": "drawing", "gestureName": "demobo world", "gestureType": "2d"}); 
	else if (actionType=='m') $.demobo.setController({"page": "tennis", "gestureName": "motion gesture", "gestureType": "3d"});
}