import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';



const Home = () => {
  
  const [posts,setPosts] = useState([]);

  const navigate=useNavigate()

  const cat = useLocation().search

  useEffect(()=>{
    const fetchData = async ()=>{
     
        const res = await axios.get(`http://localhost:8800/api/posts${cat}`);
        setPosts(res.data)

     
    };
    fetchData();
  }, [cat]);

  const handleButtonClick = (postId) => {
    // İlgili post sayfasına yönlendirme işlemi
    navigate(`/post/${postId}`);
  };



const getText=(html)=>{
  const doc= new DOMParser().parseFromString(html,"text/html")
  return doc.body.textContent
}
  

  return (
    <div className='home'>
      <div className='posts'>
        {posts.map((post)=>(
        <div className='post' key={post.id}>
          <div className='img'>
            <img src={`../upload/${post.img}`} alt="" />
            
          </div>
          <div className='content'>
            <Link className='link' to={`/post/${post.id}`}>
            <h1>{post.title}</h1>
            </Link>
            <p>{getText(post.desc)}</p>
            <button onClick={() => handleButtonClick(post.id)}>Read More</button>
            
          </div>

        </div>) )}
      </div>
    </div>
  );
};

export default Home