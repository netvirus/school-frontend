import './App.css'
import ListBooksComponent from "./components/list/ListBooksComponent.jsx";
import HeaderComponent from "./components/HeaderComponent.jsx";
import FooterComponent from "./components/FooterComponent.jsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePageComponent from "./components/HomePageComponent.jsx";
import AddBookComponent from "./components/add/AddBookComponent.jsx";
import ListTeachersComponent from "./components/list/ListTeachersComponent.jsx";
import AddTeacherComponent from "./components/add/AddTeacherComponent.jsx";

function App() {
    return (
        <div id="root" className="app-container">
            <BrowserRouter>
                <HeaderComponent />
                <main className="container">
                    <Routes>
                        <Route path='/' element={<HomePageComponent />} />
                        <Route path='/api/books' element={<ListBooksComponent />} />
                        <Route path='/api/books/add-book' element={<AddBookComponent />} />
                        <Route path='/api/books/edit-book/:id' element={<AddBookComponent />} />
                        <Route path='/api/books/delete-book/:id' element={<ListBooksComponent />} />
                        <Route path='/api/teachers' element={<ListTeachersComponent />} />
                        <Route path='/api/teachers/add-teacher' element={<AddTeacherComponent />} />
                        <Route path='/api/teachers/edit-teacher/:id' element={<AddTeacherComponent />} />
                    </Routes>
                </main>
                <FooterComponent />
            </BrowserRouter>
        </div>
    );
}

export default App;
