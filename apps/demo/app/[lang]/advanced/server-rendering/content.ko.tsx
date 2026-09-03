import Link from 'next/link'

export default function SsrKo() {
  return (
    <div className="doc" lang="ko">
      <h1>서버는 화면 크기를 모르는데 어떻게 올바른 UI를 보여줄까요?</h1>
      <p className="lede">
        서버에서는 <code>window.innerWidth</code>도, pointer도, hover도 읽을 수
        없어요. 아직 실제 브라우저가 없기 때문이에요. 그런데 Protean의 일부 UI는
        이런 환경에 따라 결과가 달라져요. 그렇다면 서버가 모바일인지 데스크톱인지
        먼저 추측해야 할까요? Protean은 모든 컴포넌트에 같은 방법을 쓰지 않아요.
        UI의 성격에 따라 전략을 나눠요.
      </p>
      <pre><code>{`사용자가 나중에 여는 UI      → 실제로 열 때 판단
처음부터 화면에 있는 UI      → 같은 DOM 유지 + CSS로 첫 배치
보조 UI (Tooltip)           → hydration 뒤 enhancement`}</code></pre>
      <p>
        <strong>서버가 실제 화면을 맞히게 만드는 게 아니라, 서버가 몰라도 괜찮은
        구조를 만들어요.</strong> 이 구분이 이 페이지의 전부예요.
      </p>

      <h2>1. 서버에서는 기본 환경값을 사용해요</h2>
      <p>
        브라우저 환경을 아직 알 수 없을 때 Protean은 <code>ssrTraits</code>를
        사용해요. 기본값은 다음과 같아요.
      </p>
      <pre><code>{`{
  size: "compact",
  input: "touch",
  hover: false,
  reducedMotion: false,
  virtualKeyboard: false
}`}</code></pre>
      <p>
        이 값은 <code>defaultSsrTraits</code>로 import할 수 있어요. &quot;모든
        사용자는 compact touch예요&quot;라는 판단이 아니라,{' '}
        <strong>서버에서 실제 환경이 아직 없을 때 사용하는 fallback</strong>
        이에요.
      </p>
      <h3>서버와 첫 hydration은 같은 snapshot을 사용해요</h3>
      <p>
        <code>useTraits()</code>를 사용하는 컴포넌트는 서버에서{' '}
        <code>ssrTraits</code>를 읽고, hydration의 첫 snapshot에서도 같은 값을
        사용해요. 브라우저 환경은 hydration 이후 실제 환경 store에 반영돼요.
      </p>
      <pre><code>{`서버 렌더              → ssrTraits
클라이언트 hydration    → 같은 ssrTraits
hydration 이후         → 실제 브라우저 환경`}</code></pre>

      <h2>2. Dialog · Select · Menu는 가능하면 열 때 판단해요</h2>
      <p>
        Overlay는 보통 페이지가 처음 렌더링될 때 닫혀 있어요. 이때 modal일지
        sheet일지 결정할 이유가 없어요. 사용자가 실제로 버튼을 누를 때 현재
        환경을 읽고 결과를 선택하면 돼요.
      </p>
      <pre><code>{`서버          → 닫힌 Dialog 구조 렌더 (팝업 마크업 없음)
hydration     → 브라우저 환경 준비
사용자가 열기  → 지금 traits 읽기 → presentation 결정`}</code></pre>
      <p>서버가 보낸 HTML에 다이얼로그 마크업이 아예 없다는 건 직접 확인할 수 있어요.</p>
      <pre><code>{`curl -s <이 사이트 주소>/ssr-proof | grep -c 'data-part="popup"'
# 결과: 0  (서버 HTML에 다이얼로그가 0개)`}</code></pre>
      <p>
        이 방식은 <Link href="/ko/advanced/container-boundary">Boundary</Link>{' '}
        안에서도 중요해요. 서버는 Boundary의 실제 폭을 모르지만, 사용자가
        Overlay를 열 때는 브라우저에 실제 레이아웃이 있으므로 그 순간 폭을 읽을
        수 있어요. Overlay는 원래 상호작용 뒤에 나타나는 UI라서 이 방법이
        가능해요 - <strong>열 때 실제 환경을 본다</strong>면 충분해요.
      </p>

      <h2>3. 처음부터 보이는 UI는 같은 DOM을 유지해요</h2>
      <p>
        Navigation은 페이지가 나타나는 순간부터 보여야 해요. 서버가
        데스크톱이라고 추측해서 사이드바 트리를 만들고, 브라우저에서 모바일로
        밝혀지면 DOM 전체를 교체하는 방식을 사용하지 않아요. 서버와 브라우저 모두
        같은 Navigation 구조 하나를 사용하고, <code>bar</code> ·{' '}
        <code>drawer</code> · <code>rail</code> · <code>sidebar</code>마다 별도
        React tree를 만들지 않아요.
      </p>
      <h3>CSS는 hydration을 기다릴 필요가 없어요</h3>
      <p>
        브라우저는 JavaScript hydration이 끝나기 전에도 CSS 미디어쿼리를 평가할
        수 있어요. 그래서 참고 스타일은 Navigation 같은 화면 chrome의 실제 배치를
        CSS에서 처리해요.
      </p>
      <pre><code>{`@media (width < 600px) and (pointer: coarse) { /* bottom bar */ }
@media (600px <= width < 840px)               { /* rail */ }
@media (width >= 840px)                       { /* sidebar */ }`}</code></pre>
      <p>
        즉 서버가 실제 viewport를 몰라도{' '}
        <strong>첫 시각적 레이아웃은 CSS가 브라우저에서 바로 처리해요.</strong>
      </p>
      <h3>data-presentation과 실제 레이아웃은 같은 계층이 아니에요</h3>
      <p>
        서버에서는 기본 ssrTraits 때문에 Navigation의 판단이 예를 들어{' '}
        <code>bar</code>일 수 있어요. 하지만 실제 브라우저가 넓은 화면이라면 참고
        CSS는 hydration을 기다리지 않고 넓은 화면 레이아웃을 표현해요. hydration
        이후 실제 traits가 반영되면 판단과 <code>data-presentation</code>도 현재
        환경에 맞춰 갱신돼요. 앞 페이지들에서 본 데이터 계약 그대로 -{' '}
        <strong>판단과 CSS 표현이 역할을 나눠 가져요.</strong>
      </p>
      <h3>ListDetail과 PrimaryAction도 같은 방향이에요</h3>
      <p>
        ListDetail은 모바일용 트리와 데스크톱용 트리를 따로 만들지 않고 항상 같은
        List + Detail 구조를 유지해요. 어떤 상세가 활성화됐는지는{' '}
        <code>detailActive</code>로 앱이 직접 알려주기 때문에 서버도 그 상태를
        알아요. PrimaryAction도 같은 wrapper + button 구조를 유지하고, 하단
        영역인지 inline인지는 참고 CSS가 실제 환경을 보고 표현해요. Screen ·
        Actions · SupportingPane처럼 판단 자체가 없는 컴포넌트는 더 단순해요 -
        서버에서도 같은 구조를 렌더링하고 반응형 표현을 CSS에 맡겨요.
      </p>

      <h2>4. Tooltip은 특별하게 처리해요</h2>
      <p>
        Tooltip의 판단에는 hover 가능 여부가 필요한데 서버는 이걸 알 수 없어요.
        그래서 Tooltip은 서버와 hydration 첫 화면에서{' '}
        <strong>도움말 동작 자체를 아직 선택하지 않아요.</strong> mount 전에는
        개념적으로 일반 버튼만 남고, Content는 렌더링하지 않아요. 브라우저 mount
        이후 실제 hover 환경을 확인하고 그때 tooltip 또는 popover 동작을
        연결해요.
      </p>
      <div className="callout">
        그래서 <strong>중요한 정보를 Tooltip에만 넣으면 안 돼요.</strong> 단순한
        스타일 권고가 아니라, JavaScript가 아직 준비되지 않은 시점에는 Tooltip
        내용 자체가 존재하지 않을 수 있다는 구조적 사실이에요. 아이콘 버튼에는{' '}
        <code>aria-label</code>로 이름을 제공하고, 반드시 알아야 하는 정보는
        Tooltip 밖에서도 확인할 수 있게 하세요. Tooltip은{' '}
        <code>open</code>이나 <code>defaultOpen</code>을 줘도 mount 전에는 동작을
        만들지 않아요 - 아래 Dialog의 경우와는 다른 계약이에요.
      </div>

      <h2>5. ssrTraits는 언제 사용하나요?</h2>
      <p>
        서비스가 서버에서 <strong>신뢰할 수 있는 환경 힌트를 이미 가지고
        있다면</strong> 서버 fallback을 바꿀 수 있어요.
      </p>
      <pre><code>{`import { defaultSsrTraits, ProteanProvider } from "@protean-ui/react";

<ProteanProvider
  ssrTraits={{
    ...defaultSsrTraits,
    size: "expanded",
    input: "pointer",
    hover: true,
  }}
>
  <App />
</ProteanProvider>`}</code></pre>
      <p>
        <code>ssrTraits</code>는 부분 객체가 아니라 전체 traits를 받아서, 기본값을
        펼친 뒤 필요한 값만 바꾸는 방식이 편해요. 이 값은 SSR에서 사용할
        snapshot일 뿐이라 hydration 이후에는 실제 브라우저 환경이 사용돼요 -
        expanded를 주었다고 계속 expanded로 고정되지 않아요. 서버에서 확실하게 알
        수 없는 값을 억지로 추측해서 채울 필요는 없어요. 기본 fallback을 그대로
        사용하는 것도 정상적인 사용법이고, Protean이 UA 파싱 같은 추측 도구를
        공식 제공하지도 않아요.
      </p>
      <div className="callout">
        <code>ssrTraits</code>는 viewport 환경의 서버 fallback이에요.{' '}
        <code>ProteanBoundary</code> 각각의 컨테이너 폭을 전달하는 기능이
        아니에요 - 서버에는 CSS 레이아웃 결과가 없어서 그 값을 알 수 없어요.
        일반적인 닫힌 Overlay에서는 열 때 실제 폭을 읽으니 문제가 되지 않아요.
      </div>

      <h2>6. 처음부터 열린 Overlay는 주의하세요</h2>
      <p>
        일반적인 Overlay는 닫힌 상태로 서버 렌더링하고 사용자가 열 때 판단하는
        흐름이 가장 단순해요. 하지만 <code>defaultOpen</code>이나{' '}
        <code>open</code>으로 처음부터 열어두면 첫 렌더부터 형태가 필요해져요.
      </p>
      <p>
        이 경우 서버는 <code>ssrTraits</code>를 기준으로 판단하고, 브라우저는 첫
        렌더부터 실제 환경을 읽어 판단해요. 두 판단이 다를 수 있어요. 다만 팝업은
        Portal로 렌더링되기 때문에 서버 HTML에 팝업 마크업이 실리는 구조가
        아니라, 실제로는 <strong>hydration 후 브라우저의 실제 환경 기준으로
        팝업이 나타나는</strong> 동작에 가까워요. 첫 화면부터 반드시 특정 형태로
        보여야 하는 요구라면 다음 순서로 검토하세요.
      </p>
      <ul>
        <li>
          <strong>방법 1 - 가능하면 닫힌 상태로 시작하기.</strong> 사용자가 열 때
          실제 환경을 사용해요. 가장 단순해요.
        </li>
        <li>
          <strong>방법 2 - presentation을 명시하기.</strong>{' '}
          <code>presentation=&quot;modal&quot; defaultOpen</code>처럼 환경 판단
          자체를 없애면 서버와 브라우저가 같은 결과를 사용해요. 가장 확실해요.
        </li>
        <li>
          <strong>방법 3 - 신뢰할 수 있는 ssrTraits 제공하기.</strong> 다만
          이것도 실제 브라우저 레이아웃을 완전히 아는 것과 같지는 않아요.
        </li>
      </ul>
      <p>
        Select와 Menu의 <code>defaultOpen</code> / <code>open</code>도 같은
        원칙이에요.{' '}
        <strong>SSR 환경 추측을 지나치게 복잡하게 만드는 것보다 interaction-time
        판단이나 CSS를 우선하는 게 Protean의 기본 방향이에요.</strong>
      </p>

      <h2>Next.js에서 별도 설정이 필요한가요?</h2>
      <p>
        Protean의 환경 판단 컴포넌트와 <code>ProteanProvider</code>는 클라이언트
        동작을 포함해서, 이미 <code>&quot;use client&quot;</code> 경계를 스스로
        선언하고 있어요. Next.js App Router에서는 일반적인 Client Component
        경계를 따라 사용하면 되고, Protean 때문에 페이지 전체나 데이터 fetching
        구조를 클라이언트로 옮길 필요는 없어요.
      </p>

      <h2>SSR에서 확인할 체크리스트</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>상황</th><th>확인할 것</th></tr></thead>
          <tbody>
            <tr><td>일반 Dialog · Select · Menu</td><td>가능하면 닫힌 상태에서 시작</td></tr>
            <tr><td>처음부터 열린 Overlay</td><td>명시적 <code>presentation</code> 또는 <code>ssrTraits</code> 검토</td></tr>
            <tr><td>Navigation</td><td>환경별 DOM을 두 벌 만들지 않기</td></tr>
            <tr><td>ListDetail</td><td><code>detailActive</code>를 route/state에서 직접 전달</td></tr>
            <tr><td>PrimaryAction</td><td>실제 배치는 CSS가 담당</td></tr>
            <tr><td>Tooltip</td><td>중요한 정보를 Tooltip에만 넣지 않기</td></tr>
            <tr><td>Boundary</td><td>서버에서 컨테이너 폭을 알 수 있다고 가정하지 않기</td></tr>
            <tr><td>custom thresholds</td><td>참고 CSS 미디어쿼리와 별도로 관리된다는 점 확인</td></tr>
          </tbody>
        </table>
      </div>

      <h2>정리하면</h2>
      <p>
        서버는 실제 화면 크기를 몰라요. Protean은 그 사실을 억지로 없애려고 하지
        않고, UI의 성격에 따라 서버가 몰라도 되는 구조를 사용해요.
      </p>
      <pre><code>{`Overlay          → 사용자가 열 때 실제 환경에서 판단
항상 보이는 UI    → 같은 DOM + CSS
Tooltip          → mount 뒤에 enhancement
서버 fallback     → ssrTraits`}</code></pre>
      <p>
        그래서 중요한 질문은 &quot;서버가 어떻게 완벽하게 기기를 맞히나요?&quot;가
        아니라 <strong>&quot;서버가 기기를 몰라도 안정적으로 렌더링할 수 있게
        어떻게 구조를 나누나요?&quot;</strong>예요. 다음은{' '}
        <Link href="/ko/guides/accessibility">접근성</Link>이에요.
      </p>
    </div>
  )
}
