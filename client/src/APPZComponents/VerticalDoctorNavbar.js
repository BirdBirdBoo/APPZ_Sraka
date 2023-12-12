import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';

import '../styles/styles.css';

function VerticalDoctorNavbar() {
  const [showDropdown, setShowDropdown] = useState(false);

  // Function to handle item selection
  const handleSelect = (eventKey) => {
    setShowDropdown(false);
  };

  
  return (
    <ButtonGroup vertical size="lg" className="button-group-wrapper">
      <Button className="btn-style">Профіль</Button>
      <Button className="btn-style">Пацієнти</Button>
      <Button className="btn-style">Записи на прийом</Button>
    </ButtonGroup>
    );
}

export default VerticalDoctorNavbar;