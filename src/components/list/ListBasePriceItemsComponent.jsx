import { useEffect, useState } from "react";
import { deleteBasePriceService, listBasePrices } from "../../servicea/BasePriceItemService.js";
import { useNavigate } from "react-router-dom";

const ListBasePriceItemsComponent = () => {

    const [basePrice, setBasePrice] = useState([]);
    const navigator = useNavigate();

    const loadData = () => {
        listBasePrices().then((response) => {
            const sortedBasePrices = response.data.sort((a, b) => a.id - b.id);
            setBasePrice(sortedBasePrices);
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
        navigator('/base-prices/add-item');
    }

    function editBasePriceitem(id) {
        navigator(`/base-prices/edit-item/${id}`);
    }

    function deleteBasePriceitem(id) {
        if (id) {
            deleteBasePriceService(id).then((response) => {
                console.log(response.data);
                setBasePrice((prevPrice) => prevPrice.filter(item => item.id !== id));
            }).catch(error => {
                console.error(error);
            })
        }
    }

    function backToHome() {
        navigator('/');
    }

    return (
        <div className="container d-flex flex-column align-items-center">
            <h2 className="text-center mb-4">
                List of base price items
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
                        <th>Grade Name</th>
                        <th>Payment Item Name</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        basePrice.map(item =>
                            <tr key={item.id}>
                                <td>{item.gradeName}</td>
                                <td>{item.paymentItemName}</td>
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

export default ListBasePriceItemsComponent;
