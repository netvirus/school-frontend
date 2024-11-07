import { useEffect, useState } from "react";
import { deletePaymentItemService, listPaymentItems } from "../../services/ServicesItemListService.js";
import { useNavigate } from "react-router-dom";

const ListServicesItemComponent = () => {
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
        navigator('/services-list/add-item');
    }

    function editPaymentItem(id) {
        navigator(`/services-list/edit-item/${id}`);
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

    return (
        <div className="container d-flex flex-column align-items-center">
            <h2 className="text-center mb-4">
                List Services Items
                <i className="bi bi-info-circle custom-tooltip" style={{marginLeft: '10px', cursor: 'pointer', fontSize: '1.10rem'}} data-bs-toggle="tooltip" data-bs-placement="top" title="This is the list of all available payment items" />
            </h2>

            <div className="mb-3">
                <button type="button" className="btn btn-primary" onClick={ addNewPaymentItem }>Add Service Item</button>
            </div>

            <div className="table-responsive w-100">
                <table className="table table-striped table-bordered text-center">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        paymentItems.map(item =>
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>
                                    <button type="button" className="btn btn-outline-secondary me-2" onClick={() => editPaymentItem(item.id)}>Edit</button>
                                    <button type="button" className="btn btn-outline-danger" onClick={() => deletePaymentItem(item.id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>

            <div className="mt-3">
                <button type="button" className="btn btn-primary me-2" onClick={() => navigator('/')}>Back to Home</button>
            </div>
        </div>
    );
};

export default ListServicesItemComponent;
