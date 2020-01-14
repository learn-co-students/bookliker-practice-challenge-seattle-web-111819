document.addEventListener("DOMContentLoaded", function() {
    getBooks()
})

const user1 = {"id":1, "username":"pouros"}

const getBooks = () => {
    fetch("http://localhost:3000/books")
    .then(res => res.json())
    .then(data => showBooks(data))
}

const showBooks = (data) => {
    data.forEach(book => {
        addBook(book)
    });
}

const addBook = (book) => {
    const ul = document.getElementById("list")
    const li = document.createElement("li")
    li.innerText = book.title
    li.addEventListener("click", function() {
        clearBook()
        showBookDetails(book)
    })
    ul.appendChild(li)
}

const clearBook = () => {
    const showPanel = document.getElementById("show-panel") 
    showPanel.innerHTML = ""
}

const showBookDetails = (book) => {
    const showPanel = document.getElementById("show-panel")

    const h2 = document.createElement("h2")
    h2.innerText = book.title

    const img = document.createElement("img")
    img.src = book.img_url

    const p = document.createElement("p")
    p.innerText = book.description

    const h4 = document.createElement("h4")
    h4.innerText = showUsers(book)

    const button = document.createElement("button")
    button.innerText = "Read Book"
    button.addEventListener("click", function() {
        updateUsers(book)
        clearBook()
        likeBook(book)
    })

    showPanel.appendChild(h2)
    showPanel.appendChild(img)
    showPanel.appendChild(p)
    showPanel.appendChild(h4)
    showPanel.appendChild(button)
}

const showUsers = (book) => {
    const userNames = []
    book.users.forEach(user => {
        userNames.push(" " + `${user.username}`)
    })
    return userNames
}

const likeBook = (book) => {
    fetch(`http://localhost:3000/books/${book.id}`, {
        method: "PATCH", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(book)
    })
    .then(res => res.json())
    .then(data => showBookDetails(data))
}

const updateUsers = (book) => {
    const existingUser = book.users.find(user => (user.id === user1.id))
    if(existingUser) {
        alert("You read this already!")
    } else {
        book.users.push(user1)
    }
}