import {FormLabel} from "@mui/material";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod";
import Typography from "@mui/material/Typography";
import {
  StyledTextField,
  StyledFormButton,
  FormRowContainer,
  CenterWithinForm, CustomFormPaper, CenterFormOnScreen
} from "../components/Forms/CommonFormComponents.tsx";
import {CustomFilePicker, CustomFilePickerLabel, FilePickerWrapper} from "../components/Forms/CommonFormComponents.tsx";


const addProductFields = z.object({
  productTitle: z.string({
    required_error: "This field is required.",
    invalid_type_error: "Product title must be a string."
  }).min(5).max(50),
  productPrice: z.number({
    required_error: "This field is required.",
    invalid_type_error: "Product price must be an Number."
  }).min(1, "Price cannot be 0.").positive("Price cannot be a negative number.").int("Price must be an Integer."),
  productDescription: z.string({
    required_error: "This field is required.",
    invalid_type_error: "Product Description must be a string."
  }).min(50, "Product description cannot be less than 50 characters.").max(250, "Product description cannot exceed 250 characters."),
  productImage: z.any().refine((file: File) => {
    const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/svg+xml"];
    return ACCEPTED_IMAGE_TYPES.includes(file?.type)
  }, "Invalid image.").refine((file: File) => {
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
          resolve(true)
        } else {
          resolve(false)
        }
      }
      uploadedImg.src = window.URL.createObjectURL(file)
    })
  }, "Image dimensions must be less than 200x200.")
}).required()
type AddProductFields = z.infer<typeof addProductFields>


const AddProductPage = () => {
  const {
    handleSubmit,
    reset,
    control,
  } = useForm<AddProductFields>({
    resolver: zodResolver(addProductFields)
  })

  const addProductFormSubmitHandler: SubmitHandler<AddProductFields> = (data) => {
    console.log(data)
    reset({productTitle: "", productPrice: "", productDescription: "", productImage: ""})
  }
  return (
    <CenterFormOnScreen style={{marginTop: "25px"}}>
      <CustomFormPaper>
        <CenterWithinForm>
          <Typography variant={"h1"}>Add Product Information</Typography>
          <form onSubmit={handleSubmit(addProductFormSubmitHandler)}>
            <FormRowContainer>
              <FormLabel>Title</FormLabel>
              <Controller
                control={control}
                name="productTitle"
                render={({field, fieldState}) => (
                  <StyledTextField
                    name={field.name}
                    value={field.value}
                    error={fieldState.invalid}
                    helperText={fieldState.invalid ? fieldState.error?.message : ''}
                    onChange={field.onChange} inputRef={field.ref} onBlur={field.onBlur}
                  ></StyledTextField>
                )}
              />
            </FormRowContainer>
            <FormRowContainer>
              <FormLabel>Price</FormLabel>
              <Controller control={control} name={"productPrice"} render={({field, fieldState}) => (
                <StyledTextField onChange={(e) => {
                  field.onChange(parseInt(e.target.value))
                }}
                                 onBlur={field.onBlur}
                                 value={field.value}
                                 name={field.name}
                                 error={fieldState.invalid}
                                 inputRef={field.ref}
                                 helperText={fieldState.invalid ? fieldState.error?.message : ''}
                                 type={"number"}

                ></StyledTextField>
              )}></Controller>
            </FormRowContainer>
            <FormRowContainer>
              <FormLabel>Product Description</FormLabel>
              <Controller control={control} name={"productDescription"}
                          render={({field, fieldState}) => (
                            <StyledTextField
                              sx={{marginBottom: "30px"}}
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                              value={field.value}
                              name={field.name}
                              inputRef={field.ref}
                              error={fieldState.invalid}
                              helperText={fieldState.invalid ? fieldState.error?.message : ''}
                              multiline={true}
                              rows={5}
                            ></StyledTextField>
                          )}/>
            </FormRowContainer>
            <FormRowContainer>
              <Controller name={"productImage"} control={control} render={({field, fieldState}) => {
                return (<FilePickerWrapper>
                  <CustomFilePickerLabel htmlFor="imagePicker">Upload File</CustomFilePickerLabel>
                  <CustomFilePicker id="imagePicker" inputRef={field.ref}
                                    onChange={(e) => {
                                      field.onChange((e.target as HTMLInputElement).files?.[0])
                                    }}
                                    value={field.value === "" ? field.value : undefined}
                                    name={field.name}
                                    error={fieldState.invalid}
                                    helperText={fieldState.invalid ? fieldState.error?.message : ''}
                                    onBlur={field.onBlur} type={'file'}
                  ></CustomFilePicker>
                </FilePickerWrapper>)
              }}/>
            </FormRowContainer>
            <CenterWithinForm>
              <StyledFormButton type={"submit"}>Submit</StyledFormButton>
            </CenterWithinForm>
          </form>
        </CenterWithinForm>
      </CustomFormPaper>
    </CenterFormOnScreen>
  );
};

export default AddProductPage;
