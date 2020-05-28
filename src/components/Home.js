import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/homePage.css';

const Home = () => {
    let data = new FormData();
    const appendData = (e) => {
        data.append('file', e.target.files[0]);
    };

    const uploadFilesOnServer = () => {
        console.log(data);
        axios.post('http://localhost:8080/upload', data, {
            headers: { 'Content-Type': "application/json; charset=utf8" }
        }).then(
            (response) => {
                console.log(response);
            },
            (error) => {
                console.log(error);
            }
        );
    };

    return (
        <div>
            <h1> Ball James App </h1>
            <div className='m-2'>
                <span> Xml file upload: </span>
                <input type='file' name='xmlFile'
                    onChange={appendData} />
            </div>
            <div className='m-2'>
                <span> Csv file upload: </span>
                <input type='file'
                    name='csvFile'
                    onChange={appendData} />
            </div>
            <div>
                <button className='btn btn-success'
                    onClick={uploadFilesOnServer} >
                    Upload </button>
            </div>
                <a href='/gameInformation'>
                    <div className="anchor">
                        Check game statistics
                    </div>
                </a>
        </div>
    );
};

export default Home;