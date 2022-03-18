import { useState } from "react";

const DEFAULT_FORM_DATA = {
  username: "",
  password: "",
  firstName: "",
  lastName: "",
  email: "",
};

/** Show the sign up form and update the user state 
 * 
 * props:
 *  - signup: a function passed down from App component
 * 
 * state:
 *  - formData: {username, password, firstName, lastName, email}
 * 
 * Routes -> LoginForm
 */

function RegisterForm({ register }) {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);

  function handleChange(evt) {
    const { name, value } = evt.target;

    setFormData(fData => ({
      ...fData,
      [name]: value,
    }));
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    register(formData);
    setFormData(DEFAULT_FORM_DATA);
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

      <label htmlFor="firstName">
        First name
      </label>
      <input
        id="firstName"
        name="firstName"
        value={formData.firstName}
        required
        onChange={handleChange}
      />

      <label htmlFor="lastName">
        Last name
      </label>
      <input
        id="lastName"
        name="lastName"
        value={formData.lastName}
        required
        onChange={handleChange}
      />

      <label htmlFor="email">
        Email
      </label>
      <input
        id="email"
        name="email"
        type="email"
        value={formData.email}
        required
        onChange={handleChange}
      />
      <button>Submit</button>
    </form>
  );
}

export default RegisterForm;