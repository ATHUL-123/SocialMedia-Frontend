import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import uploadImage from '../../../utils/cloudinary'
import { editProfile } from '../../../services/User/apiMethods'
import { toast } from 'react-toastify'
import { setUser } from '../../../features/auth/authSlice'

function EditProfile({ isOpen, toggleModal }) {

  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [isImageChange, setIsImageChange] = useState(false)
  const [imagePreview, setImagePreview] = useState(user.profilePic)
  const [formData, setFormData] = useState({
    image: user.profilePic,
    bio: user.bio,
    name: user.name
  })

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: file // Update formData.image directly with the file
        });
        setImagePreview(reader.result);
        setIsImageChange(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isImageChange) {
      uploadImage(formData.image)
        .then((imageUrl) => {
          const data = {
            image: imageUrl,
            bio: formData.bio,
            name: formData.name
          }

          editProfile(data)
            .then((response) => {
              dispatch(setUser(response))
              toast.success(response.message)

            })
            .catch((error) => {
              console.log(error);
              toast.error(error.response.data.message);
            })
        })
    } else {
      editProfile(formData)
        .then((response) => {
          dispatch(setUser(response))
          toast.success(response.message)
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.message);
        })
    }

    toggleModal()
  }

  return (
    isOpen && (
      <div
        className="fixed inset-0 z-10 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
            &#8203;
          </span>

          <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
            <h3 className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">
              Edit Profile
            </h3>

            <form className="mt-4" action="#">



              <label htmlFor="image" className="block text-sm text-gray-500 dark:text-gray-300">Profile Image</label>

              <input
                type="file"
                id="image"
                accept="image/*"
                name="image"
                onChange={handleImageChange}
                className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
              />

              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="mt-2 w-full" />
              )}


              <label htmlFor="username" className="block mt-3 text-sm text-gray-700 dark:text-gray-200">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="block w-full px-4 py-3 mt-1 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
              />

              <label htmlFor="username" className="block mt-3 text-sm text-gray-700 dark:text-gray-200">
                Add Bio
              </label>
              <input
                type="text"
                name="bio"
                id="bio"
                placeholder="Bio"
                value={formData.bio}
                onChange={handleChange}
                className="block w-full px-4 py-3 mt-1 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
              />

              <div className="mt-4 sm:flex sm:items-center sm:-mx-2">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSubmit}
                  type="button"
                  className="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )


  )
}



export default EditProfile