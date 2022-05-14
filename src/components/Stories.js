import {useEffect, useState} from "react";
import {getHeaders} from "../utils";

const Stories = () =>{
    const [stories, setStories] = useState([])
    useEffect(()=>{
        fetch("https://photo-app-secured.herokuapp.com/api/stories", {
            headers: getHeaders()
        })
            .then(response => response.json())
            .then(data => {
                setStories(data)
            })
    }, [stories])
    return (
        stories.map((item) => {
            return <div key={item.id}>
                <img className="pic" src={item.user.thumb_url} />
                <p>{item.user.username}</p>
            </div>
        })
    )
}

export default Stories;