import { useState, useEffect } from "react"
import { addImage } from "../api"
import Preview from "./Preview"

//const imageMimeType = /image\/(png|jpg|jpeg)/i;

const ImageUpload = ()=>{

    const [imageFile, setImageFile] = useState("")
    const [titleInput, setTitle] = useState("")
    const [fileDataURL, setFileDataURL] = useState(null);

    useEffect(() => {
        let fileReader, isCancel = false;
        if (imageFile) {
          fileReader = new FileReader();
          fileReader.onload = (e) => {
            const { result } = e.target;
            if (result && !isCancel) {
              setFileDataURL(result)
            }
          }
          fileReader.readAsDataURL(imageFile,);
        }
        return () => {
          isCancel = true;
          if (fileReader && fileReader.readyState === 1) {
            fileReader.abort();
          }
        }
    
      }, [imageFile]);

    
    const handlePhoto = (e)=>{
        e.preventDefault()
        setImageFile(e.target.files[0])
        console.log(e.target.files[0])
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        const formData = new FormData();

        formData.append('file', imageFile)
        formData.append('name', titleInput)

        addImage(formData).then(()=>{
            console.log("Successful")
        }).catch((err)=>{
            console.log("Something went wrong", err)
        })
    }

    const handleChange = (e)=>{
        setTitle(e.target.value)
    }

    return <><form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
                <label htmlFor="name">Image Title</label>
                <input type="text" id="name" placeholder="Name" 
                       value={titleInput} name="name" required onChange={handleChange}/>
            </div>
  
    <div>
        <label htmlFor="image">Upload Image</label>
        <input type="file" id="image" 
               name="image" useref={imageFile} onChange={handlePhoto}/>
    </div>
    <div>
        <input type="submit"/>
    </div>
</form>{imageFile ? <Preview src={fileDataURL}/> : ""}




</>
}

export default ImageUpload