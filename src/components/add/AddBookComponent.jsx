import React, {useEffect, useState} from 'react';
import {addBookService, getBookByIdService, updateBookService} from "../../servicea/BookService.js";
import {useNavigate, useParams} from "react-router-dom";

const AddBookComponent = () => {

    const [bookName, setBookName] = useState('');
    const [isColor, setColor] = useState('Yes');
    const [bookUnit, setBookUnit] = useState();
    const [bookGrade, setBookGrade] = useState();

    const {id} = useParams();

    // Проверка формы
    const [errors, setErrors] = useState({
        bookName: '',
        bookUnit: '',
        bookGrade: ''
    })

    const navigator = useNavigate();

    useEffect(() => {
        if (id) {
            getBookByIdService(id).then((response) => {
                setBookName(response.data.name);
                setColor(response.data.color);
                setBookUnit(response.data.unit);
                setBookGrade(response.data.grade);
            }).catch(error => {
                console.error(error);
            })
        }
    }, [id])

    function saveUpdateBook(e) {
        e.preventDefault();
        const newBook = {name: bookName, color: isColor, unit: bookUnit, grade: bookGrade};
        console.log(newBook);

        if (validateForm()) {

            if (id) {
                updateBookService(id, book).then((response) => {
                    console.log(response.data);
                    navigator("/api/books");
                }).catch(error => {
                    console.error(error);
                })
            } else {
                addBookService(newBook).then((response) => {
                    console.log(response.data);
                    navigator("/api/books");
                }).catch(error => {
                    console.error(error);
                });
            }
        }
    }

// Валидация полей
    function validateForm() {
        let valid = true;

        const errorsCopy = {... errors}

        if (bookName.trim()) {
            errorsCopy.bookName = '';
        } else {
            errorsCopy.bookName = 'Book name is required';
            valid = false;
        }

        if (bookUnit) {
            errorsCopy.bookUnit = '';
        } else {
            errorsCopy.bookUnit = 'Unit number is required';
            valid = false;
        }

        if (bookGrade) {
            errorsCopy.bookGrade = '';
        } else {
            errorsCopy.bookGrade = 'Grade number is required';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    function backToList() {
        navigator("/api/books");
    }

    function backToHome() {
        navigator("/");
    }

    function pageTitle() {
        if (id) {
            return <h2 className="text-center mt-3">Update the book</h2>
        } else {
            return <h2 className="text-center mt-3">Add new book</h2>
        }
    }

    function saveOrUpdateButton() {
        if (id) {
            return <button type="button" className="btn btn-primary me-2" onClick={saveUpdateBook}>Update</button>
        } else {
            return <button type="button" className="btn btn-primary me-2" onClick={saveUpdateBook}>Save</button>
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="card col-md-8">
                    {
                        pageTitle()
                    }
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-3">
                                <label className="form-label font-weight-bold">Book name:</label>
                                <input
                                    type="text"
                                    placeholder="Enter book name"
                                    name="bookName"
                                    value={bookName}
                                    className={`form-control ${ errors.bookName ? 'is-invalid': '' } `}
                                    onChange={(e) => setBookName(e.target.value)}
                                >
                                </input>
                                { errors.bookName && <div className="invalid-feedback">{ errors.bookName }</div> }
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
                                    value={bookUnit}
                                    className={`form-control ${ errors.bookUnit ? 'is-invalid': '' } `}
                                    onChange={(e) => setBookUnit(e.target.value)}
                                >
                                </input>
                                { errors.bookUnit && <div className="invalid-feedback">{ errors.bookUnit }</div> }
                            </div>

                            <div className="form-group mb-4">
                                <label className="form-label font-weight-bold">Book grade:</label>
                                <input
                                    type="number"
                                    placeholder="Enter book grade"
                                    name="bookGrade"
                                    className={`form-control ${ errors.bookGrade ? 'is-invalid': '' } `}
                                    value={bookGrade}
                                    onChange={(e) => setBookGrade(e.target.value)}
                                >
                                </input>
                                { errors.bookGrade && <div className="invalid-feedback">{ errors.bookGrade }</div> }
                            </div>

                            <div className="text-center">
                                {
                                    saveOrUpdateButton()
                                }
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
