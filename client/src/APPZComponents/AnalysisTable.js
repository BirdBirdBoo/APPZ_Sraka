import { React, useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import ButtonAddAnnotation from './Buttons/ButtonAddAnnotation';
import "../styles/analysisTable.css"
import ButtonInfo from './Buttons/ButtonInfo';
import AnnotationModal from './Modals/AnnotationModal';

function AnalysisTable(props) {
    const [data, setData] = useState([]);
    const [nameOfCurrentProperty, setNameOfCurrentProperty] = useState('');

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
            return (<>{result}</>);
        }
        else {
            return (<></>);
        }
    };

    function findValueByName(arr, nameToFind) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].nameOfProperty === nameToFind) {
                return arr[i].message;
            }
        }
        return null;
    }

    const [showAnnotationModal, setShowAnnotationModal] = useState(false);
    const handleAnnotationModalShow = () => setShowAnnotationModal(true);
    const handleAnnotationModalClose = () => setShowAnnotationModal(false);

    return (
        <>
            <Card style={{
                border: 'none',
                boxShadow: 'none'
            }}>
                <Card.Body>
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
                                                    <ButtonAddAnnotation addAnnotation={
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
                                        findValueByName(props.annotations, analysisProps.nameOfProperty) !== null
                                            ?
                                            <tr>
                                                <td colSpan={4}>
                                                    <div className="container bg-secondary p-1">
                                                        <p className="text-light">{checkAndDisplayAnnotation(analysisProps.nameOfProperty)}</p>
                                                    </div>
                                                </td>
                                            </tr>
                                            :
                                            <></>
                                    }
                                </>

                            ))}
                        </tbody>
                    </table>
                </Card.Body>
            </Card>

            <AnnotationModal
                showModal={showAnnotationModal}
                handleClose={handleAnnotationModalClose}
                onSave={createAnnotation} />
        </>
    );
};

export default AnalysisTable;
