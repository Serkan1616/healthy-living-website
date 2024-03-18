import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Link, useNavigate } from 'react-router-dom';

 const Menu = ({cat}) => {

  const [posts,setPosts] = useState([]);
  const navigate=useNavigate()

  useEffect(()=>{
    const fetchData = async ()=>{
     
        const res = await axios.get(`http://localhost:8800/api/posts/?cat=${cat}`);
        setPosts(res.data)

     
    };
    fetchData();
  }, [cat]);

  const handleButtonClick = (postId) => {
    // İlgili post sayfasına yönlendirme işlemi
    navigate(`/post/${postId}`);
  };


  return (
    <div className="menu">
        <h1>Other posts you may like</h1>
        {posts.map((post)=>(
            <div className="post" key={post.id}>
                <img src={`../upload/${post?.img}`} alt="" />
                <Link className='link' to={`/post/${post.id}`}>
                <h2>{post.title}</h2>
                </Link>
                <button onClick={() => handleButtonClick(post.id)}>Read More</button>
            </div>
            
        ))}
    </div>
  );
};
export default Menu;
