import Link from 'next/link'

export default function PatternAdaptationKo() {
  return (
    <div className="doc" lang="ko">
      <h1>상황에 맞는 패턴 선택</h1>
      <p className="lede">
        같은 &quot;확인 대화&quot;라도 데스크톱에서는 작은 모달이, 폰에서는 바텀
        시트가 맞아요. 이 선택을 앱 코드의 분기가 아니라 Protean이 하게 만드는 것 -
        그게 패턴 적응이에요. 이 페이지는 그 선택이 정확히 어떻게, 언제 일어나는지
        설명해요.
      </p>

      <h2>같은 의미, 다른 패턴</h2>
      <p>
        UI에는 의미가 있어요. &quot;되돌릴 수 없는 걸 확인받는 대화&quot;,
        &quot;주소를 입력받는 폼&quot;, &quot;항목에 딸린 부가 메뉴&quot;. 의미는
        환경이 바뀌어도 그대로인데, 그 의미를 <strong>어떤 UX 패턴으로 보여줄지</strong>는
        환경마다 달라요.
      </p>
      <div className="tableWrap">
        <table>
          <thead><tr><th>선언하는 의미</th><th>데스크톱 + 마우스</th><th>폰 + 터치</th></tr></thead>
          <tbody>
            <tr><td><code>role=&quot;confirmation&quot;</code> 확인 대화</td><td>가운데 모달</td><td>바텀 시트</td></tr>
            <tr><td><code>role=&quot;form&quot;</code> 입력 폼</td><td>가운데 모달</td><td>전체 화면</td></tr>
            <tr><td><code>role=&quot;contextual&quot;</code> 부가 메뉴</td><td>앵커 팝오버</td><td>바텀 시트</td></tr>
            <tr><td>내비게이션</td><td>사이드바</td><td>하단 탭 바</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        이 전환이 CSS로 안 되는 이유가 핵심이에요. 팝오버와 전체 화면 다이얼로그는
        폰트 크기가 다른 게 아니라 <strong>DOM 구조, 포커스 규칙, 닫는 방법, 접근성
        연결이 다른 별개의 물건</strong>이에요. 그래서 지금까지 모든 앱이{' '}
        <code>isMobile ? &lt;A/&gt; : &lt;B/&gt;</code>를 손으로 써 왔고, Protean은
        정확히 그 분기를 대신해요.
      </p>

      <h2>버튼 한 번 누르면 일어나는 일</h2>
      <pre><code>{`<Dialog.Root role="confirmation">   // 앱이 아는 전부: "이건 확인 대화"

사용자가 트리거를 눌러요
  → 환경을 읽어요       화면 크기 등급 + 입력 수단
  → 규칙에 대입해요     이 화면만의 지정? 없음 → 프로젝트 규칙? 위임
                        → 기본 규칙: "작은 화면 + 터치면 시트, 아니면 모달"
  → 모습이 정해져요     모달
  → 모달로 열어요       포커스 이동 · ESC 닫기 · 접근성 연결까지 함께
  → data-presentation="modal"   모양은 CSS가 입혀요`}</code></pre>
      <p>
        같은 코드를 폰에서 실행하면 읽히는 환경이 달라지고, 규칙이 시트를 고르고,
        바텀 시트가 떠요. 앱 코드에는 여전히 분기가 하나도 없어요.
      </p>

      <h2>결정에는 &quot;시점&quot;이 있어요</h2>
      <p>서버는 사용자의 화면 폭을 몰라요. 그래서 Protean에는 원칙이 하나 있어요.</p>
      <div className="callout">
        서버가 틀릴 수 있는 결정은, CSS로 표현할 수 있거나 상호작용 시점으로 미뤄져야
        해요.
      </div>
      <ul>
        <li>
          <strong>다이얼로그·셀렉트·메뉴는 여는 순간 결정해요.</strong> 닫혀 있는
          동안은 결정 자체가 없어서 서버 HTML에 오버레이가 0바이트예요. 서버는 틀릴
          기회가 없어요. 열려 있는 동안은 결정을 고정해서, 창 크기를 바꿔도 사용
          중인 UI가 갑자기 갈아엎어지지 않아요. 다음에 열 때 다시 판단해요.
        </li>
        <li>
          <strong>내비게이션과 화면 뼈대는 미룰 수 없어요.</strong> 항상 보이니까요.
          대신 네 가지 모습이 전부 같은 HTML이고, 첫 그림은 CSS가 정해요. 서버가
          무엇을 보내든 마크업이 같으니 첫 배치가 틀릴 수 없고, 화면이 밀리지
          않아요.
        </li>
      </ul>
      <p>
        이 규율의 결과는 <Link href="/ko/advanced/server-rendering">서버 렌더링</Link>
        에서 자세히 볼 수 있어요.
      </p>

      <h2>breakpoint 방식과 무엇이 다른가요?</h2>
      <ol>
        <li>
          <strong>바뀌는 단위가 달라요.</strong> media query는 같은 패턴의 CSS 속성을
          바꿔요. Protean은 패턴 자체를 바꿔요.
        </li>
        <li>
          <strong>결정의 시점이 있어요.</strong> media query는 항상 켜져 있는 선언이라
          &quot;언제&quot;라는 개념이 없어요. <code>isMobile ? &lt;Sheet/&gt; :
          &lt;Dialog/&gt;</code> 레시피가 서버 렌더링에서 깜빡이는 이유가 그거예요.
        </li>
        <li>
          <strong>결정이 값이에요.</strong> 판단의 재료(화면 등급과 입력 수단 - 이
          묶음을 <strong>트레이트</strong>라고 불러요)와 결과가 값으로 남아서, 누가
          정했는지 추적되고, 개발 모드 콘솔에 한 줄로 설명되고, 렌더링 없이
          테스트되고, DOM에 <code>data-presentation</code>으로 찍혀요. media
          query에게는 &quot;왜 지금 이 모습이야?&quot;를 물을 수 없어요.
        </li>
        <li>
          <strong>호출부는 의미만 말해요.</strong> <code>role=&quot;confirmation&quot;</code>이
          호출부에 있고, 그게 무엇이 될지는 규칙 한 곳에 있어요. 나중에 새 판단
          기준이 생겨도 호출부는 전부 그대로예요. breakpoint 방식은 기준이 하나 늘
          때마다 모든 호출부에 조건이 곱해져요.
        </li>
      </ol>

      <h2>값은 모습을 따라가요</h2>
      <p>
        화면이 좁아졌다고 radius를 24에서 16으로 &quot;보정&quot;하지 않아요. 대신
        UI의 역할이 바뀔 때 값의 정책이 함께 바뀌어요. 다이얼로그가 전체 화면이 되면
        더는 떠 있는 카드가 아니니 모서리가 없어지고, 바텀 시트가 되면 바닥에 붙으니
        위쪽 모서리만 둥글어요. 참고 스타일시트에는 radius를 바꾸는 media query가 단
        하나도 없어요 - 값은 전부 선택된 모습에 붙어 있어서, 모양을 위한 별도의
        결정은 필요하지 않아요. 행 높이와 탭 타깃처럼 <strong>같은 모습 안에서도</strong>{' '}
        갈리는 값은 별도의 결정이 맞고, 그게{' '}
        <Link href="/ko/concepts/density">밀도</Link>예요.
      </p>

      <h2>기본 규칙이 지금 보는 것, 안 보는 것</h2>
      <p>정직하게 적어 둘게요. 현재 판단에 쓰이거나 수집되는 재료는 이래요.</p>
      <ul>
        <li>화면 크기 등급: compact(600px 미만) · medium · expanded(840px 이상)</li>
        <li>입력 수단: touch · pointer · hybrid</li>
        <li>호버 가능 여부 - 힌트(툴팁)가 참조해요</li>
        <li>모션 축소 선호 - 수집돼요; 참고 스타일시트의 모션은 CSS 미디어쿼리가 직접 처리해요</li>
        <li>화면 키보드 여부 - 수집만 되고, 기본 규칙은 아직 쓰지 않아요</li>
      </ul>
      <p>
        기본 <strong>패턴</strong> 규칙은 입력 수단을 compact에서만 갈라요 - 중간
        크기 이상의 터치 태블릿과 마우스 데스크톱은 같은 패턴을 받아요. 실제
        기기에서 검증하지 못한 추측성 규칙을 기본값에 넣지 않는다는 원칙이고, 태블릿
        분화는 로드맵에 있어요. 반면 <strong>밀도</strong>와 <strong>힌트</strong>는
        크기와 무관하게 입력 수단을 봐요. 컨테이너 단위 판단은 오버레이에 한해
        배송됐어요 - <Link href="/ko/advanced/container-boundary">컨테이너 기준
        적응</Link>을 보세요. 규칙이 1급 API라서, 이런 축이 추가될 때 여러분의
        호출부는 한 줄도 바뀌지 않아요.
      </p>

      <p>
        다음: <Link href="/ko/concepts/density">밀도</Link>에서 두 번째 결정을,{' '}
        <Link href="/ko/guides/customize-decisions">적응 결과 맞춤 설정</Link>에서
        규칙을 내 것으로 만드는 법을 보세요.
      </p>
    </div>
  )
}
