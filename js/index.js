let myUser = {"id":1, "username":"pouros"}

document.addEventListener("DOMContentLoaded", () => {
  console.log("Page Loaded!");
  fetchBooks();
});

const fetchBooks = () => {
  fetch('http://localhost:3000/books')
  .then(res => res.json())
  .then(json => showBooks(json))
}

const showBooks = booksArray => {
  booksArray.forEach(book => {
    createBookList(book)
  })
}

const createBookList = book => {
  let bookLi = document.createElement('li')
  bookLi.innerText = book.title
  bookLi. addEventListener("click", e => {
  
    showIndividualBook(book);
  })

  let list = document.getElementById("list")
  list.appendChild(bookLi);
}

const showIndividualBook = book => {
  let bookDiv = document.createElement('div')
  let titleh3 = document.createElement('h3')
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

  titleh3.innerText = book.title
  description.innerText = book.description
  img.src = book.img_url
  likeButton.innerText = "Like Book"
  likeButton.addEventListener("click", e => {
    likeBook(book);
  })


  bookDiv.appendChild(titleh3)
  bookDiv.appendChild(description)
  bookDiv.appendChild(img)
  likeDiv.appendChild(likeButton)
  bookDiv.appendChild(likeDiv)
  bookDiv.appendChild(userUl)


  let showPanel = document.getElementById("show-panel")

  showPanel.replaceWith(bookDiv)
  bookDiv.id = "show-panel"

}

const likeBook = book => {
  fetch(`http://localhost:3000/books/${book.id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      users: book.users.concat(myUser)
    })
  })
  .then(res => res.json())
  .then(json => showIndividualBook(json))

}