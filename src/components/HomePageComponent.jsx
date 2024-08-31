import React from 'react';
import {useNavigate} from "react-router-dom";

const HomePageComponent = () => {

    const navigator = useNavigate();

    function listTeachers() {
        navigator("/api/teachers");
    }

    function listBooks() {
        navigator("/api/books");
    }

    return (
        <div className="container mt-5">
            <div className="text-center">
                <button type="button" className="btn btn-primary me-2" onClick={listTeachers}>Teacher List</button>
                <button type="button" className="btn btn-primary me-2" onClick={listBooks}>Books List</button>
            </div>
        </div>
    );
}
export default HomePageComponent;
