import { useEffect, useState } from 'react';
import { addBookService, getBookByIdService, updateBookService } from "../../services/PaymentService.js";
import { useNavigate, useParams } from "react-router-dom";

const AddPaymentComponent = () => {

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

    function saveOrUpdatePayment(e) {
        e.preventDefault();
        const _book = {name: bookName, color: isColor, unit: bookUnit, grade: bookGrade};
        console.log(_book);

        if (validateForm()) {
            if (id) {
                updateBookService(id, _book).then((response) => {
                    console.log(response.data);
                }).catch(error => {
                    console.error(error);
                })
            } else {
                addBookService(_book).then((response) => {
                    console.log(response.data);
                }).catch(error => {
                    console.error(error);
                });
            }
            navigator("/books");
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

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="card col-md-8">
                    <h2 className="text-center mt-3">{id ? 'Update payment' : 'Add new payment'}</h2>
                    <div className="card-body">
                        <form onSubmit={ saveOrUpdatePayment }>
                            <div className="form-group mb-3">
                                <label className="form-label font-weight-bold">Book name:</label>
                                <input type="text" placeholder="Enter book name" name="bookName" value={bookName} className={`form-control ${errors.bookName ? 'is-invalid' : ''} `} onChange={(e) => setBookName(e.target.value)} />
                                {errors.bookName && <div className="invalid-feedback">{errors.bookName}</div>}
                            </div>

                            <div className="form-group mb-3">
                                <label className="form-label font-weight-bold">Is book color (Yes/No)?</label>
                                <div className="btn-group mt-2 d-flex" role="group"
                                     aria-label="Basic radio toggle button group">
                                    <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" value="Yes" defaultChecked onChange={(e) => setColor(e.target.value)}/>
                                    <label className="btn btn-outline-primary" htmlFor="btnradio1">Yes</label>
                                    <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" value="No" onChange={(e) => setColor(e.target.value)}/>
                                    <label className="btn btn-outline-primary" htmlFor="btnradio2">No</label>
                                </div>
                            </div>

                            <div className="form-group mb-3">
                                <label className="form-label font-weight-bold">Book unit:</label>
                                <input type="number" placeholder="Enter book unit" name="bookUnit" value={bookUnit} className={`form-control ${errors.bookUnit ? 'is-invalid' : ''} `} onChange={(e) => setBookUnit(e.target.value)} />
                                {errors.bookUnit && <div className="invalid-feedback">{errors.bookUnit}</div>}
                            </div>

                            <div className="form-group mb-4">
                                <label className="form-label font-weight-bold">Book grade:</label>
                                <input type="number" placeholder="Enter book grade" name="bookGrade" className={`form-control ${errors.bookGrade ? 'is-invalid' : ''} `} value={bookGrade} onChange={(e) => setBookGrade(e.target.value)} />
                                {errors.bookGrade && <div className="invalid-feedback">{errors.bookGrade}</div>}
                            </div>

                            <div className="text-center">
                                <button type="submit" className="btn btn-primary me-2">{id ? 'Update' : 'Save'}</button>
                                <button type="button" className="btn btn-secondary me-2" onClick={() => navigator('/books')}>Back</button>
                                <button type="button" className="btn btn-primary me-2" onClick={() => navigator('/')}>Back to Home</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddPaymentComponent;
