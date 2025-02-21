import { useEffect, useState } from "react";
import { getStudentByIdService } from "../../services/StudentService.js";
import { useNavigate, useParams } from "react-router-dom";

const StudentComponent = () => {
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const [activeTab, setActiveTab] = useState("studentInfo");
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            getStudentByIdService(id)
                .then((response) => {
                    setStudent(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [id]);

    function addNewPrice() {
        navigate('/personal-prices/add');
    }

    function backToPage() {
        navigate('/students');
    }

    function editPrice(id) {
        // navigate(`/personal-prices/edit/${id}`);
    }

    function deletePrice(id) {
        navigate(`/personal-prices/delete-price/${id}`);
    }

    if (!student) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container mt-1 d-flex flex-column align-items-center">
            <h2 className="text-center mb-4">
                About: {student.firstName} {student.lastName}
            </h2>

            <ul className="nav nav-tabs mb-3">
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === "studentInfo" ? "active" : ""}`}
                            onClick={() => setActiveTab("studentInfo")}>Student Info
                    </button>
                </li>
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === "priceList" ? "active" : ""}`}
                            onClick={() => setActiveTab("priceList")}>Price List
                    </button>
                </li>
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === "priceServices" ? "active" : ""}`}
                            onClick={() => setActiveTab("priceServices")}>Price Services
                    </button>
                </li>
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === "paymentInfo" ? "active" : ""}`}
                            onClick={() => setActiveTab("paymentInfo")}>Payment Info
                    </button>
                </li>
            </ul>

            {activeTab === "studentInfo" && (
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
                            <th>Mother Name</th>
                            <th>Father Name</th>
                            <th>Mother's Phone</th>
                            <th>Father's Phone</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
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
                                {/*<button type="button" className="btn btn-outline-primary me-2" onClick={() => addNewPrice()}>Add price</button>*/}
                                <button type="button" className="btn btn-outline-secondary me-2" onClick={() => editPrice(student.id)}>Edit</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === "priceList" && (
                <div className="table-responsive">
                    <table className="table table-striped table-bordered text-center">
                        <thead>
                        <tr>
                            <th>Price Name</th>
                            <th>Payment Period</th>
                            <th>Status</th>
                            <th>Currency</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {student.studentPricesDto?.map((studentPrice) => (
                            studentPrice.gradeDto?.priceDto && (
                                <tr key={studentPrice.id}>
                                    <td>{studentPrice.gradeDto.priceDto.name}</td>
                                    <td>{studentPrice.paymentPeriod} months</td>
                                    <td>{studentPrice.active ? 'Active' : 'Not Active'}</td>
                                    <td>{studentPrice.paymentCurrencyDTO?.name || "N/A"}</td>
                                    <td>
                                        <button type="button" className="btn btn-outline-primary me-2" onClick={() => editPrice(studentPrice.id)}>Edit</button>
                                        {/*<button type="button" className="btn btn-outline-danger me-2" onClick={() => deletePrice(studentPrice.id)}>Delete</button>*/}
                                    </td>
                                </tr>
                            )
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === "priceServices" && (
                <div className="table-responsive">
                    <table className="table table-striped table-bordered text-center">
                        <thead>
                        <tr>
                            <th>Service Name</th>
                            <th>Original Cost</th>
                            <th>Discount (%)</th>
                            <th>Cost With Discount</th>
                            <th>Currency</th>
                        </tr>
                        </thead>
                        <tbody>
                        {student.studentPricesDto?.flatMap((studentPrice) =>
                            studentPrice.gradeDto?.priceDto?.priceServiceList?.map((service) => {
                                const discountEntry = studentPrice.studentServiceDiscountListDto?.find(
                                    (discount) => discount.serviceName === service.schoolServiceName
                                );
                                return (
                                    <tr key={service.id}>
                                        <td>{service.schoolServiceName}</td>
                                        <td>{service.cost || "N/A"}</td>
                                        <td>{discountEntry ? discountEntry.discount : 0}%</td>
                                        <td>{discountEntry ? discountEntry.costWithDiscount : service.cost || "N/A"}</td>
                                        <td>{studentPrice.paymentCurrencyDTO?.name || "N/A"}</td>
                                    </tr>
                                );
                            })
                        )}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === "paymentInfo" && (
                <div className="table-responsive">
                    <table className="table table-striped table-bordered text-center">
                        <thead>
                        <tr>
                            <th>Service Name</th>
                            <th>Original Cost</th>
                            <th>Currency</th>
                        </tr>
                        </thead>
                        <tbody>
                        {student.studentPricesDto?.flatMap((studentPrice) =>
                            studentPrice.gradeDto?.priceDto?.priceServiceList?.map((service) => {
                                return (
                                    <tr key={service.id}>
                                        <td>{service.schoolServiceName}</td>
                                        <td>{service.cost || "N/A"}</td>
                                        <td>{studentPrice.paymentCurrencyDTO?.name || "N/A"}</td>
                                    </tr>
                                );
                            })
                        )}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="mt-3">
                <button type="button" className="btn btn-primary" onClick={backToPage}>Back to Home</button>
            </div>
        </div>
    );
};

export default StudentComponent;
