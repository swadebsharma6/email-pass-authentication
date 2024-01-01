import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import auth from '../Firebase/firebase.config';

const Register = () => {

  const [passError, setPassError] = useState('');
  const [success, setSuccess] = useState(false)


  const handleRegister =(e)=>{
    e.preventDefault();
    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;

    if(!/(?=.*[A-Z]).*[A-Z]/.test(password)){
      setPassError('Please Provide at least 2 Uppercase');
      return;
    }
    if(password.length < 6){
      setPassError('Please Provide at least 6 character');
      return;
    }
    if(!/(?=.*?[#?!@$%^&*-])/.test(password)){
      setPassError('Please provide a special character');
      return;
    }
 
   setPassError('');
   setSuccess(true);
    // create user
    createUserWithEmailAndPassword(auth, email,password)
    .then(result =>{
      const user = result.user;
      console.log('create user', user);
      setSuccess(true);
      form.reset();
    })
    .catch(error =>{
      console.log(error.message);
      setPassError(error.message)
    })
  

  }

    return (
        <div className='w-25 mx-auto'>
        <h3 className='text-center text-primary fw-bold mb-4'>Register</h3>
        <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name='email' placeholder="Enter email" required/>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password"  name='password' placeholder="Password" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
       </Form>
      {success && <p className='text-success text-center'>User Created Successfully</p>}
       <p className='text-danger text-center'>{passError}</p>
       <p className='text-center '>Already have an account <Link to='/login'>login</Link></p>
        </div>
    );
};

export default Register;