import React, {useState } from 'react';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import './Login.scss';
import { ForgetPwdApi, LoginApi} from '../../utils/Api';

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorEmail, emailCheck] = useState(false);
    const [errorPassword, passwordCheck] = useState(false);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const handleSubmit = async (e) => {
        e.preventDefault();
        let checkRegex = emailRegex.test(email);
        emailCheck(!checkRegex);
        if(!checkRegex){
            emailCheck(true);
            return;
        };
        if(password === ""){
            passwordCheck(true);
            return; 
        };
        if(!errorEmail || !errorPassword){
            try{
                const fundoo_token = await getToken({'emailId': email, 'password': password});                
                localStorage.setItem("fundoo-token", fundoo_token);
            }catch(error){
                console.error(error);
            }
        }
    }
    
    // const forget_pwd = async(e) => {
    //     e.preventDefault();
    //     const data = await ForgetPwdApi({"emailId": email});
    //     console.log(data)
    // }

    async function getToken(obj){
        const payload = await LoginApi(obj);
        return payload?.data?.data?.generate_Token;
    };
    

    return (
    <>
        <form onSubmit={handleSubmit}>
            <div className='login-wrapper-cnt'>
                <div className='login-columncnt-cnt'>
                    <div className='login-headercnt-cnt'>
                        <span className="login-firstHeader-cnt">Fundo</span> 
                        <span className="login-secondHeader-cnt">Sign In</span>
                        <span className="login-thirdHeader-cnt">Use your Fundo Account</span>
                    </div>
                    <TextField id="outlined-basic-email" label="Email or phone*" className='signUp-emailfield-cnt'onChange={(e)=>{
                        setEmail(e.target.value);
                    }}/>
                    {errorEmail && <span id='errorEmailCnt'>Error! Email pattern not matched</span>}
                    <TextField id="outlined-basic-password" label="Password*" className='signUp-passwordField-cnt'onChange={(e) => {
                        setPassword(e.target.value);
                    }}/>
                    {errorPassword && <span id='errorPasswordCt'>Error! Password is empty!</span>}
                    <span className="login-forgetPasswordLink-cnt" >Forget password</span>
                    <div className='login-linkSection-cnt'>
                        <span className="login-createAccountLink-cnt">Create account</span>
                        <Button type='submit' variant="contained" className="login-loginbutton-cnt" id='login-cnt'>Login</Button>
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
        </form>
    </>
    );
};


// "emailId": "h2389@gmail.com",
    //    "password": "uifjdhhkjxflk"