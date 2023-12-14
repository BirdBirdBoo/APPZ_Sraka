import {React, useState, useEffect, useContext} from "react";
import {Button, Card, InputGroup, Modal} from "react-bootstrap";
import AnalysisCard from "./AnalysisCard";
import AnalysisTable from "./AnalysisTable";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import AuthContext from "../AuthContext";

function AnalysisList({patientIdFromDoctor = null}) {
    let context = useContext(AuthContext);
    const [analyzes, setAnalyzes] = useState([]);
    const [analysisProps, setAnalysisProps] = useState([]);

    let authContext = useContext(AuthContext);

    let [sortByName, setSortByName] = useState(null);
    let [critical, setCritical] = useState(null);
    let [sortByOrder, setSortByOrder] = useState(null);
    let [date1, setDate1] = useState(null);
    let [date2, setDate2] = useState(null);
    let [type, setType] = useState(null);

    const handleSortByNameChange = (event) => {
        setSortByName(event.target.value);
    };

    const handleCriticalByChange = (event) => {
        setCritical(event.currentTarget.checked);
    };

    const handleSortByOrderChange = (event) => {
        setSortByOrder(event);
    };

    const handleDate1ByChange = (event) => {
        setDate1(event.target.value);
    };

    const handleDate2ByChange = (event) => {
        setDate2(event.target.value);
    };

    const handleType = (event) => {
        setType(event);
    };

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

    function formPromt() {
        let requestData = {}
        
        if(patientIdFromDoctor){
            requestData = {
                ...requestData,
                "patientId": patientIdFromDoctor ? patientIdFromDoctor : context.userAsPatientId,
            }
        }
        if(sortByName){
            requestData = {
                ...requestData,
                "name": sortByName,
            }
        }
        if(date1){
            requestData = {
                ...requestData,
                "firstDate": date1,
            }
        }
        if(date2){
            requestData = {
                ...requestData,
                "lastDate": date2,
            }
        }
        if(type){
            requestData = {
                ...requestData,
                "type": type,
            }
        }
        if(critical){
            requestData = {
                ...requestData,
                "onlyBeyondNorm": critical,
            }
        }
        if(sortByOrder){
            requestData = {
                ...requestData,
                "orderByDateType": Number(sortByOrder)
            }
        }

        axios.post('https://localhost:7130/api/Analysis/filter', requestData, {
            headers: {
                'Content-Type': 'application/json'
            }
          })
            .then(res => {
                const allAnalyzes = res.data.analysisPreviews;
                setAnalyzes(allAnalyzes);
                console.log(allAnalyzes);
            })
            .catch(err => console.log(err));
    }

    function fetchPreviewAnalyzes(id)
    {
        axios.get("https://localhost:7130/api/Analysis/getAnalyzes", {
            params: {
                "patientId": id
            }
        })
            .then(res => {
                const allAnalyzes = res.data;
                setAnalyzes(allAnalyzes);
                console.log(allAnalyzes);
            })
            .catch(err => console.log(err));
    }

    function reset() {
        setSortByName(null);
        setCritical(null);
        setSortByOrder(null);
        setDate1(null);
        setDate2(null);
        setType(null);
        formPromt()
    }

    useEffect(() => {
        const patientIdDoctorOrPatientView = patientIdFromDoctor ? patientIdFromDoctor : authContext.userAsPatientInfo.patientId;
         console.log(patientIdDoctorOrPatientView)
         fetchPreviewAnalyzes(patientIdDoctorOrPatientView);
    }, []);

    const [showModal, setShowModal] = useState(false);
    const [analysisData, setAnalysisData] = useState(null);

    const handleOpenModal = (data) => {
        setAnalysisData(data);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <Card style={{
                border: 'none',
                boxShadow: 'none',
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column'
            }}>
                <Card.Body>
                    <InputGroup className="mb-3">
                        <Form.Control size="lg" type="text" value={sortByName} onChange={handleSortByNameChange} placeholder="Аналіз..." />
                        <InputGroup.Text id="inputGroup-sizing-sm">Критичні:</InputGroup.Text>
                        <InputGroup.Checkbox aria-label="Показувати лише критичні" checked={critical} onChange={handleCriticalByChange}/>
                        <DropdownButton
                        variant="outline-secondary"
                        title="Сортувати за..."
                        id="input-group-dropdown-1"
                        onSelect={handleSortByOrderChange}>
                        <Dropdown.Item eventKey={0}>За спаданнями</Dropdown.Item>
                        <Dropdown.Item eventKey={1}>За зростанням</Dropdown.Item>
                        </DropdownButton>
                        <DropdownButton
                        variant="outline-secondary"
                        title="Тип"
                        id="input-group-dropdown-1"
                        onSelect={handleType}> 
                        <Dropdown.Item eventKey='GeneralUrineTest'>Загальний аналіз сечі</Dropdown.Item>
                        <Dropdown.Item eventKey='GeneralBloodTest'>Загальний аналіз крові</Dropdown.Item>
                        <Dropdown.Item eventKey='FullBloodTest'>Повний аналіз крові</Dropdown.Item>
                        </DropdownButton>
                        <Form.Control value={date1} onChange={handleDate1ByChange} type="date"/>
                        <Form.Control value={date2} onChange={handleDate2ByChange} type="date"/>
                        <Button variant="primary" id="button-addon1" onClick={formPromt}>
                            Застосувати
                        </Button>
                        <Button variant="danger" id="button-addon1" onClick={reset}>
                            Скинути
                        </Button>
                    </InputGroup>
                    
                    {
                        analyzes.map(analysis =>
                            <AnalysisCard
                                type={analysis.type}
                                analysisId={analysis.analysisId}
                                name={analysis.name}
                                description={analysis.description}
                                date={analysis.date}
                                onClick={(analysisId) => {
                                    fetchAnalysisProperties(analysisId)
                                }
                                }
                            />)
                    }
                </Card.Body>
            </Card>
            <Modal size="lg" show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Результати аналізу</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{analysisData}</p>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AnalysisList;