import React, { useState, useEffect } from "react";
import Link from "next/link";
import utilStyles from '../styles/utils.module.css';
import { useSelector, useDispatch } from "react-redux";
import { selectUser, login, logout } from "./features/userSlice";
import { auth } from "../src/firebase/firebase";
import axios from 'axios';
import styles from '../styles/Mypage.module.css'
import Loading from '../hooks/Loading'

// utils
import { useWindowDimensions } from '../src/utils/dimensions'; // 画面サイズ 取得
import { IsWeb, IsMobile } from '../src/utils/breakpoint';

// ホーム画面
const Home: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [myReserves, setMyReserves] = useState([]);

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect( () => {
    const unSub = auth.onAuthStateChanged( (authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            email: authUser.email
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return () => {
      unSub();
    };
  }, [dispatch]);


  // type SampleType = {
  //   id: Number;
  //   name: String;
  //   email: String;
  //   gender: String;
  //   reservations: Number
  // };


  useEffect(() => {
    async function getUser() {
      // console.log(user.uid)
      try {
        const response = await axios.get('/api/v1/users/' + user.uid);
        setMyReserves(response.data)
        setLoading(true)
      } catch (error) {
        console.error(error);
      }
    }
    getUser()

  }, [loading, user]);

  const cancelReservation = async (data) => {
    setLoading(true)
    // console.log('Cancel Reservation')
    try {
      await axios.delete('/api/v1/reservations/' + user.uid, {params: {uid: user.uid, date: data.date, start_time: data.start_time }});
    } catch (error) {
      console.log(error);
    }
    setLoading(false)

  }

  return (
    <>
    {loading ? (
    <>
      {user.uid ? (
        <>
          <p>ようこそ、{myReserves.name} さん</p>
          { myReserves.reservations.length > 0 ? (
            <>
          <p>以下が既に予約済みのものです。</p>
          <ul className={styles.ul}>
            {myReserves.reservations.map((data) => {
              return <li className={styles.li}>{data.date} {data.start_time+"時"} <button className={styles.cancelBtn} onClick={() => cancelReservation(data)}>キャンセル</button></li>;
            })}
          </ul>
          </>) :(
            <>
            <p>現在予約済みのものはありません。</p>
            </>
          )}
          <br />
          <Link href="/login">
            <a onClick={() => auth.signOut()}>ログアウト</a>
          </Link>
        </>
      ) : (
        <>
          <p>まだログインしていません。</p>
          <Link href="/login">
            <a className={utilStyles.colorInherit}>ログインまたは新規登録をしてください。</a>
          </Link>
          <div className='footer' />
        </>
      )}
    </>
    ):(
      <>
      <div>
        <Loading isShow={ !loading }/>
      </div>
      <div className='footer' />
      {/* <p>ローディング中。。。</p>
      <p>少々お待ちください。</p> */}
      </>
      )}
      </>
  )
}

export default Home
