import logo from './assets/home.jpg';
import './home.css';

function Background() {
  const backgroundImageStyle = {
    backgroundImage: `url(${logo})`
  };

  return (
    <div className="background-image" style={backgroundImageStyle}>
      <h3 className="heading">Burguer Queen</h3>
      <div className='container'>
      <input type="text" placeholder="email" />
      <input type="text" placeholder="password" />
      <button className='loginButton'>Login</button>
      </div>
    </div>
  );
}

export default Background;
