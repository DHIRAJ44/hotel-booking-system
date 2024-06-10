import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homescreen from "./pages/Homescreen";
import Bookingscreen from "./pages/Bookingscreen";
import Register from "./pages/Register";
import Loginscreen from "./pages/Loginscreen";
import Profilescreen from './pages/profilescreen';
import Adminscreen from "./pages/Adminscreen";
import Landingscreen from "./pages/Landingscreen";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/home" exact element={<Homescreen />} />
          <Route
            path="/book/:roomid/:fromdate/:todate"
            exact
            element={<Bookingscreen />}
          />
          <Route path="/register" exact element={<Register></Register>}></Route>
          <Route
            path="/login"
            exact
            element={<Loginscreen></Loginscreen>}
          ></Route>
          <Route path="/profile" exact element={<Profilescreen></Profilescreen>}></Route>
          <Route path='/admin' exact element={<Adminscreen></Adminscreen>}></Route>
          <Route path='/' exact element={<Landingscreen></Landingscreen>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
