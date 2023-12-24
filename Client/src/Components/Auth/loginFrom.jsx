import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
// import { ChatState } from "../../Context/ChatProvider";

const LoginFrom = () => {
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passShow, setpassShow] = useState("hide");
  const [isloading, setIsloading] = useState(false);
  const toast = useToast();
  const history = useHistory()

  const Login = async () => {
    if (!Email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      setIsloading(true);
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:3300/api/v1/users/login",
        { email: Email, password },
        config
      );
      setIsloading(false);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("userInfo", JSON.stringify(data.data.user));
      history.push("/chat");
    } catch (error) {
      setIsloading(false);
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <VStack spacing="10px">
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={passShow === "hide" ? "password" : "text"}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={() => {
                passShow === "hide" ? setpassShow("show") : setpassShow("hide");
              }}
            >
              {passShow === "hide" ? "Show" : "Hide"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={Login}
      >
        Login
      </Button>
      onClick={() => {
          setEmail("guest@example.com");
          setPassword("pass1234");
        }}
      {isloading && <Spinner />}
    </VStack>
  );
};

export default LoginFrom;
