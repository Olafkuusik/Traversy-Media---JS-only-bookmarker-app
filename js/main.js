/**
 * Created by Olaf on 22.01.2017.
 */
//listen fir form submit

document.getElementById('myForm').addEventListener('submit', saveBookmark);

//save bookmark
function saveBookmark(e) {
    //Get form values
    var siteName =document.getElementById('siteName').value;
    var siteUrl =document.getElementById('siteUrl').value;


    if(!validateForm(siteName,siteUrl)){
        return false;
    }

    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    //Test if bookmarks is null
    if(localStorage.getItem('bookmarks') === null){
        //init array
        var bookmarks = [];
        //add to array
        bookmarks.push(bookmark);
        //set to localstorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        //Get bookmarks from LocalStorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        //Add bookmark to array
        bookmarks.push(bookmark);
        //Re-set back to LocalStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    //Clear Form
    document.getElementById('myForm').reset();

    //Re-fetch bookmarks
    fetchBookmarks();

    //prevent form from submitting
    e.preventDefault();
}
    //Delete bookmark
    function deleteBookmark(url) {
        //Get bookmarks from LocalStorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        //Loop through bookmarks
        for(var i= 0; i < bookmarks.length; i++){
            if(bookmarks[i].url == url){
                //Remove from array
                bookmarks.splice(i, 1);
            }
        }
        //Re-set back to LocalStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

        //Re-fetch bookmarks
        fetchBookmarks();
    }


    //Fetch bookmarks
    function fetchBookmarks() {
        //Get bookmarks from LocalStorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

        //Get output id
        var bookmarksResults = document.getElementById('bookmarksResults');

        //Build output
        bookmarksResults.innerHTML = '';
        for(var i = 0; i< bookmarks.length; i++){
            var name = bookmarks[i].name;
            var url = bookmarks[i].url;

            bookmarksResults.innerHTML +=   '<div class="well">' +
                                            '<h3>'+name+
                                            '<a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>' +
                                            '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>' +
                                            '</h3>' +
                                            '</div>';
        }
    }
    //Validate Form
    function validateForm(siteName, siteUrl) {
        if (!siteName || !siteUrl) {
            alert('Please fill in the form');
            return false;
        }
        var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        var regex = new RegExp(expression);

        if (!siteUrl.match(regex)) {
            alert('Please use a valid URL');
            return false;
        }

        return true;
    }