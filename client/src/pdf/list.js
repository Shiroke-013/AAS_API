import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

var backend = '34.168.119.233'
const Pdf = (props) => (
 <tr>
   <td>{props.pdf.namedoc}</td>
   <td>{props.pdf.author}</td>
   <td>{props.pdf.title}</td>
   <td>{props.pdf.date}</td>
   <td>
     <Link className="btn btn-link" to={`/pdfedit/${props.pdf._id}`}>Edit</Link> |
     <button className="btn btn-link"
       onClick={() => {
         props.deletePdf(props.pdf._id);
       }}
     >
       Delete
     </button>
   </td>
 </tr>
);
 
export default function PDFList() {
 const [pdfs, setPdfs] = useState([]);
 
 // This method fetches the pdfs from the database.
 useEffect(() => {
   async function getPdfs() {
     const response = await fetch(`http://`+backend+`:5000/pdflist/`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const pdfs = await response.json();
     setPdfs(pdfs);
   }
 
   getPdfs();
 
   return;
 }, [pdfs.length]);
 
 // This method will delete a pdf
 async function deletePdf(id) {
   await fetch(`http://`+backend+`:5000/pdflist/delete/${id}`, {
     method: "DELETE"
   });
 
   const newPdfs = pdfs.filter((el) => el._id !== id);
   setPdfs(newPdfs);
 }
 
 let navigate = useNavigate(); 
 const routeChange = () =>{ 
   let path = `/pdfcreation`; 
   navigate(path);
 } 

 // This method will map out the pdfs on the table
 function pdfList() {
   return pdfs.map((pdf) => {
     return (
       <Pdf
         pdf={pdf}
         deletePdf={() => deletePdf(pdf._id)}
         key={pdf._id}
       />
     );
   });
 }
 
 // This following section will display the table with the pdfs of individuals.
 return (
   <div>
    <br></br>
     <h3>PDF List</h3>
     <button color="primary" className="px-4"onClick={routeChange}>
          Nuevo PDF
    </button>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Name</th>
           <th>Author</th>
           <th>Title</th>
           <th>Date</th>
           <th>Action</th>
         </tr>
       </thead>
       <tbody>{pdfList()}</tbody>
     </table>
   </div>
 );
}
