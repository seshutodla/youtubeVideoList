$(document).ready(function(){
	$.get(
		"https://www.googleapis.com/youtube/v3/channels",{
			part: 'contentDetails',
			id: 'UCqvVj1LkOpA8tjb7RadTvOg',
			key: 'AIzaSyDvQ_3zdtS3Hd03TZAFw2Hp_kBR7PrmA34'},
			function(data){
				$.each(data.items, function(i, item){
					console.log(item);
					pid = item.contentDetails.relatedPlaylists.uploads;
					getVids(pid, "");
				})
			}
	);
	var pagetoken = "";
	function getVids(pid, pagetoken){
		$.get(
		"https://www.googleapis.com/youtube/v3/playlistItems",{
			part: 'snippet',
			maxResults: 50,
			playlistId: pid,
			pageToken : pagetoken,
			key: 'AIzaSyDvQ_3zdtS3Hd03TZAFw2Hp_kBR7PrmA34'},
			function(data){
				console.log(data)
				var output;
				$.each(data.items, function(i, item){
					console.log(item);
					videoTitle = item.snippet.title;
					videoDate = item.snippet.publishedAt;

					output = '<li>'+videoTitle+' '+videoDate+'</li>';

					//Append to results listStypeType
					$('#results').append(output);
					if(data.nextPageToken){
						ptoken = data.nextPageToken;
						getVids(pid, ptoken);
						
					}
				})
			}
	);
	}
});