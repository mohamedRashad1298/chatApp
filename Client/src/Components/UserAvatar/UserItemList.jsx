import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";




const UserItemList = (props) => {


  return (
    <Box
      onClick={props.handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      w="100%"
      d="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={props.user.name}
        src={`http://localhost:3300/img/users/${props.user.photo}`}
      />
      <Box>
        <Text>{props.user.name}</Text>
        <Text fontSize="xs">
          <b>Email : </b>
          {props.user.email}
        </Text>
      </Box>
    </Box>
  );
}

export default UserItemList
