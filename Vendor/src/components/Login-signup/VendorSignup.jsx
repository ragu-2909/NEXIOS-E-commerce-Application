import React, { useState } from 'react';
import { Link , useNavigate } from "react-router-dom";
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
// import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { baseURL } from '../../services/getData';
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const VendorSignup = () => {
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const navigate = useNavigate();
  const [showPsw, setShowPsw] = useState(false);
  const [showCfPsw, setShowCfPsw] = useState(false);
  const pinCodeSchema = z.string().regex(/^MRS[1-5][1-4][1-4]$/, {
    message:  'Pin code must follow the format MRS###, where digits follow the range: 1-5 for the first, 1-4 for the second, and 1-4 for the third digit.',
  });
  const schema = z.object({
    name: z
      .string()
      .min(2, { message: 'Company name must be at least 2 characters long.' })
      .max(60, { message: 'Company name must be at most 60 characters long.' }),

    address: z
      .string()
      .min(2, { message: 'Company address must be at least 2 characters long.' })
      .max(120, { message: 'Company address must be at most 120 characters long.' }),
    
    pincode: pinCodeSchema,

    telnum: z
      .string()
      .min(10, { message: 'Telephone must be at least 10 characters long.' }),

    licencenum: z
      .string()
      .min(8, { message: 'License No must be at least 8 characters long.' })
      .max(25, { message: 'License No must be at most 25 characters long.' }),

    image: z
      .instanceof(File)
      .refine((file) => file.type.startsWith('image/'), { message: 'File must be an image.' }),

    email: z
      .string()
      .email({ message: 'Invalid email address.' }),

    password: z
      .string()
      .min(3, { message: 'Password must be at least 3 characters long.' })
      .max(25, { message: 'Password must be at most 25 characters long.' }),

    confirmpassword: z
      .string()
      .min(3, { message: 'Confirm password must be at least 3 characters long.' })
      .max(25, { message: 'Confirm password must be at most 25 characters long.' }),
  }).refine((data) => data.password === data.confirmpassword, {
    message: 'Passwords do not match',
    path: ['confirmpassword'],
  });

  const postData = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('address', data.address);
    formData.append('telnum', data.telnum);
    formData.append('licencenum', data.licencenum);
    formData.append('images', data.image);
    formData.append('pincode',data.pincode);
    formData.append('email', data.email);
    formData.append('password', data.password);
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
  }



    try {
      const res = await axios.post(`${baseURL}/vendor/signup`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const result = res.data;
      console.log('Success:', result);

      if (result.status === 200 && result.token) {
        localStorage.setItem('token', result.token);
        console.log('Token saved to localStorage');
      }

      if(result.success){
        console.log('Sign Up successfull');
        navigate('/login')
      }

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const [step, setStep] = useState(0);
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    postData(data);
  
  };

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, 1));
  };

  const handlePrev = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className='formcontainer w-[48%] h-[95%] border-[1px] border-transparent rounded-2xl flex flex-col justify-center items-center px-4 pb-6 bg-black bg-opacity-0'>
      <div className='w-full h-[100px] pr-2'> <h1 className={`text-white text-[2rem] text-center ${!imagePreview && 'mb-[2rem]'}`}>SignUp</h1> </div>
      <form className="w-[95%] h-[92%] flex flex-col items-center" onSubmit={handleSubmit(onSubmit)}>

        {/* Step 0: About Me Section */}
        {step === 0 && (
          <div className='aboutmecontainer ml-8'>
           
            {/* <div className="aboutmeheadcontainer flex justify-center mr-5"><h4 className={`aboutme ${!imagePreview && 'mb-[2rem]'} h-[30px] text-[1.25rem] text-white`}>About Me</h4></div> */}

            {/* Image Preview */}
            {imagePreview && (
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300 mt-2 mx-auto">
                <img src={imagePreview} alt="Company Logo" className="w-full h-full object-cover" />
              </div>
            )}

            <div id="namecontainer" className='inputcontainer h-16 w-[300px] mb-[0.1rem]'>
              <label className="text-sm font-medium text-white" htmlFor="name">Company Name:</label> <br />
              <input className='w-3/4 h-2/5 bg-black bg-opacity-10 border border-gray-400 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5' type="text" id='name' {...register('name')} required />
              {errors.name && <div className='errorcontainer text-[0.75rem] text-red-500'>{errors.name.message}</div>}
            </div>

            <div id="imagecontainer" className='inputcontainer h-16 w-[300px] mb-[0.1rem]'>
              <label className="text-sm font-medium text-white" htmlFor="image">Company Logo:</label> <br />
              <Controller
                name="image"
                control={control}
                render={({ field }) => (
                  <input
                    className='w-3/4 h-2/5 text-sm text-white border-gray-300 rounded-lg cursor-pointer  bg-black bg-opacity-10 border border-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file'
                    type="file"
                    id='image'
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files ? e.target.files[0] : null;
                      field.onChange(file);
                      if (file) {
                        const url = URL.createObjectURL(file);
                        setImagePreview(url); // Set the image preview
                      }
                    }}
                    required
                  />
                )}
              />
              {errors.image && <div className='errorcontainer text-[0.75rem] text-red-500'>{errors.image.message}</div>}
            </div>

            <div id="telnumcontainer" className='inputcontainer h-16 w-[300px] mb-[0.1rem]'>
              <label className="text-sm font-medium text-white" htmlFor="telnum">Telephone:</label> <br />
              <input className='w-3/4 h-2/5 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 bg-black bg-opacity-10 border border-gray-400' type="text" id='telnum' {...register('telnum')} required />
              {errors.telnum && <div className='errorcontainer text-[0.75rem] text-red-500'>{errors.telnum.message}</div>}
            </div>

            <div id="licencenumcontainer" className='inputcontainer h-16 w-[300px] mb-[0.1rem]'>
              <label className="text-sm font-medium text-white" htmlFor="licencenum">License No:</label> <br />
              <input className='w-3/4 h-2/5 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 bg-black bg-opacity-10 border border-gray-400' type="text" id='licencenum' {...register('licencenum')} required />
              {errors.licencenum && <div className='errorcontainer text-[0.75rem] text-red-500'>{errors.licencenum.message}</div>}
            </div>

            <div id="companyaddcontainer" className='inputcontainer h-20 w-[300px] mb-[1.2rem]'>
              <label className="text-sm font-medium text-white" htmlFor="address">Company Address:</label> <br />
              <textarea className='w-3/4 resize-none text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 bg-black bg-opacity-10 border border-gray-400' id='address' {...register('address')} required></textarea>
              {errors.address && <div className='errorcontainer text-[0.75rem] text-red-500'>{errors.address.message}</div>}
            </div>

            <div id="pincodecontainer" className='inputcontainer h-30 w-[300px] mb-[0.1rem]'>
              <label className="text-sm font-medium text-white" htmlFor="pincode">Pin-code:</label> <br />
              <input
                className='w-3/4 h-2/5 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 bg-black bg-opacity-10 border border-gray-400'
                type="text"
                id='pincode'
                placeholder='EX: MRS111 - MRS544'
                {...register('pincode')}
              />
              {console.log(errors)}
              {errors.pincode && <div className='errorcontainer text-[0.75rem] text-red-500'>{errors.pincode.message}</div>}
            </div>   

            <p className='text-white mt-2 ml-2'>already have account <strong className='text-orange-600 cursor-pointer'><Link to='/login'>Login</Link></strong></p>

            <div className="mt-4 flex justify-between w-full">
              <button type="button" onClick={handleNext} className='bg-green-600 text-white px-4 py-2 rounded'>Next</button>
             
            </div>
          </div>
        )}

        {/* Step 1: Account Details Section */}
        {step === 1 && (
          <div className='accountdetailscontainer'>
            <div className="accountdetailsheadcontainer flex justify-center"><h4 className='accountdetails mb-[1.5rem] text-[1.5rem] text-white'>Account Details</h4></div>

            <div id="emailcontainer" className='inputcontainer h-16 w-[300px] mb-[0.1rem]'>
              <label className="text-sm font-medium text-white" htmlFor="email">Email:</label> <br />
              <input className='w-3/4 h-2/5 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 bg-black bg-opacity-10 border border-gray-400' type="email" id='email' {...register('email')} required />
              {errors.email && <div className='errorcontainer text-[0.75rem] text-red-500'>{errors.email.message}</div>}
            </div>

            <div id="passwordcontainer" className='inputcontainer h-16 w-[300px] mb-[0.1rem]'>
              <label className="text-sm font-medium text-white" htmlFor="password">Password:</label> <br />
              <div className="flex items-center gap-2">
              <input
                className="w-3/4 h-2/5 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 bg-black bg-opacity-10 border border-gray-400"
                type={showPsw ? "text " : "password"}
                id="password"
                {...register("password")}
                required
              />
              <button
                className="h-2/5"
                onClick={(e) => {
                  e.preventDefault();
                  setShowPsw((prev) => !prev);
                }}
              >
                {showPsw ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>      
           {errors.password && <div className='errorcontainer text-[0.75rem] text-red-500'>{errors.password.message}</div>}
            </div>

            <div id="confirmpasswordcontainer" className='inputcontainer h-16 w-[300px] mb-[0.1rem]'>
              <label className="text-sm font-medium text-white" htmlFor="confirmpassword">Confirm Password:</label> <br />
              <div className="flex items-center gap-2">
              <input
                className="w-3/4 h-2/5 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 bg-black bg-opacity-10 border border-gray-400"
                type={showCfPsw ? "text " : "password"}
                id="confirmpassword"
                {...register("confirmpassword")}
                required
              />
              <button
                className="h-2/5"
                onClick={(e) => {
                  e.preventDefault();
                  setShowCfPsw((prev) => !prev);
                }}
              >
                {showCfPsw ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
              {errors.confirmpassword && <div className='errorcontainer text-[0.75rem] text-red-500'>{errors.confirmpassword.message}</div>}
            </div>
            <p className='text-white'>already have account <strong className='text-orange-600 cursor-pointer'><Link to='/login'>Login</Link></strong></p>

            <div className="mt-4 flex justify-between items-center w-full">
              <button type="button" onClick={handlePrev} className='bg-green-600 text-white px-4 py-2 rounded'>Previous</button>
              <button type="submit" className='bg-green-600 text-white px-4 py-2 rounded'>Submit</button>
            </div>
          </div>
        )}
      </form>
      {/* <DevTool control={control} /> */}
    </div>
  );
};

export default VendorSignup;
