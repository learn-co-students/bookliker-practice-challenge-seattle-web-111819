let user =  {id: 1, username: "pouros"} 
let editedNode = null 

// this is the content that will run when the page is loaded 
document.addEventListener("DOMContentLoaded", function() {
    console.log("Page Loaded!");
    getBooks()
});

// get all the books from the server
const getBooks = () => {
    fetch("http://localhost:3000/books")
  .then(res => res.json())
  .then(json => displayBookist(json)) 
}

// iterate through all of the books
const displayBookist = booksArray => {
    booksArray.forEach(book => createBookList(book))
  }

// the properties of the bookList
const createBookList = (book) => {
    let bookLi = document.createElement('li')
    bookLi.textContent = book.title 
    bookLi.addEventListener("click", event => {
        event.preventDefault() 
        showBook(book)
    })
    let list = document.getElementById("list") // id for the ul
    list.appendChild(bookLi) 
}

// show a specific book in the page's show panel
const showBook = book => {
    let bookDiv = document.createElement('div')
    let titleh4 = document.createElement('h4') 
    let description = document.createElement('p')
    let img = document.createElement('img')
    let likeButton = document.createElement('button')
    let likeDiv = document.createElement('div') 

    let userUl = document.createElement('ul')
  book.users.forEach(user => {
    let userLi = document.createElement('li')
    userLi.innerText = user.username
    userUl.appendChild(userLi)
  })

  titleh4.textContent = book.title 
  description.innerText = book.description
  img.src = book.img_url
  likeButton.innerText = "Like Book"
  likeButton.addEventListener("click", event => {
    event.preventDefault()
    likeBook(book);
    editedNode = bookDiv 
  })

  bookDiv.appendChild(titleh4) 
  bookDiv.appendChild(description)
  bookDiv.appendChild(img)
  likeDiv.appendChild(likeButton)
  bookDiv.appendChild(likeDiv)
  bookDiv.appendChild(userUl)

  let showPanel = document.getElementById("show-panel") // this is where we show a specific book instance 

  showPanel.replaceWith(bookDiv)
  bookDiv.id = "show-panel"


}

// have a user like a book 
const likeBook = book => {
    fetch(`http://localhost:3000/books/${book.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        users: book.users.concat(user)  
      })
    })
    .then(res => res.json())
    //.then(json => showBook(json))
    .then(json => {
        editedNode.replaceWith(showBook(json))    
    })

  }

