import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import '../styles/styles.css';

function VerticalDoctorNavbar() {  
  return (
    <ButtonGroup vertical size="lg" className="button-group-wrapper">
      <Button className="btn-style">Профіль</Button>
      <Button className="btn-style">Пацієнти</Button>
      <Button className="btn-style">Записи на прийом</Button>
    </ButtonGroup>
    );
}

export default VerticalDoctorNavbar;