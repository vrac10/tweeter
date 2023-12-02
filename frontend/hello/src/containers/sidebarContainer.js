import "./container.css";
import { useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import {makeUnathenticatedPostRequest} from "../utils/serverHelper.js";


export default function SideBar({children,HOME,HELP,EXPLORE,PROFILE}){

    const navigate = useNavigate();
    const [cookie,setCookie,removeCookie] = useCookies(['token'])
    const [userName,setUsername] = useState('')
    const [post,setPost] = useState('')
    const [user,setUser] = useState([])

    useEffect(() => {
        const getUser = async () => {
            const body = {userId : cookie.token}
            const response = await makeUnathenticatedPostRequest('tweets/get/userName',body);

            if(response && !response.err){
                setUsername(response.userName);
                setUser(response)
            }
        }

        getUser();
    },[cookie])

    const makePost = async () => {
        const d = new Date();
        const date = String(d.getDate()) + '/' + String(d.getMonth()) + '/' + String(d.getFullYear())
        if(post != null && post.length > 0){
            const body = {userId  : cookie.token , tweet : post , time : date}

            const response = await makeUnathenticatedPostRequest('tweets/createTweet' , body);

            if(response && !response.err){
                alert("Posted!")
            }
            else{
                console.log("error creating tweet");
            }
        }
    }

    const logoutfuc = () => {
        removeCookie('token',{path : '/'});
        alert('You have been logged out');
    }


    return (
        <div className="main">
        <div className="SideBar">
            <div className="field">
                <h1 className={"BUTTON " + HOME } onClick={(e) => {
                    e.preventDefault()
                    navigate('/home');
                }} style={HOME==="clicked"?{fontWeight : 800}:{fontWeight : 500}}>
                <Icon icon={HOME==="clicked"? "ion:home":"ion:home-outline"} fontSize={22} style={{"paddingRight": 5}}/> Home</h1>

                <h1 className={"BUTTON " + EXPLORE } onClick={(e) => {
                    e.preventDefault()
                    navigate('/search');
                }} style={EXPLORE==="clicked"?{fontWeight : 800}:{fontWeight : 500}}>
                <Icon icon={EXPLORE==="clicked"? "ion:search":"ion:search-outline"} fontSize={21} style={{"paddingRight": 10}}/>Search</h1>

                <h1 className={"BUTTON " + PROFILE } onClick={(e) => {
                    e.preventDefault()
                    navigate('/profile');
                }} style={PROFILE==="clicked"?{fontWeight : 800}:{fontWeight : 500}}>
                <Icon icon={PROFILE==='clicked'?"iconamoon:profile-fill":"iconamoon:profile-light" } fontSize={21} style={{"paddingRight": 10}}/>Profile</h1>

                <h1 className={"BUTTON " + HELP } onClick={(e) => {
                    e.preventDefault()
                    navigate('/help');
                }} style={HELP==="clicked"?{fontWeight : 800}:{fontWeight : 500}}>
                <Icon icon={HELP==="clicked"? "ion:settings":"ion:settings-outline"} fontSize={21} style={{"paddingRight": 10}}/>Help</h1>
            </div>
        </div>
        {children}  
        {PROFILE === "clicked"?
        <div className="profile-bar">
            <div className="actual-div">
                <img src="logo192.png" width={90} height={90} style={{"paddingLeft" : 110, "paddingBottom" : 20}}/>
                <h2>
                    UserName : @{userName}
                </h2>
                <h2>
                    Email : {user.email}
                </h2>
                <h2>
                    Age : {user.age}
                </h2>
            <button onClick={logoutfuc}>Log Out</button>
            </div>
        </div>: 
        <div className="tweeting-bar">
            <div className="tw">
                <h1>
                    @{userName}
                </h1>
                <textarea className="fixed-width-textarea" rows="20" cols="200" placeholder="Enter your tweet" onChange={(e) => {
                    setPost(e.target.value)
                }}></textarea>
                <button onClick={(e) => {
                    e.preventDefault();
                    makePost();
                }}>Post</button>
            </div>
        </div>}
    </div>
    );
}