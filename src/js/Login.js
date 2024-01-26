import React, {useState} from 'react';
import API from "./API";
import {useNavigate} from 'react-router-dom';
import bcrypt from 'bcryptjs';

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

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await API.get("/users/");

            for (const user of result.data) {
                if (user.email === email) {
                    const passwordMatch = await bcrypt.compare(password, user.password);

                    if (passwordMatch) {
                        sessionStorage.setItem('userId', parseInt(user.id, 16));
                        navigate('/');
                        console.log("przeszło");
                    } else {
                        console.log("Nieudane logowanie");
                    }
                }
            }
        } catch (error) {
            console.error("Błąd podczas pobierania użytkowników:", error);
        }
    };


    const handleSwitchForm = () => {
        setIsLoggingIn(!isLoggingIn);
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setRegistrationError("Passwords do not match");
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const requestBody = {
            name: name,
            surname: surname,
            email: email,
            password: hashedPassword,
            birthdayDate: birthDate,
            gender: gender
        }
        try {
            const response = await API.post('/users', requestBody);
            setIsLoggingIn(true);
            console.log('Rejestracja pomyślna!');
            console.log(response.data.id + "idddddddd");

        } catch (error) {
            console.error('Błąd rejestracji:', error);
            setRegistrationError('Błąd rejestracji. Spróbuj ponownie.');
        }
    };

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
