import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.desc || '');
  const [title, setTitle] = useState(state?.title || '');
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || '');
  const navigate = useNavigate();

  const upload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await axios.post("http://localhost:8800/api/upload", formData, { withCredentials: true });
    return res.data;
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();
    state
      ? await axios.put(`http://localhost:8800/api/posts/${state.id}`, { title, desc: value, cat, img: file ? imgUrl : "" }, { withCredentials: true })
      : await axios.post(`http://localhost:8800/api/posts/`, { title, desc: value, cat, img: file ? imgUrl : "", date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss") }, { withCredentials: true });
    navigate("/");
  };

  return (
    <div className='add'>
      <div className="content">
        <input type="text" value={title} placeholder='Title' onChange={e => setTitle(e.target.value)} />
        <div className="editorContainer">
          <ReactQuill className='editor' theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status:</b>Draft
          </span>
          <span>
            <b>Visibility:</b>Public
          </span>
          <input style={{display:"none"}} type="file"  id='file' name='' onChange={e=>setFile(e.target.files[0])}/>
          <label className='file' htmlFor="file">Upload image</label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
         
          <h1>Category</h1>

          <div className="cat">
          <input type="radio" checked={cat==="MentalHealth"} name='cat' value="MentalHealth" id='MentalHealth' onChange={e=>setCat(e.target.value)}/>
          <label htmlFor="MentalHealth">Mental Health</label>
          </div>
          <div className="cat">
          <input type="radio"  checked={cat==="Foods"} name='cat' value="Foods" id='Foods' onChange={e=>setCat(e.target.value)} />
          <label htmlFor="Foods">Foods</label>
          </div>
          <div className="cat">
          <input type="radio"  checked={cat==="Vegetables"} name='cat' value="Vegetables" id='Vegetables' onChange={e=>setCat(e.target.value)} />
          <label htmlFor="Vegetables">Vegetables</label>
          </div>
          <div className="cat">
          <input type="radio"  checked={cat==="Vegetarian"} name='cat' value="Vegetarian" id='Vegetarian' onChange={e=>setCat(e.target.value)} />
          <label htmlFor="Vegetarian">Vegetarian</label>
          </div>
          <div className="cat">
          <input type="radio" checked={cat==="Exercise"} name='cat' value="Exercise" id='Exercise' onChange={e=>setCat(e.target.value)} />
          <label htmlFor="Exercise">Exercise</label>
          </div>
          <div className="cat">
          <input type="radio" checked={cat==="Vitamins"} name='cat' value="Vitamins" id='Vitamins' onChange={e=>setCat(e.target.value)} />
          <label htmlFor="Vitamins">Vitamins</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;