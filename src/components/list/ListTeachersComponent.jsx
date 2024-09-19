import { useEffect, useState } from "react";
import { listTeachers, deleteTeacherService } from "../../servicea/TeacherService.js";
import { useNavigate, useLocation } from "react-router-dom";

const ListTeachersComponent = () => {

    const [teachers, setTeachers] = useState([]);
    const navigator = useNavigate();
    const location = useLocation();

    // Функция для загрузки списка учителей
    const loadTeachers = () => {
        listTeachers().then((response) => {
            const sortedTeachers = response.data.sort((a, b) => a.id - b.id);
            setTeachers(sortedTeachers);
        }).catch(error => {
            console.error(error);
        });
    };

    useEffect(() => {
        // Загружаем список учителей при первой загрузке компонента или при возвращении с флагом shouldReload
        if (!location.state || location.state.shouldReload) {
            loadTeachers();
        }
    }, [location]);

    function addNewTeacher() {
        navigator('/teachers/add-teacher');
    }

    function backToHome() {
        navigator('/');
    }

    function editTeacher(id) {
        navigator(`/teachers/edit-teacher/${id}`);
    }

    function deleteTeacher(id) {
        if (id) {
            deleteTeacherService(id).then(() => {
                setTeachers((prevTeacher) => prevTeacher.filter(teacher => teacher.id !== id));
            }).catch(error => {
                console.error(error);
            });
        }
    }

    return (
        <div className="container mt-1 d-flex flex-column align-items-center">
            <h2 className="text-center mb-4">
                List of Teachers
                <i
                    className="bi bi-info-circle custom-tooltip"
                    style={{ marginLeft: '10px', cursor: 'pointer', fontSize: '1.10rem' }}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="This is the list of all teachers in the school"
                ></i>
            </h2>

            <div className="mb-3">
                <button type="button" className="btn btn-primary" onClick={addNewTeacher}>Add Teacher</button>
            </div>

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
                        <th>Subject</th>
                        <th>Grade</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        teachers.map(teacher => (
                            <tr key={teacher.id}>
                                <td>{teacher.firstName}</td>
                                <td>{teacher.lastName}</td>
                                <td>{teacher.age}</td>
                                <td>{teacher.gender}</td>
                                <td>{teacher.nationality}</td>
                                <td>{teacher.phoneNumber}</td>
                                <td>{teacher.address}</td>
                                <td>{teacher.subject}</td>
                                <td>{teacher.grade}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary me-2"
                                        onClick={() => editTeacher(teacher.id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger"
                                        onClick={() => deleteTeacher(teacher.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>

            <div className="mt-3">
                <button type="button" className="btn btn-primary" onClick={backToHome}>Back to Home</button>
            </div>
        </div>
    );
};

export default ListTeachersComponent;
