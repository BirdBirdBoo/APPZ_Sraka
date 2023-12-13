import React from 'react';
import { Card } from 'react-bootstrap';

function UrineAnalysisTable(){
  // Data for the table
  const data = [
    { Показник: 'Білірубін (BIL)', Результати: 'gamno' },
    { Показник: 'Еритроцити (BLD)', Результати: 'gamno' },
    { Показник: 'Лейкоцити (LEU)', Результати: 'gamno' },
    { Показник: 'Уробіліноген (URO)', Результати: 'gamno' },
    { Показник: 'Білок (PRO)', Результати: 'gamno' },
    { Показник: 'Кислотність (pH)', Результати: 'gamno' },
    { Показник: 'Плотність (S.G)', Результати: 'gamno' },
    { Показник: 'Кетонові тіла (KET)', Результати: 'gamno' },
    { Показник: 'Нітрити (NIT)', Результати: 'gamno' },
    { Показник: 'Глюкоза (GLU)', Результати: 'gamno' },
    { Показник: 'Колір (COLOR)', Результати: 'gamno' },
  ];

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
                    {data.map((item, index) => (
                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#9FC5E8' : '#95BDE3' }}>
                        <td style={{padding:'10px'}}>{item['Показник']}</td>
                        <td style={{padding:'10px'}}>{item['Результати']}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </Card.Body>
    </Card>
  );
};

export default UrineAnalysisTable;
