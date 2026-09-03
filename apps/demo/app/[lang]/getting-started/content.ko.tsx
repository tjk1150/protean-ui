import Link from 'next/link'

export default function GettingStartedKo() {
  return (
    <div className="doc" lang="ko">
      <h1>10분 시작하기</h1>
      <p className="lede">
        설치하고 첫 Dialog를 띄워볼게요. 별도의 Provider나 설정 파일 없이 바로
        시작할 수 있어요.
      </p>

      <h2>1. 설치하기</h2>
      <pre><code>{`npm install @protean-ui/react`}</code></pre>
      <p>
        Protean의 공식 React 패키지는 <code>@protean-ui/react</code>예요.
        컴포넌트에 필요한 동작과 접근성 기반도 함께 설치되기 때문에 별도로 연결할
        패키지는 없어요.
      </p>
      <div className="callout">
        <strong>아직 pre-alpha예요.</strong> 현재는 <code>0.1.0-alpha.x</code>{' '}
        단계라 API가 바뀔 수 있어요. 실제 제품에서 사용한다면 버전을 고정해
        주세요.
      </div>

      <h2>2. 기본 스타일 불러오기</h2>
      <p>
        Protean은 동작만 사용할 수도 있지만, 처음에는 제공되는 참고 스타일을 함께
        불러오는 게 가장 간단해요. 앱의 진입 파일에 한 줄 추가해 주세요.
      </p>
      <pre><code>{`import "@protean-ui/react/reference.css";`}</code></pre>
      <p>
        Dialog, Select, Menu처럼 떠서 열리는 컴포넌트에 기본 스타일이 적용돼요.
        나중에 서비스 디자인에 맞게 바꿀 수 있으니, 지금은 그대로 시작하면 돼요.
      </p>

      <h2>3. 첫 Dialog 만들기</h2>
      <p>이제 컴포넌트를 하나 만들어볼게요.</p>
      <pre><code>{`import { Dialog } from "@protean-ui/react";

export default function App() {
  return (
    <Dialog.Root role="form">
      <Dialog.Trigger>배송지 수정</Dialog.Trigger>
      <Dialog.Content title="배송지 수정">
        <label>
          주소
          <input placeholder="주소를 입력하세요" />
        </label>
        <Dialog.Close>완료</Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
}`}</code></pre>
      <p>
        여기서 Protean에게 알려준 건 <code>role=&quot;form&quot;</code> 하나예요.
        &quot;이 Dialog는 입력 폼이에요&quot;라는 의미예요. 어떻게 열지는 직접
        지정하지 않았어요.
      </p>

      <h2>4. 실행해 보세요</h2>
      <p>같은 Dialog라도 환경에 따라 자연스러운 모습으로 열려요.</p>
      <div className="tableWrap">
        <table>
          <thead>
            <tr><th>사용 환경</th><th>결과</th></tr>
          </thead>
          <tbody>
            <tr><td>데스크톱 + 마우스</td><td>모달</td></tr>
            <tr><td>작은 화면 + 터치</td><td>전체 화면</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        직접 <code>isMobile</code>을 만들거나 Modal과 Fullscreen 컴포넌트를 따로
        작성하지 않아도 돼요. 창 크기와 입력 환경이 달라지면 Protean이 기본 규칙에
        따라 알맞은 모습을 선택해요. 어떤 기준으로 선택하는지는 다음 문서인{' '}
        <Link href="/ko/concepts/pattern-adaptation">패턴 적응</Link>에서
        설명할게요.
      </p>

      <h2>레이아웃 컴포넌트도 사용할 건가요?</h2>
      <p>여기까지는 Dialog를 사용하는 데 필요하지 않아요.</p>
      <p>
        나중에 <code>Screen</code>, <code>Navigation</code>, <code>Actions</code>{' '}
        같은 페이지 레이아웃 컴포넌트의 참고 스타일도 사용하고 싶다면 앱을 감싸는
        요소에 <code>protean-defaults</code> 클래스를 추가해 주세요.
      </p>
      <pre><code>{`<body className="protean-defaults">
  <App />
</body>`}</code></pre>
      <p>
        레이아웃 스타일은 기존 앱 전체에 영향을 줄 수 있기 때문에 자동으로
        적용하지 않고 직접 켜도록 되어 있어요. 처음 Dialog만 시험해 보는 중이라면
        이 단계는 건너뛰어도 돼요.
      </p>

      <h2>다 됐어요</h2>
      <p>여기까지가 Protean을 시작하는 데 필요한 전부예요.</p>
      <pre><code>{`설치
  ↓
reference.css
  ↓
컴포넌트의 역할 선언
  ↓
Protean이 상황에 맞는 UI 선택`}</code></pre>
      <p>처음부터 설정 파일을 만들거나 반응형 분기를 작성할 필요는 없어요.</p>
      <p>
        다음에는 Protean이 왜 화면 너비 하나만 보지 않는지, 그리고 같은 컴포넌트를
        어떤 기준으로 다른 UI 패턴으로 보여주는지{' '}
        <Link href="/ko/concepts/pattern-adaptation">패턴 적응</Link>에서
        알아볼게요. 기본 결과를 우리 서비스에 맞게 바꾸고 싶다면 나중에{' '}
        <Link href="/ko/guides/customize-decisions">결과 맞춤 설정</Link>을 보면
        돼요.
      </p>
    </div>
  )
}
