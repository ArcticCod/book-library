const savedLibrary = localStorage.getItem("savedLibrary");
const myLibrary = [];
if (savedLibrary) {
    const parsedSavedLibrary = JSON.parse(savedLibrary);
    myLibrary.push(...parsedSavedLibrary)
}


function saveLibrary () {
    const libraryString = JSON.stringify(myLibrary);
    localStorage.setItem("savedLibrary", libraryString);
}


let lastInsertedID = 0

function Book(title, author, pages, read) {
    lastInsertedID++
    this.title = title; 
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.ID = lastInsertedID
    this.changeRead = changeRead
}
function changeRead(){

}
const library = document.querySelector(".box-grid")
function addBook(book) {
    myLibrary.push(book)
    return myLibrary.indexOf(book)
}

const dialog = document.querySelector("dialog");
const showBtn = document.querySelector(".addBtn");
const closeBtn = document.querySelector(".close")

showBtn.addEventListener("click", () => {
    
    let addTitle = document.getElementById("title")
    let addAuthor = document.querySelector("#author")
    let addPages = document.querySelector("#pages")
    let addRead = document.querySelector("#read")
    addTitle.value = ""
    addAuthor.value = ""
    addPages.value = ""
    addRead.checked = false
    dialog.showModal();
})
closeBtn.addEventListener("click", () => {
    dialog.close();
})

let newBookForm = document.querySelector(".book-form")
newBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addTitle = document.getElementById("title").value
    addAuthor = document.getElementById("author").value
    addPages = document.getElementById("pages").value
    if (document.getElementById("read").checked) {
        addRead = "Read"
    }else {
        addRead = "Unread"
    }
    let book = new Book(addTitle, addAuthor, addPages, addRead);
    addBook(book)
    createFrames(myLibrary.slice(myLibrary.length-1, ))
    saveLibrary()
    dialog.close()
})

createFrames(myLibrary)

function createFrames(array) {
    
    for (let book of array) {
        const infoBox = document.createElement("div");
        infoBox.classList.add("box");
        infoBox.setAttribute("id", book.ID)
        library.appendChild(infoBox);

        const bookTitle = document.createElement("p");
        bookTitle.classList.add("bookTitle");
        infoBox.appendChild(bookTitle);
        bookTitle.textContent = book.title;
        
        const bookAuthor = document.createElement("div");
        bookAuthor.textContent = `Written by: ${book.author}`;
        infoBox.appendChild(bookAuthor);

        const bookPages = document.createElement("div");
        bookPages.textContent = `Length: ${book.pages}`;
        infoBox.appendChild(bookPages);

        const readState = document.createElement("div");
        readState.textContent = `${book.read}`;
        readState.addEventListener("click", (e) => {
            const bookID = e.target.parentNode.id
            const foundIndex = myLibrary.findIndex(book => book.ID == bookID)
            if (e.target.textContent === "Read") {
                console.log(bookID)
                console.log(foundIndex)
                console.log(myLibrary)

                readState.textContent = "Unread"
                myLibrary[foundIndex].read = "Unread"
                
            }else {
                readState.textContent = "Read"
                myLibrary[foundIndex].read = "Read"    
                console.log(myLibrary[foundIndex])
            }
            saveLibrary()

        })
        infoBox.appendChild(readState);

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete");
        deleteBtn.textContent = "X";
        deleteBtn.addEventListener("click", (e) => {
            const bookID = e.target.parentNode.id
            const foundIndex = myLibrary.findIndex(book => book.ID == bookID)
            myLibrary.splice(foundIndex, 1);
            deleteBtn.parentNode.remove();
            saveLibrary()
        })
        infoBox.appendChild(deleteBtn);
    }
}

// const deleteBtns = document.querySelectorAll(".delete")
//  function deleteBook(e) {
    
    
//  }

