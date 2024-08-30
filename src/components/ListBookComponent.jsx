import React, {useEffect, useState} from "react";
import {listBooks} from "../servicea/BookService.js";

const ListBookComponent = () => {

    const [books, setBooks] = useState([])

    useEffect(() => {
        listBooks().then((response) => {
            setBooks(response.data);
        }).catch(error => {
            console.error(error);
        })

    }, [])

    return (
        <div className="container">
            <h2 className="text-center">List of Books</h2>
            <table className="table table-striped table-bordered">
                <thed>
                    <tr>
                        <th>ID</th>
                        <th>Unit</th>
                        <th>Grade</th>
                    </tr>
                </thed>
                <tbody>
                {
                    books.map(book =>
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.unit}</td>
                            <td>{book.grade}</td>
                        </tr>)
                }
                </tbody>
            </table>
        </div>
    )
}

export default ListBookComponent