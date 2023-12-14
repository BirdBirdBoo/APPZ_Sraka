import { React, useEffect } from 'react';
import { Card } from 'react-bootstrap';

function BloodAnalysisTable(props){
      // Data for the table
      const testData = [
        { Показник: 'Еритроцити (RBC)', Результати: 'gamno' },
        { Показник: 'Гемоглобін (Hb)', Результати: 'gamno' },
        { Показник: 'Гематокрит (Hct)', Результати: 'gamno' },
        { Показник: 'Лейкоцити (WBC)', Результати: 'gamno' },
        { Показник: 'Тромбоцити (Plt)', Результати: 'gamno' },
        { Показник: 'Сердній об\'єм еритроцитів (MVC)', Результати: 'gamno' },
        { Показник: 'Середній об\'єм гемоглобіну в еритроцитах (MCH)', Результати: 'gamno' },
        { Показник: 'Середній об\'єм гемоглобіну в еритроцитах (MCHC)', Результати: 'gamno' },
        { Показник: 'Лімфоцити (%)', Результати: 'gamno' },
        { Показник: 'Нейтрофіли (%)', Результати: 'gamno' },
        { Показник: 'Моноцити (%)', Результати: 'gamno' },
        { Показник: 'Еонизофіли (%)', Результати: 'gamno' },
        { Показник: 'Базофіли (%)', Результати: 'gamno' },
      ];
             
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
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((analysisProps) => (
                    <tr style={{ backgroundColor: '#9FC5E8' }}>
                        <td style={{padding:'10px'}}>{analysisProps.nameOfProperty}</td>
                        <td style={{padding:'10px'}}>{analysisProps.number}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </Card.Body>
    </Card>
  );
};

export default BloodAnalysisTable;
