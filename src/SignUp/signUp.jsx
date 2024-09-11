import React from 'react';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import kindpng_1822355 from './kindpng_1822355.png';
import './signUp.scss';

const SignUp = () => (
  <>
    <div className='signUp-main-cnt'>
      <div className='signUp-flexcontainer1-cnt'>
        <div className='signUp-rowContainer-cnt'>
        <div className='signUp-firstCol-cnt'>
          <span className='signUp-firstHeader-cnt'>Fundo</span>
          <span className='signUp-SecondHeader-cnt'>Create your Fundo Account</span>
        </div>
        <div className='signUp-inputContainer-cnt'>
          <TextField id="outlined-basic" label="First Name*" variant="outlined" className='signUp-firstName-cnt'/>
          <TextField id="outlined-basic" label="Last Name*" variant="outlined" className='signUp-userName-cnt' />
        </div>
        <TextField id="outlined-basic" label="UserName*" variant="outlined" className='signUp-userName-cnt' />
        <span>You can use letters, numbers & periods</span>
        <div className='signUp-secondInput-cnt'>
          <TextField id="outlined-basic" label="Password*" variant="outlined" className='signUp-Passcount-cnt' />
          <TextField id="outlined-basic" label="Confirm*" variant="outlined" className='signUp-Confirm-cnt' />
        </div>
        <span>Use 8 or more characters with a mix of letters, numbers & symbols</span>
        <div className='signUp-firstbuttoncontainer-cnt'>
          <span>Sign in instead</span>
          <Button variant="contained" className="signUp-regiterButton-cnt">Register</Button>
        </div>
      </div>
      <div className='signUp-imageContainer-cnt'>
        <img src={kindpng_1822355} alt="FundoNotes image" height="200px" className="signUp-googleImage-cnt"/>
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
  </>
);

export default SignUp;
