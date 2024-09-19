import { useEffect, useState } from 'react';
import { addPriceService, getPriceByIdService, updatePriceService } from "../../servicea/PricesService.js";
import { useNavigate, useParams } from "react-router-dom";

const AddPriceComponent = () => {
    const [priceYear, setPriceYear] = useState(2024);
    const [priceDescription, setPriceDescription] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    const [errors, setErrors] = useState({
        priceYear: ''
    });

    useEffect(() => {
        if (id) {
            getPriceByIdService(id).then((response) => {
                setPriceYear(response.data.priceYear);
                setPriceDescription(response.data.priceDescription);
            }).catch(error => {
                console.error(error);
            });
        }
    }, [id]);

    function saveOrUpdatePrice(e) {
        e.preventDefault();
        const _price = {priceYear: priceYear, priceDescription: priceDescription};
        console.log(_price);

        if (validateForm()) {
            if (id) {
                updatePriceService(id, _price).then(() => {
                    navigate("/prices", { state: { shouldReload: true } });
                }).catch(error => {
                    console.error(error);
                });
            } else {
                addPriceService(_price).then(() => {
                    navigate("/prices", { state: { shouldReload: true } });
                }).catch(error => {
                    console.error(error);
                });
            }
        }
    }

    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors };

        if (priceYear) {
            errorsCopy.priceYear = '';
        } else {
            errorsCopy.priceYear = 'Year is required';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="card col-md-8">
                    <h2 className="text-center mt-3">{id ? 'Update the price' : 'Add new price'}</h2>
                    <div className="card-body">
                        <form onSubmit={saveOrUpdatePrice}>
                            <div className="form-group mb-3">
                                <label className="form-label font-weight-bold">Enter year of the price:</label>
                                <input type="text" placeholder="year of the price" name="priceYear" value={priceYear} className={`form-control ${errors.priceYear ? 'is-invalid' : ''}`} onChange={(e) => setPriceYear(e.target.value)} />
                                {errors.priceYear && <div className="invalid-feedback">{errors.priceYear}</div>}
                            </div>

                            <div className="form-group mb-4">
                                <label className="form-label font-weight-bold">Description:</label>
                                <input type="text" placeholder="Any description" name="priceDescription" className="form-control" value={priceDescription || ""} onChange={(e) => setPriceDescription(e.target.value)} />
                                {errors.paymentItemPrice && <div className="invalid-feedback">{errors.paymentItemPrice}</div>}
                            </div>

                            <div className="text-center">
                                <button type="submit" className="btn btn-primary me-2">{id ? 'Update' : 'Save'}</button>
                                <button type="button" className="btn btn-secondary me-2" onClick={() => navigate('/prices')}>Back</button>
                                <button type="button" className="btn btn-primary me-2" onClick={() => navigate('/')}>Back to Home</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddPriceComponent;
