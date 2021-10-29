import React, { useState, useEffect, useReducer, useContext } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import Input from "../UI/Input/Input";

const emailReducer = (state, action) => {
  if (action.type === "EMAIL_USER_INPUT") {
    return {value: action.val, isValid: action.val.includes("@")};
  }
  if (action.type === "INPUT_BLUR") {
    return {value: state.value, isValid: state.value.includes("@")};
  }
  return {value: "", isValid: false};
};

const passwordReducer = (state, action) => {
  if (action.type === "PASSWORD_CHANGE") {
    return {value: action.value, isValid: action.value.trim().length > 6};
  }
  if (action.type === "PASSWORD_BLUR") {
    return {value: state.value, isValid: state.value.trim().length > 6};
  }
  return {value: "", isValid: false};
};

const Login = () => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const authCtx = useContext(AuthContext)

  const [passState, dispatchPass] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  useEffect(() => {
    console.log('Effect running');
  })

  const {isValid: emailIsValid} = emailState
  const {isValid: passIsValid} = passState


  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('useEffect Working...')
      setFormIsValid(
        emailIsValid && passIsValid,
      );
    }, 500)

    return () => {
      console.log('cleaning...')
      clearTimeout(identifier)
    }

  }, [emailIsValid, passIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type: "EMAIL_USER_INPUT", val: event.target.value});

    // setFormIsValid(emailState.isValid && passState.isValid);
  };

  const passwordChangeHandler = (event) => {
    dispatchPass({type: "PASSWORD_CHANGE", value: event.target.value});

    // setFormIsValid(emailState.isValid && passState.isValid);
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({type: "INPUT_BLUR"});
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPass({type: "PASSWORD_BLUR"});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passState.value);
  };
  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          type="email"
          label="E-Mail"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          id="password"
          type="password"
          label="Password"
          isValid={passIsValid}
          value={passState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
