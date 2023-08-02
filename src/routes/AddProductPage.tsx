import Paper from "@mui/material/Paper";
import {FormLabel, styled} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Container} from "../components/UtilityComponents/Utilities.tsx"
import Box from "@mui/material/Box"
import {SubmitHandler, useForm} from "react-hook-form";
import {z} from "zod"

const MyBox = styled(Box)(() => ({
  fontSize: "10px"
}))
type AddProductFields = {
  productTitle: string,
  productPrice: number,
  productDescription: string,
  productImage: FileList
}

const AddProductFormFields = z.object({
  productTitle: z.string(),
  productPrice: z.number().positive().int(),
  productDescription: z.string().max(250),
  productImage: z

})

const AddProductPage = () => {
  const {
    register,
    resetField,
    handleSubmit,
    watch
  } = useForm<AddProductFields>()

  console.log(watch("productTitle"))
  console.log(watch("productPrice"))
  console.log(watch("productDescription"))
  console.log(watch("productImage"))
  const addProductFormSubmitHandler: SubmitHandler<AddProductFields> = (data) => {
    console.log(data.productImage[0])
    resetField("productTitle")
    resetField("productPrice")
    resetField("productDescription")
    resetField("productImage")
  }
  return (
    <MyBox>
      <Container>
        <Paper sx={{display: "flex", flexDirection: "column", width: "450px", padding: "15px"}}>
          <form onSubmit={handleSubmit(addProductFormSubmitHandler)}>
            <FormLabel>Title</FormLabel>
            <TextField {...register("productTitle")} ></TextField>
            <FormLabel>Price</FormLabel>
            <TextField {...register("productPrice")}></TextField>
            <FormLabel>Product Description</FormLabel>
            <TextField {...register("productDescription")}></TextField>
            <input type={'file'} {...register("productImage")} accept={"image/*"}></input>
            <Button type={"submit"}>Submit</Button>
          </form>
        </Paper>
      </Container>
    </MyBox>
  );
};

export default AddProductPage;