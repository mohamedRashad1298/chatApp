import { Box } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { FaSearch, FaChevronDown } from "react-icons/fa";
import { GoBellFill } from "react-icons/go";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tooltip,
  Avatar,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  useDisclosure,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import { ChatState } from "../../Context/Context";
import ProfileModal from "./ProfileModel";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import UserItemList from "../UserAvatar/UserItemList";
import {getSender} from '../../Config/getSender';
import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';

const SideDrawer = () => {
  const [search, setSearch] = useState();
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);

  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();
  // useEffect(()=>{
  //   console.log(notification)
  // },[notification])
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const toast = useToast();
  const token = localStorage.getItem("token");

  const logoutHandeler = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    history.push("/auth");
  };

  const searchHandeler = async () => {
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
      setUsers(data.users);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const accessChat = async (userId) => {
    setChatLoading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `http://localhost:3300/api/v1/chats`,
        { userId },
        config
      );
      console.log(data)
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

      setSelectedChat(data);
      setChatLoading(false);
      onClose();
    } catch (error) {
      setChatLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="serch User to Chat" hasArrow placement="bottom-end">
          <Button variant="ghost" ref={btnRef} onClick={onOpen}>
            <FaSearch />
            <Text d={{ base: "none", md: "flex" }} px="4">
              search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="Work sans">
          Talk-A-Tive
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
            <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <GoBellFill
                style={{ fontSize: "25px", transform: "tarnslateY(5px)" }}
              />
                    <MenuList pl={2}>
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    console.log(notif.chat)
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<FaChevronDown style={{ fontSize: "15px" }} />}
            >
              {user.photo ? (
                <Avatar
                  size="sm"
                  cursor="pointer"
                  name={user.name}
                  src={`http://localhost:3300/img/users/${user.photo}`}
                />
              ) : (
                // Render placeholder Avatar if user.photo is not available
                <Avatar size="sm" cursor="pointer" name={user.name} />
              )}
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuItem onClick={logoutHandeler}>Log Out</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <Box display="flex" gap={2} paddingBottom={2}>
              <Input
                placeholder="Type here..."
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
              <Button colorScheme="blue" onClick={searchHandeler}>
                Go
              </Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              users?.map((searchedUser) => (
                <UserItemList
                  key={searchedUser._id}
                  user={searchedUser}
                  handleFunction={() => accessChat(searchedUser._id)}
                />
              ))
            )}
            {chatLoading && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
