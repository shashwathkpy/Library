function Book(entryID, title, author, pages, read)
{
    this.entryID = entryID;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function()
    {
        if(read)
        {
            readString = "have read";
        }
        else
        {
            readString = "not read yet";
        }
        return title + " by " + author + ", " + pages + " pages, " + readString;
    }
}

const TKAMB = new Book("To Kill a Mockingbird", "Harper Lee", 281, true);
const hobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
const giver = new Book("The Giver", "Lois Lowry", 240, true);
let book = 0;

const addBtn = document.createElement('button');
addBtn.textContent = 'Add';

const inputPlaceHolder = document.querySelector('#formPlaceholder');

let inputs;
let titleLabel;
let titleInput;
let authorLabel;
let authorInput;
let pagesLabel;
let pagesInput;
let readLabel;
let readInput;

const addBookBtn = document.querySelector('#addBookBtn');

addBookBtn.addEventListener('click', function (e) {

    addBookBtn.style.visibility = 'hidden';
    inputs = document.createElement('div');

    titleLabel = document.createElement('label');
    titleLabel.textContent = "Title:";
    titleInput = document.createElement('input');
    titleInput.setAttribute('type', 'text');

    authorLabel = document.createElement('label');
    authorLabel.textContent = "Author:";
    authorInput = document.createElement('input');
    authorInput.setAttribute('type', 'text');

    pagesLabel = document.createElement('label');
    pagesLabel.textContent = "# of Pages:";
    pagesInput = document.createElement('input');
    pagesInput.setAttribute('type', 'number');

    readLabel = document.createElement('label');
    readLabel.textContent = "Have you read this book?";
    readInput = document.createElement('input');
    readInput.setAttribute('type', 'checkbox');

    inputs.appendChild(titleLabel);
    inputs.appendChild(document.createElement('br'));
    inputs.appendChild(titleInput);
    inputs.appendChild(document.createElement('br'));
    inputs.appendChild(authorLabel);
    inputs.appendChild(document.createElement('br'));
    inputs.appendChild(authorInput);
    inputs.appendChild(document.createElement('br'));
    inputs.appendChild(pagesLabel);
    inputs.appendChild(document.createElement('br'));
    inputs.appendChild(pagesInput);
    inputs.appendChild(document.createElement('br'));

    inputs.appendChild(readInput);
    inputs.appendChild(readLabel);
    inputs.appendChild(document.createElement('br'));
    inputs.appendChild(addBtn);
    inputPlaceHolder.appendChild(inputs);
});

entryCount = 0;
addBtn.addEventListener('click', function (e) {
    entryCount += 1;
    book = new Book(entryCount, titleInput.value, authorInput.value, pagesInput.value, readInput.checked);
    addBookToLibrary(book);
    inputs.remove();
    addBookBtn.style.visibility = 'visible';
});

let library = [];
const table = document.querySelector("#libraryList");

function addBookToLibrary(book)
{
    // library.push(book);

    // const index = library.indexOf(book.entryID);
    // library.splice();
    const entry = document.createElement('tr');
    entry.setAttribute('id', entryCount);

    const title = document.createElement('td');
    title.textContent = book.title;

    const author = document.createElement('td');
    author.textContent = book.author;

    const pages = document.createElement('td');
    pages.textContent = book.pages;

    const readButtonSlot = document.createElement('td');
    const readBtn = document.createElement('button');

    if(book.read)
        readBtn.textContent = "Read";
    else
        readBtn.textContent = "Not Read";

    readBtn.setAttribute('id', entryCount);
    readBtn.setAttribute('class', 'read');
    readBtn.setAttribute('onclick', 'toggleRead(this.id)');

    const removeButtonSlot = document.createElement('td');
    const removeBtn = document.createElement('button');
    removeBtn.textContent = '✓';
    removeBtn.setAttribute('id', entryCount);
    removeBtn.setAttribute('onclick', 'removeEntry(this.id)');

    entry.appendChild(title);
    entry.appendChild(author);
    entry.appendChild(pages);
    readButtonSlot.appendChild(readBtn);
    entry.appendChild(readButtonSlot);
    removeButtonSlot.appendChild(removeBtn);
    entry.appendChild(removeButtonSlot);

    table.appendChild(entry);
}

function removeEntry(clickedID)
{
    console.log(clickedID);
    entries = table.querySelectorAll('tr');
    entries.forEach(entry => {
        if(entry.getAttribute('id') == clickedID)
        {
            entry.remove();
        }
    });
}

function toggleRead(clickedID)
{
    console.log(clickedID);
    readBtns = table.querySelectorAll('.read');
    readBtns.forEach(btn => {
        if(btn.getAttribute('id') == clickedID)
        {
            if(btn.textContent == "Read")
                btn.textContent = "Not Read";
            else
                btn.textContent = "Read";
        }
    });
}


// addBookToLibrary(TKAMB);
// addBookToLibrary(hobbit);
// addBookToLibrary(giver);