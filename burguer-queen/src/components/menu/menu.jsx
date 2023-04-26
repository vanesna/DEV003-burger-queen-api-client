import '../login/login.css';
import  Header  from '../Header/header';
import axios from 'axios';

export default function Breakfast() {
    

  const token = localStorage.getItem('accessToken');
  //console.log('token: ', token);

  axios.get('http://localhost:8080/products', {
    headers: {
      'Authorization': `Bearer ${token}` 
    }
  })
  .then((res) => {
    console.log(res.data)
  })
  .catch((error) => {
    console.error(error)
  })

    return ( 
    <div >
      <Header />
      
      
    </div>
    )
};
