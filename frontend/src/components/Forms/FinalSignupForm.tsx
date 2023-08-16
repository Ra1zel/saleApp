import {
  CenterWithinForm,
  CustomFilePickerLabelVariantTwo, CustomFilePickerVariantTwo,
  CustomFormPaper, CustomizedDatePicker,
  FilePickerWrapper, FormRowContainer, StyledFormButton, StyledTextField
} from "./CommonFormComponents.tsx";
import Typography from "@mui/material/Typography";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import FormLabel from "@mui/material/FormLabel";
import {Switch} from "@mui/material";
import dayjs from "dayjs";
import {z} from "zod";
import {Dayjs} from "dayjs";
import {styled} from "@mui/material/styles";
import React, {useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import userImagePlaceholder from "../../../public/userImagePlaceHolder.svg";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const SignupFormImageElement = styled('img')`
  width: 100px;
  height: 100px;
  border: 1px solid black;
  margin: 15px;
  border-radius: 50%;
`

const finalSignupFormFields = z.object({
  firstName: z.string({
    required_error: "This field is required.",
    invalid_type_error: "First Name must be a string."
  }).max(1024, "cannot be more than 1024 characters.").min(1, "This field is required."),
  lastName: z.string({
    required_error: "This field is required.",
    invalid_type_error: "Last Name must be a string."
  }).optional(),
  username: z.string({
    required_error: "This field is required.",
    invalid_type_error: "Username must be a string."
  }).optional(),
  dateOfBirth: z.instanceof(dayjs as unknown as typeof Dayjs, {message: "This field is required."}),
  adminPrivileges: z.boolean({required_error: "This field is required."}),
  profilePicture: z.any({required_error: "This field is required."}).refine((userUploadedImage: File) => {
    const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/svg+xml"];
    return ACCEPTED_IMAGE_TYPES.includes(userUploadedImage?.type)
  }, "Invalid file type. Supported formats are .jpeg, .jpg , .png , .webp and .svg").refine((userUploadedImage: File) => {

    const uploadedImg = new Image()
    if (!userUploadedImage) {
      return false
    }
    return new Promise((resolve) => {
      uploadedImg.onload = function () {
        const width = uploadedImg.naturalWidth
        const height = uploadedImg.naturalHeight
        window.URL.revokeObjectURL(uploadedImg.src)
        if (width <= 200 && height <= 200) {
          resolve(true)
        } else {
          resolve(false)
        }
      }
      uploadedImg.src = window.URL.createObjectURL(userUploadedImage)
    })

  }, "image dimensions cannot be greater than 200x200.").optional(),

})

type FinalSignupFormFields = z.infer<typeof finalSignupFormFields>


const CustomErrorDisplayContainer = styled('div')`
  font-size: 13.7143px;
  color: #D32F2F;
  font-family: Quicksand, sans-serif;
  font-weight: 500;
  line-height: 1.66;
  letter-spacing: 0.40px;
  margin-top: 3px;
`

type FinalSubmitFormProps = {
  initialSignupFormData: { email: string, password: string }
}

const FinalSignupForm: React.FC<FinalSubmitFormProps> = ({initialSignupFormData}) => {
  const navigate = useNavigate()
  const [userUploadedImgError, setUserUploadedImgError] = useState(false)
  // const [completeSignupSuccessful, setCompleteSignupSuccessful] = useState(false)
  const {
    control: finalSignupFormControl,
    handleSubmit: finalSignupFormHandleSubmit,
    reset: finalSignupFormReset
  } = useForm<FinalSignupFormFields>({
    resolver: zodResolver(finalSignupFormFields),
    defaultValues: {
      firstName: "", lastName: "", username: "", adminPrivileges: false, dateOfBirth: ""
    }
  })

  const handleFinalFormSubmit: SubmitHandler<FinalSignupFormFields> = async (data) => {
    let res;
    try {
      res = await axios.post('http://localhost:3000/signupPhase2', data)
      console.log(res)
      console.log(initialSignupFormData)
      const loginRes = await axios.post('http://localhost:3000/login', {...initialSignupFormData}, {withCredentials: true})
      if (loginRes.status === 200) {
        // setCompleteSignupSuccessful(true)
        navigate('/')
      }
    } catch (error) {
      console.error(error)
    }

    finalSignupFormReset({firstName: "", lastName: "", username: "", adminPrivileges: false, dateOfBirth: ""})
    setProfilePicURL(userImagePlaceholder)
  }
  const customImageSizeValidationFunc = (file: File) => {
    const uploadedImg = new Image()
    if (!file) {
      return false
    }
    return new Promise((resolve) => {
      uploadedImg.onload = function () {
        const width = uploadedImg.naturalWidth
        const height = uploadedImg.naturalHeight
        window.URL.revokeObjectURL(uploadedImg.src)
        if (width <= 200 && height <= 200) {
          console.log("Image size is allowed.")
          resolve(true)
        } else {
          console.log("Image size must not exceed 200x200.")
          resolve(false)
        }
      }
      uploadedImg.src = window.URL.createObjectURL(file)
    })

  }
  const [profilePicURL, setProfilePicURL] = useState(userImagePlaceholder)
  const profilePictureChangeHandler = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, callback) => {
    const uploadedFile = (e.target as HTMLInputElement).files?.[0]
    if (uploadedFile) {
      const res = await customImageSizeValidationFunc(uploadedFile)
      if (res) {
        setUserUploadedImgError(false)
        callback(uploadedFile)
        setProfilePicURL(window.URL.createObjectURL(uploadedFile))
      } else {
        setUserUploadedImgError(true)
      }
    }
  }
  return (
    <CustomFormPaper>
      <CenterWithinForm>
        <Typography variant={"h1"}>Almost There!</Typography>
      </CenterWithinForm>
      <form onSubmit={finalSignupFormHandleSubmit(handleFinalFormSubmit)}>
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
          <SignupFormImageElement src={profilePicURL} alt={"user profile picture"}/>
          <FilePickerWrapper style={{flexDirection: "column", alignItems: "center"}}>
            <Controller render={({field, fieldState}) => {
              return (
                <>
                  <CustomFilePickerLabelVariantTwo htmlFor="imagePicker">Upload Image</CustomFilePickerLabelVariantTwo>
                  <CustomFilePickerVariantTwo id="imagePicker" type={'file'} name={field.name}
                                              value={field.value === "" ? field.value : undefined}
                                              inputRef={field.ref} error={fieldState.invalid}
                                              helperText={fieldState.invalid ? fieldState.error?.message : ""}
                                              onChange={(e) => profilePictureChangeHandler(e, field.onChange)}
                  ></CustomFilePickerVariantTwo>
                </>
              )
            }} name={'profilePicture'} control={finalSignupFormControl}/>
            {userUploadedImgError &&
                <CustomErrorDisplayContainer>Image dimensions cannot exceed 200x200.</CustomErrorDisplayContainer>}

          </FilePickerWrapper>
        </div>
        <div style={{display: "flex"}}>
          <FormRowContainer>
            <FormLabel>First Name*</FormLabel>
            <Controller render={({field, fieldState}) => {
              return (
                <StyledTextField name={field.name} value={field.value} error={fieldState.invalid}
                                 helperText={fieldState.invalid ? fieldState.error?.message : ""}
                                 onChange={field.onChange} onBlur={field.onBlur} inputRef={field.ref}
                                 sx={{width: "200px", marginRight: "30px"}}></StyledTextField>
              )
            }} name={'firstName'} control={finalSignupFormControl}/>
          </FormRowContainer>
          <FormRowContainer>
            <FormLabel>Last Name</FormLabel>
            <Controller render={({field, fieldState}) => {
              return (
                <StyledTextField name={field.name} value={field.value} error={fieldState.invalid}
                                 helperText={fieldState.invalid ? fieldState.error?.message : ""}
                                 onChange={field.onChange} onBlur={field.onBlur} inputRef={field.ref}
                                 sx={{width: "200px"}}></StyledTextField>
              )
            }} name={'lastName'} control={finalSignupFormControl}/>
          </FormRowContainer>
        </div>
        <FormRowContainer>
          <FormLabel>Username</FormLabel>
          <Controller render={({field, fieldState}) => {
            return (
              <StyledTextField name={field.name} value={field.value} error={fieldState.invalid}
                               helperText={fieldState.invalid ? fieldState.error?.message : ""}
                               onChange={field.onChange} onBlur={field.onBlur} inputRef={field.ref}
              ></StyledTextField>
            )
          }} name={'username'} control={finalSignupFormControl}/>
          {/*<StyledTextField></StyledTextField>*/}
        </FormRowContainer>
        <FormRowContainer sx={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
          <FormLabel>Admin Privileges*</FormLabel>
          <Controller render={({field}) => {
            return (
              <Switch name={field.name} checked={field.value} value={field.value} onChange={field.onChange}
                      onBlur={field.onBlur}
                      inputRef={field.ref} sx={{marginRight: "15px"}}/>
            )
          }} name={"adminPrivileges"} control={finalSignupFormControl}/>
          <FormRowContainer>
            <FormLabel>Date of Birth*</FormLabel>
            <Controller render={({field, fieldState}) => {
              return (
                <CustomizedDatePicker value={field.value}
                                      onChange={field.onChange} inputRef={field.ref}
                                      minDate={dayjs(new Date(1920, 0, 1))}
                                      disableFuture={true} slotProps={{
                  textField: {
                    helperText: fieldState.invalid ? fieldState.error?.message : "",
                    error: fieldState.invalid
                  }
                }}
                />
              )
            }} name={"dateOfBirth"} control={finalSignupFormControl}/>
          </FormRowContainer>
        </FormRowContainer>
        <CenterWithinForm>
          <StyledFormButton sx={{marginTop: "30px", width: "100%"}} type={'submit'}>Submit Form</StyledFormButton>
        </CenterWithinForm>
      </form>
    </CustomFormPaper>
  );
};

export default FinalSignupForm;