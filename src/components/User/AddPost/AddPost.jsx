import React, { useState } from 'react';
import uploadImage from '../../../utils/cloudinary';
import { addPost } from '../../../features/post/postSlice';
import { useDispatch, useSelector } from 'react-redux';
import TagUser from './TagUser';

const AddPost = ({ onClose }) => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [description, setDescription] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [openTag,setOpenTag] =useState(false)
    const [taggedUsers,setTaggedUsers]=useState([])
    const [userNames,setTaggedUserNames]=useState([])
    const [taggedId,setTaggedId] =useState([])
    
    const toggleTag =()=>{        
        setOpenTag(!openTag)
    }
    const handleTaggedUsersChange = (users) => {     
      
        setTaggedUsers([users]);
        const userNames = users.map(user => user.userName);
        const taggedIds = users.map(user => user._id);
        setTaggedUserNames(userNames);
        setTaggedId(taggedIds);

    };
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

    const handleTagInputChange = (e) => {
        setTagInput(e.target.value);
    };

    const handleAddTag = () => {
        if (tagInput.trim() !== '') {
            const tagsWithPrefix = `#${tagInput}`
            setTags([...tags, tagsWithPrefix.trim()]);
            setTagInput('');
        }
    };

    const handleRemoveTag = (tag) => {
        setTags(tags.filter(t => t !== tag));
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            uploadImage(imageFile)
                .then((imageUrl) => {
                    const data = {
                        imageUrl,
                        description,
                        tags, // Include tags in the data
                        userId: user._id,
                        taggedUsers: taggedId.flat()
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
            {openTag && <TagUser onClose={toggleTag} setTaggedUsers={handleTaggedUsersChange}/>}
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative w-full max-w-lg overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-900">
            <form onSubmit={handleSubmit}>
                <div className="p-6">
                    <div className="flex items-center justify-center relative">
                        {imagePreview && (
                            <>
                            <img className="w-full h-48 object-cover rounded-lg" src={imagePreview} alt="Preview" />
                            {userNames.length > 0 && (
                                <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                                     <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900 bg-opacity-75 text-white p-2 rounded-md">
            {userNames.join(', ')}
        </div>
                                </div>
                            )}
                            <div onClick={toggleTag} className="cursor-pointer absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                                <div className="bg-gray-900 bg-opacity-75 text-white p-2 rounded-md cursor-pointer">tag users</div>
                            </div>
                        </>
                        )}
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

                    <div className="mt-4">
                        <input
                            type="text"
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            value={tagInput}
                            onChange={handleTagInputChange}
                            placeholder="Add tags (comma-separated)"
                        />
                        <button type="button" onClick={handleAddTag} className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-md">Add Tag</button>
                    </div>

                    <div className="mt-2">
                        {tags.map(tag => (
                            <span key={tag} className="inline-block bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-2 py-1 m-1 rounded-md">
                                {tag}
                                <button type="button" onClick={() => handleRemoveTag(tag)} className="ml-2 focus:outline-none">x</button>
                            </span>
                        ))}
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
