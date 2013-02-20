/* setting */
if (DEMOBO) {
	DEMOBO.developer = 'developer@demobo.com';
	DEMOBO.maxPlayers = 1;
	DEMOBO.stayOnBlur = true;
	var imgID = 0;
	var testSuite;
	DEMOBO.init = function() {
		/* setting up mobile event listener here */
		demobo.addEventListener('input', function(e) {
			var messageCss = {
				'font-size' : 50,
				'color' : '#433',
				'position' : 'absolute',
				'text-align' : 'center',
				'width' : '30%',
				'right' : '0%',
				'top' : '10%'
			};
			if (e.source) $('#eventSource').text(e.source).css(messageCss).show().fadeOut(1000);
			messageCss.top = '30%';
			if (e.value) $('#eventValue').text(e.value).css(messageCss).show().fadeOut(1000);
			console.log(e.source, e.value);
		}, false);
		/* finished setting up mobile event listener here */
		
		// render qrCode for phone connection
		demobo.renderQR();
		$('#qrcode').show();
		
		if (localStorage.getItem("url")) $('#url').val(localStorage.getItem("url"));
		$('button#set').click(
				function() {
					var url = "http://net.demobo.com/server/upload/" + DEMOBO.roomID.substr(0,5)
							+ ".html?" + Math.random();
					var c = {
							page : "default",
							url : url,
							touchEnabled : true
						};
					if (!$('#orientation').is(':checked')) c.orientation = "portrait";
					demobo.setController(c);
					$('iframe').attr('src', url);
					$('#controllerUrl').attr('href', url);
				});
		$('button#upload').click(function() {
			$.get($('#url').val(), function(data) {
				$.ajax( {
					type : 'POST',
					url : "http://net.demobo.com/server/upload.php",
					crossDomain : true,
					data : {
						data : data,
						roomID : DEMOBO.roomID.substr(0,5)
					},
					dataType : 'json',
					success : function() {
						$('button#set').click();
					}
				});
				localStorage.setItem("url", $('#url').val());
			});
		});
		var testCounter=0;
		$('button#test').click(function() {
			testSuite = null;
			var testfile = 'test.js';
			if ($('#url').val().split("/").length == 3)
				testfile = $('#url').val() + "/" + testfile;
			$.getScript(testfile, function(data, textStatus, jqxhr) {
				if (testSuite) {
					testCases = testSuite[testCounter%testSuite.length];
					testCounter++;
				}
				console.log(testCases);
				for ( var i = 0; i < testCases.length; i++) {
					var test = testCases[i];
					demobo.callFunction(test.functionName, test.data);
				}
			});
		});
		$('input[type=radio]').click(function() {
			var wh = this.value.split("x");
			if (!$('#orientation').is(':checked')) wh.reverse();
			$('iframe').css( {
				width : wh[0],
				height : wh[1],
				border : '1px solid'
			});
		});
		$($('input[type=radio]')[0]).click();
		$('button#set').click();
		// simulator eventListener
		document.getElementById('demoboBody').addEventListener(
				"FromFrontground",
				function(e) {
					$('#simulator iframe')[0].contentWindow.postMessage(e.detail.data, '*');
					if (e.detail.type == 'register') {
						var url = e.detail.data.url;
						setSimulator(url);
					}
				}
		);
	};
}

function setSimulator(url) {
	$('#simulator iframe').attr('src', url);
}