import './App.css'
import ListBooksComponent from "./components/list/ListBooksComponent.jsx";
import HeaderComponent from "./components/HeaderComponent.jsx";
import FooterComponent from "./components/FooterComponent.jsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePageComponent from "./components/HomePageComponent.jsx";
import AddBookComponent from "./components/add/AddBookComponent.jsx";
import ListTeachersComponent from "./components/list/ListTeachersComponent.jsx";
import AddTeacherComponent from "./components/add/AddTeacherComponent.jsx";
import AddStudentComponent from "./components/add/AddStudentComponent.jsx";
import ListStudentsComponent from "./components/list/ListStudentsComponent.jsx";
import ListPaymentItemComponent from "./components/list/ListPaymentItemComponent.jsx";
import AddPaymentItemComponent from "./components/add/AddPaymentItemComponent.jsx";
import AddAcademicYearBasePriceItemComponent from "./components/add/AddAcademicYearBasePriceItemComponent.jsx";
import ListAcademicYearBasePriceItemsComponent from "./components/list/ListAcademicYearBasePriceItemsComponent.jsx";

function App() {
    return (
        <div id="root" className="app-container">
            <BrowserRouter>
                <HeaderComponent />
                <main className="container">
                    <Routes>
                        <Route path='/' element={<HomePageComponent />} />
                        <Route path='/books' element={<ListBooksComponent />} />
                        <Route path='/books/add-book' element={<AddBookComponent />} />
                        <Route path='/books/edit-book/:id' element={<AddBookComponent />} />
                        <Route path='/books/delete-book/:id' element={<ListBooksComponent />} />
                        <Route path='/teachers' element={<ListTeachersComponent />} />
                        <Route path='/teachers/add-teacher' element={<AddTeacherComponent />} />
                        <Route path='/teachers/edit-teacher/:id' element={<AddTeacherComponent />} />
                        <Route path='/students' element={<ListStudentsComponent />} />
                        <Route path='/students/add-student' element={<AddStudentComponent />} />
                        <Route path='/students/edit-student/:id' element={<AddStudentComponent />} />
                        <Route path='/payment-items' element={<ListPaymentItemComponent />} />
                        <Route path='/payment-items/add-item' element={<AddPaymentItemComponent />} />
                        <Route path='/payment-items/edit-item/:id' element={<AddPaymentItemComponent />} />
                        <Route path='/academic-year-base-prices' element={<ListAcademicYearBasePriceItemsComponent />} />
                        <Route path='/academic-year-base-prices/add-item' element={<AddAcademicYearBasePriceItemComponent />} />
                        <Route path='/academic-year-base-prices/edit-item/:id' element={<AddAcademicYearBasePriceItemComponent />} />
                    </Routes>
                </main>
                <FooterComponent />
            </BrowserRouter>
        </div>
    );
}

export default App;
