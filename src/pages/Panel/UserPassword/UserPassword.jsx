import * as React from 'react';
import { useState, useEffect } from 'react';

import validator from 'validator'

import Typography from '@mui/joy/Typography';
import TextField from '@mui/joy/TextField';

import {
    Sheet,
    Button,
} from '../GlobalStyles/Styles';

export default function UserPassword(props) {
    const [currectPassword, setCurrectPassword] = useState({ value: '', isError: false, isEmpty: true });
    const [newPassword, setNewPassword] = useState({ value: '', isError: false, isEmpty: true });
    const [confirmPassword, setConfirmPassword] = useState({ value: '', isError: false, isEmpty: true });
    const [isActiveButton, setIsActiveButton] = useState(false);

    useEffect(() => {
        isActiveButtonF();
    }, [currectPassword, newPassword, confirmPassword]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        sendData(data);
    };

    const sendData = (data) => {
        var url = props.url + '/users/update/password';
        var methodType = "POST";

        var jsonData = JSON.stringify({
            currentPassword: data.get('currentPassword'),
            newPassword: data.get('newPassword'),
            confirmPassword: data.get('confirmPassword')
        });

        send(url, methodType, jsonData);
    }

    const send = (url, methodType, data) => {
        console.log(data);
        const token = window.localStorage.getItem('token');
        const xhr = new XMLHttpRequest();
        xhr.open(methodType, url);

        xhr.setRequestHeader("Authorization", "Bearer " + token);
        xhr.setRequestHeader("content-type", "application/json");
        xhr.onload = () => {
            if (xhr.status === 200) {
                console.log(xhr.responseText);
                setCurrectPassword(prevState => ({
                    ...prevState,
                    ['isError']: false
                }));
            } else {
                console.log("Server response: ", xhr.status);
                setCurrectPassword(prevState => ({
                    ...prevState,
                    ['isError']: true
                }));
            }
        };

        xhr.send(data);
    };

    const handleCurrent = (value) => {
        if (value != "") {
            setCurrectPassword(prevState => ({
                ...prevState,
                ['value']: value,
                ['isError']: false,
                ['isEmpty']: false
            }));
        }
        else {
            setCurrectPassword(prevState => ({
                ...prevState,
                ['value']: value,
                ['isError']: true,
                ['isEmpty']: true
            }));
        }
    }

    const handleNew = (value) => {
        if (value == "") {
            setNewPassword(prevState => ({
                ...prevState,
                ['isEmpty']: true
            }));
        }

        setNewPassword(prevState => ({
            ...prevState,
            ['value']: value,
            ['isEmpty']: false,
        }));
        isValidConfirm(value, confirmPassword.value);

        if (validator.isStrongPassword(value, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 0
        })) {
            setNewPassword(prevState => ({
                ...prevState,
                ['isError']: false
            }));
        } else {
            setNewPassword(prevState => ({
                ...prevState,
                ['isError']: true
            }));
        }
    }

    const handleConfirm = (value) => {
        if (value == "") {
            setConfirmPassword(prevState => ({
                ...prevState,
                ['isEmpty']: true
            }));
        }
        setConfirmPassword(prevState => ({
            ...prevState,
            ['value']: value,
            ['isEmpty']: false,
        }));
        isValidConfirm(newPassword.value, value);
    }

    const isActiveButtonF = () => {
        if (currectPassword.isEmpty ||
            currectPassword.isError ||
            newPassword.isError ||
            confirmPassword.isError) {
            setIsActiveButton(false);
        }
        else {
            setIsActiveButton(true);
        }
    }

    const isValidConfirm = (valueNew, valueCinfirm) => {

        if (valueNew !== valueCinfirm) {
            setConfirmPassword(prevState => ({
                ...prevState,
                ['isError']: true
            }));
        }
        else {
            setConfirmPassword(prevState => ({
                ...prevState,
                ['isError']: false
            }));
        }
    }

    return (
        <>
            <Sheet component="form" onSubmit={handleSubmit} variant="outlined" sx={{ ml: props.ml }}>
                <div>
                    <Typography level="h4" component="h6">
                        Welcome to the change password
                    </Typography>
                    <Typography level="body2">change your password as you want</Typography>
                </div>
                <TextField
                    error={currectPassword.isError}
                    name="currentPassword"
                    type="password"
                    placeholder="Enter your current password"
                    label="Current Password"
                    helperText={currectPassword.isError ? "Incorrect password" : ""}
                    value={currectPassword.value}
                    onChange={(e) => handleCurrent(e.target.value)} />
                <TextField
                    error={newPassword.isError}
                    color={newPassword.isError || newPassword.isEmpty ? "neutral" : "success"}
                    name="newPassword"
                    type="password"
                    placeholder="Enter your new password"
                    label="New Password"
                    helperText={newPassword.isError ? "The password must contain one uppercase and lowercase letter, a number, and must be at least 8 characters long." : ""}
                    value={newPassword.value}
                    onChange={(e) => handleNew(e.target.value)} />
                <TextField
                    error={confirmPassword.isError}
                    color={confirmPassword.isError || confirmPassword.isEmpty ? "neutral" : "success"}
                    name="confirmPassword"
                    type="password"
                    placeholder="Enter your confirm new password"
                    label="Confirm New Password"
                    helperText={confirmPassword.isError ? "Incorrect entry." : ""}
                    value={confirmPassword.value}
                    onChange={(e) => handleConfirm(e.target.value)} />
                <Button type="submit" color='danger' disabled={!isActiveButton}>Update</Button>
            </Sheet>
        </>
    );
}