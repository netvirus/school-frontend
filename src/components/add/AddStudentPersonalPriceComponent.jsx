import { useEffect, useState } from 'react';
import { addPriceService, getPriceByIdService, updatePriceService } from "../../services/PricesService.js";
import { useNavigate, useParams } from "react-router-dom";

const AddStudentPersonalPriceComponent = () => {
    const [priceName, setPriceName] = useState();
    const [priceStatus, setPriceStatus] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            getPriceByIdService(id).then((response) => {
                setPriceName(response.data.priceName);

                setPriceStatus(!!response.data.active);
            }).catch(error => {
                console.error(error);
            });
        }
    }, [id]);

    const [errors, setErrors] = useState({
        priceName: ''
    })

    function saveOrUpdatePrice(e) {
        e.preventDefault();
        const _price = {priceName: priceName, priceStatus: priceStatus};
        console.log(_price);

        if (validateForm()) {
            if (id) {
                updatePriceService(id, _price).then(() => {
                    navigate("/personal-prices", { state: { shouldReload: true } });
                }).catch(error => {
                    console.error(error);
                });
            } else {
                addPriceService(_price).then(() => {
                    navigate("/personal-prices", { state: { shouldReload: true } });
                }).catch(error => {
                    console.error(error);
                });
            }
        }
    }

    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors };

        if (priceName) {
            errorsCopy.priceName = '';
        } else {
            errorsCopy.priceName = 'Name is required';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    function saveOrUpdateButton() {
        if (id) {
            return <button type="button" className="btn btn-primary me-2" onClick={saveOrUpdatePrice}>Update</button>
        } else {
            return <button type="button" className="btn btn-primary me-2" onClick={saveOrUpdatePrice}>Save</button>
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="card col-md-8">
                    <h2 className="text-center mt-3">{id ? 'Update the price' : 'Add new price'}</h2>
                    <div className="card-body">
                        <form onSubmit={saveOrUpdatePrice}>
                            <div className="form-group mb-3">
                                <label className="form-label font-weight-bold">Enter name of price:</label>
                                <input type="text" placeholder="Name of price" name="priceName" value={priceName || ""} className={`form-control ${errors.priceName ? 'is-invalid' : ''}`} onChange={(e) => setPriceName(e.target.value)} />
                                {errors.priceName && <div className="invalid-feedback">{errors.priceName}</div>}
                            </div>

                            <div className="form-group mb-3">
                                <label className="form-label font-weight-bold">Status</label>
                                <div className="btn-group mt-2 d-flex" role="group"
                                     aria-label="Basic radio toggle button group">
                                    <input type="radio" className="btn-check" name="btnradio" id="btnradio1"
                                           autoComplete="off" value="true" defaultChecked
                                           onChange={(e) => setPriceStatus(e.target.value)}/>
                                    <label className="btn btn-outline-primary" htmlFor="btnradio1">Active</label>
                                    <input type="radio" className="btn-check" name="btnradio" id="btnradio2"
                                           autoComplete="off" value="false"
                                           onChange={(e) => setPriceStatus(e.target.value)}/>
                                    <label className="btn btn-outline-primary" htmlFor="btnradio2">Not Active</label>
                                </div>
                            </div>

                            <div className="text-center">
                                {
                                    saveOrUpdateButton()
                                }
                                <button type="button" className="btn btn-secondary me-2"
                                        onClick={() => navigate('/personal-prices')}>Back
                                </button>
                                <button type="button" className="btn btn-primary me-2"
                                        onClick={() => navigate('/')}>Back to Home
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddStudentPersonalPriceComponent;
