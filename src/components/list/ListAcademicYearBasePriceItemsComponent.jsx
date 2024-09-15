import { useEffect, useState } from "react";
import { deleteAcademicYearBasePriceService, listAcademicYearBasePrices } from "../../servicea/AcademicYearBasePriceItemService.js";
import { listPaymentItems } from "../../servicea/PaymentItemService.js";
import {useLocation, useNavigate} from "react-router-dom";

const ListAcademicYearBasePriceItemsComponent = () => {

    const [basePrice, setBasePrice] = useState([]);
    const [paymentItems, setPaymentItems] = useState([]); // Состояние для платёжных элементов
    const navigator = useNavigate();
    const location = useLocation();

    const loadData = () => {
        listAcademicYearBasePrices().then((response) => {
            const sortedBasePrices = response.data.sort((a, b) => a.id - b.id);
            setBasePrice(sortedBasePrices);
        }).catch(error => {
            console.error(error);
        });

        listPaymentItems().then((response) => {
            setPaymentItems(response.data);
        }).catch(error => {
            console.error(error);
        });
    };

    useEffect(() => {
        if (location.state && location.state.shouldReload) {
            loadData();
        } else {
            loadData();
        }
    }, [location.state]);

    function addNewBasePriceitem() {
        navigator('/academic-year-base-prices/add-item');
    }

    function editBasePriceitem(id) {
        navigator(`/academic-year-base-prices/edit-item/${id}`);
    }

    function deleteBasePriceitem(id) {
        if (id) {
            deleteAcademicYearBasePriceService(id).then((response) => {
                console.log(response.data);
                setBasePrice((prevPrice) => prevPrice.filter(item => item.id !== id));
            }).catch(error => {
                console.error(error);
            })
        }
    }

    // Функция для получения имени платёжного элемента по его ID
    function getPaymentItemName(paymentItemId) {
        const paymentItem = paymentItems.find(item => item.id === paymentItemId);
        return paymentItem ? paymentItem.name : "Unknown";
    }

    function backToHome() {
        navigator('/');
    }

    return (
        <div className="container d-flex flex-column align-items-center">
            <h2 className="text-center mb-4">
                List of Base price items
                <i
                    className="bi bi-info-circle custom-tooltip"
                    style={{marginLeft: '10px', cursor: 'pointer', fontSize: '1.10rem'}}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="This is the list of all available base price items"
                ></i>
            </h2>

            <div className="mb-3">
                <button type="button" className="btn btn-primary" onClick={addNewBasePriceitem}>Add Item</button>
            </div>

            <div className="table-responsive w-100">
                <table className="table table-striped table-bordered text-center">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Payment Item Name</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        basePrice.map(item =>
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{getPaymentItemName(item.paymentItemId)}</td>
                                <td>{item.paymentItemPrice}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary me-2"
                                        onClick={() => editBasePriceitem(item.id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger"
                                        onClick={() => deleteBasePriceitem(item.id)}
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
}

export default ListAcademicYearBasePriceItemsComponent;
