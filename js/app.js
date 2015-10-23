/*$(document).ready(function() {
        
        console.log('doc ready!');
        
        $('#tweet-list').click(function(){
          
          var user_timeline = {
            q: 'EveryInteract'
          };
          search(user_timeline);
        });
      });
     
      function search(user_timeline) {
        $.ajax({
        
          url: 'https://api.twitter.com/1.1/search/tweets.json?src=typd&q=EveryInteract' + $.param(user_timeline),
          
          dataType: 'jsonp',
          
          success: function(data) {
            console.dir(data);
           
            for (var item in data['results']) {
              $('#tweets').append(
                '<li>' + data['results'][item]['text'] + '</li>');
            }
          }
        });
      }*/