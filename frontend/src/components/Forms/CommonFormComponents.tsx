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

export const CustomFilePicker = styled(TextField)`
  & .MuiInputBase-input {
    font-size: 14px;
    padding: 8px;
    width: 245px;
    border: 1px solid rgba(0, 0, 0, 0);
  }

  && {
    margin: 0;
  }

  left: -100px;
  z-index: 1;
`
export const CustomFilePickerLabel = styled('label')`
  margin-top: 4.5px;
  margin-left: 10px;
  border: 1px solid rgba(0, 0, 0, 0.19);
  border-top: none;
  border-bottom: none;
  border-left: none;
  font-family: "Quicksand", sans-serif;
  font-weight: 500;
  font-size: 14px;
  z-index: 2;
  background-color: white;
  padding: 8px 10px 5px 10px;
`
export const FilePickerWrapper = styled('div')`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  margin-bottom: 25px;
  border: 1px solid transparent;
`
export const CustomFilePickerVariantTwo = styled(TextField)`
  & .MuiInputBase-input {
    font-size: 14px;
    padding: 0;
    height: 5px;
    width: 15px;
    border: 1px solid rgba(0, 0, 0, 0);
  }

  && {
    margin: 0;
    visibility: hidden;
    position: absolute;
  }

  z-index: 1;
`
export const CustomFilePickerLabelVariantTwo = styled('label')`
  margin-top: 4.5px;
  border: 1px solid rgba(0, 0, 0, 0.19);
  border-top: none;
  border-bottom: none;
  border-left: none;
  font-family: "Quicksand", sans-serif;
  font-size: 14px;
  font-weight: 600;
  z-index: 2;
  background-color: #5783ab;
  color: white;
  border-radius: 4px;
  padding: 8px 10px 5px 10px;

  :hover {
    background-color: #3e5678;
    cursor: pointer;
  }
`