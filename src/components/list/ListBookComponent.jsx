import React, { useEffect, useState } from "react";
import { listBooks } from "../../servicea/BookService.js";
import { useNavigate } from "react-router-dom";

const ListBookComponent = () => {

    const [books, setBooks] = useState([])

    useEffect(() => {
        listBooks().then((response) => {
            setBooks(response.data);
        }).catch(error => {
            console.error(error);
        })

    }, [])

    const navigator = useNavigate();

    function addNewBook() {
        navigator('/api/books/add-book');
    }

    function backToHome() {
        navigator('/');
    }

    return (
        <div className="container mt-5 d-flex flex-column align-items-center">
            <h2 className="text-center mb-4">List of Books</h2>

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
                            </tr>)
                    }
                    </tbody>
                </table>
            </div>

            <div className="mt-3">
                <button type="button" className="btn btn-primary" onClick={backToHome}>Back to Home</button>
            </div>
        </div>
    )
}

export default ListBookComponent;
