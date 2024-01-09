import React, {useState} from 'react';

const Login = () => {
    const [isLoggingIn, setIsLoggingIn] = useState(true);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [registrationError, setRegistrationError] = useState("");
    const [loginError, setLoginError] = useState("");
    const [gender, setGender] = useState("");

    const handleSwitchForm = () => {
        setIsLoggingIn(!isLoggingIn);
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const requestBody = {
            username: email,
            password: password
        }
    }

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setRegistrationError("Passwords do not match");
            return;
        }
        const requestBody = {
            email: email,
            name: name,
            surname: surname,
            password: password,
            birthdayDate: birthDate,
            gender: gender
        }
        setIsLoggingIn(true);
    }

    return (
        <div>
            <h1>App Name/Logo</h1>
            <div>
                {isLoggingIn ? (
                    <div>
                        <form onSubmit={handleLoginSubmit}>
                            <h3>Sign In</h3>
                            <input className="login-input"
                                   type="email"
                                   value={email}
                                   placeholder="𝙴𝚖𝚊𝚒𝚕"
                                   onChange={(e) => setEmail(e.target.value)}
                                   required
                            />
                            <input className="login-input"
                                   type="password"
                                   value={password}
                                   placeholder="Password"
                                   onChange={(e) => setPassword(e.target.value)}
                                   required
                            />
                            <span>{loginError}</span>
                            <button type="submit">Log In</button>
                        </form>
                    </div>
                ) : (
                    <div>
                        <form onSubmit={handleRegisterSubmit}>
                            <h3>Sign Up</h3>
                            <input className="login-input"
                                   type="email"
                                   value={email}
                                   placeholder="𝙴𝚖𝚊𝚒𝚕"
                                   onChange={(e) => setEmail(e.target.value)}
                                   required/>
                            <input className="login-input"
                                   type="text"
                                   value={name}
                                   placeholder="Name"
                                   onChange={(e) => setName(e.target.value)}
                                   required/>
                            <input className="login-input"
                                   type="text"
                                   value={surname}
                                   placeholder="Surname"
                                   onChange={(e) => setSurname(e.target.value)}
                                   required/>
                            <input
                                type="date"
                                value={birthDate}
                                placeholder="Birth Date"
                                onChange={(e) => setBirthDate(e.target.value)}
                                required
                            />
                            <div>
                                <label>Men</label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    checked={gender === "Men"}
                                    onChange={() => setGender("Men")}
                                />
                                <label>Women</label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    checked={gender === "Women"}
                                    onChange={() => setGender("Women")}
                                />
                            </div>
                            <input className="login-input"
                                   type="password"
                                   value={password}
                                   placeholder="Password"
                                   onChange={(e) => setPassword(e.target.value)}
                                   required/>
                            <input className="login-input"
                                   type="password"
                                   value={confirmPassword}
                                   placeholder="Confirm Password"
                                   onChange={(e) => setConfirmPassword(e.target.value)}
                                   required/>
                            <span>{registrationError}</span>
                            <button type="submit">Sign Up</button>
                        </form>
                    </div>

                )}
                <p>
                    {isLoggingIn ? 'Dont have an account? ' : 'Already have an account?'}
                    <button onClick={handleSwitchForm}>
                        {isLoggingIn ? 'Sign Up' : 'Sign In'}
                    </button>
                </p>
            </div>
        </div>
    );
}
export default Login;
