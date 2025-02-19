import {useContext, useEffect, useState} from "react";
import {useUserStore} from "../stores/userStore.js";
import {useAuthStore} from "../stores/authStore.js";
import {Link, useNavigate} from "react-router-dom";
import {Alert, Button, Card, CardBody, CardFooter, CardHeader, Input, Typography} from "@material-tailwind/react";
import {useTranslation} from "react-i18next";
import DefaultSpinner from "../components/DefaultSpinner.jsx";
import InputPassword from "../components/InputPassword.jsx";
import DataContext from "../context/DataContext.jsx";
import NProgress from "nprogress";

const Login = () => {
    const {t} = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(null);

    const {user, userError, userLoading, login, userSuccess} = useUserStore();
    const {setCredentials, userInfo} = useAuthStore();

    const {backUrl, setBackUrl} = useContext(DataContext);

    const navigate = useNavigate();

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    useEffect(() => {
        const url = backUrl ?? '/';
        if(userSuccess && user){
            setCredentials({user});
            setBackUrl(null);
            navigate(url);
            location.reload();
        }else if(userInfo){
            setBackUrl(null);
            navigate(url);
        }
    }, [navigate, userSuccess, user, userInfo]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoginError(null);
        if(!email || !password || email === '' || password === ''){
            setLoginError(t("register.errors.fields"));
            if(!email || email === ''){
                document.querySelector('input[name="email"]').focus();
            }else if(!password || password === ''){
                document.querySelector('input[name="password"]').focus();
            }
            return;
        }
        if(!emailRegex.test(email)){
            setLoginError(t("register.errors.email"));
            document.querySelector('input[name="email"]').focus();
            return;
        }

        try{
            NProgress.start();
            await login({email, password});
        }catch(err){
            console.error(err);
        }finally{
            NProgress.done();
        }
    }

    return (
        <main className="flex justify-center items-center flex-col">
            <div className="flex flex-col gap-2 items-center justify-center my-6">
                {userError && (
                    <Alert color="red">{userError}</Alert>
                )}
                {loginError && (
                    <Alert color="red">{loginError}</Alert>
                )}
            </div>

            <section className="my-12 flex justify-center">
                {userLoading ? (
                    <DefaultSpinner />
                ):(
                    <Card className="w-96 bg-gray-800" role="form">
                        <CardHeader className="grid h-36 place-items-start bg-[url('/bg-login.jpg')] bg-no-repeat bg-cover">
                            <span/>
                        </CardHeader>

                        <CardBody className="flex flex-col gap-8">
                            <Typography variant="h1" className="font-dev text-primary-400 font-bold">
                                {t("login.title")}
                            </Typography>

                            <Input
                                variant="standard"
                                type="email"
                                inputMode="email"
                                label="Email"
                                name="email"
                                size="lg"
                                color="deep-orange"
                                value={email}
                                className="text-primary-900"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <InputPassword
                                label={t("login.password")}
                                value={password}
                                handler={setPassword}
                                required
                            />
                        </CardBody>

                        <CardFooter className="pt-0">
                            <Button
                                variant="gradient"
                                fullWidth
                                color="deep-orange"
                                className="font-dev text-xl"
                                onClick={handleSubmit}
                            >
                                {t("login.title")}
                            </Button>

                            <Typography variant="small" className="mt-6 flex justify-center text-primary-900">
                                {t("login.register.text")}
                                <Link to="/register">
                                    <Typography
                                        variant="small"
                                        color="deep-orange"
                                        className="ml-1 font-bold"
                                    >
                                        {t("login.register.link")}
                                    </Typography>
                                </Link>
                            </Typography>
                        </CardFooter>
                    </Card>
                )}
            </section>
        </main>
    );
};

export default Login;