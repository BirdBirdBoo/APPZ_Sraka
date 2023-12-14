import React from "react";
import { Card, CardGroup } from "react-bootstrap";

function AnalysisCard(props) {
    const cardTextStyle = {
      fontSize: '30px', // Adjust font size as needed
    };

    const cardBodyStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      };
    return (
        <CardGroup style={{padding:'10px'}} onClick={() => props.onClick(props.analysisId)}>
            <Card>
                <Card.Body style={cardBodyStyle}>
                    <Card.Img style={{height:'50px', width:'50px'}} src='https://img.freepik.com/premium-vector/poop-pixel-style-vector-illustration_658931-84.jpg'/>
                    <Card.Text style={{ ...cardTextStyle}}>{props.name}</Card.Text>
                </Card.Body>
            </Card>
            <Card>
                <Card.Body style={cardBodyStyle}>
                    <Card.Text style={{ ...cardTextStyle, fontSize:'16px'}}>{props.description}</Card.Text>
                </Card.Body>
            </Card>
            <Card>
                <Card.Body style={cardBodyStyle}>
                    <Card.Text style={{ ...cardTextStyle}}>{props.date}</Card.Text>
                </Card.Body>
            </Card>
        </CardGroup>
    );
  }
  
  

export default AnalysisCard;