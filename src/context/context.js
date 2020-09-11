import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();

//Provider, Consumer - GithubContext.Provider

const GithubProvider = ({children}) => {
    const [githubUser,setGithubUser] = useState(mockUser);
    const [repos,setRepos] = useState(mockRepos);
    const [followers,setFollowers] = useState(mockFollowers);

    //request loding
    const [requests, setRequest] = useState(0);
    const [isLoading, setisLoading] = useState(false);
    //error
    const [error, setError] = useState({show: false, msg: ''})

    const searchGithubUser = async (user) =>{
        //Toggle Error
         toggleError();
         setisLoading(true);
        //Set Loading(true)
        const response = await axios(`${rootUrl}/users/${user}`)
        .catch(err =>console.log(err));
        if(response){
            setGithubUser(response.data);
            const {login, followers_url} = response.data;

            //reponse
            axios(`${rootUrl}/users/${login}/repos?per_page=100`)
            .then(response => {
                setRepos(response.data);
            });
            //followers
            axios(`${followers_url}?per_Page=100`)
            .then(response =>{
                setFollowers(response.data)
            });
            // await Promise.allSettled([axios(`${rootUrl}/users/${login}/repos?per_page=100`), axios(`${followers_url}?per_Page=100`)])
            // .then(results )
           

        } else{
            toggleError(true, 'There is no user with that Username')
        }
        checkRequests();
        setisLoading(false);
    };


    //chack rate
    const checkRequests = () =>{
        axios.get(`${rootUrl}/rate_limit`).then(({data}) => {
             let {rate:{remaining}} = data;
             setRequest(remaining);
             if(remaining === 0 ){
                 toggleError(true, 'soory, you have exceeded you hourly rate limit.')
             }
        } ).catch((err) => console.log(err))
    }
    function toggleError(show = false, msg = ''){
        setError({show, msg})
    }

    //error
    useEffect( checkRequests, []);

    return <GithubContext.Provider value={{githubUser,repos,followers, requests, error, searchGithubUser, isLoading}}>{children}</GithubContext.Provider>
}

export {GithubProvider, GithubContext};
