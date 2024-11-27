import { useState, useEffect } from 'react'

export default function ImageUpload(){
    const [file, setFile] = useState<Blob | MediaSource | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        
        if (!e.target.files) return

        setFile(e.target.files[0])
    }

    useEffect(() => {
        if (!file) {
          return
        }
    
        setPreviewUrl(URL.createObjectURL(file))

        return () => {
            URL.revokeObjectURL(previewUrl as string)
          }

      }, [file])
   
    return (
        <>
            <input type="file" onChange={handleOnChange} />
            {previewUrl && 
                <img src={previewUrl} alt="Preview" style={{ width: '50%' }} />
            }
        </>
  )
}