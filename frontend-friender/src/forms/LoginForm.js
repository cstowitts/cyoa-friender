import { useState } from "react";

/** Show the login form and update the user state 
 * 
 * props:
 *  - login: a function passed down from App component
 * 
 * state:
 *  - formData: {username, password}
 * 
 * Routes -> LoginForm
 */
const DEFAULT_FORM_DATA = { username: "", password: "" };

function LoginForm({ login }) {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [formErrors, setFormErrors] = useState([]);

  function handleChange(evt) {
    const { name, value } = evt.target;

    setFormData(fData => ({
      ...fData,
      [name]: value,
    }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await login(formData);
      setFormData(DEFAULT_FORM_DATA);
    } catch (err) {
      setFormErrors(err);
    }
  }


  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">
        Username
      </label>
      <input
        id="username"
        name="username"
        value={formData.username}
        required
        onChange={handleChange}
      />

      <label htmlFor="password">
        Password
      </label>
      <input
        id="password"
        name="password"
        value={formData.password}
        required
        onChange={handleChange}
        type="password"
      />
      {formErrors.length
        ? <p className="text-danger">{formErrors[0]}</p>
        : null}
      <button>Submit</button>
    </form>
  );
}

export default LoginForm;