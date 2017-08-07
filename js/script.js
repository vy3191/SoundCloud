var SoundCloudAPI = { };

SoundCloudAPI.searchInput = function() {
         var input = document.querySelector('input');
         input.addEventListener('click', function(){
         console.log(input.value);
         SoundCloudAPI.getTracks(input.value);
         input.value = '';
         });
       }
SoundCloudAPI.searchButton = function() {
         var jsSubmit = document.querySelector('.js-submit');
         jsSubmit.addEventListener('click', function(){
         var input = document.querySelector('input');
         console.log(input.value);
         SoundCloudAPI.getTracks(input.value);
         input.value = '';
         });
       }
SoundCloudAPI.searchButton();
SoundCloudAPI.searchInput();

SoundCloudAPI.init = function() {
        SC.initialize({
        client_id: '195d273fb18f4a9a75ebda65c1aa2631'
        });
      }
SoundCloudAPI.init();

SoundCloudAPI.getTracks = function(inputValue) {
        SC.get('/tracks', {
          q: inputValue,
        }).then(function(tracks) {
          console.log(tracks);
          SoundCloudAPI.renderCards(tracks);

        });
      }

SoundCloudAPI.renderCards = function(tracks){
        tracks.forEach(function(track){
        //card
        var card = document.createElement('div');
        card.className = "card";

        
        var imageDiv = document.createElement('div');
        imageDiv.className = "image";

        var image_img = document.createElement('img');
        image_img.className = "image_img";
        image_img.src = track.artwork_url || "http://lorempixel.com/100/100/abstract/";

        imageDiv.appendChild(image_img);
        card.appendChild(imageDiv);

        
        var content = document.createElement('div');
        content.className = "content"
       
        var header = document.createElement('div');
        header.className = "header";
        header.innerHTML = '<a href="'+track.permalink_url+'" target="_blank">'+track.title+'</a>';

        content.appendChild(header);
        card.appendChild(content);
        
        var button = document.createElement('div');
        button.classList.add("ui", "bottom", "attached", "button", "js-button");

        var icon = document.createElement('i');
        icon.classList.add("add", "icon");

        var span = document.createElement('span');
        span.textContent = "Add to playlist";

        button.appendChild(icon);
        button.appendChild(span);
        button.addEventListener('click', function(){
            SoundCloudAPI.getEmbed(track.permalink_url);
        });

        card.appendChild(button);

        var searchResults = document.querySelector('.js-search-results');                         
        searchResults.insertBefore(card, searchResults.firstChild);
      });
}

SoundCloudAPI.getEmbed = function(trackURL) {
       SC.oEmbed(trackURL, {
          auto_play: true
        }).then(function(embed){
          console.log('oEmbed response: ', embed);
          var sideBar = document.querySelector('.js-playlist');
          var box = document.createElement('div');
          box.innerHTML = embed.html;
          sideBar.appendChild(box);
          sideBar.insertBefore(box, sideBar.firstChild);
          localStorage.setItem('key', sideBar.innerHTML);
      });
   }
SoundCloudAPI.getLocalStorage = function() {
        var sideBar = document.querySelector('.js-playlist');
        sideBar.innerHTML = localStorage.getItem('key');
}
SoundCloudAPI.getLocalStorage();

SoundCloudAPI.storageClear = function() {
        var clear = document.querySelector('.clear');
        clear.addEventListener('click', function() {
             var sideBar = document.querySelector('.js-playlist');
             sideBar.innerHTML = localStorage.clear();
             var searchResults = document.querySelector('.js-search-results');
             searchResults.innerHTML = '';
        });
     }
SoundCloudAPI.storageClear();















