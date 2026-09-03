import Link from 'next/link'
import { ActionsDemo } from './actions-demo'

export default function ActionsKo() {
  return (
    <div className="doc" lang="ko">
      <h1>Actions</h1>
      <p className="lede">
        수정, 공유, 다운로드, 삭제처럼 <strong>한 화면에 여러 작업 버튼이 함께
        있을 때</strong> 사용해요. 공간이 충분하면 모든 작업을 한 줄에 보여주고,
        작은 화면에서는 꼭 보여야 하는 작업은 그대로 두고 덜 중요한 작업만 더보기
        뒤로 보낼 수 있어요.
      </p>

      <div className="callout">
        <strong>CSS 중심 컴포넌트예요.</strong> Actions는 화면 크기를
        JavaScript로 측정해서 형태를 선택하지 않아요. 개발자가{' '}
        <code>secondary</code>로 작업의 우선순위를 표시하면, 참고 스타일이 현재
        공간에 맞춰 실제 표시 방식을 바꿔요.
      </div>

      <h2>직접 확인해 보세요</h2>
      <div className="example">
        <span className="exampleLabel">창을 600px보다 좁혀 보세요</span>
        <ActionsDemo
          labels={{ save: '저장', share: '공유', rename: '이름 변경', remove: '삭제' }}
          moreLabel="더보기"
          onPick="선택함"
        />
      </div>

      <h2>기본 사용법</h2>
      <p>문서 작업 도구 모음을 만들어볼게요.</p>
      <pre><code>{`<Actions.Root aria-label="문서 도구" moreLabel="더보기">
  <Actions.Item onClick={save}>저장</Actions.Item>
  <Actions.Item secondary onClick={duplicate}>복제</Actions.Item>
  <Actions.Item secondary onClick={download}>다운로드</Actions.Item>
</Actions.Root>`}</code></pre>
      <p>
        여기서 중요한 건 <code>secondary</code>예요. 이 표시는 &quot;공간이
        부족하다면 이 작업은 더보기 뒤로 이동해도 괜찮아요&quot;라는 의미예요.
        Protean이 작업 이름이나 클릭 횟수를 보고 중요도를 추측하지 않아요.
      </p>

      <h2>공간이 충분할 때</h2>
      <p>참고 스타일에서는 넓은 화면에서 모든 작업을 한 줄에 보여줘요.</p>
      <pre><code>{`[ 저장 ] [ 복제 ] [ 다운로드 ]`}</code></pre>
      <p>
        <code>secondary</code>가 붙어 있어도 공간이 충분하다면 그대로 보여요. 즉{' '}
        <code>secondary</code>는 &quot;항상 숨겨라&quot;가 아니라{' '}
        <strong>&quot;공간이 좁을 때 뒤로 물러나도 된다&quot;</strong>는 뜻이에요.
      </p>

      <h2>작은 화면에서는 보조 작업을 접어요</h2>
      <p>
        600px보다 좁은 화면에서는 참고 스타일이 <code>secondary</code> 항목을
        기본적으로 숨기고 더보기 버튼을 보여줘요.
      </p>
      <pre><code>{`[ 저장 ] [ 더보기 ]`}</code></pre>
      <p>더보기를 누르면 숨겨졌던 보조 작업이 나타나요.</p>
      <pre><code>{`[ 저장 ] [ 더보기 ]
[ 복제       ]
[ 다운로드   ]`}</code></pre>
      <p>
        보조 작업은 <strong>같은 Actions 영역 안에서 펼쳐져요.</strong> 별도의
        Dialog나 Menu Portal을 새로 만드는 구조가 아니에요.
      </p>

      <h3>어떤 작업을 숨길지는 앱이 정해요</h3>
      <p>
        &quot;무엇이 부차적인가&quot;는 환경이 아니라 의미의 문제라서, Actions가
        자동으로 판단하지 않고 앱이 직접 구분해요.
      </p>
      <pre><code>{`앱      → 어떤 작업이 항상 보여야 하는지 결정
Actions → secondary 정보를 마크업
CSS     → 작은 화면에서 secondary를 접어서 표현`}</code></pre>
      <p>
        표시가 환경과 무관해서 서버와 클라이언트의 마크업이 언제나 같아요.
      </p>

      <h2>더보기는 secondary가 있을 때만 생겨요</h2>
      <p>
        <code>Actions.Root</code>는 자식 중 <code>secondary</code> 항목이 있는지
        확인해요. 없다면 더보기 버튼을 만들지 않아요. 하나라도 있으면 더보기
        버튼이 함께 렌더링되고, 큰 화면에서는 참고 스타일이 이 버튼을 숨겨요.
      </p>
      <p>
        기본 라벨은 <code>More</code>예요. 한국어 서비스라면{' '}
        <code>moreLabel=&quot;더보기&quot;</code>처럼 서비스 언어에 맞는 이름을
        지정해 주세요.
      </p>

      <h2>보조 작업을 실행하면 다시 접혀요</h2>
      <p>
        작은 화면에서 더보기를 열고 보조 작업을 선택하면, 기본적으로 펼쳐진
        영역이 다시 닫혀요. 다만 <code>Actions.Item</code>의{' '}
        <code>onClick</code>에서 이벤트를 취소했다면 자동으로 닫지 않아요.
        일반적인 사용에서는 따로 신경 쓰지 않아도 돼요.
      </p>

      <h2>아이콘도 넣을 수 있어요</h2>
      <pre><code>{`<Actions.Item icon={<DownloadIcon />} onClick={download}>
  다운로드
</Actions.Item>`}</code></pre>
      <p>
        아이콘은 장식 요소로 처리되고, 실제 작업 이름은 <code>children</code>의
        텍스트가 담당해요. 아이콘만으로 의미를 전달하기보다 읽을 수 있는 이름도
        함께 제공하는 편이 좋아요.
      </p>

      <h2>위험한 작업 표시하기</h2>
      <pre><code>{`<Actions.Item destructive secondary onClick={remove}>
  삭제
</Actions.Item>`}</code></pre>
      <p>
        <code>destructive</code>는 <code>data-variant=&quot;danger&quot;</code>로
        표시돼요. Protean이 삭제 확인 절차까지 자동으로 만드는 건 아니에요. 실제
        확인 Dialog나 삭제 로직은 앱이 관리하고, <code>destructive</code>는
        스타일링에 사용할 의미만 남겨요.
      </p>

      <h2>Screen.Actions와는 무엇이 다른가요?</h2>
      <pre><code>{`Screen.Actions
→ 페이지 구조 안에서 작업 영역이 놓일 자리

Actions.Root
→ 여러 작업 버튼을 하나의 도구 모음으로 묶는 컴포넌트`}</code></pre>
      <p>같이 사용할 수도 있어요.</p>
      <pre><code>{`<Screen.Actions>
  <Actions.Root moreLabel="더보기">
    <Actions.Item>저장</Actions.Item>
    <Actions.Item secondary>복제</Actions.Item>
  </Actions.Root>
</Screen.Actions>`}</code></pre>
      <p>
        이 조합은 <Link href="/ko/guides/composition">함께 쓰기</Link>에서 실제
        화면 예제로 다시 설명해요.
      </p>

      <h2>같은 DOM 구조를 유지해요</h2>
      <p>Actions는 작은 화면용 Toolbar를 따로 렌더링하지 않아요. 실제 구조는 개념적으로:</p>
      <pre><code>{`<div role="toolbar" data-scope="actions">
  <button data-part="item">저장</button>
  <button data-part="item" data-secondary>다운로드</button>
  <button data-part="overflow-toggle" aria-expanded="false">
    더보기
  </button>
</div>`}</code></pre>
      <p>
        더보기가 열리면 Root에 <code>data-overflow-open</code>이 표시되고, CSS가
        이 상태를 보고 보조 항목을 보여줘요. 참고 반응형 스타일은 다른 레이아웃
        컴포넌트와 마찬가지로 <code>protean-defaults</code>를 켠 앱에서
        적용돼요.
      </p>

      <h2>Actions.Root</h2>
      <p>
        작업 도구 모음 전체를 감싸요. 실제 <code>&lt;div&gt;</code>로 렌더링되고{' '}
        <code>role=&quot;toolbar&quot;</code>가 적용돼요.
      </p>
      <div className="tableWrap">
        <table>
          <thead><tr><th>속성</th><th>설명</th></tr></thead>
          <tbody>
            <tr><td><code>moreLabel</code></td><td>더보기 버튼에 보여줄 이름이에요. 기본값은 <code>More</code>예요.</td></tr>
            <tr><td><code>children</code></td><td>작업 항목들이에요.</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        그 외 일반 <code>&lt;div&gt;</code> 속성도 사용할 수 있어요. 여러 도구
        모음이 있는 화면이라면 <code>aria-label</code>로 목적을 구분해 주세요.
      </p>

      <h2>Actions.Item</h2>
      <p>하나의 작업을 나타내는 실제 버튼이에요.</p>
      <div className="tableWrap">
        <table>
          <thead><tr><th>속성</th><th>설명</th></tr></thead>
          <tbody>
            <tr><td><code>secondary</code></td><td>작은 화면에서 더보기 뒤로 보낼 수 있는 작업임을 표시해요.</td></tr>
            <tr><td><code>destructive</code></td><td>위험한 작업임을 표시해요.</td></tr>
            <tr><td><code>icon</code></td><td>작업 아이콘이에요. 스크린 리더에는 숨겨져요.</td></tr>
            <tr><td><code>children</code></td><td>작업의 이름이에요.</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        그 외 일반 button 속성을 사용할 수 있어요. 실제 버튼의{' '}
        <code>type</code>은 <code>button</code>으로 고정돼요 - 폼의 주요 제출
        행동에는 <Link href="/ko/components/primary-action">PrimaryAction</Link>{' '}
        같은 구조가 더 적절해요.
      </p>

      <h2>접근성</h2>
      <p>
        <code>Actions.Root</code>는 <code>role=&quot;toolbar&quot;</code>로 여러
        작업이 하나의 묶음임을 나타내고, 각 항목과 더보기 버튼은 실제 버튼이에요.
        더보기 버튼은 열림 상태를 <code>aria-expanded</code>로 알려줘요. 기본
        버튼 키보드 동작과 toolbar 의미를 사용하는 구조예요. 제품 전체의 접근성
        원칙은 <Link href="/ko/guides/accessibility">접근성</Link> 페이지에서
        설명해요.
      </p>

      <h2>스타일을 바꾸고 싶다면</h2>
      <p>
        Root와 내부 요소에 CSS hook이 있고, 항목에는 상태(<code>data-secondary</code>,{' '}
        <code>data-variant=&quot;danger&quot;</code>)와 열림 상태(
        <code>data-overflow-open</code>)도 표시돼요.
      </p>
      <pre><code>{`[data-scope="actions"] [data-part="item"] {
  /* 기존 디자인 시스템 버튼 스타일 연결 */
}`}</code></pre>
      <p>
        패널 안에서 화면이 아니라 컨테이너 폭 기준으로 접고 싶다면, 같은 data
        속성에 CSS 컨테이너 쿼리를 쓰면 돼요. 구체적인 CSS hook 사용법은{' '}
        <Link href="/ko/guides/customize-decisions">결과 맞춤 설정</Link>에서 한
        번에 설명해요.
      </p>

      <h2>정리하면</h2>
      <p>
        Actions는 여러 버튼을 <strong>중요도에 따라 정리할 수 있는 도구
        모음</strong>이에요.
      </p>
      <pre><code>{`공간이 충분하면
저장 · 복제 · 다운로드

작은 화면에서는
저장 · 더보기`}</code></pre>
      <p>
        <strong>어떤 작업이 덜 중요한지는 앱이 표시하고, 좁을 때 어떻게 접을지는
        CSS가 처리해요.</strong> 다음은{' '}
        <Link href="/ko/layout/supporting-pane">SupportingPane</Link>이에요.
      </p>
    </div>
  )
}
