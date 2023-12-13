import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import ApplicationPaths from '../paths';

import '../styles/styles.css';

function VerticalPatientNavbar() {
  // const buttonStyle = {
  //   backgroundColor: '#79B7FF',
  //   borderColor: '#79B7FF',
  //   marginBottom: '25px', // Adds space between the buttons
  //   borderRadius: '8px', // Rounded corners
  //   color: 'black',
  //   boxShadow: 'none', // Removes any box shadow
  //   fontSize: 25,
  //   textAlign: 'center',
  //   width: '100%',
  // };

  // const buttonGroupWrapperStyle = {
  //   margin: '15px',
  //   padding: '20px',
  //   width: '100%',
  //   boxSizing: 'border-box',
  //   display: 'inline-block', // Allow the ButtonGroup to be only as tall as its content
  //   verticalAlign: 'top'
  // };

  const [showDropdown, setShowDropdown] = useState(false);

  // Function to handle item selection
  const handleSelect = (eventKey) => {
    setShowDropdown(false);
  };


  return (
    <ButtonGroup vertical size="lg"  className="button-group-wrapper">
      <Button className="btn-style" href={ApplicationPaths.PatientProfile}>Профіль</Button>
      <Button className="btn-style" href={ApplicationPaths.PatientChat}>Зв'язатись з лікарем</Button>

      <Dropdown as={ButtonGroup} show={showDropdown} style={{ width: '100%' }} onToggle={() => setShowDropdown(!showDropdown)} onSelect={handleSelect}>
        <Dropdown.Toggle className="btn-style" id="dropdown-custom-components">
          Аналізи
        </Dropdown.Toggle>

        <Dropdown.Menu style={{ width: '100%', backgroundColor: '#79B7FF', borderRadius: '8px' }}>
          <Dropdown.Item eventKey="1"  className="dropdown-item" >Аналіз крові</Dropdown.Item>
          <Dropdown.Item eventKey="2"  className="dropdown-item" >Аналіз сечі</Dropdown.Item>
          <Dropdown.Item eventKey="3"  className="dropdown-item" >Алергени</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </ButtonGroup>
  );
}

export default VerticalPatientNavbar;
