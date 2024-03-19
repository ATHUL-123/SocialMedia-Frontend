import React, { useState } from 'react';
import uploadImage from '../../../utils/cloudinary';
import { addPost } from '../../../features/post/postSlice';
import { useDispatch, useSelector } from 'react-redux';

const AddPost = ({ onClose }) => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [description, setDescription] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [imageFile, setImageFile] = useState(null);

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            uploadImage(imageFile)
                .then((imageUrl) => {
                    const data = {
                        imageUrl,
                        description,
                        userId: user._id
                    }
                    dispatch(addPost(data))
                    console.log("Image URL:", imageUrl);
                })
                .catch((error) => {
                    console.error("Upload error:", error);
                });
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="relative flex justify-center">
           
            <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
                <div className="relative w-full max-w-lg overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-900">
                    <form onSubmit={handleSubmit}>
                        <div className="p-6">
                            <div className="flex items-center justify-center">
                                {imagePreview && <img className="w-full h-48 object-cover rounded-lg" src={imagePreview} alt="Preview" />}
                                <input type="file" onChange={handleImageChange} />
                            </div>

                            <div className="mt-6">
                                <textarea
                                    className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                    rows="4"
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    placeholder="Enter description..."
                                />
                            </div>
                        </div>

                        <div className="flex justify-center p-4 bg-gray-100 dark:bg-gray-800">
                            <button type="button" onClick={() => onClose()} className="px-4 py-2 mr-2 text-sm font-medium text-gray-700 capitalize transition-colors duration-300 bg-white border border-gray-200 rounded-md hover:bg-gray-200 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:focus:border-gray-600">
                                Cancel
                            </button>

                            <button type="submit" className="px-4 py-2 text-sm font-medium text-white capitalize transition-colors duration-300 bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                                Confirm
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddPost;
