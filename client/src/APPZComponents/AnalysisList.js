import { React, useState, useEffect, useContext } from "react";
import { Button, Card, InputGroup, Modal } from "react-bootstrap";
import AnalysisCard from "./AnalysisCard";
import AnalysisTable from "./AnalysisTable";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import AuthContext from "../AuthContext";
import AnnotationModal from "./Modals/AnnotationModal";
import { Navigate } from "react-router-dom";
import ApplicationPaths from "../paths";

function AnalysisList({ patientIdFromDoctor = null }) {
    // let context = useContext(AuthContext);
    const [analyzes, setAnalyzes] = useState([]);

    const [currentAnalysisId, setCurrentAnalysisId] = useState(0);
    const [currentAnalysisAnnotations, setCurrentAnalysisAnnotations] = useState([]);
    const [currentAnalysisProps, setCurrentAnalysisProps] = useState([]);

    let authContext = useContext(AuthContext);

    let [sortByName, setSortByName] = useState(null);
    let [critical, setCritical] = useState(null);
    let [sortByOrder, setSortByOrder] = useState(null);
    let [date1, setDate1] = useState(null);
    let [date2, setDate2] = useState(null);
    let [type, setType] = useState(null);

    useEffect(() => {
        const patientIdDoctorOrPatientView = patientIdFromDoctor ? patientIdFromDoctor : authContext.userAsPatientInfo.patientId;
        console.log(patientIdDoctorOrPatientView)
        fetchPreviewAnalyzes(patientIdDoctorOrPatientView);
    }, []);

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

    async function fetchAnalysisProperties(id) {
        setCurrentAnalysisId(id);

        const fetchedAnalysisProps = await axios.get('https://localhost:7130/api/Analysis/get', {
            params: {
                "id": id
            }
        }).catch(err => console.log(err));

        const cachedAnalysisProps = fetchedAnalysisProps.data;

        console.log("cachedAnalysisProps")
        console.log(cachedAnalysisProps)

        console.log("currentAnalysisProps")
        setCurrentAnalysisProps(cachedAnalysisProps)
        console.log(currentAnalysisProps)

        const fetchedAnalysisAnnotations = await axios.get('https://localhost:7130/api/Annotations/getAllAnnotations', {
            params: {
                "analysisId": id
            }
        }).catch(err => console.log(err));


        console.log("fetchedAnalysisAnnotations")
        const cachedAnalysisAnnotations = fetchedAnalysisAnnotations.data;
        console.log(cachedAnalysisAnnotations)
        setCurrentAnalysisAnnotations(cachedAnalysisAnnotations)

        handleOpenAnalysisTableModal(<AnalysisTable
            analysisId={id}
            data={cachedAnalysisProps}
            annotations={cachedAnalysisAnnotations}
            handleAnnotationModalSave={handleAnnotationModalSave}
        />);
    }

    function formPromt() {
        let requestData = {}

        requestData = {
            ...requestData,
            "patientId": patientIdFromDoctor ? patientIdFromDoctor : authContext.userAsPatientId,
        }

        if (sortByName) {
            requestData = {
                ...requestData,
                "name": sortByName,
            }
        }
        if (date1) {
            requestData = {
                ...requestData,
                "firstDate": date1,
            }
        }
        if (date2) {
            requestData = {
                ...requestData,
                "lastDate": date2,
            }
        }
        if (type) {
            requestData = {
                ...requestData,
                "type": type,
            }
        }
        if (critical) {
            requestData = {
                ...requestData,
                "onlyBeyondNorm": critical,
            }
        }
        if (sortByOrder) {
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

    function fetchPreviewAnalyzes(id) {
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

    const handleAnnotationModalSave = (analysisId, nameOfProperty, value) => {
        axios.post("https://localhost:7130/api/Annotations/create",
            {
                "message": {
                    "sender": authContext.userId,
                    "text": value
                },
                "annotation": {
                    "analysisId": analysisId,
                    "nameOfProperty": nameOfProperty
                }
            })
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err));
        handleCloseAnalysisTableModal();
    };

    const [showModal, setShowAnalysisTableModal] = useState(false);
    const [analysisData, setAnalysisData] = useState(null);

    const handleOpenAnalysisTableModal = (data) => {
        setAnalysisData(data);
        setShowAnalysisTableModal(true);
    };

    const handleCloseAnalysisTableModal = () => {
        setShowAnalysisTableModal(false);
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
                        <InputGroup.Checkbox aria-label="Показувати лише критичні" checked={critical} onChange={handleCriticalByChange} />
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
                        <Form.Control value={date1} onChange={handleDate1ByChange} type="date" />
                        <Form.Control value={date2} onChange={handleDate2ByChange} type="date" />
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

            <Modal size="lg" show={showModal} onHide={handleCloseAnalysisTableModal}>
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