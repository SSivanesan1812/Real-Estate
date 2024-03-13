import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useState } from 'react'
import { app } from '../firebase/auth'


export default function CreateList() {
    const [image,setImage]=useState([])
    const [formdata,setFormData]=useState({
        imageUrl:[]
    })
    const [error,setError]=useState(false)
    const [loading,setLoading]=useState(false)
    
    
    const hadleUploadImages=(e)=>{
        
        if(image.length>0 && image.length<7){
            setError(false)
        setLoading(true)
            const promises=[]
            for(let i=0;i<image.length;i++){
                promises.push(storeImage(image[i]))
            }
            Promise.all(promises).then((urls)=>{
                setFormData({
                    ...formdata,imageUrl:formdata.imageUrl.concat(urls)
                })
                console.log(formdata.imageUrl)
                setLoading(false)
            })
            .catch((err)=>{
                setError(err.message)
                console.log(err)
                setLoading(false)
            })
            
            
        }
        else{
            setError("You can Upload only minimum of 1 images and maximum of 6 images")
            setLoading(false)
        }
        // setLoading(false)
        console.log(formdata.imageUrl)
    }
    const storeImage=async(im)=>{
        return new Promise((resolve,reject)=>{
            
            const storage=getStorage(app)
            const filename=new Date().getTime()+im.name 
            
            const storageRef=ref(storage,filename)
            const imageUpload=uploadBytesResumable(storageRef,im)
            imageUpload.on('state_changed',
            (snapshot)=>{
                const percentage=Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);
                console.log(percentage)
            },
            (error)=>{
                reject(error)
                
            },
            ()=>{
                getDownloadURL(imageUpload.snapshot.ref).then((downloadUrl)=>{
                    resolve(downloadUrl)
                })
            }
        
            
            )


        })
    }
    const handleRemoveImage = (index) => {
        setFormData({
          ...formdata,
          imageUrl: formdata.imageUrl.filter((_, i) => i !== index),
        });
      };
  return (
    <main className='max-w-4xl mx-auto p-3'>
        <p className='font-bold text-2xl text-center p-3'>Create Listing</p>
        <form className='flex flex-col sm:flex-row gap-6'>
            <div className='flex flex-col gap-6 '>
                <input type='text' placeholder='name' id='name' 
                className='p-3 border rounded-lg' required min={6} max={16}></input>
                <textarea type='text' placeholder='description' id='description' 
                className='p-3 border rounded-lg'></textarea>
                <input type='text' placeholder='address' id='address' 
                className='p-3 border rounded-lg'></input>
            
            <div className='flex flex-row gap-6 flex-wrap'>
                <div className='flex flex-row gap-2 '>
                <input className='w-5' type='checkbox' id='sell'></input>
                <span>Sell</span>
                </div>
                <div className='flex flex-row gap-2 '>
                <input className='w-5' type='checkbox' id='rent'></input>
                <span>Rent</span>
                </div>
                <div className='flex flex-row gap-2 '>
                <input className='w-5' type='checkbox' id='parkingspot'></input>
                <span>Parking Spot</span>
                </div>
                <div className='flex flex-row gap-2 '>
                <input className='w-5' type='checkbox' id='furnished'></input>
                <span>Furnished</span>
                </div>
                <div className='flex flex-row gap-2 '>
                <input className='w-5' type='checkbox' id='sell'></input>
                <span>Offer</span>
                </div>
            </div>
            <div className='flex flex-row flex-wrap gap-6'>
                <div className='flex flex-row gap-2'>
                    <input className='border-gray-500 rounded-lg h-8' type='number' min={1} max={10} id='bedroom'></input>
                    <span > Bed</span>
                </div>
                <div className='flex flex-row gap-2'>
                    <input className='border-gray-500 rounded-lg h-8' type='number' min={1} max={10} id='bathroom'></input>
                    <span > Baths</span>
                </div>
                <div className='flex flex-row gap-2'>
                    <input className='border-gray-500 rounded-lg h-8' type='number' min={1000} max={100000000} id='regularprice'></input>
                    <div>
                        <p>Regular Price</p>
                        <p className='text-sm text-center'>($/Month)</p>
                    </div>
                </div>
                <div className='flex flex-row gap-2'>
                    <input className='border-gray-500 rounded-lg h-8' type='number' min={1000} max={100000000} id='discountedprice'></input>
                    <div>
                        <p>Discounted Price</p>
                        <p className='text-sm text-center'>($/Month)</p>
                    </div>
                </div>
            </div>
            </div>
            <div className='flex flex-col gap-6'>
                <p><span className='font-bold'>Images:</span> The First image will be the cover (max 6)</p>
                <div className='flex flex-row gap-3'>
                    <input onChange={(e)=>{setImage(e.target.files)}} className='border rounded-lg p-3' type='file' accept='image/*' multiple ></input>
                    
                    <button type='button' onClick={hadleUploadImages} className='border bg-blue-700 p-3 text-white rounded-lg hover:opacity-70 cursor-pointer'>
                        {loading? "...Uploading": "Upload"}
                    </button>
                    
                </div>
                <p className='text-red-500'>{error && error}</p>

                {formdata.imageUrl.length > 0 &&
            formdata.imageUrl.map((url, index) => (
              <div
                key={url}
                className='flex justify-between p-3 border items-center'
              >
                <img
                  src={url}
                  alt='listing image'
                  className='w-20 h-20 object-contain rounded-lg'
                />
                <button
                  type='button'
                  onClick={() => handleRemoveImage(index)}
                  className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                >
                  Delete
                </button>   
              </div>
            ))}
                <button className='p-3 bg-slate-700 text-white rounded-lg cursor-pointer hover:opacity-85'>
                    Create Listing
                </button>
            </div>
            
        </form>
    </main>
  )
}
