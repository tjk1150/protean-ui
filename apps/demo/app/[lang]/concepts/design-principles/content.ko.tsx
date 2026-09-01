import Link from 'next/link'

export default function DesignPrinciplesKo() {
  return (
    <div className="doc" lang="ko">
      <h1>설계 원리</h1>
      <p className="lede">
        &quot;그냥 media query를 컴포넌트로 감싼 것 아닌가요?&quot;라는 질문에 답하는
        페이지예요. Protean이 어떤 층으로 이루어져 있고, breakpoint 방식과 무엇이
        구조적으로 다른지 설명해요.
      </p>

      <h2>네 개의 층</h2>
      <p>Protean은 한 방향으로 흐르는 파이프라인이에요.</p>
      <div className="tableWrap">
        <table>
          <thead><tr><th>층</th><th>하는 일</th><th>사는 곳</th></tr></thead>
          <tbody>
            <tr><td>인지</td><td>환경 신호(화면 폭, 포인터 종류, 호버 가능 여부)를 어휘로 바꿔요. 결과는 &#123;size, input&#125; 같은 트레이트예요.</td><td>@protean-ui/core</td></tr>
            <tr><td>판단</td><td>(역할, 트레이트)를 규칙에 대입해서 Decision 값을 만들어요. React도 DOM도 없는 순수 함수예요.</td><td>@protean-ui/core</td></tr>
            <tr><td>실행</td><td>정해진 모습을 그려요. 포커스 이동, ESC 닫기, ARIA는 Base UI에 맡겨요.</td><td>@protean-ui/react</td></tr>
            <tr><td>표현</td><td>data 속성만 남겨요. 색과 모양은 여러분의 CSS(또는 참고 스타일시트)가 정해요.</td><td>여러분의 CSS</td></tr>
          </tbody>
        </table>
      </div>
      <div className="callout">
        <strong>판단 층이 심장이에요.</strong> 기본 규칙 전체가 25줄짜리 순수 함수
        객체이고, 통째로 갈아끼울 수 있어요. breakpoint 방식에서는 이 &quot;의견&quot;이
        앱 전체의 CSS와 조건문에 흩어져 있어서 꺼내 볼 수도, 바꿔 낄 수도 없어요.
      </div>

      <h2>버튼 한 번 누르면 일어나는 일</h2>
      <pre><code>{`<Dialog.Root role="confirmation">   // 앱이 아는 전부: "이건 확인 대화"

사용자가 트리거를 눌러요
  → 환경을 읽어요          { size: "expanded", input: "pointer" }     [인지]
  → 규칙에 대입해요        인스턴스 지정? 없음 → 프로젝트 규칙? 위임
                           → 기본 규칙: "작은 화면+터치면 시트, 아니면 모달"
  → Decision이 나와요      { presentation: "modal", source: "pack" }  [판단]
  → 모달로 열어요          포커스·ESC·ARIA는 Base UI가 처리          [실행]
  → data-presentation="modal"  여러분의 CSS가 모양을 입혀요           [표현]`}</code></pre>
      <p>
        같은 코드를 폰에서 실행하면 인지가 <code>&#123; size: &quot;compact&quot;, input:
        &quot;touch&quot; &#125;</code>를 내놓고, 판단이 시트를 고르고, 실행이 바텀
        시트를 띄워요. 앱 코드에는 여전히 breakpoint가 하나도 없어요.
      </p>

      <h2>결정에는 &quot;시점&quot;이 있어요</h2>
      <p>
        서버는 사용자의 화면 폭을 몰라요. 그래서 Protean에는 원칙이 하나 있어요.
      </p>
      <div className="callout">
        서버가 틀릴 수 있는 결정은, CSS로 표현할 수 있거나 상호작용 시점으로 미뤄져야
        해요.
      </div>
      <ul>
        <li>
          <strong>다이얼로그와 셀렉트는 여는 순간 결정해요.</strong> 닫혀 있는 동안은
          결정 자체가 없어서 서버 HTML에 오버레이가 0바이트예요. 서버는 틀릴 기회가
          없어요. 열려 있는 동안은 결정을 고정해서, 창 크기를 바꿔도 사용 중인 UI가
          갑자기 갈아엎어지지 않아요.
        </li>
        <li>
          <strong>내비게이션과 화면 뼈대는 미룰 수 없어요.</strong> 항상 보이니까요.
          대신 네 가지 모습이 전부 같은 HTML이고, 첫 그림은 CSS가 정해요. 서버가
          무엇을 보내든 마크업이 같으니 틀릴 수 없고, 화면이 밀리지 않고, JavaScript
          없이도 동작해요.
        </li>
      </ul>
      <p>
        이 규율 덕분에 hydration 불일치와 첫 화면 깜빡임이 &quot;열심히 고친 버그&quot;가
        아니라 <strong>&quot;구조적으로 생길 수 없는 버그&quot;</strong>가 돼요. 자세한
        내용은 <Link href="/ko/concepts/ssr">서버 렌더링</Link>에 있어요.
      </p>

      <h2>breakpoint 방식과 무엇이 다른가요?</h2>
      <ol>
        <li>
          <strong>바뀌는 단위가 달라요.</strong> media query는 같은 패턴의 CSS 속성을
          바꿔요. Protean은 패턴 자체를 바꿔요. 팝오버와 전체 화면 다이얼로그는 DOM
          구조, 포커스 규칙, 닫기 방식, ARIA 역할이 다른 별개의 물건이라서 CSS만으로는
          오갈 수 없어요.
        </li>
        <li>
          <strong>결정의 시점이 있어요.</strong> media query는 항상 켜져 있는 선언이라
          &quot;언제&quot;라는 개념이 없어요. <code>isMobile ? &lt;Sheet/&gt; :
          &lt;Dialog/&gt;</code> 레시피가 서버 렌더링에서 깜빡이는 이유가 그거예요.
        </li>
        <li>
          <strong>결정이 값이에요.</strong> 누가 정했는지 추적되고(<code>source</code>),
          한 줄로 설명되고(<code>explain</code>), 렌더링 없이 테스트되고, DOM에
          찍혀요. media query에게는 &quot;왜 지금 이 모습이야?&quot;를 물을 수 없어요.
        </li>
        <li>
          <strong>호출부는 의미만 말해요.</strong> <code>role=&quot;confirmation&quot;</code>이
          호출부에 있고, 그게 무엇이 될지는 규칙 파일 한 곳에 있어요. 나중에 새 판단
          기준(컨테이너 크기, 가상 키보드, 폴더블)이 생겨도 인지와 판단 층만 바뀌고
          호출부는 전부 그대로예요. breakpoint 방식은 기준이 하나 늘 때마다 모든
          호출부에 조건이 곱해져요.
        </li>
      </ol>

      <h2>값은 모습을 따라가요</h2>
      <p>
        화면이 좁아졌다고 radius를 24에서 16으로 &quot;보정&quot;하지 않아요. 대신 UI의
        역할이 바뀔 때 값의 정책이 함께 바뀌어요. 다이얼로그가 전체 화면이 되면 더는
        떠 있는 카드가 아니니 모서리가 없어지고, 바텀 시트가 되면 바닥에 붙으니 위쪽
        모서리만 둥글어요. 참고 스타일시트에는 radius를 바꾸는 media query가 단 하나도
        없어요. 값은 전부 presentation에 붙어 있어요. 쓰는 방법은{' '}
        <Link href="/ko/getting-started">시작하기의 &quot;모양 입히기&quot;</Link>에
        있어요.
      </p>

      <h2>기본 규칙이 지금 보는 것, 안 보는 것</h2>
      <p>정직하게 적어 둘게요. 현재 판단에 쓰이는 기준은 두 축이에요.</p>
      <ul>
        <li>화면 크기: compact(600px 미만) · medium · expanded(840px 이상)</li>
        <li>입력 수단: touch · pointer · hybrid</li>
      </ul>
      <p>
        그리고 기본 규칙(app-first)은 입력 수단을 <strong>compact에서만</strong>{' '}
        따져요. 중간 크기 이상에서는 터치 태블릿과 마우스 데스크톱이 같은 패턴을
        받아요(터치 타깃 크기 같은 차이는 CSS 몫이에요). 이건 버그가 아니라 결정이에요.
        실제 기기에서 검증하지 못한 추측성 규칙을 기본값에 넣지 않는다는 원칙이고,
        태블릿 분화·컨테이너 단위 판단·가상 키보드 트레이트는 로드맵에 있어요. 규칙이
        1급 API라서, 이런 축이 추가될 때 여러분의 호출부는 한 줄도 바뀌지 않아요.
      </p>

      <p>
        다음: <Link href="/ko/why">왜 만들었나요</Link>에서 이 구조가 겨냥하는 더 큰
        그림을 볼 수 있어요.
      </p>
    </div>
  )
}
