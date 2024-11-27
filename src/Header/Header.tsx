import { AppBar, Box, Toolbar, Link, Typography } from "@mui/material";
import laMeccaLogo from  '../assets/la_mecca_logo.png'

export default function Header() {

    // const laMeccaLogoUrl = "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F439086109%2F564869529503%2F1%2Foriginal.20230204-045430?w=500&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C500%2C500&s=0809b07a8a0853dcdfefd95012f56463"

    return (
        <AppBar >
            <Toolbar sx={{backgroundColor: '#eb8f90', height: '5.5rem'}}>
                <Link href="/">
                    <img alt="la_mecca_logo" src={laMeccaLogo} style={{width: '80%', height: 'auto'}}/>
                </Link>
                <Box>
                    <Typography variant="h1">Brillamos Juntos</Typography>
                </Box>
            </Toolbar>
                
        </AppBar>
    )
}