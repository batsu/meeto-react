import axios from 'axios';
import React from 'react'

function request () {
    const token = document.cookie.split("=")[1]
    axios.post('http://localhost:4000/postmeeto', { 
    //   method: 'post', 
    //   headers: new Headers({
    //       'Authorization': `Bearer ${token}`, 
    //   }), 
      cookie: token,
      body: {
        post_title: 'hi',
        post_content: 'asdfoajksdflkjasdflkjalsdfkjaalksdfjlaskjdflakjdsf'
      }
  });
  }

function MakePublicMeeto() {
  return (
      <>
        <h3>Make Meeto!</h3>
        <button onClick={() => request()}>Click Me!</button>
      </>
    
    
  )
}

export default MakePublicMeeto