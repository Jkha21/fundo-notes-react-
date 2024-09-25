import React from 'react';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import './Login.scss';


const Login = () => {
    return (
    <>
        <div className='login-wrapper-cnt'>
            <div className='login-columncnt-cnt'>
                <div className='login-headercnt-cnt'>
                    <span class="login-firstHeader-cnt">Fundo</span> 
                    <span class="login-secondHeader-cnt">Sign In</span>
                    <span class="login-thirdHeader-cnt">Use your Fundo Account</span>
                </div>
                <TextField id="outlined-basic" label="Email or phone*" className='signUp-inputfield-cnt'/>
                <TextField id="outlined-basic" label="Password*" className='signUp-inputfield-cnt'/>
                <span class="login-forgetPasswordLink-cnt">Forget password</span>
                <div className='login-linkSection-cnt'>
                    <span class="login-createAccountLink-cnt">Create account</span>
                    <Button variant="contained" className="login-loginbutton-cnt">Login</Button>
                </div>

            </div>

            <div className='login-footercnt-cnt'>
                <FormControl className='login-languagedropdown-cnt'>
                    <InputLabel className='login-optionsLanguage-cnt'>Language</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" className='login-dropdown-cnt'>
                    <MenuItem>English (United States)</MenuItem>
                    <MenuItem>English (India)</MenuItem>
                    </Select>
                </FormControl>
                <div className="login-rightfooter-cnt">
                    <span>Help</span>
                    <span>Privacy</span>
                    <span>Terms</span>
            </div>
            </div>
        </div>
    </>
    );
}

export default Login;