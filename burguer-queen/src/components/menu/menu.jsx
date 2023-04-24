import logo from '../../assets/home.jpg';
import '../login/login.css';
import { Button } from 'react-bootstrap';

export default function Breakfast() {
    const backgroundImageStyle = {
        backgroundImage: `url(${logo})`
      };

    return ( 
    <div className="background-image" style={backgroundImageStyle}>
      <Button variant="primary">Click me</Button>

    </div>
    )
};
