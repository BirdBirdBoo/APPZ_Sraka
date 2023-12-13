// Calendar.js
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function Calendar(){
  // Example data
  const exampleAppointments = [
    { id: 1, title: 'Косик Назар Іванович', date: '2023-12-13T12:40:00' },
    { id: 2, title: 'Юрга Володимир Володимирович', date: '2023-12-15T14:30:00' },
    { id: 3, title: 'Юрга Володимир Володимирович', date: '2023-12-16T14:30:00' },
    { id: 4, title: 'Юрга Володимир Володимирович', date: '2023-12-15T14:30:00' },
    { id: 5, title: 'Юрга Володимир Володимирович', date: '2023-12-15T14:30:00' },
    { id: 6, title: 'Юрга Володимир Володимирович', date: '2023-12-15T14:30:00' },
    { id: 7, title: 'Юрга Володимир Володимирович', date: '2023-12-15T14:30:00' },
    { id: 8, title: 'Юрга Володимир Володимирович', date: '2023-12-15T14:30:00' },
    // Add more appointments as needed
  ];

  // Merge input appointments with example data
  const allAppointments = [...exampleAppointments];

  // Filter out past appointments
  const futureAppointments = allAppointments.filter(
    (appointment) => new Date(appointment.date) > new Date()
  );

  // Group future appointments by date
  const groupedAppointments = futureAppointments.reduce((acc, appointment) => {
    const date = new Date(appointment.date).toLocaleDateString();
    acc[date] = acc[date] || [];
    acc[date].push(appointment);
    return acc;
  }, {});

  return (
    <Card>
        <Card.Body style={{ height: '760px', overflowY: 'auto'}}>
            <Container>
            {Object.keys(groupedAppointments).map((date) => (
                <Row key={date} className="mt-4">
                <Col>
                    <h3>{date}</h3>
                    {groupedAppointments[date].map((appointment) => (
                    <Card key={appointment.id} className="mb-2">
                        <Card.Body>
                        <Card.Title>{appointment.title}</Card.Title>
                        <Card.Text>{new Date(appointment.date).toLocaleTimeString()}</Card.Text>
                        </Card.Body>
                    </Card>
                    ))}
                </Col>
                </Row>
            ))}
            </Container>
        </Card.Body>
    </Card>
  );
};

export default Calendar;
