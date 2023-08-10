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
  CustomizedDatePicker
} from "../components/Forms/CommonFormComponents.tsx";
import {z} from 'zod'
import {Controller, SubmitHandler, useForm} from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers/zod";
import {Switch} from "@mui/material";
import {styled} from "@mui/material/styles";
import userImagePlaceholder from '../../public/userImagePlaceHolder.svg'
import Button from "@mui/material/Button";

interface loginFormComponentProps {
  changeActiveFormComponent: () => void
}

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
const LoginFormComponent: React.FC<loginFormComponentProps> = ({changeActiveFormComponent}) => {
  const {control, handleSubmit, reset} = useForm<LoginFormFields>({
    resolver: zodResolver(loginFormFields)
  })
  const loginFormSubmitHandler: SubmitHandler<LoginFormFields> = (data) => {
    console.log(data)
    reset({email: "", password: ""})
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
          <StyledFormButton type={"submit"}>Submit</StyledFormButton>
        </CenterWithinForm>
      </form>
    </CustomFormPaper>
  )
}


const SignupFormImageElement = styled('img')`
  width: 100px;
  height: 100px;
  border: 1px solid black;
  margin: 15px;
  border-radius: 50%;
`
const ImageUploadButton = styled(Button)`
  font-size: 14px;
  background-color: #5783ab;
  color: white;
  font-weight: 700;
  //padding-inline: 50px;
  letter-spacing: 1px;
  text-transform: none;

  :hover {
    background-color: #3e5678;
  }

`
const SignUpFormComponent: React.FC<loginFormComponentProps> = ({changeActiveFormComponent}) => {

  return (<>
    <CustomFormPaper>
      <CenterWithinForm>
        <Typography variant={"h1"}>Sign-up</Typography>
      </CenterWithinForm>
      <form>
        <FormRowContainer>
          <FormLabel>Email</FormLabel>
          <StyledTextField></StyledTextField>
        </FormRowContainer>
        <FormRowContainer>
          <FormLabel>Password</FormLabel>
          <StyledTextField></StyledTextField>
        </FormRowContainer>
        <FormRowContainer>
          <FormLabel>Confirm Password</FormLabel>
          <StyledTextField></StyledTextField>
        </FormRowContainer>
        <FormRowContainer>
          <Typography>Already have an account? <span onClick={changeActiveFormComponent}>Login</span></Typography>
        </FormRowContainer>
        <CenterWithinForm>
          <StyledFormButton size={'large'} sx={{marginTop: "15px", width: "100%"}}>Next</StyledFormButton>
        </CenterWithinForm>
      </form>
    </CustomFormPaper>

    <CustomFormPaper>
      <CenterWithinForm>
        <Typography variant={"h1"}>Almost There!</Typography>
      </CenterWithinForm>
      <form>
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
          <SignupFormImageElement src={userImagePlaceholder} alt={"user profile picture"}/>
          <ImageUploadButton size={'small'} sx={{width: "100px", fontSize: "10px", TextTransform: "none"}}>Upload
            Image</ImageUploadButton>
        </div>
        <div style={{display: "flex"}}>
          <FormRowContainer>
            <FormLabel>First Name</FormLabel>
            <StyledTextField sx={{width: "200px", marginRight: "30px"}}></StyledTextField>
          </FormRowContainer>
          <FormRowContainer>
            <FormLabel>Last Name</FormLabel>
            <StyledTextField sx={{width: "200px"}}></StyledTextField>
          </FormRowContainer>
        </div>
        <FormRowContainer>
          <FormLabel>Username</FormLabel>
          <StyledTextField></StyledTextField>
        </FormRowContainer>
        <FormRowContainer sx={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
          <FormLabel>Admin ?</FormLabel>
          <Switch sx={{marginRight: "15px"}}/>
          <FormRowContainer>
            <FormLabel>Date of Birth</FormLabel>
            <CustomizedDatePicker/>
          </FormRowContainer>
        </FormRowContainer>
        <CenterWithinForm>
          <StyledFormButton sx={{marginTop: "30px", width: "100%"}}>Submit Form</StyledFormButton>
        </CenterWithinForm>
      </form>
    </CustomFormPaper>
  </>)
}

enum activeFormComponent {
  LOGIN = 0,
  SIGNUP = 1,
}

const LoginPage = () => {
  const [currentFormComponent, setCurrentFormComponent] = useState(activeFormComponent.LOGIN)
  const changeActiveFormComponent = () => {
    if (currentFormComponent === activeFormComponent.LOGIN) {
      setCurrentFormComponent(activeFormComponent.SIGNUP)
    } else {
      setCurrentFormComponent(activeFormComponent.LOGIN)
    }
  }
  return (
    <CenterFormOnScreen>
      {currentFormComponent === activeFormComponent.LOGIN ?
        <LoginFormComponent changeActiveFormComponent={changeActiveFormComponent}/> :
        <SignUpFormComponent changeActiveFormComponent={changeActiveFormComponent}/>}
    </CenterFormOnScreen>
  );
};

export default LoginPage;