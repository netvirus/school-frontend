import { useNavigate } from "react-router-dom";

const HomePageComponent = () => {

    const navigator = useNavigate();

    return (
        <div className="container mt-5">
            <div className="text-center">
                <button type="button" className="btn btn-primary me-2" onClick={() => navigator("/personal-prices")}>List of Prices</button>
                <button type="button" className="btn btn-primary me-2" onClick={() => navigator("/services-list")}>List Services Items</button>
                <button type="button" className="btn btn-primary me-2" onClick={() => navigator("/students")}>List of Students</button>
                <button type="button" className="btn btn-primary me-2" onClick={() => navigator("/teachers")}>List of Teachers</button>
                <button type="button" className="btn btn-primary me-2" onClick={() => navigator("/books")}>List of Books</button>
            </div>
        </div>
    );
}
export default HomePageComponent;
