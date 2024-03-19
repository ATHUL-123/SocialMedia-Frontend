import { useSelector } from 'react-redux';

const useAdmin = () => {
  const { admin } = useSelector((state) => state.admin);
  return admin; 
};

export default useAdmin;