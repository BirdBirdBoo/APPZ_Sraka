import React from "react";
import { Card, CardGroup } from "react-bootstrap";
import { formatDate } from "../dateFormatter";

function AnalysisCard(props) {

    const icons = new Map([
        ['GeneralUrineTest', 'https://cdn-icons-png.flaticon.com/512/4320/4320509.png'],
        ['GeneralBloodTest', 'https://cdn-icons-png.flaticon.com/512/205/205916.png'],
        ['FullBloodTest', 'https://cdn-icons-png.flaticon.com/512/205/205916.png'],
      ]);

    const cardTextStyle = {
      fontSize: '30px', // Adjust font size as needed
    };

    const cardBodyStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      };

    console.log(icons[props.type])

    return (
        <CardGroup style={{padding:'10px'}} onClick={() => props.onClick(props.analysisId)}>
            <Card>
                <Card.Body style={{...cardBodyStyle, cursor:'pointer'}}>
                    <Card.Img style={{height:'50px', width:'50px',}} src={icons.get(props.type)}/>
                    <Card.Text style={{ ...cardTextStyle}}>{props.name}</Card.Text>
                </Card.Body>
            </Card>
            <Card>
                <Card.Body style={{...cardBodyStyle, cursor:'pointer'}}>
                    <Card.Text style={{ ...cardTextStyle, fontSize:'16px'}}>{props.description}</Card.Text>
                </Card.Body>
            </Card>
            <Card>
                <Card.Body style={{...cardBodyStyle, cursor:'pointer'}}>
                    <Card.Text style={{ ...cardTextStyle}}>{formatDate(props.date)}</Card.Text>
                </Card.Body>
            </Card>
        </CardGroup>
    );
  }
  
  

export default AnalysisCard;