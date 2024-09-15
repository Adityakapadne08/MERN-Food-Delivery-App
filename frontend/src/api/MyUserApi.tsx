import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";

//url for backend api so wherenever we deploy our code it makes  it easier to change backend address to VITE as used below
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyUser=()=>{
    const { getAccessTokenSilently} = useAuth0();

    const getMyUserRequest = async ()=>{
        const accessToken = await getAccessTokenSilently();
        const response = await fetch (`${API_BASE_URL}/api/my/user`,{
            method:'GET',
            headers:{
                Authorization:`Bearer${accessToken}`,
                "Content-Type":"application/json",
            },
        }
        )}
        if(!response.ok){
            throw new Error("Failed to fetch user");
        }
        return response.json();
};
const {data:currentUser, isLoading,error} = useQuery("fetchCurrentUser", useGetMyUserRequest);

if(error){
    toast.error
}
type CreateUserRequest = {
  auth0Id: string;
  email: string;
};

export const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  //actual fetch rqst
  const createMyUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        //specofies the type of response
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error("Failed to create user");
    }
  };

  const {
    mutateAsync: createUser,
    isLoading,
    isSuccess,
    isError,
  } = useMutation(createMyUserRequest);

  return {
    createUser,
    isLoading,
    isError,
    isSuccess,
  };
};
type UpdateMyUserRequest = {
  name: string;
  addressLin1: string;
  city: string;
  country: string;
};

export const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyUserRequest = async (formData: UpdateMyUserRequest) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error("Failed to update user");
    }
  };
  const {
    mutateAsync: updateUser,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(updateMyUserRequest);

  if (isSuccess) {
    toast.success("User profile updated");
  }
  if (error) {
    toast.error(error.toString());
    reset();
  }

  return { updateUser, isLoading };
};
