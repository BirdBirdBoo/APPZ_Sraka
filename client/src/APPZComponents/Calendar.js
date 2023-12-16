// Calendar.js
import React, {useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { formatDate } from '../dateFormatter';

function Calendar(){
  // Example data
  const exampleAppointments = [
    { id: 1, title: 'Косик Назар Іванович', date: '2023-12-13T12:40:00' },
    { id: 2, title: 'Юрга Володимир Володимирович', date: '2023-12-15T14:30:00' },
    { id: 3, title: 'Рудько Максим Юрійович', date: '2023-12-16T16:30:00' },
    { id: 4, title: 'Косик Назар Іванович', date: '2023-12-14T14:30:00' },
    { id: 5, title: 'Михалевич Павло-Іван Володимирович', date: '2023-12-17T14:30:00' },
    { id: 6, title: 'Здрок Дмитро Олександрович', date: '2023-12-14T16:30:00' },
    { id: 7, title: 'Юрга Володимир Володимирович', date: '2023-12-14T10:30:00' },
    { id: 8, title: 'Рудько Максим Юрійович', date: '2023-12-14T10:30:00' },
    { id: 9, title: 'Юрга Володимир Володимирович', date: '2023-12-16T14:30:00' },
    { id: 10, title: 'Здрок Дмитро Олександрович', date: '2023-12-16T10:30:00' },
    { id: 11, title: 'Косик Назар Іванович', date: '2023-12-16T12:30:00' },
    { id: 12, title: 'Михалевич Павло-Іван Володимирович', date: '2023-12-17T12:30:00' },
    { id: 13, title: 'Рудько Максим Юрійович', date: '2023-12-17T16:30:00' },
    // Add more appointments as needed
  ];

  // Merge input appointments with example data
  const [allAppointments, setAllAppointments] = useState([])

  const fetchAppointments = () => {
    try {
        const sortedAppointments = exampleAppointments.sort((a, b) => new Date(a.date) - new Date(b.date))

        const futureAppointments = sortedAppointments.filter(
          (appointment) => new Date(appointment.date) > new Date()
        );

        const groupedAppointments = futureAppointments.reduce((acc, appointment) => {
            const date = new Date(appointment.date).toLocaleDateString();
            acc[date] = acc[date] || [];
            acc[date].push(appointment);
            return acc;
          }, {});

        setAllAppointments(groupedAppointments);
    } catch (error) {
        console.error("Could not fetch messages:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []); 

  return (
    <Card style={{
      border: 'none',
      boxShadow: 'none',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
  }}>
        <Card.Body style={{ 
                overflowY: 'auto',
                height: '100%',
                overflowY: 'auto'}}>
            <Container>
              {Object.keys(allAppointments).map((date) => (
                  <Row key={date} className="mt-4">
                  <Col>
                      <h3>{formatDate(date)}</h3>
                      {allAppointments[date].map((appointment) => (
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
