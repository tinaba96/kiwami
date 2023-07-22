import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const NotFound = () => {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      // router.go(-1)
      // router.go(1)
      router.push('/')
    }, 3333)
  }, [])

  return (
    <div className="not-found">
      <h1>申し訳ありません。。。</h1>
      <h2>ページが見つかりません。</h2>
      <p>３秒後に<Link href="/"><a>トップページ</a></Link>へ戻ります。</p>
    </div>
  );
}

export default NotFound;
