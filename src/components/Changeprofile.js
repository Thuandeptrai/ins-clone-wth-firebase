import React, { useContext } from 'react'
import {DEFAULT_IMAGE_PATH} from '../constants/paths'
import FirebaseContext from '../context/firebase'
import UserContext from '../context/user'
import {storage,firebase} from '../lib/firebase'
import { getUserByUserId } from '../services/firebase'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'



export default function ChangeProfile1({proflePic}) {
    const{user:{uid:userId }} = useContext(UserContext)
    const [profilePic, setProfilepic] = useState(0)
    const [activeUser, setActiveUser] = useState(null);
    const [Uploaded, setUploaded] = useState(0)
    const [img, setImg] = useState(null)
    const [imageUrl, setImgUrl] = useState("")
    const [change, setChange] = useState(0)
    const [imgShow, setImgShow] = useState(null)
    const [isInvalid, setInInvalid]= useState(true)

    useEffect(()=>{
        if(img !== null)
        {
            setInInvalid(false)
        }
    },[img])

    var metadata = {
        contentType: 'image/jpeg'
      };
      const upload = (file) => {

        var uploadTask = storage.ref('images/' + file.name).put(file, metadata);
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =Math.round( (snapshot.bytesTransferred / snapshot.totalBytes) *100)
            console.log(progress)
              
          },
          (error) => {
           
        
          },
          () => {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              setImgUrl(downloadURL)
              setUploaded((prev) => prev +1) 
            });
           
          }
        );
    
      }
    
      const handleUpload = async (e) =>
  {
    e.preventDefault()
    setInInvalid(true)
    const [user] =  await getUserByUserId(userId)
    setActiveUser(user || {})
    upload(img)
    

    
  }
  const handleClick = async (e) => {
    e.preventDefault()
    setImgShow(imageUrl)
    await firebase.firestore().collection('users').doc(activeUser.docId).update({
        profilePic:imageUrl
    }).then(() => 
      {
        alert("Created")
        setUploaded(0)
        setProfilepic(1)
        setImg(null)
      })
  }


   
        return (<>
            <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5 grid grid-cols-1 gap-4 ">
      <img
          className="rounded-full w-full h-full flex mr-20"
          src={profilePic === 0 ? proflePic : imgShow} 
          alt=""
          onError={(e) => {
            e.target.src = DEFAULT_IMAGE_PATH;
          }}
        />
   <label className="w-30 h-7 flex  items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue">
       
       <span className="text-base leading-normal">Select a image</span>
       <input type='file' className="hidden" id='img' onChange={(e) =>setImg(e.target.files[0])} />
   </label>
      </div>
      <div className="flex flex-col w-2/5 ml-20">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
          <h1 className="flex justify-center w-full">
           <Link to ="./" className="mt-2 w-6/12 mb-4"  > <img src="/images/logo.png" alt="Instagram" /> </Link>
          </h1>

          <h1 className="font-bold mb-8"> Change Image </h1>


         
          
          
           {Uploaded === 1 ? (

<div onClick={handleClick} className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">Change</div>
):(
<button onClick={handleUpload} disabled={isInvalid} className={isInvalid ? ` inset-x-0 bottom-0 btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500 opacity-25`:`inset-x-0 bottom-0 btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500 ` }>Upload</button>

)}
    <Link to ="./" className="mt-8 font-bold text-xl" >Go Back</Link>
        </div>
       
      </div>
    </div>
        </>
    )
}
