import {useEffect, useState} from "react";
import {getHeaders} from "../utils";


const Posts = (profileUsername) =>{
    const [posts, setPosts] = useState([])
    const [inputValue, setInputValue] = useState("")
    const [newComments, setNewComments] = useState([])

    useEffect(()=>{
        fetch("https://photo-app-secured.herokuapp.com/api/posts", {
            headers: getHeaders()
        })
            .then(response => response.json())
            .then(data => {
                setPosts(data)
            })
    })
    const unLikeOrLike = (postId, ev) =>{
        const elem = ev.currentTarget
        const postData = {
            // userId: `${user.id}`
        }
        if (elem.classList.contains("far")) {
            fetch("https://photo-app-secured.herokuapp.com/api/posts/" + postId + "/likes/", {
                method: "POST",
                headers: getHeaders(),
                body: JSON.stringify(postData)
            })
                .then(response => response.json())
                .then(data => {
                    elem.classList.remove("far")
                    elem.classList.add("fas")
                    ev.target.dataset.likeid=data.id
                });
        }
        else {
            fetch("https://photo-app-secured.herokuapp.com/api/posts/"+postId+"/likes/"+ev.target.dataset.likeid, {
                method: "DELETE",
                headers: getHeaders()
            })
                .then(response => response.json())
                .then(data => {
                    // console.log(data);
                    elem.classList.remove("fas")
                    elem.classList.add("far")
                });
        }
    }

    const unBookmarkOrBookmark = (postId, ev) =>{
        const elem = ev.currentTarget
        const postData = {
            "post_id": postId
        }
        if (elem.classList.contains("far")) {
            fetch("https://photo-app-secured.herokuapp.com/api/bookmarks/", {
                method: "POST",
                headers: getHeaders(),
                body: JSON.stringify(postData)
            })
                .then(response => response.json())
                .then(data => {
                    // console.log(data)
                    elem.classList.remove("far")
                    elem.classList.add("fas")
                    ev.target.dataset.bookmarkid=data.id
                });
        }
        else {
            fetch("https://photo-app-secured.herokuapp.com/api/bookmarks/"+ev.target.dataset.bookmarkid, {
                method: "DELETE",
                headers: getHeaders()
            })
                .then(response => response.json())
                .then(data => {
                    // console.log(data);
                    elem.classList.remove("fas")
                    elem.classList.add("far")
                });
        }
    }

    const getInputValue = e =>{
        e.preventDefault()
        const postData = {
            "post_id": e.target.dataset.postid,
            "text": inputValue
        };
        fetch("https://photo-app-secured.herokuapp.com/api/comments", {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(postData)
        })
            .then(response => response.json())
            .then(data => {
                setNewComments(oldArray => [...oldArray, [e.target.dataset.postid, inputValue]])
                // console.log(newComments)
            })
    }

    const addComment = e =>{
        setInputValue(e.target.value)
    }

    return (
        posts.map((item, index) => {
            return <div id={item.id} key={item.id} className="post">
                <div className="post_user_name">
                    <strong>{item.user.first_name} {item.user.last_name}</strong>
                </div>
                <img src={item.image_url} />
                <div className="post-operation">
                    <div className="like">
                        <i aria-label="button" className={
    item.current_user_like_id ? "fas fa-heart" : "far fa-heart"
} onClick={(ev)=>unLikeOrLike(item.id, ev)} data-likeid={item.current_user_like_id}/>
                    </div>
                    <div className="message" style={{marginLeft:1 + "em"}}>
                        <i className="far fa-comment"></i>
                    </div>
                    <div className="forward" style={{marginLeft:1 + "em"}}>
                        <i className="far fa-paper-plane"></i>
                    </div>
                    <div className="mark" style={{marginRight: 1+"em", marginLeft: "auto"}}>
                        <i aria-label="button" className={
    item.current_user_bookmark_id ? "fas fa-bookmark" : "far fa-bookmark"
} onClick={(ev) => unBookmarkOrBookmark(item.id, ev)} data-bookmarkid={item.current_user_bookmark_id}/>
                    </div>
                </div>
                <div>
                    {item.likes.length} likes
                </div>
                <div className="caption">
                    <p><strong>{item.user.username}</strong> {item.caption ? item.caption : 'no caption'}</p>
                    <p style={{color: "#777777"}}>{item.display_time}</p>
                </div>
                <div className="comments">
                    <div className="comments-general">
                        <button data-action="viewbtn" className="viewcomments"
                                tabIndex="0">View all {item.comments.length} comments
                        </button>
                    </div>
                    <div>
                        <div><strong>{item.comments.length>0?item.comments[0].user.username:""}</strong>
                            {item.comments.length>0?item.comments[0].text:""}</div>
                        <div style={{color: "#777777"}}>{item.comments.length>0?item.comments[0].timestamp:""}</div>
                    </div>
                    <div></div>
                </div>
                <div>
                    {newComments.map((i, index)=>{
                        if (parseInt(i[0])===item.id){
                            return <div key={Math.random()*900000000}>
                                <strong>{profileUsername.profileUsername}</strong>
                                {i[1]}
                            </div>
                        }
                        else {
                            return ""
                        }
                    })}
                </div>
                <div className="add-comment" >
                    <div className="add-comment-input">
                        <form data-postid={item.id} onSubmit={getInputValue}>
                            <input placeholder="Add a comment..." onChange={addComment} style={{border: "none", outline: "none", width: 80+"%"}}/>
                            <input type="submit" className="btn" data-action="postbtn"
                                   tabIndex="0"
                                   value="Post"
                                   style={{float: "right"}}
                            />
                        </form>
                    </div>
                </div>
                <div style={{height: 1+"em", background: "#FFFFFF"}}></div>
            </div>
        })
    )
}

export default Posts;