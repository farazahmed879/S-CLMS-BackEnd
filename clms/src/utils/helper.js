import Swal from "sweetalert2";

export const S_Alert = async (props = {}) => {
  return Swal.fire({
    ...props,
  });
};

export const UserRole = () => {
  const localData = localStorage.getItem("userData") || JSON.stringify({});

  const data = JSON.parse(localData);

  return {
    isAdmin: data?.role == "admin" ? true : false,
    userId: data?.userId || 1,
  };
};
