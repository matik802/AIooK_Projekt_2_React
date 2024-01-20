import React, {useEffect, useState} from 'react';
import API from "./API";

const EditProfile = () => {
    const [about, setAbout] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [gender, setGender] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [birthdate, setBirthdate] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const fetchData = async () => {
        try {
            const response = await API.get("/logged_users");
            setUserData(response.data);
        } catch (error) {
            console.error('Error while fetching data', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const setUserData = (data) => {
        setEmail(data.email);
        setFirstName(data.name);
        setLastName(data.surname);
        setAbout(data.about);
        setSelectedImage(data.picture);
        setBirthdate(data.birthDate);   
        setGender(data.gender);
    };

    const handleSave = async () => {
        try {
            const requestBody = {
                email: email,
                about: about,
            };

            const response = await API.put("/api/users/update", requestBody);

            if (response.ok) {
                setIsEditing(false);
            } else {
                console.error('Failed to save data:', response.statusText);
            }
        } catch (error) {
            console.error('Error while saving data:', error);
        }
    };

    const handlePasswordChange = async () => {
        try {
            if (newPassword != confirmPassword) {
                setErrorMessage("Passwords do not match");
            }
            const requestBody = {
                password: password,
                newPassword: confirmPassword
            };
            const response = await API.put("/api/users/updatePassword", requestBody);
            if (response.ok) {
                window.location.reload();
            } else {
                console.error('Failed to save data:', response.statusText);
            }
        } catch (error) {
            console.error('Error while saving data:', error);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
    };

    const startEditing = () => {
        setIsEditing(true);
    };

    return (
        <div className="edit-profile-container">
            <h1>User Profile</h1>
            <button onClick={startEditing} disabled={isEditing}>
                Edit Profile
            </button>
            <h2>User data</h2>
            <form>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={!isEditing}
                />
                <label>Name:</label>
                <input
                    type="text"
                    value={firstName}
                    disabled
                />
                <label>Surname:</label>
                <input
                    type="text"
                    value={lastName}
                    disabled
                />
                <label>Birth date:</label>
                <input
                    type="text"
                    value={birthdate}
                    readOnly
                    disabled
                />
                <label>Gender:</label>
                <input
                    type="text"
                    value={gender}
                    disabled
                />

                <label>About:</label>
                <input
                    type="textarea"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    disabled={!isEditing}
                />
            </form>
            <label>Profile picture:</label>
            <label htmlFor="upload-image">
                {selectedImage ? (
                    <img
                        alt="Zdjęcie profilowe"
                    />
                ) : (
                    <div>
                        Upload profile picture
                    </div>
                )}
            </label>
            <input
                type="file"
                accept="image/*"
                id="upload-image"
                style={{display: 'none'}}
                onChange={handleImageChange}
                disabled={!isEditing}
            />
            <form>
                <label>Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={!isEditing}
                />
                <label>New password:</label>
                <input
                    type="password"
                    name="newpassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    disabled={!isEditing}
                />
                <label>Confirm new password:</label>
                <input
                    type="password"
                    name="confirmpassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={!isEditing}
                />
                <span>{errorMessage}</span>
            </form>
            {/*TODO potrzebny oddzielny przycisk do zmiany hasła, żeby oddzielnie przesyłać dane*/
            }
            {/*<button disabled={!isEditing} onClick={handlePasswordChange}>*/
            }
            {/*    Zapisz nowe hasło*/
            }
            {/*</button>*/
            }
            <button disabled={!isEditing} onClick={handleSave}>
                Save
            </button>
            <button disabled={!isEditing} onClick={() => setIsEditing(false)}>
                Cancel
            </button>
        </div>
    )
        ;
};

export default EditProfile;