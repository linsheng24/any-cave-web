import type { NextPage } from 'next'
import {Alert, Button, Grid, Grow, TextField, Typography} from "@mui/material";
import {styled} from "@material-ui/core";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import {useEffect, useLayoutEffect, useState} from "react";
import AuthService from "../services/auth-service";
import useUser from "../states/hooks/use-user";
import {useForm, Controller} from "react-hook-form";

const BodyContainer = styled(Grid)({
  height: '100vh',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center'
});

const FormContainer = styled(Grid)({
  background: 'white',
  padding: '30px'
});

const FieldContainer = styled(Grid)({
  textAlign: 'center',
  margin: '10px'
});

const TextInput = styled(TextField)({
  height: '50px',
  width: '60%',
});

const SubmitButton = styled(Button)({
  height: '50px',
  width: '60%',
  borderRadius: '20px'
});

const GoogleButton = styled(Button)({
  height: '50px',
  width: '30%',
  borderRadius: '0 20px 20px 0'
});
const FacebookButton = styled(Button)({
  height: '50px',
  width: '30%',
  borderRadius: '20px 0 0 20px'
});

const LoginAlert = styled(Alert)({
  position: 'fixed',
  width: '100%',
  textAlign: 'center',
  transition: 'all 2s'
});

const Login: NextPage = () => {
  const { control, handleSubmit } = useForm();
  const [isError, setIsError] = useState(false);
  const { mutate } = useUser();

  // @ts-ignore
  const loginHandler = async (data) => {
    const { email, password } = data;
    const authService = new AuthService();
    // @ts-ignore
    mutate('login');
    const result = await authService.login(email, password);
    if (result instanceof Error) {
      setIsError(true);
      setTimeout(() => setIsError(false), 3000);
      // @ts-ignore
      mutate(null);
    } else {
      mutate();
    }
  }

  // @ts-ignore
  const keyDownHandler = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(loginHandler)();
    }
  }

  return (
    <>
      <Grow in={isError}>
        <LoginAlert severity="warning">Login error, pls try again!</LoginAlert>
      </Grow>
      <form onSubmit={handleSubmit(loginHandler)}>
        <BodyContainer
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <FormContainer
            item
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            xs={12}
            sm={6}
            md={5}
          >
            <Typography variant="h4" gutterBottom component="div">
              Enter Any Cave
            </Typography>
            <FieldContainer
              item
              xs={12}
            >
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({field}) => (
                  <TextInput
                    label="email"
                    variant="outlined"
                    type="email"
                    onKeyDown={keyDownHandler}
                    {...field}
                  />
                )
                }
              />
            </FieldContainer>
            <FieldContainer
              item
              xs={12}
            >
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({field}) => (
                  <TextInput
                    label="password"
                    variant="outlined"
                    type="password"
                    onKeyDown={keyDownHandler}
                    {...field}
                  />
                )
                }
              />
            </FieldContainer>
            <FieldContainer
              item
              xs={12}
            >
              <SubmitButton
                variant="outlined"
                color="primary"
                type="submit"
                // onClick={loginHandler}
              >
                Login
              </SubmitButton>
            </FieldContainer>
            <FieldContainer
              item
              xs={12}
            >
              <FacebookButton variant="outlined" color="primary">
                <FacebookIcon/>
              </FacebookButton>
              <GoogleButton variant="outlined" color="primary">
                <GoogleIcon/>
              </GoogleButton>
            </FieldContainer>
          </FormContainer>
        </BodyContainer>
      </form>
    </>
  );
}

export default Login;
