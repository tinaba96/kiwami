import React, { useState, useEffect } from "react";
import styles from '../styles/Home.module.css'
import axios from 'axios';
import { userInfo } from "os";
import Modal from "react-modal";
import {
  Button,
  TextField,
  makeStyles,
} from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";
import { auth, provider } from "../src/firebase/firebase";
import { useRouter } from 'next/router';
import { getAuth } from '../helper/firebaseAuthHelper';
import { useSelector, useDispatch } from "react-redux";
import { selectUser, login, logout } from "./features/userSlice";
import { UnsubscribeTwoTone } from "@material-ui/icons";


const compModal = (props) => {
  const classes = useStyles();
  const [res, setRes] = useState(false);
  const [err, setErr] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const router = useRouter();
  
    const closeModal = () => {
        setRes(false)
        setErr(null)
        props.setShowModal(false);
      };
    const handleRes = async () => {
      console.log('Reservation Handle')
      const auth = getAuth();
      const currentUser = auth.currentUser;
      const date = props.event.startStr.slice(0,10)
      const start_time = props.event.startStr.slice(11,13)
      await axios.post('api/v1/reservations', {uid: currentUser.uid, date: date, start_time: Number(start_time)})
      .then(() => {
       setRes(true)
      })
      .catch(err => {
      console.log("err:", err);
      // console.log("err:", err.response?.status);
      setErr(err.response?.status)
      });
    }
  // Eメール認証
  const signUpEmail = async () => {
    await auth.createUserWithEmailAndPassword(email, password).catch((err) => alert(err.message));
    router.push('/mypage')
  };

  // 認証後Rails側にリクエストを送る
  const handleEmailsignUp = async () => {
    const request = async () => {
      await signUpEmail();
      const auth = getAuth();
      const currentUser = auth.currentUser;
      // Firebase Authの認証
      if (auth && auth.currentUser) {
        const token = await currentUser.getIdToken(true);
        const config = { token };
        // Rails側にリクエストを送る
        try {
          await axios.post('/api/v1/auth/registrations', {token: token, name: name, gender: Number(gender), role: 1 });
        } catch (error) {
          console.log(error);
        }
      }
    };
    await request();
    await handleRes();
  };
    const handleGender = (e) => {
      setGender(e.target.value)
    };
  return (
    <>
    <Modal isOpen={props.showFlag} style={modalStyle} onRequestClose={() => props.setShowModal(false)}
    ariaHideApp={false}
      overlayClassName={{
        base: "overlay-base",
        afterOpen: "overlay-after",
        beforeClose: "overlay-before"
      }}
      className={{
        base: "content-base",
        afterOpen: "content-after",
        beforeClose: "content-before"
      }}
      closeTimeoutMS={500}
    >
          <p>日時を確認し、予約ボタンを押して下さい。</p>
          <p>{props.event.startStr ? props.event.startStr.slice(0,10) : null}</p>
          {/* <p>{props.event.startStr}</p> */}
          <p>{props.event.title}</p>
          <p>
            時間：　
            {props.event.startStr ? props.event.startStr.slice(11,16) : null}
              〜
          </p>
          {props.isLogin ? ( // ログイン済みの場合
            <>
              { (res && err === null) ? (<><button disabled onClick={handleRes} className={styles.btn}>予約済み</button> <p>予約が完了しました。詳しくはマイページをご覧ください。</p></>):(<button onClick={handleRes} className={styles.btn}>予約</button> )}
              { (err !== null && !res) && <><p className="alert">エラーが発生しました。</p><p className="alert">すでに予約済みの可能性があります。マイページでご確認ください。</p></>}
            </>
          ) : (
            <>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="名前"
                name="name"
                autoComplete="name"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setName(e.target.value);
                }}
              />
              <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="メールアドレス"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
              }}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="パスワード"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
              }}
              />
              <label>
              性別：
              <select onChange={(e) => handleGender(e)}>
                <option value="0">男性</option>
                <option value="1">女性</option>
              </select>
            </label>

            { !res ? ( <Button
              disabled={
                props.isLogin
                  ? !email || password.length < 10
                  : !email || password.length < 10
              }
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              startIcon={<EmailIcon />}
              onClick={
                  async () => {
                    try {
                      await handleEmailsignUp();
                    } catch (err) {
                      alert(err.message);
                    }
                  }
              }
            > 
              新規登録＆予約
            </Button>
            ) : (
              <>
            { res && <><p>予約済み</p><p>予約が完了しました。詳しくはマイページをご覧ください。</p></>}
            </>
            )
            }
            </>// まだログインしていない場合
          )}
          <button className={styles.closeBtn} onClick={closeModal}>閉じる</button>
      </Modal>
    </>
  );
};

export default compModal;

const modalStyle = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.85)",
    zIndex: 10,
  },
  content: {
    position: "absolute",
    top: "5rem",
    left: "5rem",
    right: "5rem",
    bottom: "5rem",
    backgroundColor: "white",
    // backgroundColor: "paleturquoise",
    borderRadius: "1rem",
    padding: "1rem"
  }
};

// const modalContent = {
//     background: "#CCCC99",
//     borderStyle: "solid",
//     borderColor: "black",
//     padding: "10px",
//     width: "70%",
//     height: "70%",
//     borderRadius: "10px",
// };

const overlay = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "50%",
    height: "90%",
    backgroundColor: "rgba(0,0,0,0)",
    zIndex: 10,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      height: "50vh",
    },
    modal: {
      outline: "none",
      position: "absolute",
      width: 400,
      borderRadius: 10,
      backgroundColor: "white",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(10),
    },
    image: {
      backgroundImage:
        "url(https://unsplash.com/photos/OeyXsONO9l4)",
      backgroundRepeat: "no-repeat",
      backgroundColor:
        theme.palette.type === "light"
          ? theme.palette.grey[50]
          : theme.palette.grey[900],
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%",
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
