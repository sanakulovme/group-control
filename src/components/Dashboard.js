import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/dashboard.css'
import axios from 'axios'

const Dashboard = () =>{
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [groupName, setgroupName] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const TOKEN = localStorage.getItem('token');


  const config = {
      headers: {
          'Accept': '*/*',
          'Authorization': `Bearer ${TOKEN}`,
          'Content-Type': 'application/json'
      }
  }

  const data = {
    "creatorId": 0,
    "endDate": "2024-11-03",
    "id": 0,
    "name": "groupName",
  }

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get(
          'https://197f-84-54-71-79.ngrok-free.app/japan/edu/api/group/get/all',
          config
        );
        console.log('OKKKK')
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchGroups();
  }, [navigate]);

  // console.log(groups)
  const GroupHandler = async () => {
    try {
        const response = await axios.post('https://197f-84-54-71-79.ngrok-free.app/japan/edu/api/group/create', data, config);
        console.log('OK')
      } catch (error) {
        // console.error('Error fetching groups:', error);
      }
  }

  return (
    <div className="d-flex flex-column p-4 gap-4 py-md-5 align-items-center justify-content-center">
      <div className='btn-group mb-3'>
        <button
          className='btn btn-primary'
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModal"
        >Create</button>
      </div>
      <div className="list-group">
        <a href="#" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
          <div className="d-flex gap-2 w-100 justify-content-between">
            <div>
              <h6 className="mb-0">List group item heading</h6>
              <p className="mb-0 opacity-75">Some placeholder content in a paragraph.</p>
            </div>
            <small className="opacity-50 text-nowrap">now</small>
          </div>
        </a>
        <a href="#" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
          <div className="d-flex gap-2 w-100 justify-content-between">
            <div>
              <h6 className="mb-0">Another title here</h6>
              <p className="mb-0 opacity-75">Some placeholder content in a paragraph that goes a little longer so it wraps to a new line.</p>
            </div>
            <small className="opacity-50 text-nowrap">3d</small>
          </div>
        </a>
        <a href="#" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
          <div className="d-flex gap-2 w-100 justify-content-between">
            <div>
              <h6 className="mb-0">Third heading</h6>
              <p className="mb-0 opacity-75">Some placeholder content in a paragraph.</p>
            </div>
            <small className="opacity-50 text-nowrap">1w</small>
          </div>
        </a>
      </div>
      <div className="container mt-5">

      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Yangi guruh</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <input onChange={(event) => setgroupName(event.target.value)} className='form-control' type="text" placeholder='Yangi guruh nomi...' />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Yopish</button>
              <button type="button" className="btn btn-primary" onClick={GroupHandler}>Yaratish</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Dashboard;
