import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { addTeacherService, getTeacherByIdService, updateTeacherService } from "../../services/TeacherService.js";

const AddTeacherComponent = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState();
    const [gender, setGender] = useState('Female');
    const [nationality, setNationality] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [subject, setSubject] = useState('');
    const [grade, setGrade] = useState('');

    const { id } = useParams();
    const navigator = useNavigate();

    // Стейт для ошибок
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
    });

    useEffect(() => {
        if (id) {
            getTeacherByIdService(id).then((response) => {
                const data = response.data;
                setFirstName(data.firstName);
                setLastName(data.lastName);
                setAge(data.age);
                setGender(data.gender);
                setNationality(data.nationality);
                setPhoneNumber(data.phoneNumber);
                setAddress(data.address);
                setSubject(data.subject);
                setGrade(data.grade);
            }).catch(error => {
                console.error(error);
            });
        }
    }, [id]);

    // Сохранение/обновление учителя
    const saveOrUpdateTeacher = (e) => {
        e.preventDefault();
        const teacherData = {
            firstName, lastName, age, gender,
            nationality, phoneNumber, address, subject, grade
        };

        if (validateForm()) {
            if (id) {
                updateTeacherService(id, teacherData).then(() => {
                    navigator("/teachers", { state: { shouldReload: true } });
                }).catch(error => {
                    console.error(error);
                });
            } else {
                addTeacherService(teacherData).then(() => {
                    navigator("/teachers", { state: { shouldReload: true } });
                }).catch(error => {
                    console.error(error);
                });
            }
        }
    };

    // Валидация формы
    const validateForm = () => {
        let valid = true;
        const errorsCopy = { ...errors };

        if (!firstName.trim()) {
            errorsCopy.firstName = 'First name is required';
            valid = false;
        } else {
            errorsCopy.firstName = '';
        }

        if (!lastName.trim()) {
            errorsCopy.lastName = 'Last name is required';
            valid = false;
        } else {
            errorsCopy.lastName = '';
        }

        if (!age) {
            errorsCopy.age = 'Age is required';
            valid = false;
        } else {
            errorsCopy.age = '';
        }

        if (!gender.trim()) {
            errorsCopy.gender = 'Gender is required';
            valid = false;
        } else {
            errorsCopy.gender = '';
        }

        if (!nationality.trim()) {
            errorsCopy.nationality = 'Nationality is required';
            valid = false;
        } else {
            errorsCopy.nationality = '';
        }

        if (!phoneNumber.trim()) {
            errorsCopy.phoneNumber = 'Phone number is required';
            valid = false;
        } else {
            errorsCopy.phoneNumber = '';
        }

        if (!address.trim()) {
            errorsCopy.address = 'Address is required';
            valid = false;
        } else {
            errorsCopy.address = '';
        }

        if (!subject.trim()) {
            errorsCopy.subject = 'Subject is required';
            valid = false;
        } else {
            errorsCopy.subject = '';
        }

        if (!grade.trim()) {
            errorsCopy.grade = 'Grade is required';
            valid = false;
        } else {
            errorsCopy.grade = '';
        }

        setErrors(errorsCopy);
        return valid;
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="card col-md-8">
                    <h2 className="text-center mt-3">{id ? 'Update Teacher' : 'Add New Teacher'}</h2>
                    <div className="card-body">
                        <form onSubmit={ saveOrUpdateTeacher }>
                            <div className="form-group mb-3">
                                <label className="form-label font-weight-bold">First name:</label>
                                <input type="text" name="firstName" className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                                {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                            </div>

                            <div className="form-group mb-3">
                                <label className="form-label font-weight-bold">Last name:</label>
                                <input type="text" name="lastName" className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                                {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                            </div>

                            <div className="form-group mb-3">
                                <label className="form-label font-weight-bold">Age:</label>
                                <input type="number" name="age" className={`form-control ${errors.age ? 'is-invalid' : ''}`} value={age} onChange={(e) => setAge(Number(e.target.value))}/>
                                {errors.age && <div className="invalid-feedback">{errors.age}</div>}
                            </div>

                            <div className="form-group mb-3">
                                <label className="form-label font-weight-bold">Gender</label>
                                <div className="btn-group mt-2 d-flex" role="group" aria-label="Gender">
                                    <input type="radio" className="btn-check" name="gender" id="male" value="Male" checked={gender === "Male"} onChange={(e) => setGender(e.target.value)}/>
                                    <label className="btn btn-outline-primary" htmlFor="male">Male</label>
                                    <input type="radio" className="btn-check" name="gender" id="female" value="Female" checked={gender === "Female"} onChange={(e) => setGender(e.target.value)}/>
                                    <label className="btn btn-outline-primary" htmlFor="female">Female</label>
                                </div>
                            </div>

                            <div className="form-group mb-4">
                                <label className="form-label font-weight-bold">Nationality:</label>
                                <input type="text" name="nationality" className={`form-control ${errors.nationality ? 'is-invalid' : ''}`} value={nationality} onChange={(e) => setNationality(e.target.value)}/>
                                {errors.nationality && <div className="invalid-feedback">{errors.nationality}</div>}
                            </div>

                            <div className="form-group mb-4">
                                <label className="form-label font-weight-bold">Phone number:</label>
                                <input type="text" name="phoneNumber" className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
                                {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
                            </div>

                            <div className="form-group mb-4">
                                <label className="form-label font-weight-bold">Address:</label>
                                <input type="text" name="address" className={`form-control ${errors.address ? 'is-invalid' : ''}`} value={address} onChange={(e) => setAddress(e.target.value)}/>
                                {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                            </div>

                            <div className="form-group mb-4">
                                <label className="form-label font-weight-bold">Subject:</label>
                                <input type="text" name="subject" className={`form-control ${errors.subject ? 'is-invalid' : ''}`} value={subject} onChange={(e) => setSubject(e.target.value)}/>
                                {errors.subject && <div className="invalid-feedback">{errors.subject}</div>}
                            </div>

                            <div className="form-group mb-4">
                                <label className="form-label font-weight-bold">Grade:</label>
                                <input type="text" name="grade" className={`form-control ${errors.grade ? 'is-invalid' : ''}`} value={grade} onChange={(e) => setGrade(e.target.value)}/>
                                {errors.grade && <div className="invalid-feedback">{errors.grade}</div>}
                            </div>

                            <div className="text-center">
                                <button type="submit" className="btn btn-primary me-2">{id ? 'Update' : 'Save'}</button>
                                <button type="button" className="btn btn-secondary me-2" onClick={() => navigator('/teachers')}>Back</button>
                                <button type="button" className="btn btn-primary me-2" onClick={() => navigator('/')}>Back to Home</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTeacherComponent;
