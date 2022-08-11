//Save title w. local storage
function saveTitle() {
    //Make sure local storage is supported by the browser.
    if (typeof(Storage) !== 'undefined') {
      //Get title value
      var input = document.getElementById('title').value;
      
      //Save title to local Storage
      localStorage.setItem('title', input);
      document.getElementById('title').value = localStorage.getItem('title');
  
      //Test
        console.log('Title saved.')
          //document.getElementById('test').innerHTML = localStorage.getItem('title')
  
    } else { //Throw an error if browser doesn't support local storage
      document.getElementById('test').innerHTML('Sorry, your browser does not support Web Storage...')
    }
  
  }
  //Get the value of the title from local storage.
  document.getElementById('title').value = localStorage.getItem('title')
  
  
  
  //Save note message
  function saveMessage() {
    if (typeof(Storage) != 'undefined') {
      //Get value of the message
      var messageInput = document.getElementById('message').value;
      
      //Save the value in local storage.
      localStorage.setItem('message', messageInput);
      document.getElementById('message').value = localStorage.getItem('message')
      
      //Test
      console.log('Message saved.')
      //document.getElementById('test').innerHTML = localStorage.getItem('message')
      
    } else { //Throw an error if browser doesn't support local storage
      document.getElementById('test').innerHTML('Sorry, your browser does not support Web Storage...')
    }
  
  }
  
  //Get the value of the message from local storage
  document.getElementById('message').value = localStorage.getItem('message')