import React, { useState } from 'react';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import kindpng_1822355 from './kindpng_1822355.png';
import './SignUp.scss';
import { createUser } from '../../utils/Api';

export default function SignUp(){
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function handleSubmit(e){
    e.preventDefault();
    try{
      const details = await createUser({'firstName': firstName, 'lastName': lastName, 'emailId': email, 'password': password});
      console.log(details);
    }catch(error){
      console.error(error);
    };
  };

  return(
    <>
      <form onSubmit={handleSubmit}>
        <div className='signUp-main-cnt'>
          <div className='signUp-flexcontainer1-cnt'>
            <div className='signUp-rowContainer-cnt'>
            <div className='signUp-firstCol-cnt'>
              <span className='signUp-firstHeader-cnt'>Fundo</span>
              <span className='signUp-SecondHeader-cnt'>Create your Fundo Account</span>
            </div>
            <div className='signUp-inputContainer-cnt'>
              <TextField id="outlined-basic" label="First Name*" variant="outlined" className='signUp-firstName-cnt' onChange={(e)=>{
                setfirstName(e.target.value);
              }}/>
              <TextField id="outlined-basic" label="Last Name*" variant="outlined" className='signUp-userName-cnt' onChange={(e)=>{
                setlastName(e.target.value);
              }}/>
            </div>
            <TextField id="outlined-basic" label="Email*" variant="outlined" className='signUp-userName-cnt' onChange={(e)=>{
              setEmail(e.target.value);
            }}/>
            <span>You can use letters, numbers & periods</span>
            <div className='signUp-secondInput-cnt'>
              <TextField id="outlined-basic" label="Password*" variant="outlined" className='signUp-Passcount-cnt' onChange={(e)=>{
                setPassword(e.target.value);
              }}/>
              <TextField id="outlined-basic" label="Confirm*" variant="outlined" className='signUp-Confirm-cnt' />
            </div>
            <span>Use 8 or more characters with a mix of letters, numbers & symbols</span>
            <div className='signUp-firstbuttoncontainer-cnt'>
              <span>Sign in instead</span>
              <Button variant="contained" className="signUp-regiterButton-cnt" type='submit'>Register</Button>
            </div>
          </div>
          <div className='signUp-imageContainer-cnt'>
            <img src={kindpng_1822355} alt="FundoNotes" height="200px" className="signUp-googleImage-cnt"/>
            <span className="signUp-middleContainer-cnt">One account. All of Fundo working for you.</span>
          </div>
          </div>
          <div className='signUp-footercnt-cnt'>
          <FormControl className='signUp-languagedropdown-cnt'>
            <InputLabel className='signUp-optionsLanguage-cnt'>Language</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select">
              <MenuItem>English (United States)</MenuItem>
              <MenuItem>English (India)</MenuItem>
            </Select>
          </FormControl>
          <div className="signUp-rightfooter-cnt">
            <span>Help</span>
            <span>Privacy</span>
            <span>Terms</span>
          </div>
          </div>
        </div>
      </form>
    </>
  )

}  ;


