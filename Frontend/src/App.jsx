import { BrowserRouter, Route, Routes } from "react-router-dom"
import Buttoncom from "./Components/Buttoncom"
import Landing from "./Landing"
import FormA from "./FormA"
import FormB from "./FormB"

function App() {
  return (
    <BrowserRouter>
        <Routes>
           <Route path="/" element= {<Landing/>}></Route>
           <Route path="/FormA" element={<FormA/>}></Route>
           <Route path="/FormB" element={<FormB/>}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
