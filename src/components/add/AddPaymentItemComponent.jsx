import { useEffect, useState } from 'react';
import { addPaymentItemService, getPaymentItemByIdService, updatePaymentItemService } from "../../servicea/PaymentItemService.js";
import { useNavigate, useParams } from "react-router-dom";

const AddPaymentItemComponent = () => {

    const [paymentItemName, setPaymentItemName] = useState('');

    const {id} = useParams();

    // Проверка формы
    const [errors, setErrors] = useState({
        paymentItemName: ''
    })

    const navigator = useNavigate();

    useEffect(() => {
        if (id) {
            getPaymentItemByIdService(id).then((response) => {
                setPaymentItemName(response.data.name);
            }).catch(error => {
                console.error(error);
            })
        }
    }, [id])

    function saveOrUpdatePaymentItem(e) {
        e.preventDefault();
        const _paymentItemName = {name: paymentItemName};
        console.log(_paymentItemName);

        if (validateForm()) {
            if (id) {
                updatePaymentItemService(id, _paymentItemName).then((response) => {
                    console.log(response.data);
                }).catch(error => {
                    console.error(error);
                })
            } else {
                addPaymentItemService(_paymentItemName).then((response) => {
                    console.log(response.data);
                }).catch(error => {
                    console.error(error);
                });
            }
            navigator("/payment-items");
        }
    }

// Валидация полей
    function validateForm() {
        let valid = true;

        const errorsCopy = {... errors}

        if (paymentItemName.trim()) {
            errorsCopy.paymentItemName = '';
        } else {
            errorsCopy.paymentItemName = 'Payment item name is required';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    function backToList() {
        navigator("/payment-items");
    }

    function backToHome() {
        navigator("/");
    }

    function pageTitle() {
        if (id) {
            return <h2 className="text-center mt-3">Update the payment item</h2>
        } else {
            return <h2 className="text-center mt-3">Add new payment item</h2>
        }
    }

    function saveOrUpdateButton() {
        if (id) {
            return <button type="button" className="btn btn-primary me-2" onClick={saveOrUpdatePaymentItem}>Update</button>
        } else {
            return <button type="button" className="btn btn-primary me-2" onClick={saveOrUpdatePaymentItem}>Save</button>
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
                                <label className="form-label font-weight-bold">Payment item name:</label>
                                <input
                                    type="text"
                                    placeholder="Enter payment item name"
                                    name="paymentItemName"
                                    value={paymentItemName}
                                    className={`form-control ${ errors.paymentItemName ? 'is-invalid': '' } `}
                                    onChange={(e) => setPaymentItemName(e.target.value)}
                                >
                                </input>
                                { errors.paymentItemName && <div className="invalid-feedback">{ errors.paymentItemName }</div> }
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

export default AddPaymentItemComponent;
