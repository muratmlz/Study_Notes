let books = [];
let currentIndex = null;

// Λειτουργία αποθήκευσης βιβλίου
document.getElementById("saveButton").addEventListener("click", function() {
    const bookInput = document.getElementById("book").value;
    const pageInput = document.getElementById("page").value;

    if (bookInput && pageInput) {
        if (currentIndex !== null) {
            // Ενημέρωση υπάρχοντος βιβλίου
            books[currentIndex] = { name: bookInput, page: pageInput };
            currentIndex = null;
            document.getElementById("updateButton").style.display = "none";
        } else {
            // Προσθήκη νέου βιβλίου
            books.push({ name: bookInput, page: pageInput });
        }
        document.getElementById("book").value = "";
        document.getElementById("page").value = "";
        renderBookList();
    } else {
        alert("Παρακαλώ συμπληρώστε όλα τα πεδία.");
    }
});

// Λειτουργία απεικόνισης λίστας βιβλίων
function renderBookList() {
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = "";
    let totalPages = 0;

    books.forEach((book, index) => {
        const li = document.createElement("li");
        li.textContent = `${book.name} - Σελίδα: ${book.page}`;
        
        // Δημιουργία div για κουμπιά
        const actionButtons = document.createElement("div");
        actionButtons.className = "action-buttons";

        // Δημιουργία κουμπιού διαγραφής με εικονίδιο

        
        const deleteButton = document.createElement("button");
        const deleteIcon = document.createElement("img");
        deleteIcon.src = "images/delete-icon.png"; // Πρέπει να προσθέσεις το εικονίδιο διαγραφής
        deleteIcon.className = "icon";
        deleteButton.appendChild(deleteIcon);
        deleteButton.onclick = function() {
            books.splice(index, 1);
            renderBookList();
        };

        // Δημιουργία κουμπιού επεξεργασίας με εικονίδιο
        const editButton = document.createElement("button");
        const editIcon = document.createElement("img");
        editIcon.src = "images/edit-icon.png"; // Πρέπει να προσθέσεις το εικονίδιο επεξεργασίας
        editIcon.className = "icon";
        editButton.appendChild(editIcon);
        editButton.onclick = function() {
            currentIndex = index;
            document.getElementById("book").value = book.name;
            document.getElementById("page").value = book.page;
            document.getElementById("updateButton").style.display = "block";
        };

        // Προσθήκη κουμπιών στο div
        actionButtons.appendChild(editButton);
        actionButtons.appendChild(deleteButton);
        li.appendChild(actionButtons);
        
        bookList.appendChild(li);

        totalPages += parseInt(book.page);
    });

    document.getElementById("totalBooks").textContent = `Συνολικά Βιβλία: ${books.length}`;
    document.getElementById("totalPages").textContent = `Συνολικές Σελίδες: ${totalPages}`;
}