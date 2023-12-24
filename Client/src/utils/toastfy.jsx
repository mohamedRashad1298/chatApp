import {ToastContainer,  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notifySuccess = (msg)=> toast.success(msg, {
 position: "bottom-right",
 autoClose: 5000,
 hideProgressBar: false,
 closeOnClick: true,
 pauseOnHover: true,
 draggable: true,
 progress: undefined,
 theme: "dark",
 });

 export  const notifyFail = (msg)=>toast.error(msg, {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  });

export const ToastContainerComp = ()=>{
  return <div>
  <ToastContainer
 position="bottom-right"
 autoClose={5000}
 hideProgressBar={false}
 newestOnTop={false}
 closeOnClick
 rtl={false}
 pauseOnFocusLoss
 draggable
 pauseOnHover
 theme="dark"
 /> 
 </div>
 }



