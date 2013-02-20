var testCases1 = [
		{
			functionName : "syncState",
			data : {isPlaying: true, volume: 70}
		}];
var testCases2 = [
 		{
 			functionName : "syncState",
 			data : {isPlaying: false, volume: 20}
 		}];
var testCases3 = [
		{
			functionName : "loadSongInfo",
			data : {
				image : "http://cont-sv5-3.pandora.com/images/public/amz/7/2/0/1/886976911027_500W_500H.jpg",
				title : "Older",
				artist : "Band Of Horses",
				album : "Infinite Arms - 2012/08/09"
			}
		}, {
			functionName : "loadChannelList",
			data : [ {
				title : "start 2"
			}, {
				title : "station 1 station 1station 1 station 1"
			}, {
				title : "station 1 station 1station 1 station 1",
			}, {
				title : "station 1station 1 station 1station 1 station 1"
			}, {
				title : "station 1station 1 station 1station 1 station 1"
			}, {
				title : "station 1 MHzstation 1 station 1station 1 station 1"
			}, {
				title : "station 1 MHzstation 1 station 1station 1 station 1"
			}, {
				title : "station 1 MHzstation 1 station 1station 1 station 1station 1 station "
			}, {
				title : "station 1station 1 station 1station 1 station 1station 1 station 1"
			}, {
				title : "station 1station 1 station 1station 1 station 1station 1 station 1"
			}, {
				title : "station 1 MHzstation 1 station 1station 1 station 1station 1 station 1",
			}, {
				title : "station 1 MHzstation 1 station 1station 1 station 1"
			}, {
				title : "station 1 MHzstation 1 station 1station 1 station 1"
			}, {
				title : "station 1 MHzstation 1 station 1station 1 station 1"
			}, {
				title : "station 1 MHzstation 1 station 1station 1 station 1"
			}, {
				title : "station 1 1 MHzstation 1 station 1station 1 station 1"
			}, {
				title : "station 1station 1 station 1station 1 station 1"
			}, {
				title : "station 1station 1 station 1station 1 station 1"
			}, {
				title : "station 1 MHzstation 1 station 1station 1 station 1",
			},  {
				title : "station 1 MHzstation 1 station 1station 1 station 1"
			}, {
				title : "station 1 MHzstation 1 station 1station 1 station 1"
			}, {
				title : "station 1 MHzstation 1 station 1station 1 station 1"
			}, {
				title : "end 2"
			} ]
		},
		{
			functionName : "setCurrentChannel",
			data : 1
		}];
var testSuite = [testCases1,testCases2,testCases3];