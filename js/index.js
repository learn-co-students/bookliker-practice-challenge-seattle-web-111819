let currentUser = {id: 1, username: "pouros"}

document.addEventListener("DOMContentLoaded", function() {
  getBooks()
});

//fetch all books
const getBooks = () => {
  fetch("http://localhost:3000/books")
  .then(res => res.json())
  .then(json => showBooks(json))
}

//iterate over the array of books, take to next function
const showBooks = booksArray => {
  booksArray.forEach(book => createBookLi(book))
}

// create book li and append to ul
const createBookLi = book => {
  let bookLi = document.createElement('li')
  bookLi.innerText = book.title
  bookLi.addEventListener('click', e => {
    e.preventDefault()
    bookDetails(book)
  })
  document.getElementById('list').appendChild(bookLi)
}


// need to show only one book in show section. Currently creating a list of books that were clicked. Need to re-render book details section everytime a Book List Item is clicked, and fill with that books details

const bookDetails = book => {
  // get book details and display in #show-panel
  // title, img_url, description, users

  //create title h1, image div, description p, user p

  let showPanel = document.getElementById('show-panel')
  console.log(showPanel)
  while (showPanel.firstChild) {
    showPanel.removeChild(showPanel.firstChild)
  }


  let h1 = document.createElement('h1')
  h1.innerText = book.title


  let image = document.createElement('img')
  image.src = book.img_url
 
  let pDescription = document.createElement('p')
  pDescription.innerText = book.description
 

  let usersDiv = document.createElement('div')
  usersDiv.innerText ="USERS THAT LIKE THIS BOOK:"
  

  console.log(book)
  book.users.forEach(user => {
    
    userP = document.createElement('p')
    userP.innerText = user.username
    //userP.style.listStyleType = "none"
    usersDiv.appendChild(userP)
  })
  
  let readButton = document.createElement('button')
  readButton.innerText = "Read Book"
  readButton.addEventListener("click", e => {
    e.preventDefault()
    likeBook(book, e)
    // console.log(e.target.parentNode.users)
  })
 
  
  showPanel.appendChild(h1)
  showPanel.appendChild(image)
  showPanel.appendChild(pDescription)
  showPanel.appendChild(usersDiv)
  // console.log(book.users)
  showPanel.appendChild(readButton)
  
}

// need to fix POST method
// add current user ID to existing users/likers array and re-render the show-panel to reflect new changes with current user's ID included in list
const likeBook = (book, e) => {
  console.log("existing array of likers:")
  console.log(usersWhoLiked = book.users)
  console.log("new array of likers:")
  console.log(usersWhoLikedPlusMe = usersWhoLiked.push(currentUser))



  fetch(`http://localhost:3000/books/${book.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "users": usersWhoLiked
    })
    })
    .then(res => res.json())
    .then(json => bookDetails(book))
}


