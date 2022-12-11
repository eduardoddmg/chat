import { useAuth } from "../context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Center, Spinner } from "@chakra-ui/react";
import { LoadingComponent } from "../components";

export const Loading = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/');
  }, []);

  return <LoadingComponent />;
};
