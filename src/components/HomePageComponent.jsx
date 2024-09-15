import { useNavigate } from "react-router-dom";

const HomePageComponent = () => {

    const navigator = useNavigate();

    function listPaymentItems() {
        navigator("/payment-items");
    }

    function listStudents() {
        navigator("/students");
    }
    function listTeachers() {
        navigator("/teachers");
    }

    function listBooks() {
        navigator("/books");
    }

    function finReport() {
        navigator("/reports/finance");
    }

    return (
        <div className="container mt-5">
            <div className="text-center">
                <button type="button" className="btn btn-primary me-2" onClick={listPaymentItems}>List payment items</button>
                <button type="button" className="btn btn-primary me-2" onClick={listStudents}>List of Students</button>
                <button type="button" className="btn btn-primary me-2" onClick={listTeachers}>List of Teachers</button>
                <button type="button" className="btn btn-primary me-2" onClick={listBooks}>List of Books</button>
                <button type="button" className="btn btn-primary me-2" onClick={finReport}>Financial report</button>
            </div>
        </div>
    );
}
export default HomePageComponent;
