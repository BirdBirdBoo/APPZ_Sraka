import { React, useContext, useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import ButtonAddAnnotation from './Buttons/ButtonAddAnnotation';
import "../styles/analysisTable.css"
import ButtonInfo from './Buttons/ButtonInfo';
import AnnotationModal from './Modals/AnnotationModal';
import AuthContext from '../AuthContext';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import "../styles/styles.css"

function AnalysisTable(props) {
    const [data, setData] = useState([]);
    const [nameOfCurrentProperty, setNameOfCurrentProperty] = useState('');
    let authContext = useContext(AuthContext);

    useEffect(() => {
        console.log(props.data);
        setData(props.data)

        console.log("annotations inside modal")
        console.log(props.annotations);

    }, []);

    const createAnnotation = (value) => {
        props.handleAnnotationModalSave(props.analysisId, nameOfCurrentProperty, value)
    };

    const addAnnotation = () => {
        props.openAnnotationModal();
    };

    const checkAndDisplayAnnotation = (nameToCheck) => {
        const result = findValueByName(props.annotations, nameToCheck);

        if (result !== null) {
            return (<>{`${props.annotations[result].author}: ${props.annotations[result].message}`}</>);
        }
        else {
            return (<></>);
        }
    };

    function findValueByName(arr, nameToFind) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].nameOfProperty === nameToFind) {
                return i;
            }
        }
        return null;
    }

    function drawAnnotationPart(analysisProps) {
        if (findValueByName(props.annotations, analysisProps.nameOfProperty) !== null) {
            return (
                <tr className='analysis-table-row bg-secondary'>
                    <td colSpan={4}>
                        <p className="text-light m-2">{checkAndDisplayAnnotation(analysisProps.nameOfProperty)}</p>
                    </td>
                </tr>)
        }
    }

    const [showAnnotationModal, setShowAnnotationModal] = useState(false);
    const handleAnnotationModalShow = () => setShowAnnotationModal(true);
    const handleAnnotationModalClose = () => setShowAnnotationModal(false);

    const exportPDF = () => {
        const input = document.getElementById('table-container');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'PNG', 0, 0);
                pdf.save("download.pdf");
            });
    }
    return (
        <>
            <Card style={{
                border: 'none',
                boxShadow: 'none'
            }}>
                <Card.Body id='table-container'>
                    <table style={{ borderRadius: '10px', overflow: 'hidden', width: '100%' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#6D9EEB', color: 'white' }}>
                                <th style={{ padding: '10px' }}>Показник</th>
                                <th style={{ padding: '10px' }}>Результати</th>
                                <th style={{ padding: '10px' }}>Відхилення</th>
                                <th style={{ padding: '10px' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((analysisProps, index) => (
                                <>
                                    <tr key={index} className='analysis-table-row' style={analysisProps.isCritical ? { backgroundColor: '#ff6673' } : { backgroundColor: '#9FC5E8' }}>
                                        <td style={{ padding: '10px' }}>{analysisProps.nameOfProperty}</td>
                                        <td style={{ padding: '10px' }}>{analysisProps.number}{analysisProps.metric}</td>
                                        <td style={{ padding: '10px' }}>{Number(analysisProps.delta.toPrecision(4))}{analysisProps.metric}</td>
                                        <td>
                                            {

                                                findValueByName(props.annotations, analysisProps.nameOfProperty) === null
                                                    ?
                                                    authContext.isDoctor && <ButtonAddAnnotation addAnnotation={
                                                        () => {
                                                            handleAnnotationModalShow()
                                                            setNameOfCurrentProperty(analysisProps.nameOfProperty)
                                                        }}
                                                    />
                                                    :
                                                    <ButtonInfo />
                                            }
                                        </td>
                                    </tr>
                                    { //this is annotation part
                                        drawAnnotationPart(analysisProps)
                                    }
                                </>

                            ))}
                        </tbody>
                    </table>
                </Card.Body>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button className="btn-style-pdf-export" onClick={exportPDF}>Експортувати у PDF</button>
                </div>
            </Card>
            <AnnotationModal
                showModal={showAnnotationModal}
                handleClose={handleAnnotationModalClose}
                onSave={createAnnotation} />
        </>
    );
};

export default AnalysisTable;
