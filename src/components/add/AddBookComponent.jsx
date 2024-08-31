import React, {useState} from 'react';

const AddBookComponent = () => {

    const [bookName, setBookName] = useState('')
    const [bookUnit, setBookUnit] = useState()
    const [bookGrade, setBookGrade] = useState()

    function handleBookName(e) {
        setBookName(e.target.value);
    }

    function handleBookUnit(e) {
        setBookUnit(e.target.value);
    }

    function handleBookGrade(e) {
        setBookGrade(e.target.value);
    }

    function saveBook(e) {
        e.preventDefault();

        const newBook = {
            name: bookName,
            unit: bookUnit,
            grade: bookGrade
        }
        console.log(newBook);
    }

    return (
        <div className="container">
            < br />< br />
            <dev className="row">
                <div className="card col-md-10 offset-md-3 offset-md-3">
                    <h2 className="text-center">Add new book</h2>
                    <div className="card-body">
                        <form>
                            <div className="form-check mb-2">
                                <label className="form-label">Book name:</label>
                                <input
                                    type="text"
                                    placeholder="Enter book name"
                                    name="bookName"
                                    className="form-control"
                                    value={bookName}
                                    onChange={handleBookName}
                                >
                                </input>

                                <label className="form-label">Book unit:</label>
                                <input
                                    type="number"
                                    placeholder="Enter book unit"
                                    name="bookUnit"
                                    className="form-control"
                                    value={bookUnit}
                                    onChange={handleBookUnit}
                                >
                                </input>

                                <label className="form-label">Book grade:</label>
                                <input
                                    type="number"
                                    placeholder="Enter book grade"
                                    name="bookGrade"
                                    className="form-control"
                                    value={bookGrade}
                                    onChange={handleBookGrade}
                                >
                                </input>
                            </div>
                            <button className="btn btn-success" onClick={saveBook}>Save</button>
                        </form>
                    </div>
                </div>
            </dev>

        </div>
    );
}
export default AddBookComponent;