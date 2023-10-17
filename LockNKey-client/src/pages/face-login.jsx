import React, { useRef, useState, useEffect } from 'react';
import CamPreview from '../components/CamPreview';
import { useNavigate } from 'react-router-dom';
import {imageCapturer} from '../components/imageCapturer';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
function Facelogin() {
  const toast = useToast()

    const videoParentRef = useRef();
    const navigate = useNavigate();

	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			
			setLoading(true);
			const formData = new FormData();
			const imgFile = await imageCapturer({ videoParentRef });
			formData.append("pic", imgFile);
			const res = await axios.post("/api/user/faceauth", formData, {
				withCredentials: true,
			});
      toast({
        title: 'Success',
        description: "Successfully",
        status: 'success',
        duration: 6000,
        isClosable: true,
      })
			setLoading(false);
			setTimeout(() => {
            localStorage.setItem("user", JSON.stringify(res.data.user))
				navigate("/dashboard");
			}, 1000);
		} catch (err) {
			e.target.reset();
		  toast({
        title: 'Error Occurred',
        description: err.message,
        status: 'error',
        duration: 6000,
        isClosable: true,
      })
			setLoading(false);
		}
	};
   

    return (
        <div>
        <div className="max-w-md mx-auto mt-4 p-4" style={{ maxWidth: "450px" }}>
          <form className="mx-4 p-4 bg-white rounded-lg shadow-md" onSubmit={handleSubmit}>
  
            <div className="relative w-full" ref={videoParentRef}>
              <CamPreview />
            </div>
            <div className="mt-3">
              <button
                type="submit"
                className={`w-full bg-blue-500 text-white py-2 rounded ${
                  loading && 'opacity-75 cursor-not-allowed'
                }`}
              >
                {loading && (
                  <span className="spinner-grow spinner-grow-sm mx-1" role="status" aria-hidden="true"></span>
                )}
                Authenticate
              </button>
            </div>
            <div className="mt-3 text-center text-gray-500">
             
            </div>
          </form>
        </div>
      </div>
    );
}

export default Facelogin;
