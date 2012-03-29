/* setting */
if (DEMOBO) {
	DEMOBO.developer = 'developer@demobo.com';
	DEMOBO.init = function () {
		var ondoubletap = function(){
	        var cursor = $(this);
	        cursor.effect('bounce', {
	            times: 2
	        }, 100);
	    };
		$('#ball').cursor({
			touchPosition: 'relative',
			ondoubletap: ondoubletap
		});
		$("input").change(
			function() {
				if ($("input:checked").val() == 'a') {
					$('#ball').cursor({
						touchPosition: 'relative',
						ondoubletap: ondoubletap
					});
				} else {
					$('#ball').cursor({
						touchPosition: 'relative',
						ondoubletap: ondoubletap
					});
				}
			}
		);
	};
}