import { useEffect, useState } from "react";
import { deletePaymentItemService, listPaymentItems } from "../../servicea/PaymentItemService.js";
import { useNavigate } from "react-router-dom";

const ListPaymentItemComponent = () => {
    const [paymentItems, setPaymentItems] = useState([]);

    const fetchPaymentItems = () => {
        listPaymentItems().then((response) => {
            const sortedPaymentItems = response.data.sort((a, b) => a.id - b.id);
            setPaymentItems(sortedPaymentItems);
        }).catch(error => {
            console.error(error);
        });
    };

    useEffect(() => {
        fetchPaymentItems();
    }, []);

    const navigator = useNavigate();

    function addNewPaymentItem() {
        navigator('/payment-items/add-item');
    }

    function editPaymentItem(id) {
        navigator(`/payment-items/edit-item/${id}`);
    }

    function deletePaymentItem(id) {
        if (id) {
            deletePaymentItemService(id).then((response) => {
                console.log(response.data);
                setPaymentItems((prevItems) => prevItems.filter(item => item.id !== id));
            }).catch(error => {
                console.error(error);
            });
        }
    }

    function backToHome() {
        navigator('/');
    }

    return (
        <div className="container d-flex flex-column align-items-center">
            <h2 className="text-center mb-4">
                List of Payment Items
                <i
                    className="bi bi-info-circle custom-tooltip"
                    style={{marginLeft: '10px', cursor: 'pointer', fontSize: '1.10rem'}}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="This is the list of all available payment items"
                ></i>
            </h2>

            <div className="mb-3">
                <button type="button" className="btn btn-primary" onClick={addNewPaymentItem}>Add payment item</button>
            </div>

            <div className="table-responsive w-100">
                <table className="table table-striped table-bordered text-center">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        paymentItems.map(item =>
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary me-2"
                                        onClick={() => editPaymentItem(item.id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger"
                                        onClick={() => deletePaymentItem(item.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>

            <div className="mt-3">
                <button type="button" className="btn btn-primary" onClick={backToHome}>Back to Home</button>
            </div>
        </div>
    );
};

export default ListPaymentItemComponent;
