import logo from '../assets/home.jpg';
import '../home.css';
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
