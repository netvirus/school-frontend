import React, { useState } from 'react';
import { addBookService } from "../../servicea/BookService.js";
import { useNavigate } from "react-router-dom";

const AddBookComponent = () => {

    const [bookName, setBookName] = useState('');
    const [isColor, setColor] = useState('Yes'); // Дефолтное значение 'Yes'
    const [bookUnit, setBookUnit] = useState();
    const [bookGrade, setBookGrade] = useState();

    const navigator = useNavigate();

    function saveBook(e) {
        e.preventDefault();

        const newBook = { name: bookName, color: isColor, unit: bookUnit, grade: bookGrade };
        console.log(newBook);
        addBookService(newBook).then((response) => {
            console.log(response.data);
            navigator("/api/books");
        });
    }

    function backToList() {
        navigator("/api/books");
    }

    function backToHome() {
        navigator("/");
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="card col-md-8">
                    <h2 className="text-center mt-3">Add new book</h2>
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-3">
                                <label className="form-label font-weight-bold">Book name:</label>
                                <input
                                    type="text"
                                    placeholder="Enter book name"
                                    name="bookName"
                                    className="form-control"
                                    value={bookName}
                                    onChange={(e) => setBookName(e.target.value)}
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label className="form-label font-weight-bold">Is book color (Yes/No)?</label>
                                <div className="btn-group mt-2 d-flex" role="group" aria-label="Basic radio toggle button group">
                                    <input
                                        type="radio"
                                        className="btn-check"
                                        name="btnradio"
                                        id="btnradio1"
                                        autoComplete="off"
                                        value="Yes"
                                        defaultChecked
                                        onChange={(e) => setColor(e.target.value)}
                                    />
                                    <label className="btn btn-outline-primary" htmlFor="btnradio1">Yes</label>
                                    <input
                                        type="radio"
                                        className="btn-check"
                                        name="btnradio"
                                        id="btnradio2"
                                        autoComplete="off"
                                        value="No"
                                        onChange={(e) => setColor(e.target.value)}
                                    />
                                    <label className="btn btn-outline-primary" htmlFor="btnradio2">No</label>
                                </div>
                            </div>

                            <div className="form-group mb-3">
                                <label className="form-label font-weight-bold">Book unit:</label>
                                <input
                                    type="number"
                                    placeholder="Enter book unit"
                                    name="bookUnit"
                                    className="form-control"
                                    value={bookUnit}
                                    onChange={(e) => setBookUnit(e.target.value)}
                                />
                            </div>

                            <div className="form-group mb-4">
                                <label className="form-label font-weight-bold">Book grade:</label>
                                <input
                                    type="number"
                                    placeholder="Enter book grade"
                                    name="bookGrade"
                                    className="form-control"
                                    value={bookGrade}
                                    onChange={(e) => setBookGrade(e.target.value)}
                                />
                            </div>

                            <div className="text-center">
                                <button type="button" className="btn btn-primary me-2" onClick={saveBook}>Save</button>
                                <button type="button" className="btn btn-primary me-2" onClick={backToList}>Back</button>
                                <button type="button" className="btn btn-primary me-2" onClick={backToHome}>Back to Home</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddBookComponent;
