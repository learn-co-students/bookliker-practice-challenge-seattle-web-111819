let user = {id: 1, username: "pouros"}

// Loaded Chain:
document.addEventListener("DOMContentLoaded", () => loadBooks());
const loadBooks = () => getAllBooks().then(books => books.forEach(book => makeBookLi(book)))


// Fetches:
const getAllBooks = () => fetch("http://localhost:3000/books").then(r => r.json())
const getBook = id => fetch(`http://localhost:3000/books/${id}`).then(r => r.json())
const updateBook = book => fetch(`http://localhost:3000/books/${book.id}`, {
    method: "PATCH",
    headers: {"Content-Type": "application/json", "Accept": "application/json"},
    body: JSON.stringify(book)
    }).then(r => r.json())


// Events:
const clickBook = id => showBookPanel(id)
const clickLike = id => toggleLike(id)


// Helpers:
const makeBookLi = book => {
    let li = document.createElement('li')
    li.innerText = book.title
    li.onclick = () => clickBook(book.id)
    document.getElementById('list').appendChild(li)
}
const showBookPanel = id => getBook(id).then(book => {
    let div = document.createElement('div'),
        h2 = document.createElement('h2'),
        img = document.createElement('img'),
        p = document.createElement('p'),
        button = document.createElement('button'),
        ul = document.createElement('ul')
    h2.innerText = book.title
    img.src = book.img_url
    p.innerText = book.description
    button.innerText = "Like!"
    button.onclick = () => clickLike(id)
    ul.innerText = "Liked By:"
    book.users.forEach(user => {
        let li = document.createElement('li')
        li.innerText = user.username
        ul.appendChild(li)
    })
    div.appendChild(h2)
    div.appendChild(img)
    div.appendChild(p)
    div.appendChild(button)
    div.appendChild(ul)
    document.getElementById('show-panel').replaceWith(div)
    div.id = 'show-panel'
})
const toggleLike = id => getBook(id).then(book => {
    let likes = []
    book.users.forEach(liked => {if (liked.id != user.id) {likes.push(liked)}})
    if (book.users.length == likes.length) {likes.push(user)}
    updateBook({id: id, users: likes}).then(() => showBookPanel(id))
})