const uploadImage = (image) => {
    return new Promise((resolve, reject) => {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "hsuul2jl");
      data.append("cloud_name", "dnf2ntfbe");
      
      fetch("https://api.cloudinary.com/v1_1/dnf2ntfbe/image/upload", {
        method: "post",
        body: data,
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log("Image uploaded successfully:", data.url);
          resolve(data.url); // Resolve the promise with the uploaded image URL
        })
        .catch((err) => {
          console.error("Error uploading image:", err);
          reject(err); // Reject the promise with the error
        });
    });
  };
  
  export default uploadImage;
  