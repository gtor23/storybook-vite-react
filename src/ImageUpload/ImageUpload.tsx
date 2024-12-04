import { useState, useEffect } from 'react'
import { Box, Typography, Input, Button, FormControl, Card, styled, Link, FormLabel } from '@mui/material'

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

export default function ImageUpload(){
    const [file, setFile] = useState<Blob | MediaSource | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        
        if (!e.target.files) return

        setFile(e.target.files[0])
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        // const files = e.dataTransfer.files

        if (e.dataTransfer.files) {
            handleOnChange(e as unknown as React.ChangeEvent<HTMLInputElement>)
        }
        
        return null
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        handleDrop(e)
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
        // <Box className="image-upload-container" sx={{border: '1px dashed', borderColor: '#D6D9DA', borderRadius: '8px', width: '314px', height: '144px'}}>
        //     <Box className="upload-container">
        //         <input className="input-file" type="file" onChange={handleOnChange} accept='.png, .jpg, .jpeg'/>
        //         <Typography variant='h5'>Drag & Drop</Typography>
        //         <Typography variant='h6'>or <span style={{color: '#0061EF'}}>Browse files</span></Typography>
        //     </Box>
            

        //     {previewUrl && 
        //         <img src={previewUrl} alt="Preview" style={{ width: '50%' }} />
        //     }
        // </Box>

        // {/* <Button variant="contained" color="primary" component="label">
        //             Browse Files
        //             <VisuallyHiddenInput
        //                 type="file" 
        //             /> 
        //         </Button> */}

        <Card sx={{width:"50%"}} onDrag={(e) => handleDragOver(e)} onDrop={(e) => handleDrop(e)}>
           {previewUrl ? 
                (
                    <Box>
                        <img src={previewUrl} alt="Preview" style={{width: '100%'}}/>
                        <Link 
                            underline='hover' 
                            sx={{'&:hover': {cursor: 'pointer'}}}
                            onClick={() => setPreviewUrl(null)}
                        >
                            <Typography variant='h6'>
                                Replace Photo
                            </Typography>
                        </Link> 
                    </Box>
                )
                : (
                    <FormControl>
                        <Typography variant='h5'>Drag & Drop</Typography>
                        <Typography variant='h6'>
                            or
                        </Typography>
                        <FormLabel sx={{color: '#0061EF'}}>
                            <Link 
                                underline='hover' 
                                sx={{'&:hover': {cursor: 'pointer'}}}
                            >
                                <Typography variant='h6'>
                                    Browse files
                                </Typography>
                            </Link>
                            <VisuallyHiddenInput type="file" onChange={handleOnChange}/>
                        </FormLabel>
                    </FormControl>
                )}
        </Card>
        
  )
}