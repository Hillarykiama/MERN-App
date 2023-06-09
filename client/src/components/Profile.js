import React, {useState} from "react";
import { Link } from "react-router-dom";
import avatar from '../assets/profile.png';
import toast, {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik';
import { profileValidation } from "../helper/Validate";
import convertToBase64 from '../helper/convert';
import useFetch from "../hooks/fetch.hook";
import { updateUser } from "../helper/helper";
import { useNavigate } from "react-router-dom";


import styles from '../styles/Username.module.css';
import extend from '../styles/Profile.module.css';
export default function Profile() {

  const [file,setFile] = useState();
  const [{isLoading,apiData,serverError}] = useFetch();
  const navigate = useNavigate()

  const formik = useFormik({
  initialValues : {
    firstName:apiData?.firstName || '',
    lastName:apiData?.lastName ||'',
    email:apiData?.email ||'',
    mobile:apiData?.mobile ||'',
    address:apiData?.address ||''
  },
  enableReinitialize:true,
  validate :profileValidation,
  validateOnBlur:false,
  validateOnChange:false,
  onSubmit : async values =>{
    values = await Object.assign(values, {profile : file || apiData?.profile || ''})
    let updatepromise = updateUser(values);
    toast.promise(updatepromise,{
      loading: 'Updating...',
      success: <b>Update Sucessfully...!</b>,
      error: <b>Could Not Update!</b>

    });
    
  }
})

/** formik doesnt support file upload so we create a handler for this */
const onUpload = async e => {
  const base64 = await convertToBase64(e.target.files[0]);
  setFile(base64);
}

//logout handler function
function userLogout(){
  localStorage.removeItem('token');
  navigate('/')
}

if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

  return (
    <div className="container mx-auto">
        <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div className={`${styles.glass} ${extend.glass}`} style={{width:"35%",paddingTop: '3em',height:'95%'}}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Profile</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
             Update your Details.
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
              <img src={apiData?.profile || file || avatar} className={`{styles.profile_img} ${extend.profile_img}`} alt="avatar" />
              </label>
              <input onChange={onUpload} type="file" id='profile' name='profile' />
            </div>
            <div className="textbook flex flex-col items-center gap-6">
              <div className="name flex w-3/4 gap-10">
              <input {...formik.getFieldProps('firstName')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder="FirstName*" />
              <input {...formik.getFieldProps('lastName')} className={`${styles.textbox} ${extend.textbox}`} type="text"placeholder="Lastname*" />
              </div>
              <div className="name flex w-3/4 gap-10">
              <input {...formik.getFieldProps('mobile')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder="Phone No.*" />
              <input {...formik.getFieldProps('email')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder="Email*" />
              </div>
              
              <input {...formik.getFieldProps('address')}className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder="Address*" />
              <button className={styles.btn} type="submit">Update</button>
              
            </div>
            <div className="text-center py-4">
              <span className="text-gray-500">Come back later? <button onClick={userLogout} className="text-red-500" to="/">Logout</button></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

