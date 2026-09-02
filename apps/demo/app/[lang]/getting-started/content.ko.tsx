import Link from 'next/link'

export default function GettingStartedKo() {
  return (
    <div className="doc" lang="ko">
      <h1>10분 시작하기</h1>
      <p className="lede">
        10분이면 첫 다이얼로그를 띄울 수 있어요. pre-alpha지만 npm에 올라가 있어서
        설치는 한 줄이에요.
      </p>

      <h2>1. 설치하기</h2>
      <pre><code>{`npm install @protean-ui/react`}</code></pre>
      <p>
        행동을 맡는 Base UI는 함께 설치돼요. 컴파일된 파일과 타입이 배포되기 때문에
        번들러 설정이나 Next.js 설정은 아무것도 필요 없어요. 공식 진입점은 이 패키지
        하나예요 - 설치, 임포트, CSS까지 전부 같은 이름이라 헷갈릴 곳이 없어요.
      </p>
      <div className="callout">
        <strong>버전에 대해:</strong> 지금은 <code>0.1.0-alpha.x</code>예요. API가 예고
        없이 바뀔 수 있는 단계라, 제품에 쓰기 전에는 버전을 고정해 두세요.
      </div>

      <h2>2. 첫 다이얼로그 띄우기</h2>
      <p>설정할 것이 없어요. 불러와서 바로 쓰면 기본 규칙이 적용돼요.</p>
      <pre><code>{`import { Dialog } from "@protean-ui/react";

<Dialog.Root role="form">
  <Dialog.Trigger>배송지 수정</Dialog.Trigger>
  <Dialog.Content title="배송지 수정">
    <AddressForm />
  </Dialog.Content>
</Dialog.Root>`}</code></pre>
      <p>버튼을 누르면 이런 일이 일어나요.</p>
      <ol>
        <li>여는 순간, 지금 환경(화면 크기 + 입력 수단)을 읽어요.</li>
        <li>규칙에 대입해요. &quot;입력 폼이고, 폰이면 전체 화면. 아니면 모달.&quot;</li>
        <li>정해진 모습으로 열어요. 포커스 이동, ESC 닫기, 접근성 연결까지 함께요.</li>
      </ol>
      <p>
        열려 있는 동안에는 창 크기가 바뀌어도 모습을 유지해요. 사용 중에 UI가 갑자기
        바뀌면 당황스러우니까요. 다음에 열 때 다시 판단해요.
      </p>

      <h2>3. 모양 입히기</h2>
      <p>
        Protean은 색이나 모양을 강요하지 않지만, 바로 쓸 수 있는 참고 스타일시트를
        함께 제공해요. 한 줄 불러오면 다이얼로그 같은 팝업들은 바로 봐줄 만한 모습이
        나와요.
      </p>
      <pre><code>{`import "@protean-ui/react/reference.css";`}</code></pre>
      <p>
        화면 골격을 잡는 컴포넌트들(Screen, Navigation, Actions 같은)은 한 가지가 더
        필요해요. 앱을 감싸는 요소에 <code>protean-defaults</code> 클래스를 붙여야
        기본 모습이 적용돼요 - 여러분의 앱 전체 스타일과 충돌하지 않게 opt-in으로
        만들어 둔 거예요.
      </p>
      <pre><code>{`<body className="protean-defaults">
  <App />
</body>`}</code></pre>
      <p>우리 팀 디자인이 있으면 토큰만 덮어쓰거나 파일째 복사해서 고치면 돼요.</p>
      <pre><code>{`/* 우리 팀 색으로 바꾸기 - 토큰만 덮어쓰면 돼요 */
:root {
  --protean-surface: #ffffff;
  --protean-accent: #3182f6;
}

/* 모달 모서리만 바꾸기 - 값은 모습(presentation)에 붙어 있어요 */
[data-presentation="modal"] {
  --protean-shape: 20px;
}`}</code></pre>
      <p>
        이 파일의 원칙은 하나예요. <strong>값은 화면 폭이 아니라 모습을 따라가요.</strong>{' '}
        시트는 위쪽 모서리만 둥글고, 전체 화면은 모서리가 없고, 모달은 네 모서리가
        둥글어요. 그리고 참고 스타일이 전부 <code>@layer</code> 안에 있어서, 레이어
        없이 쓰는 여러분의 CSS가 언제나 이겨요.
      </p>
      <p>
        구조까지 전부 직접 쓰고 싶은 팀은 어휘만 가져갈 수도 있어요.{' '}
        <code>@protean-ui/css/tokens.css</code>는 토큰 계약만 담은 파일이에요 - 모습별
        모서리 · 여백 · 모션에, 색 · 스크림 · 위험 색 · 탭 타깃 같은 전역 값까지요.
        이걸 불러오고 나머지 CSS는 처음부터 쓰면 돼요.
      </p>

      <h2>다 됐어요</h2>
      <p>
        여기까지가 시작의 전부예요. 창을 줄여 보고, 데스크톱과 폰에서 같은 버튼을
        눌러 보세요. 기본 규칙이 우리 서비스와 안 맞으면 규칙을 프로젝트 파일로
        가져와 바꿀 수 있는데, 그 방법은 먼저{' '}
        <Link href="/ko/concepts/pattern-adaptation">상황에 맞는 패턴 선택</Link>을
        읽고 나서 <Link href="/ko/guides/customize-decisions">적응 결과 맞춤 설정</Link>
        에서 보는 게 순서예요.
      </p>
    </div>
  )
}
