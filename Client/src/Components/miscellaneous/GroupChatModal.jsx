import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  Input,
  useToast,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { ChatState } from "../../Context/Context";
import UserBadgeItem from "../userAvatar/UserBadgeItem";
import UserItemList from "../userAvatar/UserItemList";


const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatloading, setChatLoading] = useState(false);
  const toast = useToast();

  const { chats, setChats} = ChatState();
  const token = localStorage.getItem("token");



  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }
    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:3300/api/v1/users?search=${search}`,
        config
      );
      setLoading(false);
      setSearchResult(data.users);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast({
        title: "User already added",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleDelete = (delUser) => {
   setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
 };

const handleSubmit = async()=>{
 if(!groupChatName){
  toast({
   title: "User already added",
   status: "error",
   duration: 3000,
   isClosable: true,
   position: "top",
 });
 return
 }
 try {
  setChatLoading(true);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axios.post(
    `http://localhost:3300/api/v1/chats/group`,{
     name:groupChatName,
     users:selectedUsers
    },
    config
  );

  setChatLoading(false);
  setChats([data, ...chats]);
  onClose();
  toast({
    title: "New Group Chat Created!",
    status: "success",
    duration: 5000,
    isClosable: true,
    position: "bottom",
  });
} catch (error) {
  setChatLoading(false);
  toast({
   title: "Failed to Create the Chat!",
   description: error.response.data.meaasage,
   status: "error",
   duration: 5000,
   isClosable: true,
   position: "bottom",
 });
}

}

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody d="flex" flexDir="column" alignItems="center">
            <FormControl>
              <Input
                placeholder="Chat Name"
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add Users eg: Mohamed, Ahmed, Hany"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            <Box w="100%" d="flex" flexWrap="wrap">
              {selectedUsers.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />
              ))}
            </Box>
            {loading ? (
              <div>Loading...</div>
            ) : (
              searchResult
                ?.slice(0, 4)
                .map((user) => (
                  <UserItemList
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                  />
                ))
            )}
          </ModalBody>

          <ModalFooter position="relative">

            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
