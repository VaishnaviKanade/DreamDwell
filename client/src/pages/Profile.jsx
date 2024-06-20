import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from "../firebase";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const normal = "https://th.bing.com/th/id/OIP.m_E2GiWXc8IGEeYAbypLgAHaHa?rs=1&pid=ImgDetMain";
  const [formData, setFormData] = useState({ avatar: normal });
  //const [formData, setFormData] = useState({ avatar: currentUser?.avatar || normal });

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = () => {
    const storage = getStorage(app);
    const filename = new Date().getTime() + file.name;
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
          setFilePerc(0); // Reset progress after successful upload
        });
      }
    );
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center m-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input 
          onChange={(e) => setFile(e.target.files[0])}
          type="file" 
          ref={fileRef} 
          hidden 
          accept='image/*'
        />
        <img 
          onClick={() => fileRef.current.click()} 
          src={formData.avatar} 
          alt="Profile image"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">Error uploading image</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-green-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image Successfully Uploaded</span>
          ) : ('')}
        </p>
        <input 
          type="text" 
          placeholder="username"
          className="border rounded-lg p-3" 
          id="username"
        />
        <input 
          type="email" 
          placeholder="email"
          className="border rounded-lg p-3" 
          id="email"
        />
        <input 
          type="text" 
          placeholder="password"
          className="border rounded-lg p-3" 
          id="password"
        />
        <button 
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}

// export default Profile





// import { useSelector } from "react-redux"
// import { useEffect, useRef, useState } from "react"
// import {getDownloadURL, getStorage,ref, uploadBytesResumable} from 'firebase/storage';
// import { app } from "../firebase";

// export default function Profile(){
//   const fileRef =useRef(null);
//   const {currentUser} = useSelector((state) => state.user)
//   const [file,setFile] = useState(undefined);
//   const [filePerc ,setFilePerc]=useState(0);
//   const [fileUploadError,setFileUploadError]=useState(false);
//   const [formData,setFormData]=useState({});
 

//   // firebase Storage
//   // allow read;
//   // allow write: if 
//   // request.resource.size < 2 * 1024 * 1024 &&
//   // request.resource.contentType.matches('image/.*')

//   useEffect(()=>{
//     if(file){
//       handleFileUpload(file);
//     }
//   },[file]);

//   const handleFileUpload = () => {
//         const storage=getStorage(app);
//         const filename = new Date().getTime() +file.name;
//         const storageRef =ref(storage,filename);
//         const uploadTask = uploadBytesResumable(storageRef, file);

//         uploadTask.on('state_changed',
//           (snapshot)=>{
//             const progress = (snapshot.bytesTransferred /
//               snapshot.totalBytes)*100;
//               // console.log('upload is '+progress+ '%done');
//               setFilePerc(Math.round(progress))
//             },
//               (error)=>{
//                 setFileUploadError(true);
//               },
//               ()=>{
//                 getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>
//                   setFormData({ ...formData,avtar:downloadURL})
//                 );
//               }
//           );
      
//   };
//   const normal="https://th.bing.com/th/id/OIP.m_E2GiWXc8IGEeYAbypLgAHaHa?rs=1&pid=ImgDetMain";

//   return (
//     <div className="p-3 max-w-lg mx-auto">
//       <h1 className="text-3xl font-semibold text-center m-7">Profile</h1>
//       <form className="flex flex-col gap-4" >
//         <input onChange={(e)=>setFile(e.target.files[0])}
//          type="file" ref={fileRef} hidden accept='image/*'></input>
//        <img onClick={()=>fileRef.current.click()} src={formData.avatar || normal || currentUser.avatar} alt="Profile image"
//         // <img onClick={()=>fileRef.current.click()} src="https://th.bing.com/th/id/OIP.m_E2GiWXc8IGEeYAbypLgAHaHa?rs=1&pid=ImgDetMain" alt="Profile image"
       
//         className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2" />  

//         <p className="text-sm self-center">{fileUploadError ? 
//           (<span className="text-red-700">Error upload image</span>) :
//           filePerc>0 && filePerc<100 ?
//           (<span className="text-green-700">
//             {`uploding ${filePerc}%`}
//           </span>)
//           :
//           filePerc ===100 ?
//             (<span className="text-green-700">
//               Image Successfully Uploaded
//             </span>)
//             : ( ''

//             )
          
//         }
//           </p> 
//         <input type="text" placeholder="username"
//         className="border rounded-lg p-3 " id="username"/> 
//         <input type="email" placeholder="email"
//         className="border rounded-lg p-3 " id="email"/> 
//         <input type="text" placeholder="password"
//         className="border rounded-lg p-3 " id="password"/> 
//         <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95
//             disabled:opacity-80">Update</button>
//       </form>
//       <div className="flex justify-between mt-5">
//         <span className="text-red-700 cursor-pointer">Delete Account</span>
//         <span className="text-red-700 cursor-pointer">Sign Out</span>
//       </div>
//     </div>
//   )
// }

// // export default Profile
