import SignupForm from "../Components/Auth/SignupForm";
import LoginFrom from "../Components/Auth/loginFrom";
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import './AuthPage.css'

const AuthPage = () => {
  const history = useHistory();

  useEffect(() => {
    const user = localStorage.getItem("token");

    if (user) history.push("/chat");
  }, [history]);

  return (
    <div className="auth">
    <Container maxW="xl" centerContent backgroundColor="transparent" >
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="Work sans">
          Talk-A-Tive
        </Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <LoginFrom />
            </TabPanel>
            <TabPanel>
              <SignupForm />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
    </div>
  );
};

export default AuthPage;
