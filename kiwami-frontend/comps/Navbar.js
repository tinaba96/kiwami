import Link from 'next/link'
// import Image from 'next/image'
// import { getAuth } from '../helper/firebaseAuthHelper';
// import { useAuthState } from 'react-firebase-hooks/auth';
import React, { useState, useEffect } from "react";
import { auth } from "../src/firebase/firebase";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, login, logout } from "../pages/features/userSlice";
import styles from "../styles/index.module.scss";
import { getWindowSize } from "../hooks/GetWindowSize";


const Navbar = () => {
  const { height, width } = getWindowSize();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(false);
  const menuFunction = () => {
    setOpenMenu(!openMenu);
  }

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
// const [user, loding] = useAuthState(getAuth());
  return (
      <>
      <h1 className='nav-title'>Kiwami</h1>
      { user.email ? (
      <a className='right-text'>{ width >= 450 ? (<>{user.email}で</>):(<></>)}ログイン中</a>
      ) : (<></>)}
    {/* <h1>{ user }</h1> */}
    <nav>

      {/* <div className="logo">
        <Image src="/logo.png" alt="site logo" width={128} height={77} />
      </div> */}
      { width < 500 ? (<>
      <div className={styles.container}>
          <div className={styles.humburger} onClick={() => menuFunction()}>
            <span className={openMenu ? styles.open : undefined}></span>
            <span className={openMenu ? styles.open : undefined}></span>
            <p className={openMenu ? styles.open : undefined}>Menu</p>
          </div>
        </div>
      </>):(<></>)}
      { width >= 500 ? (<>
      <Link href="/"><a>ホーム</a></Link>
      <Link href="/about"><a>Kiwamiとは</a></Link>
      <Link href="/mypage"><a>マイページ</a></Link>
      { user.uid ? (
      <Link href="/login"><a onClick={() => auth.signOut()}>ログアウト</a></Link>
      ) : (
      <Link href="/login"><a>ログイン/新規登録</a></Link>
      )}
      </>):(<></>)}
      <Link href="/reservation"><a><btn >予約</btn></a></Link>
      { user.uid=="CQW9vjuPcCSBP0b8jR9v9FyoWoJ3" ? (
      <Link href="/admin">管理画面</Link>
      ) : (
        <></>
      )}
      {/* { width < 500 ? (<>
      <div className={styles.container}>
          <div className={styles.humburger} onClick={() => menuFunction()}>
            <span className={openMenu ? styles.open : undefined}></span>
            <span className={openMenu ? styles.open : undefined}></span>
            <p className={openMenu ? styles.open : undefined}>Menu</p>
          </div>
        </div>
      </>):(<></>)} */}
    </nav>
    <div className={`${styles.drawerMenu} ${openMenu ? styles.open : undefined}`}>
        <ul>
          <div className={styles.close} onClick={() => menuFunction()}>
            <span></span>
            <span></span>
            <p>Close</p>
          </div>
          <li>
          <Link href="/"><a className={styles.mainTitle} onClick={() => menuFunction()}>ホーム</a></Link>
          </li>
          <li>
          <Link href="/about"><a className={styles.mainTitle} onClick={() => menuFunction()}>Kiwamiとは</a></Link>
          </li>
          <li>
          <Link href="/mypage"><a className={styles.mainTitle} onClick={() => menuFunction()}>マイページ</a></Link>
          </li>
          <li>
          { user.uid ? (
          <Link href="/login"><a className={styles.mainTitle} onClick={() => {menuFunction(); auth.signOut()}}>ログアウト</a></Link>
          ) : (
          <Link href="/login"><a className={styles.mainTitle} onClick={() => menuFunction()}>ログイン/新規登録</a></Link>
          )}
          </li>
        </ul>
      </div>
      </>
  );
}

export default Navbar;
