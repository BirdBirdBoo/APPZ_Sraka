import React from 'react';
import { Card } from 'react-bootstrap';

function BloodAnalysisTable(){
  // Data for the table
  const data = [
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

export default BloodAnalysisTable;
