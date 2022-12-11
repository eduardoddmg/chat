import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useAuth } from "../context";
import {
  VStack,
  Center,
  Heading,
  Button,
  useDisclosure,
  Text,
  Stack,
  Tr,
  Td,
  Box,
  Spinner,
  Skeleton,
  Avatar,
  AvatarBadge
} from "@chakra-ui/react";
import { AddIcon, EditIcon, DeleteIcon, InfoOutlineIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { Modal, Input, Table } from "../components/chakra";
import { Layout, LoadingComponent } from "../components";
import { capitalizeFirstLetter } from "../utils";
import { useNavigate } from 'react-router-dom';

export const Profile = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <Layout>
      <Stack px="5%" spacing={5}>
        <Avatar mt={10}>
          <AvatarBadge boxSize='1.25em' bg='green.500' />
        </Avatar>
        <Text fontWeight="bold">{capitalizeFirstLetter(auth.username)}</Text>
        <Text>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</Text>
      </Stack>
    </Layout>
  );
};
