import './App.css'
import ListBookComponent from "./components/list/ListBookComponent.jsx";
import HeaderComponent from "./components/HeaderComponent.jsx";
import FooterComponent from "./components/FooterComponent.jsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePageComponent from "./components/HomePageComponent.jsx";
import AddBookComponent from "./components/add/AddBookComponent.jsx";

function App() {
    return (
        <div id="root" className="app-container">
            <BrowserRouter>
                <HeaderComponent />
                <main className="container">
                    <Routes>
                        <Route path='/' element={<HomePageComponent />} />
                        <Route path='/api/books' element={<ListBookComponent />} />
                        <Route path='/api/books/add-book' element={<AddBookComponent />} />
                    </Routes>
                </main>
                <FooterComponent />
            </BrowserRouter>
        </div>
    );
}

export default App;
