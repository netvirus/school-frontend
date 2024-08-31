import './App.css'
import ListBookComponent from "./components/list/ListBookComponent.jsx";
import HeaderComponent from "./components/HeaderComponent.jsx";
import FooterComponent from "./components/FooterComponent.jsx";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePageComponent from "./components/HomePageComponent.jsx";
import AddBookComponent from "./components/add/AddBookComponent.jsx";

function App() {

  return (
      <>
          <BrowserRouter>
            <HeaderComponent />
              <Routes>
                  <Route path='/' element={ <HomePageComponent /> }></Route>
                  <Route path='/api/books' element={ <ListBookComponent /> }></Route>
                  <Route path='/api/books/add-book' element={ <AddBookComponent /> }></Route>
              </Routes>
            <FooterComponent />
          </BrowserRouter>
      </>
  )
}

export default App
