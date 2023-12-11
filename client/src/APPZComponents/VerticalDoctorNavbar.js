import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function VerticalDoctorNavbar() {
  return (
    <ButtonGroup vertical size="lg">
      <Button>Профіль</Button>
      <Button>Пацієнти</Button>
      <Button>Записи на прийом</Button>

      <DropdownButton
        as={ButtonGroup}
        title="Analyses"
        id="bg-vertical-dropdown-1"
        size="lg"
      >
        <Dropdown.Item eventKey="1">Blood Analysis</Dropdown.Item>
        <Dropdown.Item eventKey="2">Urine Analysis</Dropdown.Item>
        <Dropdown.Item eventKey="3">Allergens Analisis</Dropdown.Item>
      </DropdownButton>
    </ButtonGroup>
    );
}

export default VerticalDoctorNavbar;