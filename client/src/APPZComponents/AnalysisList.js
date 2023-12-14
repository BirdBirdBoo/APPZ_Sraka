import React, {useState, useEffect} from "react";
import { Button, Card, CardBody, Modal } from "react-bootstrap";
import AnalysisCard from "./AnalysisCard";
import AnalysisTable from "./AnalysisTable";
import axios from "axios";

function AnalysisList()
{


    const [analyzes, setAnalyzes] = useState([]);
    const [analysisProps, setAnalysisProps] = useState([]);

    function AddAnalysis()
    {
        
    }

    async function GetAnalysis()
    {
    }

    function fetchAnalysisProperties(id) {
            axios.get('https://localhost:7130/api/Analysis/get', {
                params: {
                    "id": id
                }
              })
              .then(res => {
                const allAnalysisProps = res.data;
                setAnalysisProps(allAnalysisProps);
                console.log(allAnalysisProps);
                handleOpenModal(<AnalysisTable data={allAnalysisProps}/>);
            })
            .catch(err => console.log(err));
    }

    function fetchPreviewAnalyzes(){
        axios.get("https://localhost:7130/api/Analysis/getAnalyzes")
            .then(res => {
                const allAnalyzes = res.data;
                setAnalyzes(allAnalyzes);
                console.log(allAnalyzes);
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        fetchPreviewAnalyzes();
    }, []);

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
            <CardBody>
            {
            analyzes.map(analysis => 
                <AnalysisCard 
                analysisId={analysis.analysisId} 
                name={analysis.name} 
                description={analysis.description} 
                date={analysis.date} 
                onClick={(analysisId) => 
                    {
                        fetchAnalysisProperties(analysisId)
                    }
                }
                />)
              }
                {/* <AnalysisCard name={'Analiz gavna'} description={'duzhe podrobnyj analiz gavna'} date={'14.12.2023'} onClick={()=> handleOpenModal(<BloodAnalysisTable/>)}/> */}
            </CardBody>
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