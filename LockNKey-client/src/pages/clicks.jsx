import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Clicks() {
    const navigate = useNavigate();
    
    useEffect(() => {
        console.log("useEffect")
        async function getImageUrl () {
            const imgUrl = await  axios.get("api/user/getImage");
        console.log(imgUrl);
        if (imgUrl) {
            setImageURL(imgUrl);
            const img = document.createElement('img');
            img.onload = function () {
                document.getElementById("imagePreview").appendChild(img);
                img.src = imgUrl;
            }
            
        }
        }
        getImageUrl()

        
      
    }, []);
    const toast = useToast();
    const [pictureGrid, setPictureGrid] = useState({});
    const [picturePattern, setPicturePattern] = useState("");
    const [imgURL, setImageURL] = useState("");
    const displayImage = () => {
        const imagePreview = document.getElementById("imagePreview");

        const fileInput = document.getElementById("fileInput");
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.createElement('img');

            img.onload = function () {

                // Resize the image
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = 700;
                canvas.height = 300;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                img.src = canvas.toDataURL();

                // Display the resized image
                imagePreview.appendChild(img);
                // Set the displayedImage variable
            };
            img.src = e.target.result;
            setImageURL(e.target.result);
        };
        reader.readAsDataURL(file);
    }
    // const renderGrid = () => {
    //     const gridButtons = [];

    //     for (let i = 1; i < 17; i++) {
    //         gridButtons.push(
    //             <div key={i} className="flex justify-center items-center">
    //                 <button onClick={handlePattern} value={i} className="hover:border-blue-600 w-60 h-45 overflow-hidden bg-slate-300 p-11 rounded-lg bg-transparent cursor-pointer justify-center border-black border z-10"></button>
    //             </div>
    //         );
    //     }

    //     return gridButtons;
    // };
  
   


  const handlePattern = async (e) => {
    e.preventDefault();
    let value = e.target.value;
    if (pictureGrid[value]){
    if (pictureGrid[value] <= 2) {
      setPictureGrid({
        ...pictureGrid,
        [value]: pictureGrid[value] + 1,
      });
      
      setPicturePattern(picturePattern + value);
      toast({
        title: "Clicked",
        status: "info",
        duration: 2000,
      });
    } else {
      console.log(pictureGrid)
      toast({
        title: "Warning",
        description: "You can only click twice!",
        status: "warning",
        duration: 6000,
        isClosable: true,
      });
    }
}else{
    setPictureGrid({
        ...pictureGrid,
        [value]: 1,
      });
      
      setPicturePattern(picturePattern + value);
      toast({
        title: "Clicked",
        status: "info",
        duration: 2000,
      });
}
  };

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    console.log(picturePattern)
    e.preventDefault();
    try {
      if (!picturePattern) {
        toast({
          title: "Error Occurred",
          description: "Enter a pattern",
          status: "error",
          duration: 6000,
          isClosable: true,
        });
        return ;
      }
      setLoading(true);
      const res = await axios.post(
        "api/user/imgauth",
        {
          img_secret: picturePattern,
          img_url: imgURL,
        },
        {
          withCredentials: true,
        }
      );
      toast({
        title: "Success",
        description: "Success",
        status: "success",
        duration: 6000,
        isClosable: true,
      });
      setLoading(false);
      setTimeout(() => {
        navigate("/faceauth");
      }, 2000);
    } catch (err) {
      toast({
        title: "Error Occurred",
        description: err.response ? err.response.data.msg : err.msg,
        status: "error",
        duration: 6000,
        isClosable: true,
      });
      setLoading(false);
    }
  };
    return (
        <div className='bg-lavender h-screen flex items-center justify-center'>

            <div className='bg-blue-50 p-8 rounded-lg shadow-lg'>
                {!imgURL && (
                <input type="file" id="fileInput" onChange={displayImage} accept="image/*" />
                )}
                <input type="text" id="picture_password" name="picture_password" className="pic_text"></input>
                <h2 className='flex justify-center items-center p-1 text-xl font-semibold'>Verification</h2>
                <h3 className='flex justify-center items-center p-3 font-normal'>Click on the correct points to verify yourself successfully!</h3>

                <div className='mt-[30px] h-96 border-solid border relative flex justify-center'>
                    <div className="grid grid-cols-4 gap-1 absolute z-10 ">
                    <div key={1} className="flex justify-center items-center">
                    <button onClick={handlePattern} value={1} className="hover:border-blue-600 w-60 h-45 overflow-hidden bg-slate-300 p-11 rounded-lg bg-transparent cursor-pointer justify-center border-black border z-10"></button>
                </div>  
                <div key={2} className="flex justify-center items-center">
                    <button onClick={handlePattern} value={2} className="hover:border-blue-600 w-60 h-45 overflow-hidden bg-slate-300 p-11 rounded-lg bg-transparent cursor-pointer justify-center border-black border z-10"></button>
                </div>
                <div key={3} className="flex justify-center items-center">
                    <button onClick={handlePattern} value={3} className="hover:border-blue-600 w-60 h-45 overflow-hidden bg-slate-300 p-11 rounded-lg bg-transparent cursor-pointer justify-center border-black border z-10"></button>
                </div>  
                <div key={4} className="flex justify-center items-center">
                    <button onClick={handlePattern} value={4} className="hover:border-blue-600 w-60 h-45 overflow-hidden bg-slate-300 p-11 rounded-lg bg-transparent cursor-pointer justify-center border-black border z-10"></button>
                </div>
                <div key={5} className="flex justify-center items-center">
                    <button onClick={handlePattern} value={5} className="hover:border-blue-600 w-60 h-45 overflow-hidden bg-slate-300 p-11 rounded-lg bg-transparent cursor-pointer justify-center border-black border z-10"></button>
                </div>  
                <div key={6} className="flex justify-center items-center">
                    <button onClick={handlePattern} value={6} className="hover:border-blue-600 w-60 h-45 overflow-hidden bg-slate-300 p-11 rounded-lg bg-transparent cursor-pointer justify-center border-black border z-10"></button>
                </div>
                <div key={7} className="flex justify-center items-center">
                    <button onClick={handlePattern} value={7} className="hover:border-blue-600 w-60 h-45 overflow-hidden bg-slate-300 p-11 rounded-lg bg-transparent cursor-pointer justify-center border-black border z-10"></button>
                </div>  
                <div key={8} className="flex justify-center items-center">
                    <button onClick={handlePattern} value={8} className="hover:border-blue-600 w-60 h-45 overflow-hidden bg-slate-300 p-11 rounded-lg bg-transparent cursor-pointer justify-center border-black border z-10"></button>
                </div>
                <div key={9} className="flex justify-center items-center">
                    <button onClick={handlePattern} value={9} className="hover:border-blue-600 w-60 h-45 overflow-hidden bg-slate-300 p-11 rounded-lg bg-transparent cursor-pointer justify-center border-black border z-10"></button>
                </div>  
                <div key={10} className="flex justify-center items-center">
                    <button onClick={handlePattern} value={10} className="hover:border-blue-600 w-60 h-45 overflow-hidden bg-slate-300 p-11 rounded-lg bg-transparent cursor-pointer justify-center border-black border z-10"></button>
                </div>
                <div key={11} className="flex justify-center items-center">
                    <button onClick={handlePattern} value={11} className="hover:border-blue-600 w-60 h-45 overflow-hidden bg-slate-300 p-11 rounded-lg bg-transparent cursor-pointer justify-center border-black border z-10"></button>
                </div>  
                <div key={12} className="flex justify-center items-center">
                    <button onClick={handlePattern} value={12} className="hover:border-blue-600 w-60 h-45 overflow-hidden bg-slate-300 p-11 rounded-lg bg-transparent cursor-pointer justify-center border-black border z-10"></button>
                </div>
                <div key={13} className="flex justify-center items-center">
                    <button onClick={handlePattern} value={13} className="hover:border-blue-600 w-60 h-45 overflow-hidden bg-slate-300 p-11 rounded-lg bg-transparent cursor-pointer justify-center border-black border z-10"></button>
                </div>  
                <div key={14} className="flex justify-center items-center">
                    <button onClick={handlePattern} value={14} className="hover:border-blue-600 w-60 h-45 overflow-hidden bg-slate-300 p-11 rounded-lg bg-transparent cursor-pointer justify-center border-black border z-10"></button>
                </div>
                <div key={15} className="flex justify-center items-center">
                    <button onClick={handlePattern} value={15} className="hover:border-blue-600 w-60 h-45 overflow-hidden bg-slate-300 p-11 rounded-lg bg-transparent cursor-pointer justify-center border-black border z-10"></button>
                </div>  
                <div key={16} className="flex justify-center items-center">
                    <button onClick={handlePattern} value={16} className="hover:border-blue-600 w-60 h-45 overflow-hidden bg-slate-300 p-11 rounded-lg bg-transparent cursor-pointer justify-center border-black border z-10"></button>
                </div>
                    </div>

                    <div
                        id="imagePreview"
                        className='object-contain min-h-max min-w-max absolute '
                    />
                </div>

                <div className='flex justify-center items-center p-2'>
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white mb-2 rounded w-full hover:bg-blue-700 opacity-90 cursor-pointer px-6 py-4"
                    >
                        Verify
                    </button>
                </div>
            </div>
        </div>
    );
};