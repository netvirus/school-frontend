import { useEffect, useState } from 'react';
import { addStudentService, getStudentByIdService, updateStudentService } from "../../services/StudentService.js";
import { useNavigate, useParams } from "react-router-dom";

const AddStudentComponent = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState();
    const [gender, setGender] = useState('Male');
    const [nationality, setNationality] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [grade, setGrade] = useState('');
    const [motherName, setMotherName] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [motherPhoneNumber, setMotherPhoneNumber] = useState('');
    const [fatherPhoneNumber, setFatherPhoneNumber] = useState('');

    const { id } = useParams();
    const navigator = useNavigate();

    const [errors, setErrors] = useState({
        firstName: '', lastName: '', age: '', gender: '', nationality: '', phoneNumber: '', address: '',
        grade: '', motherName: '', fatherName: '', motherPhoneNumber: '', fatherPhoneNumber: ''
    });

    useEffect(() => {
        if (id) {
            getStudentByIdService(id).then((response) => {
                const data = response.data;
                setFirstName(data.firstName);
                setLastName(data.lastName);
                setAge(data.age);
                setGender(data.gender);
                setNationality(data.nationality);
                setPhoneNumber(data.phoneNumber);
                setAddress(data.address);
                setGrade(data.grade);
                setMotherName(data.motherName);
                setFatherName(data.fatherName);
                setMotherPhoneNumber(data.motherPhoneNumber);
                setFatherPhoneNumber(data.fatherPhoneNumber);
            }).catch(error => {
                console.error(error);
            });
        }
    }, [id]);

    const saveOrUpdateStudent = (e) => {
        e.preventDefault();
        const studentData = {
            firstName, lastName, age, gender, nationality, phoneNumber, address, grade,
            motherName, fatherName, motherPhoneNumber, fatherPhoneNumber
        };

        if (validateForm()) {
            if (id) {
                updateStudentService(id, studentData).then(() => {
                    navigator("/students", { state: { shouldReload: true } });
                }).catch(error => {
                    console.error(error);
                });
            } else {
                addStudentService(studentData).then(() => {
                    navigator("/students", { state: { shouldReload: true } });
                }).catch(error => {
                    console.error(error);
                });
            }
        }
    };

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

        if (!grade.trim()) {
            errorsCopy.grade = 'Grade is required';
            valid = false;
        } else {
            errorsCopy.grade = '';
        }

        if (!motherName.trim()) {
            errorsCopy.motherName = 'Mother name is required';
            valid = false;
        } else {
            errorsCopy.motherName = '';
        }

        if (!fatherName.trim()) {
            errorsCopy.fatherName = 'Father name is required';
            valid = false;
        } else {
            errorsCopy.fatherName = '';
        }

        if (!motherPhoneNumber.trim()) {
            errorsCopy.motherPhoneNumber = 'Mother phone number is required';
            valid = false;
        } else {
            errorsCopy.motherPhoneNumber = '';
        }

        if (!fatherPhoneNumber.trim()) {
            errorsCopy.fatherPhoneNumber = 'Father phone number is required';
            valid = false;
        } else {
            errorsCopy.fatherPhoneNumber = '';
        }

        setErrors(errorsCopy);
        return valid;
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="card col-md-8">
                    <h2 className="text-center mt-3">{id ? 'Update Student' : 'Add New Student'}</h2>
                    <div className="card-body">
                        <form onSubmit={ saveOrUpdateStudent }>
                            {/* Поля для студента */}
                            <div className="form-group mb-3">
                                <label className="form-label font-weight-bold">First name:</label>
                                <input type="text" placeholder="First name" className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} value={firstName || ""} onChange={(e) => setFirstName(e.target.value)} />
                                {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                            </div>

                            <div className="form-group mb-3">
                                <label className="form-label font-weight-bold">Last name:</label>
                                <input type="text" placeholder="Last name" name="lastName" className={`form-control ${errors.lastName ? 'is-invalid' : ''} `} value={lastName || ""} onChange={(e) => setLastName(e.target.value)}/>
                                {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                            </div>

                            <div className="form-group mb-3">
                                <label className="form-label font-weight-bold">Age:</label>
                                <input type="number" placeholder="age" name="age" className={`form-control ${errors.age ? 'is-invalid' : ''} `} value={age || ""} onChange={(e) => setAge(Number(e.target.value))}/>
                                {errors.age && <div className="invalid-feedback">{errors.age}</div>}
                            </div>

                            <div className="form-group mb-3">
                                <label className="form-label font-weight-bold">Gender</label>
                                <div className="btn-group mt-2 d-flex" role="group" aria-label="Basic radio toggle button group">
                                    <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" value="Male" defaultChecked onChange={(e) => setGender(e.target.value)}/>
                                    <label className="btn btn-outline-primary" htmlFor="btnradio1">Male</label>
                                    <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" value="Female" onChange={(e) => setGender(e.target.value)}/>
                                    <label className="btn btn-outline-primary" htmlFor="btnradio2">Female</label>
                                </div>
                            </div>

                            <div className="form-group mb-4">
                                <label className="form-label font-weight-bold">Nationality:</label>
                                <input type="text" placeholder="Enter nationality" name="nationality" className={`form-control ${errors.nationality ? 'is-invalid' : ''} `} value={nationality || ""} onChange={(e) => setNationality(e.target.value)}/>
                                {errors.nationality && <div className="invalid-feedback">{errors.nationality}</div>}
                            </div>

                            <div className="form-group mb-4">
                                <label className="form-label font-weight-bold">Phone number:</label>
                                <input type="text" placeholder="Enter phone number" name="phoneNumber" className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''} `} value={phoneNumber || ""} onChange={(e) => setPhoneNumber(e.target.value)}/>
                                {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
                            </div>

                            <div className="form-group mb-4">
                                <label className="form-label font-weight-bold">Address:</label>
                                <input type="text" placeholder="Enter an address" name="address" className={`form-control ${errors.address ? 'is-invalid' : ''} `} value={address || ""} onChange={(e) => setAddress(e.target.value)}/>
                                {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                            </div>

                            <div className="form-group mb-4">
                                <label className="form-label font-weight-bold">Grade:</label>
                                <input type="text" placeholder="Enter grade" name="grade" className={`form-control ${errors.grade ? 'is-invalid' : ''} `} value={grade || ""} onChange={(e) => setGrade(e.target.value)}/>
                                {errors.grade && <div className="invalid-feedback">{errors.grade}</div>}
                            </div>

                            <div className="form-group mb-4">
                                <label className="form-label font-weight-bold">Mother name:</label>
                                <input type="text" placeholder="Enter mother name" name="motherName" className={`form-control ${errors.motherName ? 'is-invalid' : ''} `} value={motherName || ""} onChange={(e) => setMotherName(e.target.value)}/>
                                {errors.motherName && <div className="invalid-feedback">{errors.motherName}</div>}
                            </div>

                            <div className="form-group mb-4">
                                <label className="form-label font-weight-bold">Father name:</label>
                                <input type="text" placeholder="Enter father name" name="fatherName" className={`form-control ${errors.fatherName ? 'is-invalid' : ''} `} value={fatherName || ""} onChange={(e) => setFatherName(e.target.value)}/>
                                {errors.fatherName && <div className="invalid-feedback">{errors.fatherName}</div>}
                            </div>

                            <div className="form-group mb-4">
                                <label className="form-label font-weight-bold">Mother's phone number:</label>
                                <input type="text" placeholder="Enter mother's phone number" name="motherPhoneNumber" className={`form-control ${errors.motherPhoneNumber ? 'is-invalid' : ''} `} value={motherPhoneNumber || ""} onChange={(e) => setMotherPhoneNumber(e.target.value)}/>
                                {errors.motherPhoneNumber && <div className="invalid-feedback">{errors.motherPhoneNumber}</div>}
                            </div>

                            <div className="form-group mb-4">
                                <label className="form-label font-weight-bold">Father's phone number:</label>
                                <input type="text" placeholder="Enter father's phone number" name="fatherPhoneNumber" className={`form-control ${errors.fatherPhoneNumber ? 'is-invalid' : ''} `} value={fatherPhoneNumber || ""} onChange={(e) => setFatherPhoneNumber(e.target.value)}/>
                                {errors.fatherPhoneNumber && <div className="invalid-feedback">{errors.fatherPhoneNumber}</div>}
                            </div>

                            <div className="text-center">
                                <button type="submit" className="btn btn-primary me-2">{id ? 'Update' : 'Save'}</button>
                                <button type="button" className="btn btn-secondary me-2" onClick={() => navigator('/students')}>Back</button>
                                <button type="button" className="btn btn-primary me-2" onClick={() => navigator('/')}>Back to Home</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddStudentComponent;
