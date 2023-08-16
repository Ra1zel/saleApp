import React from "react";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
  CenterWithinForm,
  CustomFormPaper,
  FormRowContainer,
  StyledFormButton,
  StyledTextField
} from "./CommonFormComponents.tsx";
import Typography from "@mui/material/Typography";
import FormLabel from "@mui/material/FormLabel";
import {z} from "zod";
import axios from "axios";


const initialSignupFormFields = z.object({
  email: z.string({
    required_error: "This field is required.",
    invalid_type_error: "Email must be a string."
  }).max(256, "email cannot be more than 256 characters.").email({message: "Invalid email format. Please provide a correct email."}),
  password: z.string({
    required_error: "This field is required.",
    invalid_type_error: "password must be a string."
  }).min(8, "Password cannot be less than 8 characters.").max(256, "Maximum allowed length for password is 256 characters."),
  confirmPassword: z.string({
    required_error: "This field is required.",
    invalid_type_error: "password must be a string."
  }).min(8, "Password cannot be less than 8 characters.").max(256, "Maximum allowed length for password is 256 characters.")
}).required().superRefine(({password, confirmPassword}, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      path: ['confirmPassword'],
      message: "The passwords did not match."
    })
    return false
  }
  return true
})
type InitialFormFields = z.infer<typeof initialSignupFormFields>

interface initialSignupFormProps {
  changeActiveFormComponent: () => void
  setInitialFormActive: (flag: boolean) => void
  getFormState: (email: string, password: string) => void
}

const InitialSignupForm: React.FC<initialSignupFormProps> = ({
                                                               changeActiveFormComponent,
                                                               getFormState,
                                                               setInitialFormActive
                                                             }) => {

  const {control, handleSubmit, reset} = useForm<InitialFormFields>({
    resolver: zodResolver(initialSignupFormFields),
  })
  const handleInitialFormSubmit: SubmitHandler<InitialFormFields> = async (data) => {
    console.log(data)
    let res;
    try {
      res = await axios.post('http://localhost:3000/signupPhase1', data, {withCredentials: true})
      console.log("res is: ", res.data)
      getFormState(data.email, data.password)
    } catch (error) {
      console.log(error.response.data)
    }
    reset({email: "", password: "", confirmPassword: ""})
    setInitialFormActive(false)
  }

  return (<>
      <CustomFormPaper>
        <CenterWithinForm>
          <Typography variant={"h1"}>Sign-up</Typography>
        </CenterWithinForm>
        <form onSubmit={handleSubmit(handleInitialFormSubmit)}>
          <FormRowContainer>
            <FormLabel>Email*</FormLabel>
            <Controller control={control} render={({field, fieldState}) => {
              return (
                <StyledTextField name={field.name} value={field.value} error={fieldState.invalid}
                                 onChange={field.onChange} onBlur={field.onBlur} inputRef={field.ref}
                                 helperText={fieldState.invalid ? fieldState.error?.message : ''}></StyledTextField>
              )
            }} name={'email'}/>
          </FormRowContainer>
          <FormRowContainer>
            <FormLabel>Password*</FormLabel>
            <Controller control={control} render={({field, fieldState}) => {
              return (
                <StyledTextField type={'password'} name={field.name} value={field.value} error={fieldState.invalid}
                                 onChange={field.onChange} onBlur={field.onBlur} inputRef={field.ref}
                                 helperText={fieldState.invalid ? fieldState.error?.message : ''}></StyledTextField>
              )
            }} name={'password'}/>
          </FormRowContainer>
          <FormRowContainer>
            <FormLabel>Confirm Password*</FormLabel>
            <Controller control={control} render={({field, fieldState}) => {
              return (

                <StyledTextField type={'password'} name={field.name} value={field.value} error={fieldState.invalid}
                                 helperText={fieldState.invalid ? fieldState.error?.message : ""}
                                 onChange={field.onChange} onBlur={field.onBlur} inputRef={field.ref}></StyledTextField>
              )
            }} name={'confirmPassword'}/>
          </FormRowContainer>
          <FormRowContainer>
            <Typography>Already have an account? <span onClick={changeActiveFormComponent}>Login</span></Typography>
          </FormRowContainer>
          <CenterWithinForm>
            <StyledFormButton size={'large'} type={"submit"}
                              sx={{marginTop: "15px", width: "100%"}}>Next</StyledFormButton>
          </CenterWithinForm>
        </form>
      </CustomFormPaper>
    </>
  );
};

export default InitialSignupForm;