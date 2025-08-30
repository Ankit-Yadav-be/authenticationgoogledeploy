import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import { Flex, useToast } from "@chakra-ui/react";

const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { setUser } = useUser();

  const handleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post("http://localhost:8000/api/auth/google", {
        token: credentialResponse.credential,
      });

      setUser(res.data.user);
      localStorage.setItem("token", res.data.token);

      toast({
        title: "Login Successful",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/notes");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      toast({
        title: "Login Failed",
        description: "Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex justify="center" align="center" bg="gray.50">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() =>
          toast({
            title: "Login Failed",
            description: "Something went wrong",
            status: "error",
            duration: 3000,
            isClosable: true,
          })
        }
        width="280"
        text="signin_with"
        shape="rectangular"
        theme="outline"
      />
    </Flex>
  );
};

export default GoogleLoginButton;
