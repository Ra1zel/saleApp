import FormLabel from "@mui/material/FormLabel"
import Typography from "@mui/material/Typography";
import React, {useState} from "react";
import {
  CenterFormOnScreen,
  CenterWithinForm,
  CustomFormPaper,
  FormRowContainer,
  StyledFormButton,
  StyledTextField,
} from "../components/Forms/CommonFormComponents.tsx";
import {z} from 'zod'
import {Controller, SubmitHandler, useForm} from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers/zod";
import SignupFormComponent from "../components/Forms/SignupFormComponent.tsx";
import axios from "axios";
import {Navigate, useNavigate} from "react-router-dom";
import {AppDispatch, RootState} from "../Store/store.ts";
import {useDispatch, useSelector} from "react-redux";
import authSlice, {loginUser} from "../Store/AuthSlice.ts";
import Cookies from 'js-cookie'
import {decode} from 'universal-base64url'

const loginFormFields = z.object({
  email: z.string({
    required_error: "This Field is required",
    invalid_type_error: "Email must be a string."
  })
    .email("Invalid Email. Please provide a correct email."),
  password: z.string({
    required_error: "This field is required.",
    invalid_type_error: "Password must be a string."
  }).min(8, "Password must contain at least 8 characters.").max(128, "password length cannot be greater than 128 characters.")
}).required()
type LoginFormFields = z.infer<typeof loginFormFields>

interface loginFormComponentProps {
  changeActiveFormComponent: () => void
}

export const getUserIdFromCookie = (): string | null => {
  const cookie = Cookies.get('jwtWithoutSignature')
  if (cookie) {
    const body = decode(cookie.split('.')[1])
    const parsedBody = JSON.parse(body)
    return parsedBody.userId as string
  }
  return null
}

const LoginFormComponent: React.FC<loginFormComponentProps> = ({changeActiveFormComponent}) => {
  const navigate = useNavigate()
  const {control, handleSubmit, reset} = useForm<LoginFormFields>({
    resolver: zodResolver(loginFormFields)
  })
  const dispatch: AppDispatch = useDispatch()
  const loginFormSubmitHandler: SubmitHandler<LoginFormFields> = async (data) => {
    //TODO: Make AJAX call.
    const res = await axios.post('http://localhost:3000/login', data, {withCredentials: true})
    console.log(res)
    reset({email: "", password: ""})
    const cookieData = Cookies.get('jwtWithoutSignature')
    if (cookieData) {
      try {
        const jwtParts = cookieData.split('.')
        const body = decode(jwtParts[1])
        const parsedBody = JSON.parse(body)
        dispatch(loginUser(parsedBody.userId))
      } catch (error) {
        console.log(error)
      }
    }
    // dispatch(loginUser(document.cookie))
    navigate('/')
  }
  return (
    <CustomFormPaper>
      <Typography variant={"h1"}>Login</Typography>
      <form onSubmit={handleSubmit(loginFormSubmitHandler)}>
        <CenterWithinForm>
          <FormRowContainer>
            <FormLabel>Email</FormLabel>
            <Controller
              control={control}
              name={"email"}
              render={({field, fieldState}) => {
                return (
                  <StyledTextField
                    name={field.name}
                    value={field.value}
                    error={fieldState.invalid}
                    helperText={fieldState.invalid ? fieldState.error?.message : ''}
                    onChange={field.onChange} onBlur={field.onBlur} inputRef={field.ref}
                  />
                )
              }}
            />
          </FormRowContainer>
          <FormRowContainer>
            <FormLabel>Password</FormLabel>
            <Controller control={control} name={"password"} render={({field, fieldState}) => {
              return (
                <StyledTextField type={'password'} name={field.name} value={field.value} error={fieldState.invalid}
                                 helperText={fieldState.invalid ? fieldState.error?.message : ''}
                                 onChange={field.onChange} onBlur={field.onBlur} inputRef={field.ref}
                />
              )
            }}/>
          </FormRowContainer>
        </CenterWithinForm>
        <div style={{marginBottom: "60px"}}>
          <Typography>Don't have an account? <span onClick={changeActiveFormComponent}>Sign Up!</span></Typography>
        </div>
        <CenterWithinForm>
          <StyledFormButton sx={{width: "100%"}} type={"submit"}>Submit</StyledFormButton>
        </CenterWithinForm>
      </form>
    </CustomFormPaper>
  )
}


enum activeFormComponent {
  LOGIN = 0,
  SIGNUP = 1,
}

const LoginPage = () => {
  const isUserLoggedIn = useSelector((state: RootState) => state.authReducer.isUserLoggedIn)
  const [currentFormComponent, setCurrentFormComponent] = useState(activeFormComponent.LOGIN)
  const changeActiveFormComponent = () => {
    if (currentFormComponent === activeFormComponent.LOGIN) {
      setCurrentFormComponent(activeFormComponent.SIGNUP)
    } else {
      setCurrentFormComponent(activeFormComponent.LOGIN)
    }
  }
  return (
    <>
      {isUserLoggedIn ? <Navigate to={'/'}/> : (<CenterFormOnScreen>
        {currentFormComponent === activeFormComponent.LOGIN ?
          <LoginFormComponent changeActiveFormComponent={changeActiveFormComponent}/> :
          <SignupFormComponent changeActiveFormComponent={changeActiveFormComponent}/>}
      </CenterFormOnScreen>)
      }
    </>
  );
};

export default LoginPage;