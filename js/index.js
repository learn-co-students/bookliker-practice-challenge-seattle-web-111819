let myUser = {id:1, username:"pouros"}

document.addEventListener("DOMContentLoaded", function() {
  fetchBooks();
});

const fetchBooks = () => {
  fetch('http://localhost:3000/books')
    .then (res => res.json())
    .then (json => showBooks(json))
}

const showBooks = booksArray => {
  booksArray.forEach(book => {
    addBooks(book)
  })
}

const addBooks = book => {
  let bookLi = document.createElement('li')
  bookLi.innerText = book.title

  bookLi.addEventListener("click", e => {
    e.preventDefault()
    showIndividualBook(book)

  })

  let list = document.getElementById("list")
  list.appendChild(bookLi)
}

const showIndividualBook = book => {
  let showPanel = document.getElementById('show-panel') 
  
  while (showPanel.firstChild) {
    showPanel.removeChild(showPanel.firstChild)
  }



  let div = document.createElement('div')
  let title = document.createElement('h3')
  title.innerText = book.title
  let description = document.createElement('p')
  description.innerText = book.description
  let img = document.createElement('img')
  img.src = book.img_url

  let divB = document.createElement('div')
  let button = document.createElement('button')
  button.innerText = "Like Book"
  divB.appendChild(button)
  button.addEventListener("click", () => {

    likeBook(book);
  })

  let userUl = document.createElement('ul')
  book.users.forEach(user => {
    let userLi = document.createElement('li')
    userLi.innerText = user.username
    userUl.appendChild(userLi)
  })


  div.appendChild(title)
  div.appendChild(description)
  div.appendChild(img)
  div.appendChild(divB)
  div.appendChild(userUl)



  showPanel.appendChild(div)

 
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