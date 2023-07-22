import React, { FC } from "react";
import { GetStaticProps } from "next";
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Slick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type User = {
  id: number;
  name: string;
}

type Props = {
  users: User[];
}

const Home: FC<Props> = (props) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    adaptiveHeight: true,
    centerMode: true
  };
  return (
    <>
    <Head>
        <title>Kiwami | ホーム</title>
        <meta name="keywords" content="kiwami"/>
      </Head>
      <div>
        <h1 className={styles.title}>Homepage</h1>
        <p className={styles.text}> Kiwamiへようこそ。</p>
        <p className={styles.text}> ととのうのその先、「きわまる」（究まる・極まる）へ。</p>
        <Link href="/reservation/">
          <a className={styles.btn}>予約はこちら</a>
        </Link>
        <br />
        <ul className="slider">
      <Slick {...settings}>
        <li><img src="/image1.png" alt="Image1 Image"/></li>
        <li><img src="/image2.png" alt="Image2 Image"/></li>
        <li><img src="/image3.png" alt="Image3 Image"/></li>
      </Slick>
    </ul>
      </div>
    {/* <div>
      <h2>Userの一覧</h2>
      <table>
	{props.users.map((user) =>
	  <tr>
	    <td>{user.id}.</td>
	    <td>{user.name}</td>
	  </tr>
        )}
      </table>
    </div> */}
    </>
  )
}

export default Home;
