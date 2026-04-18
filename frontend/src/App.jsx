import { Routes, Route} from 'react-router-dom'
import Home from "./pages/Home"
import SearchPage from "./pages/SearchPage"
import Revise from "./pages/Revise"
import Profile from "./pages/Profile"
import Header from './components/ui/header'
import Login from './pages/Login'

function App() {
  

    return <div className="flex flex-col gap-8 py-3">
      <Header/>
    
      <Routes>
            <Route  path="/" element={<Home/>}></Route>
            <Route  path="/search" element={<SearchPage/>}></Route>
            <Route  path="/revise" element={<Revise/>}></Route>
            <Route  path="/profile" element={<Profile/>}></Route>
            <Route  path="/login" element={<Login/>}></Route>
        </Routes>
    </div>
}


export default App
