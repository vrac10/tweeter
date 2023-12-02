import SideBar from '../containers/sidebarContainer';
import './search.css';
import { useState } from 'react';
import {makeUnathenticatedPostRequest, makeGetRequest} from '../utils/serverHelper.js'
import TweetComponent from '../components/tweetComponent.js';


export default function Search(){
    
    const [tweets, setTweets] = useState([])
    const [userName, setUserName] = useState('')

    const searchTweets = async () => {
        const body = {username : userName}
        const response = await makeUnathenticatedPostRequest('tweets/get/all',body);

        if(response.length > 0 && !response.err){
            setTweets(response)
        }else{
            console.log('Cannot get tweets')
        }
    }


    return (
        <SideBar EXPLORE = "clicked">
        <div className='container'>
            <div className='SearchBar'>
                Search
                <div className='s'>
                    <input type='text' className="main-search" placeholder='What are you looking for ?' onChange={(e) => {
                        setTweets([]);
                        setUserName(e.target.value)
                        }}/>
                    <button onClick={(e)=>{
                        e.preventDefault();
                        searchTweets();
                    }}>Search</button>
                </div>
            </div>
            <div className="tweets-user">
                <h1 className='main-heading'>{tweets.length>0?"Tweets by " + userName+":":""}</h1>
                {tweets.length>0?tweets.map((item,index) => {
                    return (<TweetComponent
                        key = {index}
                        userName = {userName}
                        tweet = {item.tweet}
                        date = {item.time}
                        />)
                }):""}
        </div> 
        </div>
        </SideBar>
    )
}