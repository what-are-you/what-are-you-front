import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormHelperText from '@mui/material/FormHelperText';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useState } from 'react';

const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700 !important;
  color: #d32f2f !important;
`;

export default function SignUp() {

    const theme = createTheme();
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordState, setPasswordState] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [nameError, setNameError] = useState('');
    const [registerError, setRegisterError] = useState('');

    const handleAgree = (event) => {
        setChecked(event.target.checked);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const joinData = {
            fullName: data.get('fullName'),
            email: data.get('email'),
            password: data.get('password'),
            confirmPassword: data.get('confirmPassword'),
        };

        const { fullName, email, password, confirmPassword } = joinData;

        // 이름 유효성 검사
        const nameRegex = /^[가-힣a-zA-Z]+$/;
        if (!nameRegex.test(fullName) || fullName.length < 1) setNameError('올바른 이름을 입력해주세요.');
        else setNameError('');

        // 이메일 유효성 체크
        const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        if (!emailRegex.test(email)) setEmailError('올바른 이메일 형식이 아닙니다.');
        else setEmailError('');

        // 비밀번호 유효성 체크
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        if (!passwordRegex.test(password))
            setPasswordState('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!');
        else setPasswordState('');

        // 비밀번호 같은지 체크
        if (password !== confirmPassword) setPasswordError('비밀번호가 일치하지 않습니다.');
        else setPasswordError('');

        // 회원가입 동의 체크
        if (!checked) alert('회원가입 약관에 동의해주세요.');

        if (
            emailRegex.test(email) &&
            passwordRegex.test(password) &&
            password === confirmPassword &&
            nameRegex.test(fullName) &&
            checked
        ) {
            //onhandlePost(joinData);
        }

    };

    const onLinkClick = (e) => {
        e.preventDefault();
        navigate("/");
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        회원가입
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="fullName"
                                    label="이름"
                                    type="fullName"
                                    id="fullName"
                                    autoComplete="full-Name"
                                    autoFocus
                                    error={nameError !== '' || false}
                                />
                            </Grid>
                            <FormHelperTexts>{nameError}</FormHelperTexts>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="이메일 주소"
                                    name="email"
                                    autoComplete="email"
                                    error={emailError !== '' || false}
                                />
                            </Grid>
                            <FormHelperTexts>{emailError}</FormHelperTexts>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="비밀번호 (숫자+영문자+특수문자 8자리 이상)"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    error={passwordState !== '' || false}
                                />
                            </Grid>
                            <FormHelperTexts>{passwordState}</FormHelperTexts>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirmpassword"
                                    label="비밀번호 재입력"
                                    type="confirmPassword"
                                    id="confirmPassword"
                                    autoComplete="confirm-password"
                                    error={passwordError !== '' || false}
                                />
                            </Grid>
                            <FormHelperTexts>{passwordError}</FormHelperTexts>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox onChange={handleAgree} value="allowExtraEmails" color="primary" />}
                                    label="회원가입 약관에 동의합니다."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            회원가입
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/" variant="body2" onClick={onLinkClick}>
                                    계정이 이미 있으신가요? 로그인
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}