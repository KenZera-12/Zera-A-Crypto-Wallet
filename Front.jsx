import React, {useState} from "react";
import {token} from "../../../declarations/token";


function Front() {
    // Layout Design
    const [intro, setIntro] = useState("");
    const [login, setLogin] = useState("");
    const [signup, setSignup] = useState("hidden");
    const [cons, setCons] = useState("hidden");
    const [profile, setProfile] = useState("hidden");

    //Signup Setup
    const [signUser, setSignUser] = useState("");
    const [signEmail, setSignEmail] = useState("");
    const [signPass, setSignPass] = useState("");
    const [signName, setSignName] = useState("");
    const [signAv, setSignAv] = useState("AV1");

    //Login Setup
    const [logUser, setLogUser] = useState("");
    const [logPass, setLogPass] = useState("");

    //User Account Details
    const [conUserName, setConName] = useState("");
    const [conUserEmail, setConEmail] = useState("");
    const [conUserBal, setConBal] = useState(0);
    const [conName, setName] = useState("");
    const [conAv, setConAv] = useState("");

    //Transfer Details
    const [reciever, setReciver] = useState("");
    const [amount, setAmount] = useState(0);

    //Sender Buttons
    const [button, setButton] = useState("");

    //Temp
    const [mine, setMine] = useState("");

    //Error Messages
    const [loginError, setLoginError] = useState("");
    const [leHidden, setleHidden] = useState("hidden");
    const [signError, setSignError] = useState("");
    const [seHidden, setseHidden] = useState("hidden");
    const [conError, setConError] = useState("");
    const [ceHidden, setceHidden] = useState("hidden");
    const [mineError, setMineError] = useState("");
    const [meHidden, setmeHidden] = useState("hidden");

    function reset(){
        setConName("");
        setConEmail("");
        setConBal(0);
        setName("");
        setLogUser("");
        setLogPass("");
        setSignUser("");
        setSignEmail("");
        setSignPass("")
        setSignName("");
        setReciver("");
        setAmount(0);
        setMine("");
        setLoginError("");
        setleHidden("hidden");
        setSignError("");
        setseHidden("");
    }

    function setLayoutForLogin(){
        reset();
        setIntro("");
        setLogin("");
        setSignup("hidden");
        setCons("hidden");
        setProfile("hidden");
    }

    function setLayoutForSignup(){
        reset();
        setIntro("");
        setLogin("hidden");
        setSignup("");
        setCons("hidden");
        setProfile("hidden");
    }

    function setLayoutForUser(){
        setConError("");
        setceHidden("hidden");
        setMineError("");
        setmeHidden("hidden");
        setIntro("hidden");
        setLogin("hidden");
        setSignup("hidden");
        setCons("");
        setProfile("");
    }

    async function setUser(tUser){
        const curEmail = await token.GetEmail(tUser);
        const curBal = await token.GetBalance(tUser);
        const curName = await token.GetName(tUser);
        const curAv = await token.GetAv(tUser);
        setConBal(curBal);
        setConEmail(curEmail);
        setName(curName);
        setConName(tUser);
        setConAv(curAv);
        console.log(curBal, curEmail, curName, tUser);
    }

    //Signup Input Setup
    function setSUser(event){
        setSignUser(event.target.value);
    }
    function setSEmail(event) {
        setSignEmail(event.target.value);
    }

    function setSPass(event) {
        setSignPass(event.target.value);
    }
    function setSName(event) {
        setSignName(event.target.value);
    }

    //Login Input Setup
    function setLUser(event) {
        setLogUser(event.target.value);
    }
    function setLPass(event){
        setLogPass(event.target.value);
    }

    async function verifyCred() {
        const ans = await token.Check(logUser, logPass);
        if (ans == 0){
            console.log("Invalid");
            setLoginError("User Not Found");
            setleHidden("");
        }
        else if(ans == 1){
            setUser(logUser);
            setLayoutForUser();
        }
        else if(ans == 2){
            console.log("Fail");
            setLoginError("Wrong Password");
            setleHidden("");
        }
    }  

    async function firstSign(){
        const err = await token.GetEmail(signUser);
        if(err == "nouser") {
            token.AddUser(signUser, signName, signEmail, signPass, signAv);
            setLayoutForLogin();
        }
        if (err != "nouser"){
            console.log("Username already exists");
            setSignError("Username alredy exists");
            setseHidden("");
        }
    }

    async function updateBalance() {
        setButton("hidden");
        const err = await token.Transfer(conUserName, reciever, Number(amount));
        if (err) {

            console.log("Insufficient funds!");
            setConError("Insufficient Token Balance");
            setceHidden("");
        }
        else{
            const newBal = await token.GetBalance(conUserName);
            setConBal(newBal);
        }
        setButton("");
    }

    async function getNewBal() {
        const newBal = await token.GetBalance(conUserName);
        setConBal(newBal);
    }

    function updateReciever(event){
        setReciver(event.target.value);
    }
    function updateAmount(event) {
        setAmount(event.target.value);
    }

    function updateMine(event) {
        setMine(event.target.value);
    }

    async function miner() {
        setButton("hidden");
        const curMine = Number(mine);
        if (curMine % 2 == 0){
            await token.Transfer("srbk-admin", conUserName, 100);
            const newBal = await token.GetBalance(conUserName);
            setConBal(newBal);
        }
        else {
            console.log("Odd Number");
            setMineError("You have entered an odd number")
            setmeHidden("");
        }
        setButton("");
    }

    function setAv1(){
        setSignAv("AV1");
    }
    function setAv2(){
        setSignAv("AV2");
    }
    function setAv3(){
        setSignAv("AV3");
    }
    function setAv4(){
        setSignAv("AV4");
    }

    return (
            <div class = "rowLayout">   
                <div class = "row">
                    <div hidden = {intro} class = "col">

                            <div class = "divLayout introDiv">
                                <h1>Welcome to Zera</h1>
                                <br/>
                                <br/>
                                <h5>Mine and exhange KenZ</h5>            
                            </div>

                    </div>

                    <div hidden = {login} class = "col">
                            
                            <div class = "divLayout loginDiv">
                                <h2>Login</h2>
                                <p hidden = {leHidden} >{loginError}</p>
                                <input type = "text" placeholder="Username" onChange={setLUser} value = {logUser}></input>
                                <input type = "password" placeholder="Password" onChange={setLPass} value = {logPass}></input> <br/>
                                <button class = "btn btn-dark batan" onClick={verifyCred}>Login</button>
                            </div>

                    </div>

                    <div hidden = {signup} class = "col">
                            
                            <div class = "divLayout signinDiv">
                                <h2>Signup</h2>
                                <p hidden = {seHidden}>{signError}</p>
                                <input type = "text" placeholder="Username" value = {signUser} onChange = {setSUser}></input>
                                <input type = "text" placeholder="Full Name" value = {signName} onChange = {setSName}></input>
                                <input type = "email" placeholder="Email" value = {signEmail} onChange = {setSEmail}></input>
                                <input type = "password" placeholder="Password" value = {signPass} onChange = {setSPass}></input> <br/>
                                <h6>Select Your Avatar</h6>                               
                                <button class = "imgButton av1" onClick = {setAv1}></button>
                                <button class = "imgButton av2" onClick = {setAv2}></button>
                                <button class = "imgButton av3" onClick = {setAv3}></button>
                                <button class = "imgButton av4" onClick = {setAv4}></button>
                                <br/>
                                <button class = "btn btn-dark batan" onClick={firstSign}>Signup</button>
                            </div>

                    </div>
                </div>

                <div class = "homeButtons">
                    <button hidden = {signup} class = "btn btn-light" onClick = {setLayoutForLogin}>Or Login Instead</button>
                    <button hidden = {login} class = "btn btn-light" onClick={setLayoutForSignup}>Or Signup Instead</button>
                </div>

                <div class = "userRow">
                    <div class = "row">
                        <div hidden = {cons} class = "col-8">
                            <div class = "divLayout consoleDiv">
                                <h3>Console</h3>
                                <h5>Mining</h5>
                                <p>Enter an even number to mine 100 tokens.</p> <br/>
                                <p hidden = {meHidden}>{mineError}</p>
                                <input type = "number" placeholder="Even Number" value = {mine} onChange = {updateMine}></input> <br />
                                <button hidden = {button} class = "btn btn-dark" onClick = {miner}>Mine</button>
                            </div>
                            <div class = "divLayout consoleDiv">
                                <h5>Transfer or Burn Tokens</h5>
                                <p>Enter a valid wallet to transfer tokens, or enter an invalid wallet to burn tokens.</p> 
                                <p hidden = {ceHidden}>{conError}</p>
                                <input type = "text" placeholder="Wallet" value = {reciever} onChange = {updateReciever}></input>
                                <input type = "number" placeholder="Amount" value = {amount} onChange = {updateAmount}></input> <br/>
                                <button hidden = {button} class = "btn btn-dark" onClick={updateBalance}>Transfer</button>
                            </div>
                        </div>
                        <div hidden = {profile} class = "col-4">            
                            <div class = "divLayout profileDiv">
                                <h3>Profile</h3>
                                <div class = "row">
                                    <div class = "col-3">
                                        <div class = {conAv}></div>
                                    </div>
                                    <div class = "col-9">
                                        <h5>{conName}</h5>
                                    </div>
                                </div>    
                                <p>Email: {conUserEmail}</p>
                                <p>Wallet: {conUserName}</p>
                                <p>Balance: {conUserBal} KenZ</p>
                                <button class = "btn btn-dark" onClick={getNewBal}>Refresh Balance</button>
                                <p></p>
                                <br/>
                                <button class = "btn btn-dark" onClick = {setLayoutForLogin}>Logout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
    );
}

export default Front;