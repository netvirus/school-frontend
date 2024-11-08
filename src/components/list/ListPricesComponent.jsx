import { useEffect, useState } from "react";
import { deletePriceService, listPrices } from "../../services/PricesService.js";
import { useNavigate, useLocation } from "react-router-dom";

const ListPricesComponent = () => {
    const [price, setPrice] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    const loadData = () => {
        listPrices().then((response) => {
            const sortedPrices = response.data.sort((a, b) => a.id - b.id);
            setPrice(sortedPrices);
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

    function addNewPrice() {
        navigate('/personal-prices/add');
    }

    function editPrice(id) {
        navigate(`/personal-prices/edit/${id}`);
    }

    function deletePrice(id) {
        if (id) {
            deletePriceService(id).then((response) => {
                console.log(response.data);
                setPrice((prevPrice) => prevPrice.filter(item => item.id !== id));
            }).catch(error => {
                console.error(error);
            });
        }
    }

    return (
        <div className="container d-flex flex-column align-items-center">
            <h2 className="text-center mb-4">
                List of Prices
                <i className="bi bi-info-circle custom-tooltip" style={{ marginLeft: '10px', cursor: 'pointer', fontSize: '1.10rem' }} data-bs-toggle="tooltip" data-bs-placement="top" title="This is the list of all available base price items" />
            </h2>

            <div className="mb-3">
                <button type="button" className="btn btn-primary" onClick={addNewPrice}>Add New Price</button>
            </div>

            <div className="table-responsive w-100">
                <table className="table table-striped table-bordered text-center">
                    <thead>
                    <tr>
                        <th>Owner of price</th>
                        <th>Name</th>
                        <th>Active</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {price.map(item => (
                        <tr key={item.id}>
                            <td>{item.ownerId}</td>
                            <td>{item.priceName}</td>
                            <td>{item.active ? 'active' : 'not active'}</td>
                            <td>
                                <button type="button" className="btn btn-primary me-2"
                                        onClick={() => navigate('/base-prices')}>List of Base price items
                                </button>
                                <button type="button" className="btn btn-outline-secondary me-2"
                                        onClick={() => editPrice(item.id)}>Edit
                                </button>
                                <button type="button" className="btn btn-outline-danger"
                                        onClick={() => deletePrice(item.id)}>Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-3">
                <button type="button" className="btn btn-primary me-2" onClick={() => navigate('/')}>Back to Home</button>
            </div>
        </div>
    );
}

export default ListPricesComponent;
