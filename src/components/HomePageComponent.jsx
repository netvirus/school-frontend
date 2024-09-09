import { useNavigate } from "react-router-dom";

const HomePageComponent = () => {

    const navigator = useNavigate();

    function listStudents() {
        navigator("/students");
    }
    function listTeachers() {
        navigator("/teachers");
    }

    function listBooks() {
        navigator("/books");
    }

    return (
        <div className="container mt-5">
            <div className="text-center">
                <button type="button" className="btn btn-primary me-2" onClick={listStudents}>List of Students</button>
                <button type="button" className="btn btn-primary me-2" onClick={listTeachers}>List of Teachers</button>
                <button type="button" className="btn btn-primary me-2" onClick={listBooks}>List of Books</button>
            </div>
        </div>
    );
}
export default HomePageComponent;
