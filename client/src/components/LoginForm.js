import React, {useState} from 'react';
import GeneratePage from "./GeneratePage";
import axios from "axios";
import {useFormik} from "formik";
import {useCookies} from 'react-cookie'
import { Form, Input, Button} from 'antd'
import '../styles/Login.scss'
const LoginForm = () => {

    const [userData, setUserData] = useState({
        token: "",
        user: undefined,
        isSignUp: false,
        signState: "Please enter login and password"
    })

    const [cookies, setCookie, removeCookie] = useCookies(['login time']);


    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',

        },
        onSubmit: (values) => {
            return axios.post("/user/login", values,).then(({data}) => {

                setUserData({
                    user: data.user,
                    token: data.token,
                    isSignUp: true,
                    signState: "Log in"
                })
                const date = new Date()
                setCookie('login time', date.toString())

            }).then(() => {
            }).catch(err => {
                if (err.response.status === 404) {
                    console.log('User not Found')
                    setUserData({
                        signState: "User not Found"
                    })

                }
            })
        },
    });
    return (


        <div className="login">
            <Form onSubmit={formik.handleSubmit} classname="login__form">
                <div className="login__input">
                    Username:
                    <Input
                        id="username"
                        name="username"
                        type="username"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        className="login__form__username"
                    />
                </div>

                <div>
                    Password:
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        className="login__form__password"
                    />
                </div>


                <Button type="submit" className="login__form__button">Submit</Button>
            </Form>

            <div className="login__info">
                {userData.isSignUp &&
                <div>
                    <GeneratePage token={userData.token}/>
                </div>
                }
                <div>
                    {userData.signState}
                </div>
            </div>


        </div>






    );
};

export default LoginForm;
