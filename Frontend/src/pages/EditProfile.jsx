import React, { useState } from 'react'
import { FaArrowLeft } from "react-icons/fa6"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'
import { serverUrl } from '../App'
import { setUserData } from '../redux/userSlice'

function EditProfile() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userData } = useSelector(state => state.user)

  const [name, setName] = useState(userData?.name || "")
  const [description, setDescription] = useState(userData?.description || "")
  const [photoUrl, setPhotoUrl] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleEditProfile = async () => {
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("description", description)
      if (photoUrl) formData.append("photo", photoUrl)

      const result = await axios.post(
        serverUrl + "/api/user/profile",
        formData,
        { withCredentials: true }
      )

      dispatch(setUserData(result.data))
      toast.success("Profile Updated")
      navigate("/profile")

    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || "Update failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className='bg-white rounded-2xl shadow-lg p-8 max-w-xl w-full relative'>

        <FaArrowLeft
          className='absolute top-[8%] left-[5%] w-[22px] h-[22px] cursor-pointer'
          onClick={() => navigate("/profile")}
        />

        <form className='space-y-5' onSubmit={(e) => e.preventDefault()}>

          <div className='flex flex-col items-center'>
            {userData?.photoUrl ? (
              <img
                src={userData.photoUrl}
                className='w-24 h-24 rounded-full object-cover border-4 border-black'
                alt="avatar"
              />
            ) : (
              <div className='w-24 h-24 rounded-full text-white flex items-center justify-center text-[30px] bg-black'>
                {userData?.name?.slice(0, 1).toUpperCase()}
              </div>
            )}
          </div>

          <div>
            <label className='text-sm font-medium text-gray-700'>Select Avatar</label>
            <input
              type="file"
              accept="image/*"
              className='w-full px-4 py-2 border rounded-md text-sm'
              onChange={(e) => setPhotoUrl(e.target.files[0])}
            />
          </div>

          <div>
            <label className='text-sm font-medium text-gray-700'>User Name</label>
            <input
              type="text"
              className='w-full px-4 py-2 border rounded-md text-sm'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className='text-sm font-medium text-gray-700'>Email</label>
            <input
              readOnly
              type="text"
              value={userData?.email}
              className='w-full px-4 py-2 border rounded-md text-sm bg-gray-100'
            />
          </div>

          <div>
            <label className='text-sm font-medium text-gray-700'>Bio</label>
            <textarea
              rows={3}
              className='w-full mt-1 px-4 py-2 border rounded-md resize-none focus:ring-2 focus:ring-black'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button
            disabled={loading}
            onClick={handleEditProfile}
            className='w-full bg-black text-white py-2 rounded-md font-medium disabled:opacity-60'
          >
            {loading ? <ClipLoader size={22} color="white" /> : "Save Changes"}
          </button>

        </form>
      </div>
    </div>
  )
}

export default EditProfile
