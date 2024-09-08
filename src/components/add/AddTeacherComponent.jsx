import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import {addTeacherService, getTeacherByIdService, updateTeacherService} from "../../servicea/TeacherService.js";

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

    const {id} = useParams();

    // Проверка формы
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        age: '',
        gender: '',
        nationality: '',
        phoneNumber: '',
        address: '',
        subject: '',
        grade: ''
    })

    const navigator = useNavigate();

    useEffect(() => {
        if (id) {
            getTeacherByIdService(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setAge(response.data.age);
                setGender(response.data.gender);
                setNationality(response.data.nationality);
                setPhoneNumber(response.data.phoneNumber);
                setAddress(response.data.address);
                setSubject(response.data.subject);
                setGrade(response.data.grade);
            }).catch(error => {
                console.error(error);
            })
        }
    }, [id])

    function saveOrUpdateTeacher(e) {
        e.preventDefault();

        const _teacher = {
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
        console.log(_teacher);

        if (validateForm()) {

            if (id) {
                updateTeacherService(id, _teacher).then((response) => {
                    console.log(response.data);
                    navigator("/api/teachers");
                }).catch(error => {
                    console.error(error);
                })
            } else {
                addTeacherService(_teacher).then((response) => {
                    console.log(response.data);
                    navigator("/api/teachers");
                }).catch(error => {
                    console.error(error);
                });
            }
        }
    }

    // Валидация полей
    function validateForm() {
        let valid = true;

        const errorsCopy = {... errors}

        if (firstName.trim()) {
            errorsCopy.firstName = '';
        } else {
            errorsCopy.firstName = 'First name is required';
            valid = false;
        }

        if (lastName.trim()) {
            errorsCopy.lastName = '';
        } else {
            errorsCopy.lastName = 'Last name is required';
            valid = false;
        }

        if (age) {
            errorsCopy.age = '';
        } else {
            errorsCopy.age = 'Age number is required';
            valid = false;
        }

        if (gender.trim()) {
            errorsCopy.gender = '';
        } else {
            errorsCopy.gender = 'Gender is required';
            valid = false;
        }

        if (nationality.trim()) {
            errorsCopy.nationality = '';
        } else {
            errorsCopy.nationality = 'Nationality is required';
            valid = false;
        }

        if (phoneNumber.trim()) {
            errorsCopy.phoneNumber = '';
        } else {
            errorsCopy.phoneNumber = 'PhoneNumber is required';
            valid = false;
        }

        if (address.trim()) {
            errorsCopy.address = '';
        } else {
            errorsCopy.address = 'Address is required';
            valid = false;
        }

        if (subject.trim()) {
            errorsCopy.subject = '';
        } else {
            errorsCopy.subject = 'Subject is required';
            valid = false;
        }

        if (grade.trim()) {
            errorsCopy.grade = '';
        } else {
            errorsCopy.grade = 'Grade is required';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    function backToList() {
        navigator("/api/teachers");
    }

    function backToHome() {
        navigator("/");
    }

    function pageTitle() {
        if (id) {
            return <h2 className="text-center mt-3">Update the Teacher</h2>
        } else {
            return <h2 className="text-center mt-3">Add new Teacher</h2>
        }
    }

    function saveOrUpdateButton() {
        if (id) {
            return <button type="button" className="btn btn-primary me-2" onClick={saveOrUpdateTeacher}>Update</button>
        } else {
            return <button type="button" className="btn btn-primary me-2" onClick={saveOrUpdateTeacher}>Save</button>
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="card col-md-8">
                    {
                        pageTitle()
                    }
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-3">
                                <label className="form-label font-weight-bold">First name:</label>
                                <input
                                    type="text"
                                    placeholder="First name"
                                    name="firstName"
                                    className={`form-control ${ errors.bookName ? 'is-invalid': '' } `}
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                { errors.firstName && <div className="invalid-feedback">{ errors.ferstName }</div> }
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
                                    value={grade}
                                    onChange={(e) => setGrade(e.target.value)}
                                />
                            </div>

                            <div className="text-center">
                                {
                                    saveOrUpdateButton()
                                }
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
