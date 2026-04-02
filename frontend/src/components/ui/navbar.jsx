import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group"
import Button from "./button";
import {useNavigate} from 'react-router-dom'


function Navbar(){
    const navigate = useNavigate();
    return (
    <ButtonGroup className="flex mx-auto ">
        <Button className="cursor-pointer" onClick={() => navigate('/')}>
            Home
        </Button>
        <Button className="cursor-pointer" onClick={() => navigate('/search')}>
            Search Question
        </Button>
        <Button className="cursor-pointer" onClick={() => navigate('/revise')}>
            Revise
        </Button>
        <Button className="cursor-pointer" onClick={() => navigate('/profile')}>
            Profile
        </Button>
    </ButtonGroup>
    );
}

export default Navbar;