import React, { useContext, useState } from 'react'
import FirebaseContext from '../../context/firebase'
import UserContext from '../../context/user'
import { storage } from '../../lib/firebase'







function CreatedPost() {
  const [caption, setCaption] = useState("")
  const [imageUrl, setImgUrl] = useState("")
  const [Uploaded, setUploaded] = useState(0)

  const [img, setImg] = useState(null)

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
          console.log('File available at', downloadURL);
          setImgUrl(downloadURL)
        });
        setUploaded((prev) => prev +1) 
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
        setCaption('')
      })
  }
  return (<>
    <div className="editor mx-auto w-10/12 flex flex-col text-gray-800  p-4 shadow-lg max-w-2xl mb-8">
      <textarea className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none" onChange={(e) => setCaption(e.target.value)} value={caption} placeholder="Describe everything about this post here"></textarea>
      <div className="icons flex text-gray-500 m-2">
    <label className="w-30 h-7 flex  items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue">
       
        <span className="text-base leading-normal">Select a image</span>
        <input type='file' className="hidden" id='img' onChange={(e) =>setImg(e.target.files[0])}/>
    </label>
        <div className="count ml-auto text-gray-400 text-xs font-semibold">0/300</div>
      </div>
      <div className="buttons flex">
      {Uploaded === 1 ? (

        <div onClick={handlePost} className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">Post</div>
        ):(
        <div onClick={handleUpload} className=" inset-x-0 bottom-0 btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">Upload</div>

        )}
      </div>
    </div>
  </>
  )
}

export default CreatedPost
