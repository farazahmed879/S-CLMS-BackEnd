import Swal from "sweetalert2";

export const S_Alert = async (props = {}) => {
  return Swal.fire({
    ...props,
  });
};

export const showSwalPopUp = async (
  title = "",
  msg = "",
  icon,
  html = false
) => {
  const swal = {
    html: msg,
    text: msg,
    title: title,
    icon: icon,
    showConfirmButton: true,
    showCancelButton: false,
    allowOutsideClick: false,
  };
  if (html) delete swal.text;
  else delete swal.html;
  await Swal.fire(swal);
};

export const UserRole = () => {
  const localData = localStorage.getItem("userData") || JSON.stringify({});

  const data = JSON.parse(localData);

  return {
    isAdmin: data?.role == "Admin" ? true : false,
    userId: data?.userId || 1,
  };
};
