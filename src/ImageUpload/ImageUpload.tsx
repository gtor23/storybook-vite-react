import React, { useState, useEffect } from 'react'
import { Box, Typography, Card, styled, Link, FormLabel } from '@mui/material'
import { FileUploadOutlined } from '@mui/icons-material';

export default function ImageUpload(){
    const [file, setFile] = useState<Blob | MediaSource | File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        
        if (!e.target.files) return

        setFile(e.target.files[0])
    }

    const handleFileDrag = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }

    const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        if (!e.dataTransfer.files) return

        setFile(e.dataTransfer.files[0])
    }
   
    const VisuallyHiddenInput = styled('input')({
        display: 'none'
    });

    const SelectImageLink = () => {
        return (
            <Box className='link-label-section' 
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                {previewUrl ? (
                    <>
                        <FormLabel sx={{color: '#0061EF'}}>
                            <Link 
                                underline='hover' 
                                sx={{'&:hover': {cursor: 'pointer'}}}
                            >
                                <Typography variant='h6'>Replace Photo</Typography>
                                <VisuallyHiddenInput type="file" onChange={handleOnChange} />
                            </Link>
                        </FormLabel>
                    </>
                ) : (
                    <>
                        <Typography variant='h5'>Drag & Drop</Typography>
                            <Typography variant='h6'> or </Typography>
                        <FormLabel sx={{color: '#0061EF'}}>
                            <Link 
                                underline='hover' 
                                sx={{'&:hover': {cursor: 'pointer'}}}
                            >
                                <Typography variant='h6'>Browse files</Typography>
                                <VisuallyHiddenInput type="file" onChange={handleOnChange} />
                            </Link>
                        </FormLabel>
                    </>
                )}
            </Box>
        )
    }

    useEffect(() => {
        if (!file) return
    
        setPreviewUrl(URL.createObjectURL(file))

        return () => URL.revokeObjectURL(previewUrl as string)

      }, [file])


    return (
        <Card 
            className={previewUrl ? 'section-image-preview' : 'section-image-upload'} 
            sx={{width:"500px", height: '500px', alignContent: 'center'}}
            onDragOver = {(e) => handleFileDrag(e)}
            onDrop = {(e) => handleFileDrop(e)}
        >
            
                <Box sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                    {previewUrl ? (
                        <Box className='section-image' sx={{height: '350px', width: '350px'}}>
                            <img src={previewUrl} alt="Preview" style={{width: '100%', height: '100%'}}/>
                        </Box>
                    ): (
                        <FileUploadOutlined fontSize='large'/>
                    )}
                </Box>
            <SelectImageLink />
        </Card>        
  )
}