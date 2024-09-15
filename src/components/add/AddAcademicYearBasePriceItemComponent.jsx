import { useEffect, useState } from 'react';
import { addAcademicYearBasePriceService, getAcademicYearBasePriceByIdService, updateAcademicYearBasePriceService } from "../../servicea/AcademicYearBasePriceItemService.js";
import { listPaymentItems } from "../../servicea/PaymentItemService.js";
import { useNavigate, useParams } from "react-router-dom";

const AddAcademicYearBasePriceItemComponent = () => {

    const [priceYear, setPriceYear] = useState(2024);
    const [paymentItemId, setPaymentItemId] = useState();
    const [paymentItemPrice, setPaymentItemPrice] = useState();
    const [paymentItems, setPaymentItems] = useState([]);

    const {id} = useParams();

    const [errors, setErrors] = useState({
        priceYear: '',
        paymentItemId: '',
        paymentItemPrice: ''
    });

    const navigator = useNavigate();

    useEffect(() => {
        if (id) {
            getAcademicYearBasePriceByIdService(id).then((response) => {
                setPriceYear(response.data.priceYear);
                setPaymentItemId(response.data.paymentItemId);
                setPaymentItemPrice(response.data.paymentItemPrice);
            }).catch(error => {
                console.error(error);
            });
        }

        // Получаем список платёжных элементов
        listPaymentItems().then((response) => {
            setPaymentItems(response.data);
        }).catch(error => {
            console.error(error);
        });

    }, [id]);

    function saveOrUpdateAcademicYearPersonalPrice(e) {
        e.preventDefault();
        const _personalPrice = {
            priceYear: priceYear,
            paymentItemId: paymentItemId,
            paymentItemPrice: paymentItemPrice
        };
        console.log(_personalPrice);

        if (validateForm()) {
            if (id) {
                updateAcademicYearBasePriceService(id, _personalPrice).then((response) => {
                    console.log(response.data);
                }).catch(error => {
                    console.error(error);
                });
            } else {
                addAcademicYearBasePriceService(_personalPrice).then((response) => {
                    console.log(response.data);
                }).catch(error => {
                    console.error(error);
                });
            }
            navigator("/academic-year-base-prices", { state: { shouldReload: true } });
        }
    }

    // Валидация полей
    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors };

        if (priceYear) {
            errorsCopy.priceYear = '';
        } else {
            errorsCopy.priceYear = 'Year is required';
            valid = false;
        }

        if (paymentItemId) {
            errorsCopy.paymentItemId = '';
        } else {
            errorsCopy.paymentItemId = 'Select payment item';
            valid = false;
        }

        if (paymentItemPrice) {
            errorsCopy.paymentItemPrice = '';
        } else {
            errorsCopy.paymentItemPrice = 'The price is required';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    function backToList() {
        navigator("/academic-year-base-prices");
    }

    function backToHome() {
        navigator("/");
    }

    function pageTitle() {
        if (id) {
            return <h2 className="text-center mt-3">Update the price item</h2>;
        } else {
            return <h2 className="text-center mt-3">Add new price item</h2>;
        }
    }

    function saveOrUpdateButton() {
        if (id) {
            return <button type="button" className="btn btn-primary me-2" onClick={saveOrUpdateAcademicYearPersonalPrice}>Update</button>;
        } else {
            return <button type="button" className="btn btn-primary me-2" onClick={saveOrUpdateAcademicYearPersonalPrice}>Save</button>;
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="card col-md-8">
                    {pageTitle()}
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-3">
                                <label className="form-label font-weight-bold">Enter Academic Year:</label>
                                <input
                                    type="text"
                                    placeholder="Enter Academic Year"
                                    name="priceYear"
                                    value={priceYear}
                                    className={`form-control ${errors.priceYear ? 'is-invalid' : ''}`}
                                    onChange={(e) => setPriceYear(e.target.value)}
                                />
                                {errors.priceYear && <div className="invalid-feedback">{errors.priceYear}</div>}
                            </div>

                            <div className="form-group mb-3">
                                <label className="form-label font-weight-bold">Select payment item:</label>
                                <select
                                    className={`form-control ${errors.paymentItemId ? 'is-invalid' : ''}`}
                                    value={paymentItemId || ""}
                                    onChange={(e) => setPaymentItemId(e.target.value)}  // Устанавливаем выбранный ID
                                >
                                    <option value="">Select payment item</option>
                                    {
                                        paymentItems.map((item) => (
                                            <option key={item.id} value={item.id}>{item.name}</option>
                                        ))
                                    }
                                </select>
                                {errors.paymentItemId && <div className="invalid-feedback">{errors.paymentItemId}</div>}
                            </div>

                            <div className="form-group mb-4">
                                <label className="form-label font-weight-bold">Item price:</label>
                                <input
                                    type="number"
                                    placeholder="Enter item price"
                                    name="paymentItemPrice"
                                    className={`form-control ${errors.paymentItemPrice ? 'is-invalid' : ''}`}
                                    value={paymentItemPrice || ""}
                                    onChange={(e) => setPaymentItemPrice(e.target.value)}
                                />
                                {errors.paymentItemPrice && <div className="invalid-feedback">{errors.paymentItemPrice}</div>}
                            </div>

                            <div className="text-center">
                                {saveOrUpdateButton()}
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

export default AddAcademicYearBasePriceItemComponent;
