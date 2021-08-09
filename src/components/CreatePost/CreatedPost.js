import React, { useContext, useState,useEffect } from 'react'
import FirebaseContext from '../../context/firebase'
import UserContext from '../../context/user'
import { storage } from '../../lib/firebase'







function CreatedPost() {
  const [caption, setCaption] = useState("")
  const [imageUrl, setImgUrl] = useState("")
  const [Uploaded, setUploaded] = useState(0)
  const [isInvalid, setInvalid]  =useState(true)
  const [img, setImg] = useState(null)

  useEffect(()=>{
    if(img !== null && caption !== '')
    {
      setInvalid(false)
    }else{
      setInvalid(true)
    }
},[img, caption])
  const { user: { uid: userId } } = useContext(UserContext)
  
  const { firebase } = useContext(FirebaseContext)
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
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
    
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
  const handleUpload = (e) =>
  {
    e.preventDefault()
    upload(img)

  }
  const handlePost = async (e) => {
    e.preventDefault()
    await firebase
      .firestore()
      .collection('photos')
      .add(
        {
          photoId: 4,
          caption: caption,
          comments: [],
          likes: [],
          imageSrc: imageUrl,
          userId: userId,
          dateCrated: Date.now(),
          userLatitude: '40.7128°',
          userLongitude: '74.0060°',
        }
      ).then(() => 
      {
        alert("Created")
        setUploaded(0)
        setCaption('')
        setImg(null)
      })
  }
  return (<>
    <div className="editor mx-auto w-10/12 flex flex-col text-gray-800  p-4 shadow-lg max-w-2xl mb-8">
      <textarea className="description  sec p-3 h-60 border border-gray-300 outline-none" onChange={(e) => setCaption(e.target.value)} value={caption} placeholder="Describe everything about this post here"></textarea>
      <div className="icons flex text-gray-500 m-2 justify-center  content-center">
    <label className="  bg-blue btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 e">
       
        <span className="text-base leading-normal">Select a image</span>
        <input type='file' className="hidden" id='img' onChange={(e) =>setImg(e.target.files[0])}/>
    </label>
      </div>
      <div className="buttons flex">
      {Uploaded === 1 ? (

        <div onClick={handlePost} className=" bg-blue-medium text-white w-full rounded text-center h-8 font-bold ">Post</div>
        ):(
        <div onClick={handleUpload} className={`bg-blue-medium text-white w-full rounded text-center h-8 font-bold
        ${isInvalid && 'opacity-50'}`}>Upload</div>

        )}
      </div>
    </div>
  </>
  )
}

export default CreatedPost
