import { React, useEffect } from 'react';
import { Card } from 'react-bootstrap';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import "../styles/styles.css"

function AnalysisTable(props){             
      useEffect(() => {
        console.log(props.data);
    }, []);

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
    <Card style={{
      border: 'none', 
      boxShadow: 'none'
  }}>
        <Card.Body id='table-container'>
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
                        <td style={{padding:'10px'}}>{analysisProps.number}{analysisProps.metric}</td>
                        <td style={{padding:'10px'}}>{Number(analysisProps.delta.toPrecision(4))}{analysisProps.metric}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </Card.Body>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn-style-pdf-export" onClick={exportPDF}>Експортувати у PDF</button>
        </div>
    </Card>
  );
};

export default AnalysisTable;
