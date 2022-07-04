import { useState } from 'react';

export default function LoginComponent() {
  const [logUser, setLogUser] = useState({
    email: '',
    password: '',
  });

  const handleUserChange = function (event) {
    // console.log(event.target.id, event.target.value);
    if (event.target.id === 'user-mail') {
      setLogUser({
        ...logUser,
        email: event.target.value,
      });
    } else if (event.target.id === 'user-password') {
      setLogUser({
        ...logUser,
        password: event.target.value,
      });
    }
    handleValidationErrors(event.target.id, event.target.value);
  };

  const handleUserSubmit = function (event) {
    event.preventDefault();
    console.log(logUser);
  };

  const [logErrors, setLogErrors] = useState({
    mailError: '',
    passwordError: '',
  });

  let mailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

  const handleValidationErrors = function (field, value) {
    switch (field) {
      case 'user-mail':
        setLogErrors({
          ...logErrors,
          mailError:
            value.length === 0
              ? 'This field is required'
              : '' || mailRegex.test(value) === false
              ? 'not a valid email'
              : '',
        });
        break;

      case 'user-password':
        setLogErrors({
          ...logErrors,

          passwordError:
            value.length === 0
              ? 'This field is required'
              : '' || value.length < 8
              ? 'password must be more than 8 characters'
              : '',
        });
        break;

      default:
        setLogErrors({
          ...logErrors,
        });
        break;
    }
  };

  const [passwordVisibility, setpasswordVisibility] = useState(false);

  const changePasswordVisibility = function (event) {
    console.log(event.target.checked);
    if (event.target.checked) setpasswordVisibility(true);
    else setpasswordVisibility(false);
  };

  return (
    <form onSubmit={handleUserSubmit}>
      <h2>Login Form</h2>
      <div className="mb-3">
        <label htmlFor="user-mail" className="form-label  ">
          Email address
        </label>
        <input
          type="text"
          className={`form-control ${logErrors.mailError && 'border-danger'} `}
          id="user-mail"
          aria-describedby="emailHelp"
          value={logUser.email}
          onChange={handleUserChange}
        />
        <div id="emailHelp" className="form-text text-danger ">
          {logErrors.mailError}
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="user-password" className="form-label">
          Password
        </label>
        <input
          type={passwordVisibility === false ? 'password' : 'text'}
          className={`form-control ${
            logErrors.passwordError && 'border-danger'
          } `}
          id="user-password"
          aria-describedby="passwordHelp"
          value={logUser.password}
          onChange={handleUserChange}
        />
      </div>

      <div id="passwordHelp" className="form-text text-danger">
        {logErrors.passwordError}
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="passwordCheck"
          onChange={changePasswordVisibility}
        />
        <label className="form-check-label" htmlFor="passwordCheck">
          Show Password
        </label>
      </div>

      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </form>
  );
}
