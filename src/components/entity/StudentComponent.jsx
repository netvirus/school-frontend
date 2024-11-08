import {useEffect, useState} from "react";
import {getStudentByIdService} from "../../services/StudentService.js";
import {useNavigate, useParams} from "react-router-dom";

const StudentComponent = () => {

    const { id } = useParams();
    const [student, setStudent] = useState([])
    const navigator = useNavigate();

    useEffect(() => {
        if (id) {
            getStudentByIdService(id).then((response) => {
                setStudent(response.data);
            }).catch(error => {
                console.error(error);
            });
        }
    }, [id]);

    function addNewPrice() {
        navigator('/personal-prices/add');
    }

    function backToPage() {
        navigator('/students');
    }

    function editPrice(id) {
        navigator(`/personal-prices/edit/${id}`);
    }

    function deletePrice(id) {
        navigator(`/personal-prices/delete-price/${id}`);
    }

    return (
        <div className="container mt-1 d-flex flex-column align-items-center">
            <h2 className="text-center mb-4">About: {student.fullName}</h2>

            <div className="table-responsive">
                <table className="table table-striped table-bordered text-center">
                    <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Nationality</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th>Grade</th>
                        <th>Mother name</th>
                        <th>Father name</th>
                        <th>Mother's phone</th>
                        <th>Father's number</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        <tr key={student.id}>
                            <td>{student.firstName}</td>
                            <td>{student.lastName}</td>
                            <td>{student.age}</td>
                            <td>{student.gender}</td>
                            <td>{student.nationality}</td>
                            <td>{student.phoneNumber}</td>
                            <td>{student.address}</td>
                            <td>{student.grade}</td>
                            <td>{student.motherName}</td>
                            <td>{student.fatherName}</td>
                            <td>{student.motherPhoneNumber}</td>
                            <td>{student.fatherPhoneNumber}</td>
                            <td>
                                <button type="button" className="btn btn-outline-primary me-2"
                                        onClick={() => addNewPrice(student.id)}>Add price
                                </button>
                                <button type="button" className="btn btn-outline-secondary me-2"
                                        onClick={() => editPrice(student.id)}>Edit
                                </button>
                            </td>
                        </tr>
                    }
                    </tbody>
                </table>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-bordered text-center">
                    <thead>
                    <tr>
                        <th>Price name</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        student.studentPersonalPriceList?.map(price =>
                            <tr key={price.id}>
                                <td>{price.priceName}</td>
                                <td>{price.active ? 'Active' : 'Not Active'}</td>
                                <td>
                                    <button type="button" className="btn btn-outline-primary me-2"
                                            onClick={() => editPrice(price.id)}>Edit
                                    </button>
                                    <button type="button" className="btn btn-outline-danger me-2"
                                            onClick={() => deletePrice(price.id)}>Delete
                                    </button>
                                </td>
                            </tr>)
                    }
                    </tbody>
                </table>
            </div>

            <div className="mt-3">
                <button type="button" className="btn btn-primary" onClick={backToPage}>Back to Home</button>
            </div>
        </div>
    );
}
export default StudentComponent;
