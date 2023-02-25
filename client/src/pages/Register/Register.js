import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, login, showAlert, hideAlert } from "../../redux/userSlice/userSlice";
import AlertMessage from "../../components/AlertMessage/AlertMessage";
import InputForm from "../../components/InputForm/InputForm";
import "./register.css";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 15rem;
  background: linear-gradient(to right, #053651, #ffffff);

  height: 100vh;
`;

const StyledRegister = styled.div`
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);

  background-color: #ffffff;
  padding: 1rem;
  //border: 1px solid #000;
  width: 400px;
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  margin: 0 auto;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  .login-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding-bottom: 2rem;
  }

  @media (max-width: 768px) {
    width: 85%;
  }

  h2 {
    font-size: 3rem;
    //margin-bottom: 2rem;
    color: #950740;
  }
  form {
    //margin-top: 2rem;
  }

  .btn-submit {
    margin-top: 2rem;
    width: 300px;
    background-color: #1f2833;
    color: #fff;
    border: none;
    padding: 1.5rem 2.5rem;
    border-radius: 1rem;
    cursor: pointer;

    &:hover {
      background-color: #950740;
      transition: all 0.3s ease-in-out;
    }
  }

  .form-input {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    label {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
      font-family: "Montserrat", sans-serif;
    }

    input {
      padding: 1.5rem;
      //border: 1px solid #000;
      border: none;
      border-radius: 5px;
      width: 300px;
      background-color: #f1f1f1;
    }
    input:focus {
      outline: #950740 solid 2px;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    padding: 2rem;
  }

  .member-btn {
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: #950740;
    font-size: 1.5rem;
    font-weight: bold;
  }

  .form-msg {
    padding-top: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;

    p {
      font-size: 1.4rem;
      display: flex;
      gap: 0.5rem;
    }
  }
`;

const initialState = {
  name: "",
  email: "",
  password: "",
  isRegistered: true,
  //showAlert: false,
};

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const dispatch = useDispatch();
  const { isLoading, showAlert, user } = useSelector((state) => state.user);

  const changeMemberStatus = () => {
    setValues({ ...values, isRegistered: !values.isRegistered });
  };

  const handlerChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
    const { name, email, password, isRegistered } = values;
    if (!email || !password || (!isRegistered && !name)) {
      dispatch(showAlert());
      return;
    }

    const newUser = { name, email, password };
    if (isRegistered) {
      dispatch(login(newUser));
    } else {
      dispatch(register(newUser));
    }
    dispatch(hideAlert());
  };

  useEffect(() => {
    if (user) {
      console.log(user);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [user, navigate]);
  return (
    <Wrapper>
      <StyledRegister>
        <form onSubmit={handlerSubmit}>
          <div>
            {values.isRegistered ? (
              <div className="login-header">
                <p>The Concept App</p>
                <h2>LOGIN</h2>
                <p>Welcome back!</p>
              </div>
            ) : (
              <div className="login-header">
                <p>The Concept App</p>
                <h2>REGISTER</h2>
                <p></p>
              </div>
            )}
          </div>
          {showAlert && <AlertMessage />}
          {!values.isRegistered && (
            <InputForm
              type="text"
              name="name"
              value={values.name}
              handlerChange={handlerChange}
              labelText="Name*"
            />
          )}
          <InputForm
            type="email"
            name="email"
            value={values.email}
            handlerChange={handlerChange}
            labelText="Email*"
          />
          <InputForm
            type="password"
            name="password"
            value={values.password}
            handlerChange={handlerChange}
            labelText="Password*"
          />
          <button className="btn-submit" type="submit" disabled={isLoading}>
            Submit
          </button>
          <div className="form-msg">
            <p>
              {values.isRegistered
                ? "How can you still not be a member?"
                : "I know you're already a member?"}
              <button type="button" className="member-btn" onClick={changeMemberStatus}>
                {values.isRegistered ? "Register" : "Login"}
              </button>
            </p>
          </div>
        </form>
      </StyledRegister>
    </Wrapper>
  );
};

export default Register;
