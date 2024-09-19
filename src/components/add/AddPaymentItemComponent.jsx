import { useEffect, useState } from 'react';
import { addPaymentItemService, getPaymentItemByIdService, updatePaymentItemService } from "../../servicea/PaymentItemService.js";
import { useNavigate, useParams } from "react-router-dom";

const AddPaymentItemComponent = () => {

    const [paymentItemName, setPaymentItemName] = useState('');

    const { id } = useParams();

    const [errors, setErrors] = useState({
        paymentItemName: ''
    });

    const navigator = useNavigate();

    useEffect(() => {
        if (id) {
            getPaymentItemByIdService(id).then((response) => {
                setPaymentItemName(response.data.name);
            }).catch(error => {
                console.error(error);
            });
        }
    }, [id]);

    function saveOrUpdatePaymentItem(e) {
        e.preventDefault();
        const _paymentItemName = { name: paymentItemName };
        console.log(_paymentItemName);

        if (validateForm()) {
            if (id) {
                updatePaymentItemService(id, _paymentItemName).then((response) => {
                    console.log(response.data);
                    navigator("/payment-items", { state: { shouldReload: true } });
                }).catch(error => {
                    console.error(error);
                });
            } else {
                addPaymentItemService(_paymentItemName).then((response) => {
                    console.log(response.data);
                    navigator("/payment-items", { state: { shouldReload: true } });
                }).catch(error => {
                    console.error(error);
                });
            }
        }
    }

    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors };

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
        return id ? <h2 className="text-center mt-3">Update the payment item</h2> : <h2 className="text-center mt-3">Add new payment item</h2>;
    }

    function saveOrUpdateButton() {
        return id ? <button type="button" className="btn btn-primary me-2" onClick={saveOrUpdatePaymentItem}>Update</button>
            : <button type="button" className="btn btn-primary me-2" onClick={saveOrUpdatePaymentItem}>Save</button>;
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="card col-md-8">
                    {pageTitle()}
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-3">
                                <label className="form-label font-weight-bold">Payment item name:</label>
                                <input
                                    type="text"
                                    placeholder="Enter payment item name"
                                    name="paymentItemName"
                                    value={paymentItemName}
                                    className={`form-control ${errors.paymentItemName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setPaymentItemName(e.target.value)}
                                />
                                {errors.paymentItemName && <div className="invalid-feedback">{errors.paymentItemName}</div>}
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

export default AddPaymentItemComponent;
