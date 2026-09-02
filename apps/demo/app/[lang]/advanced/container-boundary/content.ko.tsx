import Link from 'next/link'

export default function BoundaryKo() {
  return (
    <div className="doc" lang="ko">
      <h1>Boundary</h1>
      <p className="lede">
        컨테이너 경계예요. 이걸로 감싼 영역 안의 오버레이는 화면 전체가 아니라{' '}
        <strong>그 패널의 폭</strong>으로 판정하고, 시트도 패널 자체의 바닥에서
        올라와요. 넓은 모니터의 좁은 사이드 패널이 &quot;작은 화면&quot;처럼 동작하게
        되는 거예요.
      </p>

      <pre><code>{`import { ProteanBoundary } from "@protean-ui/react";

<ProteanBoundary className="sidePanel">
  {/* 이 안의 Dialog와 Select는 sidePanel의 폭으로 판정해요 */}
  <Dialog.Root role="form">...</Dialog.Root>
</ProteanBoundary>`}</code></pre>

      <div className="callout">
        <Link href="/boundary-demo">컨테이너 경계 데모</Link>에서 직접 확인해 보세요.
        같은 다이얼로그가 페이지에서는 모달로, 420px 패널 안에서는 시트로 열려요 -
        같은 창, 같은 규칙인데 선언한 위치만 다른 거예요.
      </div>

      <h2>무엇이 달라지나요</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>항목</th><th>경계 안에서의 동작</th></tr></thead>
          <tbody>
            <tr><td>크기 판정</td><td>여는 순간 패널의 폭을 재서 compact · medium · expanded를 정해요. 임계값은 뷰포트와 같아요(600 / 840).</td></tr>
            <tr><td>모달 · 풀스크린 · 시트</td><td>패널 안으로 렌더돼요. 시트는 패널 바닥에서 올라오고, 스크림도 패널만 덮고, 풀스크린은 패널을 가득 채워요.</td></tr>
            <tr><td>팝오버</td><td>일부러 문서 레벨에 남겨요. 트리거에 붙는 위치 계산이라 패널에 가두면 잘릴 수 있거든요.</td></tr>
            <tr><td>내비게이션 · 화면 뼈대</td><td>영향받지 않아요. 항상 보이는 크롬의 컨테이너 적응은 CSS 컨테이너 쿼리의 몫이에요.</td></tr>
          </tbody>
        </table>
      </div>

      <h2>서버 렌더링이 안전한 이유</h2>
      <p>
        오버레이는 여는 순간 결정하니까, 컨테이너 측정도 그 순간에 하면 돼요. 서버는
        패널의 크기를 알 필요가 전혀 없고, hydration이 어긋날 것도 없어요. 측정할 수
        없는 경우(폭이 0이거나 아직 그려지지 않았을 때)는 뷰포트 판정으로 조용히
        물러나요.
      </p>

      <h2>속성</h2>
      <p>
        div의 모든 속성을 그대로 받아요(className, style 등). 루트에{' '}
        <code>data-scope=&quot;boundary&quot;</code>가 찍히고, 참고 스타일시트가 이
        요소를 <code>position: relative</code>로 만들어서 안쪽 오버레이의 기준이 되게
        해요. 경계 안으로 들어온 오버레이 조각에는 <code>data-contained</code>가 함께
        찍혀서, 원하는 CSS로 구분해 스타일할 수 있어요.
      </p>

      <h2>어디에 쓰나요</h2>
      <ul>
        <li>마스터-디테일 화면의 디테일 패널 - 패널 안 편집 다이얼로그가 패널 규모에 맞게 열려요.</li>
        <li>대시보드의 위젯이나 사이드 인스펙터 - 위젯 안 셀렉트가 화면이 아니라 위젯 기준으로 동작해요.</li>
        <li>임베드되는 화면 - 우리 UI가 남의 페이지 어디에 놓이든 자기 크기에 맞게 행동해요.</li>
      </ul>
    </div>
  )
}
