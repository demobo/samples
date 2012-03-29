/* setting */
if (DEMOBO) {
	DEMOBO.developer = 'developer@demobo.com';
	DEMOBO.controller = {"page": "remote"};
	DEMOBO.init = function () {
		$.demobo.addEventListener('textchange',function(e) {
			var obj = $('#searchTerm');
			obj.text(e.value.toUpperCase());
			if (obj.effect) obj.effect('bounce', { times: 2 }, 50);
		},false);
		$.demobo.addEventListener('textreturn',function(e) {
			searchVideo(e.value);
		},false);
		$.demobo.addEventListener('button',function(e) {
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