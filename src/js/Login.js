import React, {useState} from 'react';
import API from "./API";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import App from './App';

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
    const navigate = useNavigate();


    const handleSwitchForm = () => {
        setIsLoggingIn(!isLoggingIn);
    };

    const handleLoginSubmit = async (e, navigation) => {
        e.preventDefault();
        const requestBody = {
            username: email,
            password: password
        }

        try {
            const response = await API.get("/users");
            const users = response.data;

            const matchingUser = users.find(user => user.email === email && user.password === password);

            if (matchingUser) {
                console.log("Użytkownik o podanym e-mailu i haśle istnieje:", matchingUser);
                await API.post("/logged_users", matchingUser);
                navigate('/')
            } else {
                console.log("Użytkownik o podanym e-mailu i haśle nie istnieje.");
            }
        } catch (error) {
            console.error("Błąd podczas pobierania danych użytkowników", error);
        }

        setIsLoggingIn(true);
    }

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setRegistrationError("Passwords do not match");
            return;
        }
        const requestBody = {
            name: name,
            surname: surname,
            email: email,
            password: password,
            birthdayDate: birthDate,
            gender: gender
        }
        try {
            const response = await API.post("/users", requestBody);
        } catch (error) {
            /*if(!error?.response) {
                setErrMsg('No server response');
            } else if (error.response?.status === 409) {
                setErrMsg('Email taken')
            } else {
                setErrMsg('Registration failed')
            }*/

        }
    }

    return (
        <div className="login-container">
            <h1>App Name/Logo</h1>
            <div>
                {isLoggingIn ? (
                    <div>
                        <form onSubmit={handleLoginSubmit} className="login-form">
                            <h3>Sign In</h3>
                            <input
                                type="email"
                                value={email}
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
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
                        <form onSubmit={handleRegisterSubmit} className="login-form">
                            <h3>Sign Up</h3>
                            <input
                                type="email"
                                value={email}
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                value={name}
                                placeholder="Name"
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                value={surname}
                                placeholder="Surname"
                                onChange={(e) => setSurname(e.target.value)}
                                required
                            />
                            <input
                                type="date"
                                value={birthDate}
                                placeholder="Birth Date"
                                onChange={(e) => setBirthDate(e.target.value)}
                                required
                            />
                            <div className="gender-options">
                                <label>Men</label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    checked={gender === "male"}
                                    onChange={() => setGender("male")}
                                />
                                <label>Women</label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    checked={gender === "female"}
                                    onChange={() => setGender("female")}
                                />
                            </div>
                            <input
                                type="password"
                                value={password}
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                value={confirmPassword}
                                placeholder="Confirm Password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <span>{registrationError}</span>
                            <button type="submit">Sign Up</button>
                        </form>
                    </div>
                )}
                <p>
                    {isLoggingIn ? 'Don\'t have an account? ' : 'Already have an account?'}
                    <button onClick={handleSwitchForm} className="login-switch-button">
                        {isLoggingIn ? 'Sign Up' : 'Sign In'}
                    </button>
                </p>
            </div>
        </div>
    );
}

export default Login;
