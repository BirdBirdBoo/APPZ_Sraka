import './App.css';
import AppNavbar from "./AppNavbar";
import ImageGallery from "./ImageGallery";
import PatientProfile from './APPZComponents/PatientProfile';
import DoctorProfile from './APPZComponents/DoctorProfile';

function App() {
    return <>
    {/* 
        <AppNavbar/>
        <ImageGallery/>
        
         Warning!
         message prop requires a string 
     */}
    <DoctorProfile/>
    </>;
}

export default App;
