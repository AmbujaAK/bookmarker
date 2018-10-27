/* Listen for form submit */
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e){
    /* get values form forms*/
    var sitename = document.getElementById('sitename').value;
    var siteurl = document.getElementById('siteurl').value;
    
    /* check for validation */
    /*
    if(!validateForm(sitename, siteurl)){
        return false;
    }
    */
    var bookmark = {
        name : sitename,
        url : siteurl
    }
    //console.log(bookmark);

    // Test if bookmark is null
    if(localStorage.getItem('bookmarks') === null){
        // Init Array
        var bookmarks = [];

        // Add to Array
        bookmarks.push(bookmark);

        // set to localStorge
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

        // Add to Array
        bookmarks.push(bookmark);

        // Re-set to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    // Clear form
    document.getElementById('myForm').reset();
    
    // Re-fetch bookmarks
    fetchBookmarks();

    // prevent form from submitting
    e.preventDefault();
}

// Delete bookmarks
function deleteBookmark(url){
    //console.log(url);
    
    // get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // loop throught bookmarks
    for(var i=0; i<bookmarks.length; i++){
        if(bookmarks[i].url == url){
            // remove selected bookmark from array
            bookmarks.splice(i,1);
        }
    }

    // Re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // Re-fetch bookmarks  
    fetchBookmarks();
}

// fetch bookmarks
function fetchBookmarks(){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //console.log(bookmarks);
    var bookmarksResults = document.getElementById('bookmarksResults');

    // build output
    bookmarksResults.innerHTML = '';
    for (var i =0; i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="bookmarksList">' + 
                                        '<h3>' + name +
                                        '<a class="btn btn-success" target="_blank" href="'+ url +'">visit</a>'+
                                        '<a onclick="deleteBookmark(\'' + url + '\')" class="btn btn-danger" href="#">Delete</a>'+ 
                                        '</h3>' +
                                        '</div>';
    }
}

function validateForm(sitename, siteurl){
    if(!sitename || !siteurl){
        var error = document.getElementById('error');
        error.innerHTML = 'Please fill in the form';
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
        var error = document.getElementById('error');
        error.innerHTML = 'Please use a valid URL';
        
        return false;
    }
    var success = document.getElementById('success');
    success.innerHTML = 'URL bookmarked';
    
    return true;
}