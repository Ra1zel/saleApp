import {styled} from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import {DatePicker} from "@mui/x-date-pickers";


export const StyledTextField = styled(TextField)`
  & .MuiInputBase-input {
    font-size: 14px;
    padding: 8px;
    width: 350px;
  }

  & .MuiInputBase-root {
    padding: 0;
  }

  && {
    margin-bottom: 0;
  }
`
export const CenterWithinForm = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const CustomizedDatePicker = styled(DatePicker)`
  & .MuiInputBase-input {
    font-size: 14px;
    padding: 8px;
  }
`
export const StyledFormButton = styled(Button)`
  font-size: 14px;
  background-color: #5783ab;
  color: white;
  font-weight: 700;
  padding-inline: 50px;
  letter-spacing: 1px;

  :hover {
    background-color: #3e5678;
  }
`
export const FormRowContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 10px;
`
export const CustomFormPaper = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 15px;
  padding: 15px;
  width: 450px;
`
export const CenterFormOnScreen = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin-top: -80px;
`
