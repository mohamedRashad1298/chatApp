
import { MdPageview } from "react-icons/md";
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
  IconButton,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { ChatState } from "../../Context/Context";
import UserBadgeItem from "../userAvatar/UserBadgeItem";
import UserItemList from "../userAvatar/UserItemList";

const UpdateGroupChatModal = ({chat , fetchAgain, setFetchAgain,fetchMessages}) => {
 const { isOpen, onOpen, onClose } = useDisclosure();
 const [groupChatName, setGroupChatName] = useState();
 const [search, setSearch] = useState("");
 const [searchResult, setSearchResult] = useState([]);
 const [loading, setLoading] = useState(false);
 const [renameloading, setRenameLoading] = useState(false);
 const toast = useToast();

 const { selectedChat, setSelectedChat, user } = ChatState();
const token = localStorage.getItem('token')

const fetchGroup = async()=>{
try {
 const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
 const {data} = await axios.get(`http://localhost:3300/api/v1/chats/group/${chat._id}`,config)
 setSelectedChat(data)
} catch (error) {
 console.log(error)
}
}

const handleRemove = async(u)=>{
 try {
  const config = {
   headers: {
     Authorization: `Bearer ${token}`,
   },
 };

 await axios.patch(`http://localhost:3300/api/v1/chats/groupremove/${chat._id}`,{user:u},config);
 fetchGroup()
 fetchMessages()
 setFetchAgain(!fetchAgain);
 } catch (error) {
  console.log(error)
 }
}

const handleSearch = async(query)=>{
 setSearch(query)
 if (!search) {
  toast({
    title: "Empty Search",
    description: "please enter key search",
    status: "warning",
    duration: 3000,
    isClosable: true,
    position: "left-top",
  });
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
  setSearchResult(data.users);
  setLoading(false);
} catch (error) {
  setLoading(false);
  console.log(error);
}
}

const handleAddUser = async(user1)=>{
 if (selectedChat.users.find((u) => u._id === user1._id)) {
  toast({
    title: "User Already in group!",
    status: "error",
    duration: 5000,
    isClosable: true,
    position: "bottom",
  });
  return;
}

if (selectedChat.groupAdmin._id !== user._id) {
  toast({
    title: "Only admins can add someone!",
    status: "error",
    duration: 5000,
    isClosable: true,
    position: "bottom",
  });
  return;
}
 try {
  const config = {
   headers: {
     Authorization: `Bearer ${token}`,
   },
 };
 
const { data } = await axios.patch(`http://localhost:3300/api/v1/chats/groupadd/${chat._id}`,{user:user1},config);
if(data){fetchGroup()
setFetchAgain(!fetchAgain);
setLoading(false);}
 } catch (error) {
console.log(error)
 setLoading(false);
 }
}
const handleRename = async()=>{
 if(!groupChatName){
  toast({
   title: "Can not send empty field!",
   status: "error",
   duration: 5000,
   isClosable: true,
   position: "bottom",
 });
 }

try {
  setRenameLoading(true)
 const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
const { data } = await axios.patch(`http://localhost:3300/api/v1/chats/renamegroup/${chat._id}`,{name:groupChatName},config);
if(data){fetchGroup()
 setFetchAgain(!fetchAgain);
 setRenameLoading(false)
}
} catch (error) {
 console.log(false)
}
}

  return (
    <>
      <IconButton display={{ base: "flex" }} icon={<MdPageview />} onClick={onOpen} />

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >
            {selectedChat.chatName}
          </ModalHeader>

          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" alignItems="center">
            <Box w="100%" display="flex" flexWrap="wrap" pb={3}>
              {selectedChat.users.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  admin={selectedChat.groupAdmin}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
            </Box>
            <FormControl d="flex">
              <Input
                placeholder="Chat Name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant="solid"
                colorScheme="teal"
                ml={1}
                isLoading={renameloading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add User to group"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>

            {loading ? (
              <Spinner size="lg" />
            ) : (
              searchResult?.map((user) => (
                <UserItemList
                  key={user._id}
                  user={user}
                  handleFunction={() => handleAddUser(user)}
                />
              ))
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => handleRemove(user)} colorScheme="red">
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default UpdateGroupChatModal
