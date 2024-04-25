import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import uploadImage from '../../../utils/cloudinary';
import { editPost } from '../../../services/User/apiMethods';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { getPost } from '../../../features/post/postSlice';

function EditPost({ isOpen, onClose, post }) {

    const dispatch = useDispatch()
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [description, setDescription] = useState('');
    const [imagePreview, setImagePreview] = useState(post.image);
    const [isImageChange, setIsImageChange] = useState(false);
    const [imageFile, setImageFile] = useState('');
    const [tags, setTags] = useState(post.tags || []);

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(e.target.files[0])
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setIsImageChange(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleTagInputChange = (e) => {
        // Split tags by comma and remove leading/trailing spaces
        const inputTags = e.target.value.split(',').map(tag => tag.trim());
        const tagsWithPrefix = inputTags.map(tag => `#${tag}`);
        setTags(tagsWithPrefix);
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        onClose();
    };

    const editPostSubmit = (e) => {
        try {
            e.preventDefault()

            if (isImageChange) {
              
                uploadImage(imageFile)
                    .then((imageUrl) => {
                        const data = {
                            imageUrl,
                            description,
                            tags // Include tags in the data
                        }

                        editPost(post._id, data)
                            .then((response) => {
                            
                                dispatch(getPost())

                            })
                            .catch((error) => {
                                toast.error(error);
                            })
                    })
                    .catch((error) => {
                        console.error("Upload error:", error);
                    });

            } else if (description !== post.description || JSON.stringify(tags) !== JSON.stringify(post.tags)) {

                const data = {
                    imageUrl: post.image,
                    description,
                    tags // Include tags in the data
                }
                editPost(post._id, data)
                    .then((response) => {
                  
                        toast.success(response.message)
                        dispatch(getPost())

                    })
                    .catch((error) => {
                        toast.error(error);
                    })
            }
            onClose();
        } catch (error) {
            console.error(error);
        }
    }

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <>
            {/* Background overlay */}
            <div className="fixed inset-0 z-10 bg-black opacity-50"></div>

            {/* Modal */}
            <div className="fixed inset-0 z-20 flex items-center justify-center">
                <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
                    <h3 className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">
                        Edit Post
                    </h3>
                    

                    <form className="mt-4" action="#">
                        {/* Description input */}
                        <div className="mt-4">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows="3"
                                onChange={handleDescriptionChange}
                                value={description}
                                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                placeholder={post.description}
                            ></textarea>
                        </div>

                        {/* Tags input */}
                        <div className="mt-4">
                            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Tags
                            </label>
                            <input
                                type="text"
                                id="tags"
                                name="tags"
                                onChange={handleTagInputChange}
                                value={tags.join(', ')}
                                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                placeholder="Enter tags separated by commas"
                            />
                        </div>

                        {/* Image input */}
                        <div className="mt-4">
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Image
                            </label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                onChange={handleImageChange}
                                accept="image/*"
                                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                           {imagePreview && (
    <img src={imagePreview} alt="Preview" className="mt-2 w-full h-64 object-cover" />
)}

                        </div>

                        {/* Buttons */}
                        <div className="mt-4 sm:flex sm:items-center sm:-mx-2">
                            <button type="button" onClick={toggleModal} className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                                Cancel
                            </button>
                            <button type="button" onClick={editPostSubmit} className="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>,
        document.getElementById('portal-root')
    );
}

export default EditPost;
