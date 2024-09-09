import { useEffect, useState } from "react";
import { deleteBookService, listBooks } from "../../servicea/BookService.js";
import { useNavigate } from "react-router-dom";

const ListBooksComponent = () => {

    const [books, setBooks] = useState([])

    useEffect(() => {
        listBooks().then((response) => {
            const sortedBooks = response.data.sort((a, b) => a.id - b.id);
            setBooks(sortedBooks);
        }).catch(error => {
            console.error(error);
        })

    }, [])

    const navigator = useNavigate();

    function addNewBook() {
        navigator('/books/add-book');
    }

    function editBook(id) {
        navigator(`/books/edit-book/${id}`);
    }

    function deleteBook(id) {
        if (id) {
            deleteBookService(id).then((response) => {
                console.log(response.data);
                setBooks((prevBooks) => prevBooks.filter(book => book.id !== id));
            }).catch(error => {
                console.error(error);
            })
        }
    }

    function backToHome() {
        navigator('/');
    }

    return (
        <div className="container d-flex flex-column align-items-center">
            <h2 className="text-center mb-4">
                List of Books
                <i
                    className="bi bi-info-circle custom-tooltip"
                    style={{marginLeft: '10px', cursor: 'pointer', fontSize: '1.10rem'}}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="This is the list of all available books in the school"
                ></i>
            </h2>

            <div className="mb-3">
                <button type="button" className="btn btn-primary" onClick={addNewBook}>Add Book</button>
            </div>

            <div className="table-responsive w-100">
                <table className="table table-striped table-bordered text-center">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Color</th>
                        <th>Unit</th>
                        <th>Grade</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        books.map(book =>
                            <tr key={book.id}>
                                <td>{book.id}</td>
                                <td>{book.name}</td>
                                <td>{book.color}</td>
                                <td>{book.unit}</td>
                                <td>{book.grade}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary me-2"
                                        onClick={() => editBook(book.id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger"
                                        onClick={() => deleteBook(book.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>

            <div className="mt-3">
                <button type="button" className="btn btn-primary" onClick={backToHome}>Back to Home</button>
            </div>
        </div>
    );
}

export default ListBooksComponent;
