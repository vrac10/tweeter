import React, { useEffect, useState } from 'react';
import {useCookies} from 'react-cookie';
import {makeUnathenticatedPostRequest, makeGetRequest} from '../utils/serverHelper.js'
import './home.css';
import TweetComponent from '../components/tweetComponent.js';
import SideBar from '../containers/sidebarContainer.js';

export function Home() {

  const [cookie, setCookie] = useCookies(['token'])
  const [tweets,setTweets] = useState([])
  const [UserNames, setUsernames] = useState([])

  useEffect(() => {
        const fetchTweets = async () => {
          const response = await makeGetRequest('tweets/get/tweets');

          if(response && !response.err){
              setTweets(response.reverse());
          }
      }
      fetchTweets();
  },[cookie])

  useEffect(() => {
    const fetchName = async () => {
      const userNames = [];
      if(tweets.length > 0){
        for(let x of tweets){
          const body = {userId : x.userName}
          const response = await makeUnathenticatedPostRequest('tweets/get/userName', body);

          if(response && !response.err){
            userNames.push(response.userName);
          }
        }
       setUsernames(userNames);
      }
    }
    fetchName();
  },[tweets])
  

  return (
      <SideBar HOME = "clicked">
        <div className="main-content">
          <h1 className='main-heading'>TRENDING:</h1>
          {tweets.map((item,index) => {
              return (<TweetComponent
                key = {index}
                userName = {UserNames[index]}
                tweet = {item.tweet}
                date = {item.time}
                />)
          })}
        </div>
      </SideBar>
    
  );
}

export default Home;