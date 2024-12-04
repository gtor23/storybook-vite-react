import { useState, useEffect, useRef, MutableRefObject, LegacyRef } from 'react'
import { Box, Typography, Input, Button, FormControl, Card, styled, Link, FormLabel } from '@mui/material'

// const VisuallyHiddenInput = styled('input')({
//     // clip: 'rect(0 0 0 0)',
//     // clipPath: 'inset(50%)',
//     // height: 1,
//     // overflow: 'hidden',
//     // position: 'absolute',
//     // bottom: 0,
//     // left: 0,
//     // whiteSpace: 'nowrap',
//     // width: 1,
//     // height: '100%',
//     // width: '100%',
//     // boxSizing: 'border-box'
//     position:'absolute',
//     // left: 50,
//     // top: 80,
//     width: '100%',
//     height: '100%',
//     border: '0.25px solid blue'

//   });

export default function ImageUpload(){
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [file, setFile] = useState<Blob | MediaSource | File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [isDisabled, setIsDisabled] = useState<boolean>(true)
    const [isDrag, setIsDrag] = useState<boolean>(false)

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        
        if (!e.target.files) return

        setFile(e.target.files[0])
    }

    const handleClick = () => {
        // const files = e.currentTarget.files
        if (fileInputRef.current) {
            console.log('file input ref: ', fileInputRef)
            fileInputRef?.current.click()
            // handleOnChange(e)
        }
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


      const VisuallyHiddenInput = styled('input')({
        width: '100%',
        height: '100%',
        border: '0.25px solid blue'
    
      });
      
   
    return (
        <>
           {previewUrl ? 
                (
                <Card sx={{width:"50%"}}>
                    <Box>
                        <img src={previewUrl} alt="Preview" style={{width: '100%'}}/>
                        <Link 
                            underline='hover' 
                            sx={{'&:hover': {cursor: 'pointer'}}}
                            onClick={() => {setPreviewUrl(null); setIsDisabled(true); setIsDrag(false); setFile(null)}}
                        >
                            <Typography variant='h6'>
                                Replace Photo
                            </Typography>
                        </Link> 
                    </Box>
                </Card>
                )
                : (
                    <Card sx={{width:"300px", height: '300px', position: 'relative'}}>
                        <FormControl
                            sx={{border: '0.25px solid red', height: '80%', width: '80%'}}
                            // onDragEnter={() => setIsDisabled(false)}
                            onDragEnter={() => {setIsDrag(true); setIsDisabled(false)}}
                            onDragOver={() => {setIsDrag(true); setIsDisabled(false)}}
                            onDragLeave={() => {setIsDrag(false); setIsDisabled(true)}}
                        >
                            
                            <VisuallyHiddenInput 
                                type="file" 
                                onFocus={() => setIsDisabled(false)} 
                                // onBlur={() => {
                                //     // Check if user clicked outside the dialog before disabling
                                //     if (!document.activeElement?.matches('.MuiDialogContent [type="file"]')) {
                                //       setIsDisabled(true);
                                //     }}}
                                onChange={handleOnChange} 
                                disabled={isDisabled} 
                                ref={fileInputRef}
                            />
                            <Box className='link-label-section' sx={{position: 'absolute', top: '20%', zIndex: isDrag ? -1 : 1}}>
                                <Typography variant='h5'>Drag & Drop</Typography>
                                <Typography variant='h6'>
                                    or
                                </Typography>
                                <FormLabel sx={{color: '#0061EF'}}>
                                    <Link 
                                        underline='hover' 
                                        onClick={handleClick}
                                        onMouseEnter={() => setIsDisabled(false)}
                                        onMouseOver={() => setIsDisabled(false)}
                                        // onMouseOut={() => setIsDisabled(true)}
                                        // onMouseLeave={() => setIsDisabled(true)}
                                        // onFocus={() => setIsDisabled(false)}
                                        sx={{'&:hover': {cursor: 'pointer'}}}
                                    >
                                        <Typography variant='h6'>
                                            Browse files
                                        </Typography>
                                    </Link>
                                </FormLabel>
                            </Box>
                        </FormControl>
                    </Card>
                )}
        </>
        
  )
}