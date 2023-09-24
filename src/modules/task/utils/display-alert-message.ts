import Swal from 'sweetalert2';

export const handleDeleteTask = async (message: string) => {
  const { isConfirmed } = await Swal.fire({
    background: '#181824',
    icon: 'warning',
    iconColor: 'red',
    text: message,
    color: 'white',
    showConfirmButton: true,
    confirmButtonColor: 'linear-gradient(cyan, violet)',
    confirmButtonText: 'Yes, delete it!',
    showCancelButton: true,
    cancelButtonColor: 'red',
    cancelButtonText: 'Nope',
    width: 300,
    showCloseButton: true,
  });

  return isConfirmed;
};

export const handleDeleteUser = async () => {
  const { isConfirmed } = await Swal.fire({
    background: '#181824',
    icon: 'warning',
    iconColor: 'red',
    text: 'Are you sure that you want to delete your account?',
    color: 'white',
    showConfirmButton: true,
    confirmButtonColor: 'linear-gradient(cyan, violet)',
    confirmButtonText: 'Yes, delete it!',
    showCancelButton: true,
    cancelButtonColor: 'red',
    cancelButtonText: 'Nope',
    width: 300,
    showCloseButton: true,
  });

  return isConfirmed;
};
