import { Avatar, Button, Flex, Box, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

import { BiExit } from "react-icons/bi";

import { Link } from "react-router-dom";

import { ChevronDownIcon } from '@chakra-ui/icons';

export const Navbar = () => {
  return (
    <Box bg="purple.500" w="full" color="white">
      <Flex m="auto" maxW="1800px" justify="space-between" px="5%" py={5} align="center">
        <Link to="/">Home</Link>
        <Menu>
          <MenuButton as={Button} color="white" rightIcon={<ChevronDownIcon />} bg="transparent" _hover={{ bg: "transparent" }} _active={{ bg: "transparent" }}>
             <Avatar size="sm" src='https://bit.ly/broken-link' />
          </MenuButton>
          <MenuList color="black">
            <Link to="/profile">
              <MenuItem>
                Perfil
              </MenuItem>
            </Link>
            <Link to="/logout">
              <MenuItem>
                Sair
              </MenuItem>
            </Link>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};
