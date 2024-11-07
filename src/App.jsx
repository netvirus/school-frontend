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
import ListServicesItemComponent from "./components/list/ListServicesItemComponent.jsx";
import AddServicesItemListComponent from "./components/add/AddServicesItemListComponent.jsx";
import AddPriceComponent from "./components/add/AddPriceComponent.jsx";
import ListPricesComponent from "./components/list/ListPricesComponent.jsx";
import AddBasePriceItemComponent from "./components/add/AddBasePriceItemComponent.jsx";
import ListBasePriceItemsComponent from "./components/list/ListBasePriceItemsComponent.jsx";

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
                        <Route path='/services-list' element={<ListServicesItemComponent />} />
                        <Route path='/services-list/add-item' element={<AddServicesItemListComponent />} />
                        <Route path='/services-list/edit-item/:id' element={<AddServicesItemListComponent />} />
                        <Route path='/prices' element={<ListPricesComponent />} />
                        <Route path='/prices/add' element={<AddPriceComponent />} />
                        <Route path='/prices/edit/:id' element={<AddPriceComponent />} />
                        <Route path='/base-prices' element={<ListBasePriceItemsComponent />} />
                        <Route path='/base-prices/add-item' element={<AddBasePriceItemComponent />} />
                        <Route path='/base-prices/edit-item/:id' element={<AddBasePriceItemComponent />} />
                    </Routes>
                </main>
                <FooterComponent />
            </BrowserRouter>
        </div>
    );
}

export default App;
