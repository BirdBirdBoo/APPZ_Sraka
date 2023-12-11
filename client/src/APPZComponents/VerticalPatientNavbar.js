import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function VerticalPatientNavbar() {
   return (
    <ButtonGroup vertical size="lg">
      <Button>Профіль</Button>
      <Button>Зв'язатись з лікарем</Button>

      <DropdownButton
        as={ButtonGroup}
        title="Аналізи"
        id="bg-vertical-dropdown-1"
        size="lg"
      >
        <Dropdown.Item eventKey="1">Аналіз крові</Dropdown.Item>
        <Dropdown.Item eventKey="2">Аналіз сечі</Dropdown.Item>
        <Dropdown.Item eventKey="3">Алергени</Dropdown.Item>
      </DropdownButton>
    </ButtonGroup>
  );
}

export default VerticalPatientNavbar;