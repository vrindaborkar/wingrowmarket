import React , {useState , useEffect , useRef} from "react";
import '../styles/Profile.css'
import UserService from "../services/user.service";
import Spinner from '../components/Spinner'
import AuthService from "../services/auth.service";

const Profile = () => {
  const [user , setuser] = useState();
  const [Loading, setLoading] = useState(false)
  const [toggleImage, settoggleImage] = useState(false)
  const [toggleAddress, settoggleAddress] = useState(false)
  let addressText = useRef("")
  const [newPic, setNewPic] = useState(
    {
        photo: '',
    }
);


useEffect(() => {
  UserService.getAllUsers().then(res=>{
    const response = res?.data
    setuser(response[0])
  })
}, [])

const handleSubmitAddress = (e) => {
  e.preventDefault();
  setLoading(true);
  let address = addressText.current.value;

  if(address && address.length!==0){
    AuthService.addAddress(address).then(res=>{
      setuser(res);
      window.location.reload();
      setLoading(false);
    })
  }
  settoggleAddress(!toggleAddress)
}

const handleSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append('photo', newPic.photo);
  setLoading(true)
  
  if(formData){
    AuthService.addimage(formData).then(res=>{
      setuser(res);
      window.location.reload();
      setLoading(false)
    })
  }
  settoggleImage(!toggleImage)
}

const handlePhoto = (e) => {
  setNewPic({...newPic, photo: e.target.files[0]});
}

const handleAddresstoggle = () => {
  settoggleAddress(!toggleAddress)
}

const handleImagetoggle = () => {
  settoggleImage(!toggleImage)
}


  return (
    <div>
      {!Loading && user ? 
      <div className="profile">
        <div className="profile_container">
        <div className="profile_image_wrapper">
            <img className="profile_img" src={user.pic ? user.pic : " "} alt="profile"/>
        </div>
        <div className="profile_details">
          <div>
          Mobile No : {user.phone}
          </div>
          <div>
          Name : {user.firstname} {user.lastname}
          </div>
          {user.address && <div>
            Address : {user.address}
          </div>}
        </div>
        <div className="profile_btn_grp">
        {
        toggleImage ? 
        <form className="form_uploaddata" onSubmit={handleSubmit} encType='multipart/form-data'>
            <input 
                type="file" 
                accept=".png, .jpg, .jpeg"
                name="photo"
                style={{marginLeft:"auto"}}
                onChange={handlePhoto}
            />
                    <input 
                type="submit"
                className="profile_btn_toggle"
            />
            <button className="profile_btn_toggle" onClick={()=>settoggleImage(!toggleImage)}>cancel</button>
        </form>
        :
        <button className="profile_btn_toggle" onClick={handleImagetoggle}>Upload Profile</button>
        }
       {
       toggleAddress?
       <form className="form_uploaddata" onSubmit={handleSubmitAddress}>
            <input 
                type="text" 
                name="address"
                ref={addressText}
                
            />
                    <input 
                type="submit"
                className="profile_btn_toggle"
            />
            <button className="profile_btn_toggle" onClick={()=>settoggleAddress(!toggleAddress)}>cancel</button>
        </form>
        :
            <button className="profile_btn_toggle" onClick={handleAddresstoggle}>{user.address?"Update Address":"Add Address"}</button>
        }
        </div>
        </div>
        </div>:<Spinner/>}
    </div>
  );
};

export default Profile;
