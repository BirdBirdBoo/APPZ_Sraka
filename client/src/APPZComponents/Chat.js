import React, {useEffect, useRef, useState, useContext} from 'react';
import axios from "axios";
import {Container, Row, Col} from 'react-bootstrap';
import IncomingMessageComponent from './IncomingMessageComponent';
import OutgoingMessageComponent from './OutgoingMessageComponent';
import MessageTextbox from './MessageTextbox';
import {Card} from 'react-bootstrap';
import AuthContext from "../AuthContext";

function Chat({receiverId = null}) {
    let context = useContext(AuthContext);

    const [messages, setMessages] = useState([]);
    const [receiver, setReceiver] = useState(null);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
    };

    const fetchMessages = async () => {
        try {
            let receiverUserData;
            if (context.isPatient) {
                receiverUserData = context.patientDoctorInfo.userData;
            } else if (context.isDoctor) {
                const allPatients = context.userAsDoctorInfo.patients
                const patient = allPatients.find(patient => patient.userId === receiverId);
                receiverUserData = patient.userData;
            } else {
                const response = await axios.get('https://localhost:7130/api/Login/getInfo', {params: {userId: receiverId}});
                receiverUserData = response.data;
            }
            
            setReceiver(receiverUserData);

            const responseAllMessages = await axios.post('https://localhost:7130/api/Chat/getAllMessages', {
                "first": context.userId,
                "second": receiverUserData.userId
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setMessages(responseAllMessages.data);
            scrollToBottom();
        } catch (error) {
            console.error("Could not fetch messages:", error);
        }
    };

    const handleSent = async (message) => {
        try {
            await axios.post('https://localhost:7130/api/Chat/send', {
                "sender": context.userId,
                "receiver": receiverId ? receiverId : context.patientDoctorInfo.userId,
                "messageType": 0,
                "text": message
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            fetchMessages();
        } catch (error) {
            console.error("Could not fetch messages:", error);
        }
    };

    useEffect(() => {
        fetchMessages();

        const interval = setInterval(fetchMessages, 5000);
        
        return () => clearInterval(interval);
    }, [receiver, receiverId]); 


    return (
        <Card style={{
            border: 'none',
            boxShadow: 'none',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Card.Body style={{
                flex: 1,
                padding: '1rem',
                overflowY: 'auto'
            }}>
                {messages.map((msg, index) => (
                    msg.sender === context.userId
                        ? <OutgoingMessageComponent key={index}
                                                    senderName={context.userData.firstName + " " + context.userData.secondName}
                                                    message={msg.text}
                                                    messageType={msg.messageType}/>
                        : <IncomingMessageComponent key={index}
                                                    senderName={receiver.firstName + " " + receiver.secondName}
                                                    message={msg.text}
                                                    messageType={msg.messageType}/>
                ))}
                <div ref={messagesEndRef}/>
            </Card.Body>
            <MessageTextbox handleSent={handleSent}/>
        </Card>
    );
};


export default Chat;
