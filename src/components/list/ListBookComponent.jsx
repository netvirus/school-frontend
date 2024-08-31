import React, { useEffect, useState } from "react";
import { listBooks } from "../../servicea/BookService.js";
import { useNavigate } from "react-router-dom";

const ListBookComponent = () => {

    // const [books, setBooks] = useState([])
    //
    // useEffect(() => {
    //     listBooks().then((response) => {
    //         setBooks(response.data);
    //     }).catch(error => {
    //         console.error(error);
    //     })
    //
    // }, [])

    const books = [
        {id: 1, name: 'Algebra Basics', unit: 1, grade: 1},
        {id: 2, name: 'General Science', unit: 2, grade: 2},
        {id: 3, name: 'World History', unit: 3, grade: 3},
        {id: 4, name: 'Introduction to Geography', unit: 4, grade: 4},
        {id: 5, name: 'Advanced Mathematics', unit: 1, grade: 5},
        {id: 6, name: 'Science Experiments', unit: 2, grade: 1},
        {id: 7, name: 'Medieval History', unit: 3, grade: 2},
        {id: 8, name: 'Continents and Oceans', unit: 4, grade: 3},
        {id: 9, name: 'Geometry Basics', unit: 1, grade: 4},
        {id: 10, name: 'Physics for Beginners', unit: 2, grade: 5},
    ];

    const navigator = useNavigate();

    function addNewBook() {
        navigator('/api/books/add-book');
    }

    function backToHome() {
        navigator('/');
    }

    return (
        <div className="container d-flex flex-column justify-content-center">

            <h2 className="text-center m-5">List of Books</h2>
            <div>
                <button type="button" className="btn btn-success mb-3" onClick={addNewBook}>Add Book</button>
            </div>
            <table className="table table-striped table-bordered w-100" style={{width: "100%"}}>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
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
                            <td>{book.unit}</td>
                            <td>{book.grade}</td>
                        </tr>)
                }
                </tbody>
            </table>
            <div>
                <button type="button" className="btn btn-primary mb-3" onClick={backToHome}>Back to Home</button>
            </div>
        </div>
    )
}

export default ListBookComponent