import InitialSignupForm from "./InitialSignupForm.tsx";
import FinalSignupForm from "./FinalSignupForm.tsx";
import React, {useState} from "react";

interface loginFormComponentProps {
  changeActiveFormComponent: () => void
}

const SignupFormComponent: React.FC<loginFormComponentProps> = ({changeActiveFormComponent}) => {
  const [initialFormActive, setInitialFormActive] = useState(true)
  const [formData, setFormData] = useState({email: "", password: ""})
  const getFormState = (email: string, password: string) => {
    setFormData({email, password})
  }
  return (
    <div>
      {initialFormActive &&
          <InitialSignupForm changeActiveFormComponent={changeActiveFormComponent} getFormState={getFormState}
                             setInitialFormActive={setInitialFormActive}/>}
      {!initialFormActive && <FinalSignupForm initialSignupFormData={formData}/>}

    </div>
  );
};

export default SignupFormComponent;