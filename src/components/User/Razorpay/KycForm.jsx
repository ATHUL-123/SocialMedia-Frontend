import React, { useState,useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ReCAPTCHA from 'react-google-recaptcha';
import { submitKyc,isKycSubmitted } from '../../../services/User/apiMethods';
import uploadImage from '../../../utils/cloudinary';

const KYCForm = ({ onClose }) => {
  const [imageFile, setImageFile] = useState(null); // State to store the image file
  const [Loading,setLoading] =useState(false)
  const [kycSubmitted,setKycSubmitted] =useState(null)
  useEffect(()=>{
  isKycSubmitted().then((response)=>{
    console.log('adsfadsfadf',response);
    setKycSubmitted(response)
  })
  },[])




  const formik = useFormik({
    initialValues: {
      fullName: '',
      dateOfBirth: '',
      gender: '',
      idProof: null,
      captchaVerified: false,
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Full name is required'),
      dateOfBirth: Yup.date().required('Date of birth is required'),
      gender: Yup.string().required('Gender is required'),
      idProof: Yup.mixed().required('ID proof is required'),
      captchaVerified: Yup.boolean().oneOf([true], 'Please verify the captcha'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setLoading(true)
        // Upload the image
        const imageUrl = await uploadImage(imageFile);
        
        // Prepare KYC data including the uploaded image URL
        const data = {
          fullName: values.fullName,
          DOB: values.dateOfBirth,
          gender: values.gender,
          idProof: imageUrl,
         
        };

        // Submit KYC data
        const response = await submitKyc(data);
        
        // Log success and close modal
        console.log('Form submitted successfully', response);
        onClose()
      } catch (error) {
        // Handle errors
        console.error('Error submitting form', error);
      } finally {
        // Reset submitting state
        setSubmitting(false);
      }
    },
  });

  const handleIdProofChange = (e) => {
    // Set the image file when it changes
    setImageFile(e.target.files[0]);
    // Set the value in formik
    formik.setFieldValue('idProof', e.target.files[0]);
  };

  const handleCaptchaChange = () => {
    formik.setFieldValue('captchaVerified', true);
  };

  if (kycSubmitted === null) {
    return null;
  }

  if(kycSubmitted){
    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">KYC Already Submitted</h2>
            <p className="text-gray-700">
              It seems that you have already submitted your KYC information. If you need to make any changes or have any concerns, please contact our support team.
            </p>
            <div className="flex justify-end mt-6">
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      );
  }

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">KYC Form</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name:
            </label>
            <input
              type="text"
              id="fullName"
              {...formik.getFieldProps('fullName')}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <span className="text-red-500">{formik.errors.fullName}</span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
              Date of Birth:
            </label>
            <input
              type="date"
              id="dateOfBirth"
              {...formik.getFieldProps('dateOfBirth')}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
            {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
              <span className="text-red-500">{formik.errors.dateOfBirth}</span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
              Gender:
            </label>
            <select
              id="gender"
              {...formik.getFieldProps('gender')}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {formik.touched.gender && formik.errors.gender && (
              <span className="text-red-500">{formik.errors.gender}</span>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="idProof" className="block text-sm font-medium text-gray-700">
              ID Proof:
            </label>
            <div className="flex items-center justify-between">
              <label htmlFor="idProofFile" className="bg-blue-300 hover:bg-blue-400 text-white font-semibold px-4 py-2 rounded-md cursor-pointer">
                Choose File
              </label>
              <span className="text-gray-500">{formik.values.idProof ? formik.values.idProof.name : 'No file chosen'}</span>
            </div>
            <input
              type="file"
              id="idProofFile"
              onChange={handleIdProofChange}
              className="hidden"
            />
            {formik.touched.idProof && formik.errors.idProof && (
              <span className="text-red-500">{formik.errors.idProof}</span>
            )}
          </div>
          <div className="mb-4">
            {formik.values.idProof && (
              <img
                src={URL.createObjectURL(formik.values.idProof)}
                alt="ID Proof Preview"
                className="mt-2 max-w-xs"
                style={{ maxWidth: '100px', maxHeight: '100px' }}
              />
            )}
          </div>
          <div className="mb-4">
            <ReCAPTCHA
              sitekey="6Lc1DrIpAAAAAEEoNBOuBQv3ECH2GWJejMwziivF"
              onChange={handleCaptchaChange}
            />
            {formik.touched.captchaVerified && formik.errors.captchaVerified && (
              <span className="text-red-500">{formik.errors.captchaVerified}</span>
            )}
          </div>
          <div className="flex justify-end">
          <button
          type="button"
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
          onClick={onClose}
        >
          Cancel
        </button>
          {Loading ? (<button disabled="" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
    <svg aria-hidden="true" role="status" class="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path>
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
    </svg>
    Loading...
</button>):
          (
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
              disabled={formik.isSubmitting}
            >
              Submit
            </button>)}
          </div>
        </form>
      </div>
    </div>
  );
};

export default KYCForm;
