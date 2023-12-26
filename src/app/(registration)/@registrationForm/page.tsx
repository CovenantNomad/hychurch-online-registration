import RegistrationForm from "@/components/RegistrationForm";
import { FormError } from "@/types/error";

type RegistrationProps = {
  setUserName: React.Dispatch<React.SetStateAction<string | null>>
  setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>,
  setIsSubmitSuccessful: React.Dispatch<React.SetStateAction<boolean>>, 
  setIsError: React.Dispatch<React.SetStateAction<FormError[] | null>>
}

const Registration = ({ setUserName, setIsError, setIsSubmitted, setIsSubmitSuccessful } : RegistrationProps) => {
  
  return (
    <RegistrationForm
      setUserName={setUserName}
      setIsError={setIsError} 
      setIsSubmitted={setIsSubmitted} 
      setIsSubmitSuccessful={setIsSubmitSuccessful} 
    />
  );
};

export default Registration;
