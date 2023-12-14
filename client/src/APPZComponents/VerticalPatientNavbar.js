import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import ApplicationPaths from '../paths';

import '../styles/styles.css';

function VerticalPatientNavbar() {
  const [showDropdown, setShowDropdown] = useState(false);

  // Function to handle item selection
  const handleSelect = (eventKey) => {
    setShowDropdown(false);
  };


  return (
    <ButtonGroup vertical size="lg" className="button-group-wrapper">
      <Button className="btn-style" href={ApplicationPaths.ProfilePage}>Профіль</Button>
      <Button className="btn-style" href={ApplicationPaths.PatientChat}>Зв'язатись з лікарем</Button>
      <Button className="btn-style" href={ApplicationPaths.AnalysisPage}>Аналізи</Button>

      {/* <Dropdown as={ButtonGroup} show={showDropdown} style={{ width: '100%' }} onToggle={() => setShowDropdown(!showDropdown)} onSelect={handleSelect}>
        <Dropdown.Toggle className="btn-style" id="dropdown-custom-components">
          Аналізи
        </Dropdown.Toggle>

        <Dropdown.Menu style={{ width: '100%', backgroundColor: '#79B7FF', borderRadius: '8px' }}>
          <Dropdown.Item eventKey="1"  className="dropdown-item" >Аналіз крові</Dropdown.Item>
          <Dropdown.Item eventKey="2"  className="dropdown-item" >Аналіз сечі</Dropdown.Item>
          <Dropdown.Item eventKey="3"  className="dropdown-item" >Алергени</Dropdown.Item>
          <Dropdown.Item eventKey="4"  className="dropdown-item" href={ApplicationPaths.StatsPage}>Статистика КД</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown> */}
      <Button className='btn-style-logout' href={ApplicationPaths.LogoutPage}>Вийти</Button>
    </ButtonGroup>
  );
}

export default VerticalPatientNavbar;
