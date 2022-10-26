import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import Navbar from "./pdf/navbar";
import Home from "./pdf/home";
import PDFList from "./pdf/list";
import PDFCreation from "./pdf/create";
import PDFEdit from "./pdf/edit";

 
const App = () => {
 return (
   <div>
     <Navbar />
     <Routes>
       <Route exact path="/" element={<Home />} />
       <Route path="/pdflist" element={<PDFList />} />
       <Route path="/pdfcreation" element={<PDFCreation/>} />
       <Route path="/pdfedit/:id" element={<PDFEdit/>} />
     </Routes>
   </div>
 );
};
 
export default App;