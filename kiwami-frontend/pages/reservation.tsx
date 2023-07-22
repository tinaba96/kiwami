import Head from 'next/head'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import jaLocale from '@fullcalendar/core/locales/ja';
import Modal from "./Modal";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, login, logout } from "./features/userSlice";
import { auth } from "../src/firebase/firebase";
import axios from 'axios';
import { start } from 'repl';
import Loading from '../hooks/Loading'



const Reservation = () => {
  const [showModal, setShowModal] = useState(false);
  const [info, setInfo] = useState([]);
  const [reserves, setReserves] = useState([]);
  const [eve, setEve] = useState([]);
  const [loading, setLoading] = useState(false);
  const ShowModal = (event) => {
    setShowModal(true);
    setInfo(event);
  };


  const setEvents = (reservations) => {
    const Events = []
    for(let i = 0; i < reservations.length; i++) {
      const date = reservations[i].date
      const start_time = reservations[i]["start_time"]
      for(let k = 0; k < 23-9+1; k++) {
        const s = Number(Object.keys(start_time[k])[0])
        const e = s+1
        if (start_time[k][s] === undefined) start_time[k][s] = 0
        const stime = ( '000' + s ).slice( -2 );
        const etime = ( '000' + e ).slice( -2 );
        const start = date + "T" + stime + ":00:00"
        const end = date + "T" + stime + ":59:59"
        const num_res = Number(Object.values(start_time[k])[0])
        let icon = "◎"
        let title = icon
        let tcolor = 'black'
        let bcolor = 'black'
        if (num_res>5){
          icon = "◎"
          title = icon,
          tcolor = 'black'
          bcolor = 'black'
        }else if(num_res>0){
          icon = "△"
          title = icon+"空き"+num_res
          tcolor = 'red'
          bcolor = 'red'
        }else{
          icon = "❌"
          title = icon,
          tcolor = 'grey'
          bcolor = 'grey'
        }
        var ev = {
          id: Number(date.slice(-2)+start_time[k][s]),
          title: title,
          color: 'white',
          textColor: tcolor,
          borderColor: bcolor,
          start: start,
          end: end,
        };
    Events.push(ev)
      };
    }
    setEve(Events)
  }

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

  type SampleType = {
    date: String;
    start_time: Number
  };

  useEffect(() => {
    const getSampleData = () => {
      axios
        .get('/api/v1/reservations')
        // .get('/api/v1/reservations', { params: { uid: user.uid }})
        .then((res) => {  // レスポンスを受け取ったらthenを実行する
          const reserve_datas = []

          // GETで取得したデータをforEachでループしてStateにセットする
          res.data.forEach((resData) => {
            const data: SampleType = {
              date: resData["date"],
              start_time: resData["start_time"]
            };
            reserve_datas.push(data);
          });
          setReserves(reserve_datas);
          setLoading(true)

        })
        .catch((error) => {  // エラーコードが返ってきた場合
          console.log(error);  // エラーコードを表示
        });
      };
    getSampleData(); // 関数を実行する
    // console.log(Object.values(reserves[0]["start_time"][2])[0])

  }, [loading, showModal]);

  useEffect(() => {
    setEvents(reserves)
  }, [reserves])

  return (
    <>
    {loading ? (
    <>
      <Head>
        <title>Kiwami | 予約</title>
        <meta name="keywords" content="Heros"/>
      </Head>
      <div>
        {/* {user.uid ? (<p>{user.email} でログイン中</p>) : (<p>まだログインしていません。</p>)} */}
        <h1>予約システム</h1>
        <p>予約したい開始時間をクリックしてください。(黒：空きあり　赤：残りわずか　灰：空きなし)</p>
        <p>予約やキャンセル待ちが可能です。</p>
        <p>予約時間から3時間ご利用頂けます。</p>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        // headerToolbar={{
        //   center: 'dayGridMonth,timeGridWeek,timeGridDay',
        // }}
        events={eve}
        // events={reserves}
        allDayText="終日"
        eventClick={(e) => ShowModal(e.event)}
        // eventClick={(e) => console.log(e.event.id)}
        slotMinTime="09:00:00" //時間の表示範囲start
        slotMaxTime="24:00:00" //時間の表示範囲end
        contentHeight={'auto'}
        displayEventTime={false}
      />
      <Modal isLogin={Boolean(user.uid)} uid={user.uid} showFlag={showModal} setShowModal={setShowModal} event={info}/>
    </>
    ):(
    <>
    {/* <p>ローディング中。。。</p>
    <p>少々お待ちください。</p> */}
    <div>
      <Loading isShow={ !loading }/>
    </div>
    <div className='footer' />
    </>
    )}
    </>
  );
}
export default Reservation;
