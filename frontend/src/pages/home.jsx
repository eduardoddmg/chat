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
} from "@chakra-ui/react";
import { AddIcon, EditIcon, DeleteIcon, InfoOutlineIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { Modal, Input, Table } from "../components/chakra";
import { Layout, LoadingComponent } from "../components";
import { getTime, configForm } from "../utils";
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001/');

export const Home = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);
  const [message, setMessage] = useState([]);

  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('chat message', (msg) => {
      setMessage(msg);
    })

    socket.on('pong', () => {
      setLastPong(new Date().toISOString());
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, []);

  const submit = (data) => {
    socket.emit('chat message', {username: auth.username, message: data.message, time: getTime()});
    reset(data);
    setValue('message', '')
  };

  return (
    <Layout>
      <VStack
        onSubmit={handleSubmit(submit)}
        spacing={5}
        w={["95%", "70%"]}
        my="10vh"
        maxW="1500px"
        as="form"
        bg="#f4f4f4"
        p={[2, 10]}
        mx="auto"
      >
      <Heading>Chat</Heading>
        <Box w="full" spacing={0} display="flex" flexDirection="column" gap="0.5em">
          {message.map((item, index) => {
            return (
              <Box w="full" display="flex" justifyContent={auth.username === item.username ? "end" : "start"}>
                <Box display="flex" flexDirection="column" justify="end" w="50%">
                  <Text borderRadius="md" my={2} p={2} bg={auth.username === item.username ? "black" : "orangered"} color="white" key={index} w="full">
                    <b>{item.username}</b><br /> {item.message}
                  </Text>
                  <Text fontSize="12px" mt={-1}>
                    {item.time}
                  </Text>
                </Box>
              </Box>
              )})}
        </Box>
        <Input
          errors={errors.message}
          {...register("message", {required: 'campo necessário'})}
        />
        <Button type="submit" colorScheme="purple" w="100%">
          enviar messagem
        </Button>
      </VStack>
    </Layout>
  );
};
