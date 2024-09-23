const openForm = document.querySelector("#addbook-btn");
const closeBtn = document.querySelector("#closebtn");
const bookContainer = document.querySelector("#book-main");
const submitBtn = document.querySelector("#submit-btn");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pageNumsInput = document.querySelector("#page_nums");
const descInput = document.querySelector("#description");
const checkboxInput = document.querySelector(".haveRead"); 
const addBookForm = document.querySelector("#book_form");
const editForm = document.querySelector("#update_form");
const editCloseBtn = document.querySelector("#edit-closebtn");
const updateSubmitBtn = document.querySelector("#update_submit-btn");

const updateTitle = document.querySelector("#update_title");
const updateAuthor = document.querySelector("#update_author");
const updatePagenums = document.querySelector("#update_page_nums");
const updateDesc = document.querySelector("#update_description");
const updateCheckbox = document.querySelector("#update_haveRead");

const library = [];

openForm.addEventListener("click", (e) =>{
    addBookForm.style.display = "flex";
})

closeBtn.addEventListener("click", (e) =>{
    e.preventDefault();
    addBookForm.style.display = "none"; 
 
    });

editCloseBtn.addEventListener("click", (e) =>{
    e.preventDefault();
    editForm.style.display = "none";

    });


function Book(title, author, pageNum, desc, haveRead){

    this.title = title;
    this.author = author;
    this.pageNum = pageNum;
    this.desc = desc;
    this.haveRead = haveRead;
}

function addBookToLibrary(Book){
    library.push(Book);
}

submitBtn.addEventListener("click", (e) =>{
    e.preventDefault()
    
    const newBook = new Book(
        titleInput.value,
        authorInput.value,
        pageNumsInput.value,
        descInput.value, 
        checkboxInput.checked);

    addBookToLibrary(newBook);

    addBookForm.style.display = "none"; 
    addBookForm.reset();

    printBookDetails();


});

function printBookDetails(){
    const mainDisplay = document.querySelector("#book-main");
    library.forEach((book) => {

         // Check if this book is already in the DOM
         const existingBook = mainDisplay.querySelector(`.book_display[data-title="${book.title}"][data-author="${book.author}"]`);
         if (existingBook) {
             return; // Skip adding this book if it already exists
         }
 
         // Add new book to the DOM
         const bookDisplay = document.createElement("div");
         bookDisplay.className = "book_display";
         bookDisplay.setAttribute("data-title", book.title);
         bookDisplay.setAttribute("data-author", book.author);
         bookDisplay.innerHTML = `
             <div class="book_title">
                 <h4 class="book-header">${book.title}</h4>
                 <h4 class="book-header">${book.author}</h4>
             </div>
             <h4 class="book-body">Pages: ${book.pageNum}</h4>
             <div>
                 <h4 class="book-body">Description: </h4>
                 <p class="book-desc">${book.desc}</p>
             </div>
             <div class="checkbox-container">
                 <h4 class="book-body" for="haveRead">Have Read?</h4>
                 <input type="checkbox" class="haveRead" name="haveRead" value="${book.haveRead}" ${book.haveRead ? 'checked' : ''}> 
             </div>
             <div id="book_buttons">                    
                 <button id="edit-btn"><img id="delete_icon" src="imgs/book-edit-outline.svg" alt="delete">Edit</button>
                 <button id="delete-btn"><img id="delete_icon" src="imgs/delete-forever.svg" alt="delete">Delete</button>
             </div>
         `;
         mainDisplay.appendChild(bookDisplay);
         console.log(library);

    });
}

function updateBookDetails(){

}


bookContainer.addEventListener("click", (e) => {
    if (e.target.matches("#edit-btn")) {
        // Handle edit button click
        editForm.style.display = "flex";    
        const title = e.target.closest(".book_display").getAttribute("data-title");
  

        updateSubmitBtn.addEventListener("click", (e) =>{
            e.preventDefault();

            const index = library.findIndex(book => book.title === title);
            const BooktoUpdate = library[index];

            BooktoUpdate.title = updateTitle.value
            BooktoUpdate.author = updateAuthor.value;
            BooktoUpdate.pageNum = updatePagenums.value;
            BooktoUpdate.desc = updateDesc.value;
            BooktoUpdate.haveRead = updateCheckbox.value;

         
            console.log(library);
            console.log(BooktoUpdate);
                    console.log(updateTitle.value);

        });

        const index = library.findIndex(book => book.title === title);
        const BooktoUpdate = library[index];

        console.log(BooktoUpdate.title);
        e.target.closest(".book_display").setAttribute("data-title", BooktoUpdate.title);          

        
     

        // Add your edit logic here
    } else if (e.target.matches("#delete-btn")) {
        // Handle delete button click
        const title = e.target.closest(".book_display").getAttribute("data-title");
        const index = library.findIndex(book => book.title === title);
        library.splice(index, 1)
        e.target.closest(".book_display").remove(); // Example: remove the book display
    }
});

// let harryPotter = new Book("Harry Potter and the Chamber of secrets", "JK Rowling", 234, "Harry Potter must save Jinny from the forces of evil", true);
// let harryPotter2 = new Book("Harry Potter and the Chamber of secrets", "JK Rowling", 234, "Harry Potter must save Jinny from the forces of evil", true);

// addBookToLibrary(harryPotter);
// addBookToLibrary(harryPotter2);
// printBookDetails();

