import React, {useState} from "react";
import { Button, Card, Modal } from "react-bootstrap";
import AnalysisCard from "./AnalysisCard";
import BloodAnalysisTable from "./BloodAnalysis";


function AnalysisList()
{
    const [arr, setArr] = useState(null);

    function AddAnalysis()
    {
        
    }

    async function GetAnalysis()
    {

    }

    const [showModal, setShowModal] = useState(false);
    const [analysisData, setAnalysisData] = useState(null);

    const handleOpenModal = (data) => {
      setAnalysisData(data);
      setShowModal(true);
    };

    const handleCloseModal = () =>{
        setShowModal(false);
    };

    return(
        <>
        <Card style={{
            border: 'none', 
            boxShadow: 'none',
            height: '100%', // Ensure the Card takes up the full height of its container
            display: 'flex', // Use flex layout
            flexDirection: 'column'}}>
            <Card.Body>
                <AnalysisCard name={'Analiz gavna'} description={'duzhe podrobnyj analiz gavna'} date={'14.12.2023'} onClick={()=> handleOpenModal(<BloodAnalysisTable/>)}/>
            </Card.Body>
        </Card>
        <Modal size="lg" show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Modal Title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{analysisData}</p>
            </Modal.Body>
        </Modal>
        </>
    )
}

export default AnalysisList;