// let currentuser = {"id":1, "username":"Natali"}
// document.addEventListener("DOMContentLoaded", function() {
//   getAllBooks();
// })
// const getAllBooks = (books) => {
//   fetch("http://localhost:3000/books")
//   .then(res => res.json())
//   .then(data => showEachBook(data))
// }
// // const getOneBook = (book) => {
// //     fetch(`http://localhost:3000/books/${book.id}`)
// //     .then(res => res.json)
// //     .then(data => showBooks(data))
// // }

  
// const showBooks = (book) => {
//     let ulList = document.getElementById("list");
//     let liItem = document.createElement("li");
//     liItem.innerText = book.title;
    

//     ulList.appendChild(liItem)
// }

// const showEachBook = (bookArray) => {
//     bookArray.forEach(book => {
//         showBooks(book)
//     })
// }

const currentUser = {id:1, username:"pouros"}
document.addEventListener("DOMContentLoaded", function() {
  getBooks().then(data => displayBookList(data) )
});
const getBooks = () => fetch("http://localhost:3000/books").then(res => res.json())
const getABook = () => fetch(`http://localhost:3000/books/${id}`).then(res => res.json())
// pass full obj inorder to update more elements later on
const updateBook = bookObj => {
  return fetch(`http://localhost:3000/books/${bookObj.id}`, { //get id of bookObj
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "applicaiton/json"
    },
    body: JSON.stringify(bookObj) // pass book obj 
  }).then(res => res.json())
}
const displayBookList = (allBooks) => {
  const ul = document.getElementById("list");
  allBooks.forEach(book => {
    const li = document.createElement("li");
    li.innerText = book.title; 
    li.addEventListener("click", () => {
      displaySingleBook(book)
    })
    ul.appendChild(li);
  })
}
const displaySingleBook = (book) => {
  // console.log(book)
  // title
  const h2 = document.createElement("h2");
  h2.innerText = book.title;
  const img = document.createElement("img");
  img.src = book.img_url
  const desc = document.createElement("p");
  desc.innerText = book.description;
  const likeBtn = document.createElement("button");
  likeBtn.innerText = "Like"
  // bookUsers = book.users
  likeBtn.onclick = () => { // leave blank if inside method. or use (e)
    likeThisBook(book)
  }
// create a list
  const likesList = document.createElement("ul");
  book.users.forEach(user => {
    const li = document.createElement("li");
    li.innerText = user.username;
    likesList.appendChild(li);
  })
  const bookDiv = document.createElement("div");
  bookDiv.appendChild(h2); 
  bookDiv.appendChild(img); 
  bookDiv.appendChild(desc); 
  bookDiv.appendChild(likeBtn); 
  bookDiv.appendChild(likesList); 
  const showPanel = document.getElementById("show-panel");
  showPanel.replaceWith(bookDiv);
  bookDiv.id = "show-panel";
}
const likeThisBook = (book) => {
  // if users has current user, remove them if not add them
  // book.users.forEach(likedUser => { 
  //   if (likedUser.id == currentUser.id) {
  //   } else {
  //   }
  // })
  let newBook = {
    id: book.id,
    users: book.users.concat(currentUser)
  }
  updateBook(newBook).then(data => displaySingleBook(data))
}





// let currentUser = {"id":1, "username":"Natali"}
// document.addEventListener("DOMContentLoaded", function() {
//   // getAllBooks().then(data => showBooks(data))
//   getAllBooks();
//   // getOneBook();
// })
// const getAllBooks = () => {
//   fetch("http://localhost:3000/books")
//   .then(res => res.json())
//   .then(data => showBooks(data))
// }
// // const getOneBook = () => {
// //   fetch(`http://localhost:3000/books${id}`)
// //   .then(res => res.json())
// //   .then(data => showABook(data))
// // }
// const showEachBook = (book) => {
//   let ulList = document.getElementById("list");
//   let liItem = document.createElement("li")
//   liItem.textContent = book.title
//   ulList.appendChild(liItem);
//   liItem.addEventListener("click", function() {
//     let showPanel = document.getElementById("show-panel");
//     showPanel.innerHTML = "";
//     displayOneBook(book)
//   })
// }
// const showBooks = (booksArray) => {
//   booksArray.forEach(book => {
//   showEachBook(book)}
// )}
// const displayOneBook = (book) => {
//   let showPanel = document.getElementById("show-panel");
//   let h2 = document.createElement("h2");
//   h2.textContent = book.title;
//   let img = document.createElement("img");
//   img.src = book.img_url;
//   let desc = document.createElement("p");
//   desc.textContent = book.description;
//   let usersList = document.createElement("h4")
//   usersList.textContent = showUsers(book);
//   let readButton = document.createElement("button");
//   readButton.textContent = "Read Book";
//   readButton.addEventListener("click", function() {
//     updateUserList(book)
//   })
//   showPanel.appendChild(h2);
//   showPanel.appendChild(img);
//   showPanel.appendChild(desc);
//   showPanel.appendChild(usersList);
//   showPanel.appendChild(readButton);
// }
// const showUsers = (book) => {
//   let usersArray = [];
//   book.users.forEach(user => {
//     usersArray.push(user.username)
//   })
//   return usersArray;
// }
// const updateUserList = (book) => {
//   let updatedUsers = book.users.push(currentUser);
//   fetch(`http://localhost:3000/books/${book.id}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//       "Accept": "applicaiton/json"
//     },
//     body: JSON.stringify(updatedUsers)
//   })
// }
