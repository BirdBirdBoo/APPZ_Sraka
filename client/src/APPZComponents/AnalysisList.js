import React, {useState, useEffect} from "react";
import {Button, Card, InputGroup, Modal} from "react-bootstrap";
import AnalysisCard from "./AnalysisCard";
import AnalysisTable from "./AnalysisTable";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function AnalysisList() {
    const [analyzes, setAnalyzes] = useState([]);
    const [analysisProps, setAnalysisProps] = useState([]);

    let [sortBy, setSortBy] = useState('');
    let [critical, setCritical] = useState(false);
    let [sortBy2, setSortBy2] = useState(0);
    let [date1, setDate1] = useState('');
    let [date2, setDate2] = useState('');
    let [type, setType] = useState('');

    const handleSortByChange = (event) => {
        setSortBy(event.target.value);
    };

    const handleCriticalByChange = (event) => {
        setCritical(event.currentTarget.checked);
    };

    const handleSortBy2Change = (event) => {
        setSortBy2(event);
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

    function fetchPreviewAnalyzes() {
        axios.get("https://localhost:7130/api/Analysis/getAnalyzes")
            .then(res => {
                const allAnalyzes = res.data;
                setAnalyzes(allAnalyzes);
                console.log(allAnalyzes);
            })
            .catch(err => console.log(err));
    }

    function formPromt()
    {
        console.log(sortBy);
        console.log(critical);
        console.log(sortBy2);
        console.log(date1);
        console.log(date2);
        console.log(type);
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

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <Card style={{
                border: 'none',
                boxShadow: 'none',
                height: '100%', // Ensure the Card takes up the full height of its container
                display: 'flex', // Use flex layout
                flexDirection: 'column'
            }}>
                <Card.Body>
                    <InputGroup className="mb-3">
                        <Form.Control size="lg" type="text" value={sortBy} onChange={handleSortByChange} placeholder="Аналіз..." />
                        <InputGroup.Text id="inputGroup-sizing-sm">Критичні:</InputGroup.Text>
                        <InputGroup.Checkbox aria-label="Показувати лише критичні" checked={critical} onChange={handleCriticalByChange}/>
                        <DropdownButton
                        variant="outline-secondary"
                        title="Сортувати за..."
                        id="input-group-dropdown-1"
                        onSelect={handleSortBy2Change}>
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