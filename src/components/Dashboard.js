import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/dashboard.css'
import axios from 'axios'

const Dashboard = () =>{
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [groupData, setGroupData] = useState({creatorId: 2, endDate: "2024-12-31", id: 0, name: '', startDate: "2024-11-04"});
  const [updateGroup, setUpdateGroup] = useState({id: null, name: ''})

  const TOKEN = localStorage.getItem('token');

  useEffect(() => {
    if (!TOKEN) {
      navigate('/login');
    }
  }, [navigate]);

  const config = {
      headers: {
          'Accept': '*/*',
          'Authorization': `Bearer ${TOKEN}`,
          'Content-Type': 'application/json'
      }
  }

  const fetchGroups = async () => {
      try {
        const response = await axios.get(
          'http://52.53.242.81:7088/japan/edu/api/group/get/all/admin',
          config
        );
        setGroups(response.data.object)
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
  };
  fetchGroups();


  const createGroupHandler = async () => {
    try {
        const response = await axios.post('http://52.53.242.81:7088/japan/edu/api/group/create', groupData, config);
        fetchGroups();
        setGroupData(values => ({...values, name: ''}))
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
  }

  const updateGroupHandler = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.put('http://52.53.242.81:7088/japan/edu/api/group/update', updateGroup, config);

        if(response.data.success === true && response.status == 200){
          fetchGroups()
          setUpdateGroup({id: null, name: ''})
        }
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
  }

  const deleteGroup = async (id) => {
    if(confirm("O'chirilsinmi?")){
      try {
        const response = await axios.delete(`http://52.53.242.81:7088/japan/edu/api/group/delete?groupId=${id}`, config);

        if(response.data.success === true && response.status == 200){
          fetchGroups()
        }
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
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
          data-target="#createModal"
        >Create</button>
      </div>
      <div className="list-group">
      {groups.map(group => (
        <div key={group.id} className="list-group-item list-group-item-action py-3" aria-current="true">
            <h6 className="mb-0">{group.name}</h6>

            <div className='btn-group mt-3'>
              <button
                className='btn btn-primary'
                data-toggle="modal"
                data-target="#editModal"
                onClick={() => setUpdateGroup(values => ({...values, id: group.id}))}>Edit</button>
              <button
                className='btn btn-danger'
                onClick={() => deleteGroup(group.id)}
                >Delete</button>
            </div>
        </div>
      ))}

      </div>
      <div className="container mt-5">

      {/* create Modal */}
      <div
        className="modal fade"
        id="createModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="createModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createModalLabel">Yangi guruh</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <input required value={groupData.name} onChange={(event) => setGroupData(values => ({ ...values, name: event.target.value}))} className='form-control' type="text" placeholder='Yangi guruh nomi...' />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Yopish</button>
              <button type="button" className="btn btn-primary" onClick={createGroupHandler}>Yaratish</button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <div
        className="modal fade show"
        id="editModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="editModalLabel"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">Guruhni yangilash</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <input required value={updateGroup.name} onChange={(event) => setUpdateGroup(values => ({...values, name: event.target.value}))} className='form-control' type="text" placeholder='Yangi guruh nomi...' />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Yopish</button>
              <button type="button" className="btn btn-primary" onClick={updateGroupHandler}>Yaratish</button>
            </div>
          </div>
        </div>
      </div>


    </div>
    </div>
  );
}

export default Dashboard;
