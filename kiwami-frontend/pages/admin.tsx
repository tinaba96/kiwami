import React, { useState, useEffect } from "react";
import Link from "next/link";
import utilStyles from '../styles/utils.module.css';
import { useSelector, useDispatch } from "react-redux";
import { selectUser, login, logout } from "./features/userSlice";
import { auth } from "../src/firebase/firebase";
import axios from 'axios';


// ホーム画面
const Home: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [allReserves, setAllReserves] = useState(null);

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((authUser) => {
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


  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get('/api/private/admin/users');
        setAllReserves(response.data)
        setLoading(true)
      } catch (error) {
        console.error(error);
      }
    }
    getUser()
  }, [loading]);

  return (
    <>
    {loading ? (
    <>
        <h2>本日の予約情報</h2>

        <h4>{allReserves.date}</h4>

        <table>
          <tr><th>開始時間</th><th>名前</th><th>メールアドレス</th><th>性別</th></tr>
          {Object.keys(allReserves.reservations).map((key, id) => (
            <>
              {Object.keys(allReserves.reservations[id].users).map((key2, id2) => (
            <tr><td key={key}>{allReserves.reservations[id].start_time} </td>
                <td key={key2}>{allReserves.reservations[id].users[key2].name} </td><td>{allReserves.reservations[id].users[key2].email}</td><td>{allReserves.reservations[id].users[key2].gender} </td>
            </tr>
              ))}
              </>
          ))}
          </table>
    </>
    ):(
      <>
      <p>ローディング中。。。</p>
      <p>少々お待ちください。</p>
      </>
      )}
      </>
  )
}

export default Home
