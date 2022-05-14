import {useEffect, useState} from "react";
import {getHeaders} from "../utils";

const Suggestions = () =>{
    const [suggestions, setSuggestions] = useState([])
    useEffect(()=>{
        fetch("https://photo-app-secured.herokuapp.com/api/suggestions", {
            headers: getHeaders()
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setSuggestions(data)
            })
    }, [])

    const followOrUnfollow = (e) =>{
        const postData = {
            "user_id": e.target.dataset.userId
        }
        if (e.target.textContent === "follow"){
            fetch("https://photo-app-secured.herokuapp.com/api/following/", {
                method: "POST",
                headers: getHeaders(),
                body: JSON.stringify(postData)
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    e.target.textContent = "unfollow"
                    e.target.setAttribute("data-following-id", data.id)
                })
        }
        if (e.target.textContent === "unfollow"){
            const deleteURL ="https://photo-app-secured.herokuapp.com/api/following/"+e.target.dataset.followingId
            fetch(deleteURL, {
                method: "DELETE",
                headers: getHeaders()
            })
                .then(response => response.json())
                .then(data => {
                    e.target.textContent = "follow"
                    console.log(data)
                })

        }
    }

    return (
        suggestions.map((item) => {
            return <div className="suggestion" key={item.username}>
                <img src={item.thumb_url} />
                <div>
                    <p>{item.username}</p>
                    <p className="suggestion-text">Suggested for you</p>
                </div>
                <div>
                    <button aria-label="button" style={{border: "none", color: "cornflowerblue"}} data-user-id={item.id} onClick={(e)=>followOrUnfollow(e)}>follow</button>
                </div>
            </div>


        })

    )
}

export default Suggestions