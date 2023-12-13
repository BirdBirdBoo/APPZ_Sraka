import React from 'react';
import { Card } from 'react-bootstrap';

function AllergensTable(){
  // Data for the table
  const data = [
    { Показник: 'Злаки', Результати: 'gamno' },
    { Показник: 'Молюски', Результати: 'gamno' },
    { Показник: 'Яйця', Результати: 'gamno' },
    { Показник: 'Риба', Результати: 'gamno' },
    { Показник: 'Арахіс', Результати: 'gamno' },
    { Показник: 'Соя', Результати: 'gamno' },
    { Показник: 'Молочні продукти', Результати: 'gamno' },
    { Показник: 'Горіхи', Результати: 'gamno' },
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

export default AllergensTable;
