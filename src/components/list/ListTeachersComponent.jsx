import React, { useEffect, useState } from "react";
import { listTeachers } from "../../servicea/TeacherService.js";
import { useNavigate } from "react-router-dom";

const ListTeachersComponent = () => {

    const [teachers, setTeachers] = useState([])

    useEffect(() => {
        listTeachers().then((response) => {
            setTeachers(response.data);
        }).catch(error => {
            console.error(error);
        })

    }, [])

    const navigator = useNavigate();

    function addNewTeacher() {
        navigator('/api/teachers/add-teacher');
    }

    function backToHome() {
        navigator('/');
    }

    return (
        <div className="container mt-5 d-flex flex-column align-items-center">
            <h2 className="text-center mb-4">List of Teachers</h2>

            <div className="mb-3">
                <button type="button" className="btn btn-primary" onClick={addNewTeacher}>Add Teacher</button>
            </div>

            <div className="table-responsive w-100">
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
                        <th>Subject</th>
                        <th>Grade</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        teachers.map(teacher =>
                            <tr key={teacher.id}>
                                <td>{teacher.id}</td>
                                <td>{teacher.firstName}</td>
                                <td>{teacher.lastName}</td>
                                <td>{teacher.age}</td>
                                <td>{teacher.gender}</td>
                                <td>{teacher.nationality}</td>
                                <td>{teacher.phoneNumber}</td>
                                <td>{teacher.address}</td>
                                <td>{teacher.subject}</td>
                                <td>{teacher.grade}</td>
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

export default ListTeachersComponent;
