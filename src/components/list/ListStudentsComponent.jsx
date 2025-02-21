import { useEffect, useState } from "react";
import { getStudentList, deleteStudentService } from "../../services/StudentService.js";
import { useNavigate, useLocation } from "react-router-dom";

const ListStudentsComponent = () => {
    const [students, setStudents] = useState([]);
    const navigator = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.shouldReload) {
            fetchStudents();
        }
    }, [location.state]);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = () => {
        getStudentList().then((response) => {
            const sortedStudents = response.data.sort((a, b) => a.id - b.id);
            setStudents(sortedStudents);
        }).catch(error => {
            console.error(error);
        });
    };

    function addNewStudent() {
        navigator('/students/add-student');
    }

    function backToHome() {
        navigator('/');
    }

    function aboutStudent(id) {
        navigator(`/students/show-student/${id}`);
    }

    function editStudent(id) {
        // navigator(`/students/edit-student/${id}`);
    }

    function deleteStudent(id) {
        // if (id) {
        //     deleteStudentService(id).then((response) => {
        //         console.log(response.data);
        //         setStudents((prevStudents) => prevStudents.filter(student => student.id !== id));
        //     }).catch(error => {
        //         console.error(error);
        //     });
        // }
    }

    // Функция для рендеринга иконок вместо True/False
    const renderBooleanIcon = (value) => (
        <i className={`bi ${value ? "bi-check-circle-fill text-success" : "bi-x-circle-fill text-danger"}`}
           title={value ? "Yes" : "No"}></i>
    );

    return (
        <div className="container mt-1 d-flex flex-column align-items-center">
            <h2 className="text-center mb-4">
                List of Students
                <i
                    className="bi bi-info-circle custom-tooltip"
                    style={{ marginLeft: '10px', cursor: 'pointer', fontSize: '1.10rem' }}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="This is the list of all students in the school"
                ></i>
            </h2>

            <div className="mb-3">
                <button type="button" className="btn btn-primary" onClick={addNewStudent}>Add Student</button>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-bordered text-center">
                    <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Gender</th>
                        <th>Nationality</th>
                        <th>Contacts</th>
                        <th>Parents Contacts</th>
                        <th>Grade</th>
                        <th>Has Student Price</th>
                        <th>Has Discount</th>
                        <th>Payment State</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        students.map(student =>
                            <tr key={student.id}>
                                <td>
                                    {student.fullName}
                                </td>
                                <td>{student.gender}</td>
                                <td>{student.nationality}</td>
                                <td>{renderBooleanIcon(student.hasContact)}</td>
                                <td>{renderBooleanIcon(student.hasParentsContacts)}</td>
                                <td>{student.grade}</td>
                                <td>{renderBooleanIcon(student.hasStudentPrice)}</td>
                                <td>{renderBooleanIcon(student.hasDiscount)}</td>
                                <td>{renderBooleanIcon(student.paymentState)}</td>
                                <td>
                                    <button className="btn btn-outline-primary btn-sm ms-2 me-2"
                                            onClick={() => aboutStudent(student.id)}
                                            title="View student details">
                                        <i className="bi bi-person-lines-fill"></i>
                                    </button>
                                    <button className="btn btn-outline-secondary btn-sm me-2"
                                            onClick={() => editStudent(student.id)}
                                            title="Edit student">
                                        <i className="bi bi-pencil"></i>
                                    </button>
                                    <button className="btn btn-outline-danger btn-sm"
                                            onClick={() => deleteStudent(student.id)}
                                            title="Delete student">
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </td>
                            </tr>)
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

export default ListStudentsComponent;
