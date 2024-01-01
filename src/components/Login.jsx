import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import auth from '../Firebase/firebase.config';

const Login = () => {

  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');

  const handleLogin =(e)=>{
    e.preventDefault();
    const form = e.target;
    setSuccess('')

    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password)
    signInWithEmailAndPassword(auth, email, password)
    .then(result =>{
      const user = result.user;
      console.log('login user', user);
      alert('User Login Successfully');
      form.reset();
      setSuccess(true);
    })
    .catch(error =>{
      console.log(error.message)
    })
  }

  const handleEmailBlur = event =>{
    const email = event.target.value;
    setEmail(email)
  }

  const handleForgetPass =()=>{
    if(!email){
      alert("Please Enter Your Email")
      return;
    }
    sendPasswordResetEmail(auth, email)
    .then(()=>{
      alert('Password reset email send. Please Check Your email!')
    })
    .catch(error =>{
      console.log(error.message)
    })
  }

    return (
     <div className='w-25 mx-auto'>
     <h3 className='text-center text-primary fw-bold mb-4'>Login</h3>
     <Form onSubmit={handleLogin}>
     <Form.Group className="mb-3" controlId="formBasicEmail">
       <Form.Label>Email address</Form.Label>
       <Form.Control onBlur={handleEmailBlur} type="email" name='email' placeholder="Enter email" required />
     </Form.Group>

     <Form.Group className="mb-3" controlId="formBasicPassword">
       <Form.Label>Password</Form.Label>
       <Form.Control type="password" name='password' placeholder="Password" required />
     </Form.Group>
     <Button variant="primary" type="submit">
       Submit
     </Button>
    </Form>
 <small><button onClick={handleForgetPass} className="btn btn-link">Reset Password</button></small>
    {success && <p className='text-primary'>User Login successfully</p> }
    <p className='text-center '>New to this site <Link to='/register'>Register</Link></p>
     </div>
    );
};

export default Login;