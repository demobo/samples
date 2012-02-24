/* setting */
if (DEMOBO) {
	DEMOBO.developer = 'developer@demobo.com';
	DEMOBO.controller = {"page": "remote"};
	DEMOBO.init = function () {
		$.demobo();
		window.addEventListener('phone_textchange',function(e) {
			var obj = $('#searchTerm');
			obj.text(e.value.toUpperCase());
			if (obj.effect) obj.effect('bounce', { times: 2 }, 50);
		},false);
		window.addEventListener('phone_textreturn',function(e) {
			searchVideo(e.value);
		},false);
		window.addEventListener('phone_button',function(e) {
			switch (e.value) {
				case "pause":
					playpause();
					break;
				case "prev":
					break;
				case "next":
					next();
					break;		
			}
		},false);
	};
}