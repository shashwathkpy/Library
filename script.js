function Book(title, author, pages, read)
{
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

// const TKAMB = new Book("To Kill a Mockingbird", "Harper Lee", 281, true);
// const hobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
// const giver = new Book("The Giver", "Lois Lowry", 240, true);

const form = document.querySelector('#form');

const addBookBtn = document.querySelector('#addBookBtn');
let library = [];
addBookBtn.onclick = function ()
{
    addBook();
}

function addBook()
{
    addBookBtn.style.visibility = 'hidden';
    form.style.visibility = 'visible';

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.id = 'titleInput';
    titleInput.required = true;

    const titleLabel = document.createElement('label');
    titleLabel.textContent = "Title:";
    titleLabel.htmlFor = titleInput.id;

    const authorInput = document.createElement('input');
    authorInput.type = 'text';
    authorInput.id = 'authorInput';
    authorInput.required = true;

    const authorLabel = document.createElement('label');
    authorLabel.textContent = "Author:";
    authorLabel.htmlFor = authorInput.id;

    const pagesInput = document.createElement('input');
    pagesInput.type = 'number';
    pagesInput.id = 'pagesInput';
    pagesInput.required = true;

    const pagesLabel = document.createElement('label');
    pagesLabel.textContent = "# of Pages:";
    pagesLabel.htmlFor = pagesLabel.id;

    const readDiv = document.createElement('div');
    readDiv.id = 'readDiv';
    const readInput = document.createElement('input');
    readInput.type = 'checkbox';
    readInput.id = 'readInput';

    const readLabel = document.createElement('label');
    readLabel.textContent = "Have you read this book?";
    readLabel.htmlFor = readInput.id;

    readDiv.appendChild(readLabel);
    readDiv.appendChild(readInput);

    const submit = document.createElement('input');
    submit.type = 'submit';

    form.appendChild(titleLabel);
    form.appendChild(titleInput);
    form.appendChild(authorLabel);
    form.appendChild(authorInput);
    form.appendChild(pagesLabel);
    form.appendChild(pagesInput);
    form.appendChild(readDiv);
    form.appendChild(submit);
    form.onsubmit = function(e)
    { 
        e.preventDefault();
        addBookToLibrary()
    };
}

function addBookToLibrary()
{
    const titleInput = document.querySelector('#titleInput');
    const authorInput = document.querySelector('#authorInput');
    const pagesInput = document.querySelector('#pagesInput');
    const readInput = document.querySelector('#readInput');

    if(titleInput.value && authorInput.value && pagesInput.value)
    {
        const book = new Book(
            titleInput.value,
            authorInput.value,
            pagesInput.value,
            readInput.value
        );
        updateLibrary(book);
        form.innerHTML = "";
        form.style.visibility = 'hidden';
        addBookBtn.style.visibility = 'visible';
    }
}

const table = document.querySelector("#libraryList");
function createLibraryTable()
{
    const titleHeader = document.createElement('th');
    titleHeader.textContent = 'Title';

    const authorHeader = document.createElement('th');
    authorHeader.textContent = 'Author';

    const pagesHeader = document.createElement('th');
    pagesHeader.textContent = 'Pages';

    const readHeader = document.createElement('th');
    readHeader.textContent = 'Read';

    const removeHeader = document.createElement('th');
    removeHeader.textContent = 'Remove';

    table.appendChild(titleHeader);
    table.appendChild(authorHeader);
    table.appendChild(pagesHeader);
    table.appendChild(readHeader);
    table.appendChild(removeHeader);
}

function updateLibrary(book)
{
    library.push(book);
    console.log(library);
    table.innerHTML = "";
    createLibraryTable();
    for(let i = 0; i < library.length; i++)
    {
        const entry = document.createElement('tr');
        entry.setAttribute('id', i);
    
        const title = document.createElement('td');
        title.textContent = library[i].title;
    
        const author = document.createElement('td');
        author.textContent = library[i].author;
    
        const pages = document.createElement('td');
        pages.textContent = library[i].pages;
    
        const readButtonSlot = document.createElement('td');
        const readBtn = document.createElement('button');
    
        if(library[i].read)
            readBtn.textContent = "Read";
        else
            readBtn.textContent = "Not Read";
    
        readBtn.setAttribute('id', i);
        readBtn.setAttribute('class', 'read');
        readBtn.setAttribute('onclick', 'toggleRead(this.id)');
    
        const removeButtonSlot = document.createElement('td');
        const removeBtn = document.createElement('button');
        removeBtn.textContent = '✓';
        removeBtn.setAttribute('id', i);
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