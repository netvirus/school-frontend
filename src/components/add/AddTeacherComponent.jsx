import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {addTeacherService} from "../../servicea/TeacherService.js";

const AddTeacherComponent = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState('');
    const [nationality, setNationality] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [subject, setSubject] = useState('');
    const [grade, setGrade] = useState('');

    const navigator = useNavigate();

    function saveTeacher(e) {
        e.preventDefault();

        const newTeacher = {
            firstName: firstName,
            lastName: lastName,
            age: age,
            gender: gender,
            nationality: nationality,
            phoneNumber: phoneNumber,
            address: address,
            subject: subject,
            grade: grade
        };
        console.log(newTeacher);
        addTeacherService(newTeacher).then((response) => {
            console.log(response.data);
            navigator("/api/teachers");
        });
    }

    function backToList() {
        navigator("/api/teachers");
    }

    function backToHome() {
        navigator("/");
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="card col-md-8">
                    <h2 className="text-center mt-3">Add new teacher</h2>
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-3">
                                <label className="form-label font-weight-bold">First name:</label>
                                <input
                                    type="text"
                                    placeholder="First name"
                                    name="bookName"
                                    className="form-control"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label className="form-label font-weight-bold">Last name:</label>
                                <input
                                    type="text"
                                    placeholder="Last name"
                                    name="lastName"
                                    className="form-control"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label className="form-label font-weight-bold">Age:</label>
                                <input
                                    type="number"
                                    placeholder="age"
                                    name="age"
                                    className="form-control"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label className="form-label font-weight-bold">Gender</label>
                                <div className="btn-group mt-2 d-flex" role="group"
                                     aria-label="Basic radio toggle button group">
                                    <input
                                        type="radio"
                                        className="btn-check"
                                        name="btnradio"
                                        id="btnradio1"
                                        autoComplete="off"
                                        value="Male"
                                        defaultChecked
                                        onChange={(e) => setGender(e.target.value)}
                                    />
                                    <label className="btn btn-outline-primary" htmlFor="btnradio1">Male</label>
                                    <input
                                        type="radio"
                                        className="btn-check"
                                        name="btnradio"
                                        id="btnradio2"
                                        autoComplete="off"
                                        value="Female"
                                        onChange={(e) => setGender(e.target.value)}
                                    />
                                    <label className="btn btn-outline-primary" htmlFor="btnradio2">Female</label>
                                </div>
                            </div>

                            <div className="form-group mb-4">
                                <label className="form-label font-weight-bold">Nationality:</label>
                                <input
                                    type="text"
                                    placeholder="Enter nationality"
                                    name="nationality"
                                    className="form-control"
                                    value={nationality}
                                    onChange={(e) => setNationality(e.target.value)}
                                />
                            </div>

                            <div className="form-group mb-4">
                                <label className="form-label font-weight-bold">Phone number:</label>
                                <input
                                    type="text"
                                    placeholder="Enter phone number"
                                    name="phoneNumber"
                                    className="form-control"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </div>

                            <div className="form-group mb-4">
                                <label className="form-label font-weight-bold">Address:</label>
                                <input
                                    type="text"
                                    placeholder="Enter an address"
                                    name="address"
                                    className="form-control"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>

                            <div className="form-group mb-4">
                                <label className="form-label font-weight-bold">Subject:</label>
                                <input
                                    type="text"
                                    placeholder="Enter subject"
                                    name="subject"
                                    className="form-control"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                />
                            </div>

                            <div className="form-group mb-4">
                                <label className="form-label font-weight-bold">Grade:</label>
                                <input
                                    type="text"
                                    placeholder="Enter grade"
                                    name="grade"
                                    className="form-control"
                                    value={address}
                                    onChange={(e) => setGrade(e.target.value)}
                                />
                            </div>

                            <div className="text-center">
                                <button type="button" className="btn btn-primary me-2" onClick={saveTeacher}>Save
                                </button>
                                <button type="button" className="btn btn-primary me-2" onClick={backToList}>Back
                                </button>
                                <button type="button" className="btn btn-primary me-2" onClick={backToHome}>Back to
                                    Home
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddTeacherComponent;
