import { React, useEffect } from 'react';
import { Card } from 'react-bootstrap';

function AnalysisTable(props){
      // Data for the table
             
      useEffect(() => {
        console.log(props.data);
    }, []);

  return (
    <Card style={{
      border: 'none', 
      boxShadow: 'none' 
  }}>
        <Card.Body>
            <table style={{borderRadius: '10px', overflow: 'hidden', width:'100%'}}>
                <thead>
                    <tr style={{ backgroundColor: '#6D9EEB', color: 'white'}}>
                    <th style={{padding:'10px'}}>Показник</th>
                    <th style={{padding:'10px'}}>Результати</th>
                    <th style={{padding:'10px'}}>Відхилення</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((analysisProps) => (
                    <tr style={analysisProps.isCritical ? { backgroundColor: '#ff6673' }:{ backgroundColor: '#9FC5E8' }}>
                        <td style={{padding:'10px'}}>{analysisProps.nameOfProperty}</td>
                        <td style={{padding:'10px'}}>{analysisProps.number}</td>
                        <td style={{padding:'10px'}}>{analysisProps.delta}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </Card.Body>
    </Card>
  );
};

export default AnalysisTable;
