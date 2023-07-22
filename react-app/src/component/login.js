// import logo from './logo.svg';
import '../assets/style.css';
// import './App.css';

function Login() {
  return (
    <div className='login'>
      <div className='avatar'>
        {/* <img src='avatar.png' alt='img'/> */}
      </div>
      <h2>Login</h2>
      <h3>Welcome back to Login</h3>
       <form className='login-form'>
        <div className='textbox'>
          <input type="email" placeholder= "Nmae"/>
          <span className='material-symbols-outlined'>
            account_circle
          </span>
        </div>
        <div className='textbox'>
          <input type='password'/>
          <span className='material-symbols-outlined'>Lock</span>
        </div>
        <button type="submit">LOGIN</button>
        <p>forgot?</p>
       </form>
    </div>
  );
}

export default Login;
