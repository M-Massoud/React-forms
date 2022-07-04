import { useState } from 'react';

export default function RegisterComponent() {
  const [registerUser, setRegisterUser] = useState({
    name: '',
    email: '',
    userName: '',
    password: '',
    confirmPassword: '',
  });

  function handleUserChange(event) {
    // console.log(event.target.id, event.target.value);
    setRegisterUser({
      ...registerUser,
      [event.target.id]: event.target.value,
    });
    handleRegisterErrors(event.target.id, event.target.value);
  }

  // handle user submit
  function handleUserSubmit(event) {
    event.preventDefault();
    console.log(registerUser);
    handleRegisterErrors(event.target.id, event.target.value);
    if (!registerUser.name) console.log('enter your name');
  }

  // email format
  const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

  // user name format not allowing white spaces on it
  const userNameRegex = new RegExp(/^\S*$/);

  // strong password format
  const passwordRegex = new RegExp(
    /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/
  );

  // handle errors
  const [registerErrors, setRegisterErrors] = useState({
    nameError: '',
    emailError: '',
    userNameError: '',
    passwordError: '',
    confirmPasswordError: '',
  });

  function handleRegisterErrors(field, value) {
    switch (field) {
      case 'name':
        setRegisterErrors({
          ...registerErrors,
          nameError: value.length === 0 ? 'This Field is required' : '',
        });
        break;

      case 'email':
        setRegisterErrors({
          ...registerErrors,
          emailError:
            value.length === 0
              ? 'This Field is required'
              : '' || emailRegex.test(value) === false
              ? 'invalid email'
              : '',
        });
        break;

      case 'userName':
        setRegisterErrors({
          ...registerErrors,
          userNameError:
            value.length === 0
              ? 'This Field is required'
              : '' || userNameRegex.test(value) === false
              ? "user name can't contain white spaces"
              : '',
        });
        break;

      case 'password':
        setRegisterErrors({
          ...registerErrors,
          passwordError:
            value.length === 0
              ? 'This Field is required'
              : '' || passwordRegex.test(value) === false
              ? 'choose a stronger password'
              : '',
        });
        break;

      case 'confirmPassword':
        setRegisterErrors({
          ...registerErrors,
          confirmPasswordError:
            value.length === 0
              ? 'This Field is required'
              : '' || value !== registerUser.password
              ? 'not a matched password'
              : '',
        });
        break;

      default:
        setRegisterErrors({ ...registerErrors });
        break;
    }
  }

  return (
    <form onSubmit={handleUserSubmit}>
      <hr />
      <h2 className="my-5">Register Form</h2>

      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className={`form-control ${
            registerErrors.nameError && 'border-danger'
          } `}
          id="name"
          aria-describedby="nameHelp"
          onChange={handleUserChange}
          value={registerUser.name}
        />
        <div id="nameHelp" className="form-text text-danger ">
          {registerErrors.nameError}
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="text"
          className={`form-control ${
            registerErrors.emailError && 'border-danger'
          } `}
          id="email"
          aria-describedby="emailError"
          onChange={handleUserChange}
          value={registerUser.email}
        />
        <div id="emailError" className="form-text text-danger">
          {registerErrors.emailError}
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="userName" className="form-label">
          user name
        </label>
        <input
          type="text"
          className={`form-control ${
            registerErrors.userNameError && 'border-danger'
          } `}
          id="userName"
          aria-describedby="userNameError"
          onChange={handleUserChange}
          value={registerUser.userName}
        />
        <div id="userNameError" className="form-text text-danger">
          {registerErrors.userNameError}
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className={`form-control  ${
            registerErrors.passwordError && 'border-danger'
          } `}
          id="password"
          aria-describedby="passwordError"
          onChange={handleUserChange}
          value={registerUser.password}
        />
      </div>
      <div id="passwordError" className="form-text text-danger">
        {registerErrors.passwordError}
      </div>

      <div className="mb-3">
        <label htmlFor="confirmPassword" className="form-label">
          confirm Password
        </label>
        <input
          type="password"
          className={`form-control  ${
            registerErrors.confirmPasswordError && 'border-danger'
          } `}
          id="confirmPassword"
          aria-describedby="passwordError"
          onChange={handleUserChange}
          value={registerUser.confirmPassword}
        />
      </div>
      <div id="passwordError" className="form-text text-danger">
        {registerErrors.confirmPasswordError}
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}
