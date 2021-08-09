import React, { useState } from 'react'
import { useHistory } from 'react-router';
import FirebaseContext from '../context/firebase';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

export default function Post() {
  const { firebase } = useContext(FirebaseContext);
  const [oldPassword, setOldPassWord] = useState('')
  const [newPassword, setNewPassWord] = useState('')
  const [err, setErr] = useState('')

  console.log(newPassword)
  console.log(oldPassword)
  const handleChange =  (event) => 
  {
    event.preventDefault()
    const user =  firebase.auth().currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(
      firebase.auth().currentUser.email,
      oldPassword
    );
    user.reauthenticateWithCredential(credential).then(function() {
      firebase.auth().currentUser.updatePassword(newPassword).then(()=>
      {
        alert('Success')
        setOldPassWord('')
        setNewPassWord('')
      }) ;
    }).catch(function(error) {
      setErr(error.message)
    });
  }
      
    return (<>
            <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img src="/images/iphone-with-profile.jpg" alt="iPhone with Instagram app" />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
          <h1 className="flex justify-center w-full">
            <img src="/images/logo.png" alt="Instagram" className="mt-2 w-6/12 mb-4" />
          </h1>
          {err && <p className="mb-4 text-xs text-red-primary">{err}</p>}

          <h1 className="font-bold mb-8"> Change Password </h1>


          <form  method="POST">
          
            <input
              aria-label="Enter your full name"
              type="password"
              placeholder="Old Password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={(e) => {setOldPassWord(e.target.value)}}

            />
         
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="New Password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={(e)=> {setNewPassWord(e.target.value)}}
            
            />
            <button
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold
           `}
           onClick={handleChange}
            >
              Change
            </button>
          </form>
        <Link className="mt-8 font-bold text-xl" to='/' >Go Back </Link>
        </div>
       
      </div>
    </div>
        </>
    )
}


