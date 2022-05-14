import {useEffect, useState} from "react";
import {getHeaders} from "../utils";

const Profile = () =>{
    const [profileImg, setProfileImg] = useState("")
    const [profileName, setProfileName] = useState("")
    useEffect(()=>{
        fetch("https://photo-app-secured.herokuapp.com/api/profile", {
            headers: getHeaders()
        })
            .then(response => response.json())
            .then(data => {
                setProfileImg(data.thumb_url)
                setProfileName(data.username)
            })
    })
    return (
        <div style={{fontSize: 28+"px"}}>
            <img src={profileImg} style={{borderRadius: 50+"%"}} />
            <strong>{profileName}</strong>
        </div>
    )
}

export default Profile