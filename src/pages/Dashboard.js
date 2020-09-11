import React from 'react';
import { Info, Repos, User, Search, Navbar, Loader } from '../components';
import { GithubContext } from '../context/context';
const Dashboard = () => {
  const {isLoading} = React.useContext(GithubContext)
  if(isLoading){
    return <main>
    <Navbar></Navbar>
    <Search />
    <Loader />
    
  </main>
  }

  return (
    <main>
      <Navbar></Navbar>
      <Search />
      <Info></Info>
      <User />
      <Repos />
    </main>
  );
};

export default Dashboard;
