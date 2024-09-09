import { useEffect, useState } from "react";
import { listStudents } from "../../servicea/StudentService.js";
import { useNavigate } from "react-router-dom";
import { deleteStudentService } from "../../servicea/StudentService.js";

const ListStudentsComponent = () => {

    const [students, setStudents] = useState([])

    useEffect(() => {
        listStudents().then((response) => {
            const sortedStudents = response.data.sort((a, b) => a.id - b.id);
            setStudents(sortedStudents);
        }).catch(error => {
            console.error(error);
        })

    }, [])

    const navigator = useNavigate();

    function addNewStudent() {
        navigator('/students/add-student');
    }

    function backToHome() {
        navigator('/');
    }

    function editStudent(id) {
        navigator(`/students/edit-student/${id}`);
    }

    function deleteStudent(id) {
        if (id) {
            deleteStudentService(id).then((response) => {
                console.log(response.data);
                setStudents((prevStudent) => prevStudent.filter(student => student.id !== id));
            }).catch(error => {
                console.error(error);
            })
        }
    }

    return (
        <div className="container mt-1 d-flex flex-column align-items-center">
            <h2 className="text-center mb-4">
                List of Students
                <i
                    className="bi bi-info-circle custom-tooltip"
                    style={{marginLeft: '10px', cursor: 'pointer', fontSize: '1.10rem'}}
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
                        <th>Id</th>
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
                        students.map(student =>
                            <tr key={student.id}>
                                <td>{student.id}</td>
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
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary me-2"
                                        onClick={() => editStudent(student.id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger"
                                        onClick={() => deleteStudent(student.id)}
                                    >
                                        Delete
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
    )
}

export default ListStudentsComponent;
