import { signInWithEmailAndPassword } from 'firebase/auth';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import auth from '../Firebase/firebase.config';

const Login = () => {

  const handleLogin =(e)=>{
    e.preventDefault();
    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password)
    signInWithEmailAndPassword(auth, email, password)
    .then(result =>{
      const user = result.user;
      console.log('login user', user)
    })
    .catch(error =>{
      console.log(error.message)
    })
  }

    return (
     <div className='w-50 mx-auto'>
     <h3 className='text-center text-primary fw-bold mb-4'>Login</h3>
     <Form onSubmit={handleLogin}>
     <Form.Group className="mb-3" controlId="formBasicEmail">
       <Form.Label>Email address</Form.Label>
       <Form.Control type="email" name='email' placeholder="Enter email" required />
     </Form.Group>

     <Form.Group className="mb-3" controlId="formBasicPassword">
       <Form.Label>Password</Form.Label>
       <Form.Control type="password" name='password' placeholder="Password" required />
     </Form.Group>
     <Form.Group className="mb-3" controlId="formBasicCheckbox">
       <Form.Check type="checkbox" label="Check me out" />
     </Form.Group>
     <Button variant="primary" type="submit">
       Submit
     </Button>
    </Form>
     </div>
    );
};

export default Login;