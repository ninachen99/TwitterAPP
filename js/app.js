$(function(){
    console.log('ready');
    $.ajax({
        dataType: "json",
        url: 'php/littleApp.php',
        type: 'GET',
        success: function(response) {
            //console.log(response);

            var html = "<ul>";
            for (var i = 0; i < response.length; i++) {
                var user = response[i].user;
                var text = response[i].text;
        
                //var link = '<a href="' + response[i].entities.urls[i].url + '">' + response[i].entities.urls[i].display_url + '</a>'
                //console.log(link);
                //var hidden_link = response[i].entities.urls[i].url;
                //var show_url = response[i].entities.urls[i].display_url;
                // console.log(hidden_link); 
                // console.log(show_url);
/* this is the loop for the url!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
                    // var tweet = text;
                    // var urls = response[i].entities.urls;   // need to inspect this array. 


                var tweet = linkify_entities(response[i]);
                var tweetTime = response[i].created_at;
                
                var Time = moment(tweetTime).format('MMM D');
                //var Time = parseTwitterDate(tweetTime);
                
/* end of loop of urls!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
                  
                html += '<li class="tweet-item">'
                html += '<div class="logo-hover tweet-logo">'
                html += '<img src="'+user.profile_image_url+'">'
                html += '</div>'
                html += '<div class="tweet-info">'
                html += '<p class="user-name">'+'<a class="user-link" href="https://twitter.com/EveryInteract">'
                        + user.name + '</a>'
                        +'<span class="screen-name"> ' + '<a id="screen-link" href="https://twitter.com/EveryInteract">'
                        +user.screen_name +'</a>'
                        +'</span> <time class="time-stamp" datetime="2011-11">'
                        + Time+'</time> </p>'
                html += '<p class="tweet-text tweet">'+tweet+'</p>'
                html += '</div>'
                html += '<ul class="tweet-footer">'
                html += '<i class="fa fa-reply"></i>'
                html += '<i class="fa fa-retweet"></i>'
                html += '<i class="fa fa-star"></i>'
                html += '<i class="fa fa-ellipsis-h"></i>'
                html += '</ul>'
                html += '</li>'                    
            }

            html += "</ul>";
            
            $('#tweets').append(html);
        },
            error: function(errors) {
            $('#tweets').html('Request error');
        }
    });
          
});
/* used https://gist.github.com/442463.git */

function escapeHTML(text) {
    return $('<div/>').text(text).html()
}

function linkify_entities(tweet) {
    //console.log(tweet.text);
    if (!(tweet.entities)) {
        return escapeHTML(tweet.text)
    }
    
    // parse tweet text!!!
    var index_map = {}
    

    $.each(tweet.entities.urls, function(i,entry) {
        index_map[entry.indices[0]] = [entry.indices[1], function(text) {
            return "<a href='"+escapeHTML(entry.url)+"'>"
        +escapeHTML(entry.display_url)+"</a>"}]
       // console.log(entry);
    })
    

    $.each(tweet.entities.hashtags, function(i,entry) {
        index_map[entry.indices[0]] = [entry.indices[1], function(text) {
            return "<a href='http://twitter.com/search?q="
        +escape("#"+entry.text)+"'>"+escapeHTML(text)+"</a>"}]
    })
    
    $.each(tweet.entities.user_mentions, function(i,entry) {
        index_map[entry.indices[0]] = [entry.indices[1], function(text) {
            return "<a title='"
        +escapeHTML(entry.name)+"' href='http://twitter.com/"
        +escapeHTML(entry.screen_name)+"'>"+escapeHTML(text)+"</a>"}]
    })
    
    var result = ""
    var last_i = 0
    var i = 0
    
    // iterate through the string looking for matches in the index_map
    for (i=0; i < tweet.text.length; ++i) {
        var ind = index_map[i]
        if (ind) {
            var end = ind[0]
            var func = ind[1]
            if (i > last_i) {
                result += escapeHTML(tweet.text.substring(last_i, i))
            }
            result += func(tweet.text.substring(i, end))
            i = end - 1
            last_i = end
        }
    }
    
    if (i > last_i) {
        result += escapeHTML(tweet.text.substring(last_i, i))
    }
    //console.log(result);
    return result
}




/* tweet time parse*/

 function parseTwitterDate(tweetTime) {
      console.log('time is now');
      
      var tweetDate = new Date(Date.parse(tweetTime));
      var nowDate = new Date();
      var dayDifference = (nowDate - tweetDate)/86400000;
      var hourDifference = Math.abs(nowDate - tweetDate)/36e5;
      console.log(dayDifference);

      if (dayDifference < 1) {
          moment(dayDifference).format('h','h');
      } else if (hourDifference < 1) {
          moment(hourDifference).format('m','m');
      } else {
          moment(tweetTime).format('MMM D');
      }
      
}




