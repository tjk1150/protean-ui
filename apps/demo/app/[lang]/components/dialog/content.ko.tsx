import Link from 'next/link'
import { ProteanCheckoutDialog } from '../../../delete-demo/protean-dialog'

export default function DialogKo() {
  return (
    <div className="doc" lang="ko">
      <h1>Dialog</h1>
      <p className="lede">
        확인, 입력, 간단한 옵션처럼 <strong>사용자의 작업을 잠시 별도 화면에
        보여줄 때</strong> 사용해요. Protean에서는 Dialog의 역할만 알려주면, 현재
        환경에 맞춰 모달 · 바텀 시트 · 팝오버 · 전체 화면 중 알맞은 형태를
        선택해요.
      </p>

      <h2>직접 확인해 보세요</h2>
      <div className="example">
        <span className="exampleLabel">창 크기와 입력 환경을 바꾼 뒤 Dialog를 다시 열어 보세요</span>
        <ProteanCheckoutDialog />
      </div>
      <p>같은 코드인데도 환경과 <code>role</code>에 따라 열리는 형태가 달라져요.</p>

      <h2>기본 사용법</h2>
      <p>입력 폼을 여는 Dialog예요.</p>
      <pre><code>{`<Dialog.Root role="form">
  <Dialog.Trigger>배송지 수정</Dialog.Trigger>
  <Dialog.Content title="배송지 수정">
    <AddressForm />
  </Dialog.Content>
</Dialog.Root>`}</code></pre>
      <p>
        여기서 중요한 건 <code>role=&quot;form&quot;</code>이에요. 앱은 &quot;이
        Dialog는 입력 폼이에요&quot;라고 알려주기만 해요. 모달로 열지, 전체
        화면으로 열지는 직접 분기하지 않아요.
      </p>

      <h2>역할에 따라 어떻게 달라지나요?</h2>
      <p><code>role</code>은 이 Dialog가 어떤 목적으로 사용되는지 알려줘요.</p>
      <div className="tableWrap">
        <table>
          <thead>
            <tr><th>role</th><th>이런 상황에 사용해요</th><th>작은 화면 + 터치</th><th>그 외</th></tr>
          </thead>
          <tbody>
            <tr><td><code>confirmation</code></td><td>확인 · 안내</td><td>바텀 시트</td><td>모달</td></tr>
            <tr><td><code>form</code></td><td>입력 폼</td><td>전체 화면</td><td>모달</td></tr>
            <tr><td><code>contextual</code></td><td>버튼 주변의 옵션 · 간단한 작업</td><td>바텀 시트</td><td>팝오버</td></tr>
          </tbody>
        </table>
      </div>
      <p>예를 들어 삭제 여부를 묻는 Dialog라면:</p>
      <pre><code>{`<Dialog.Root role="confirmation">
  ...
</Dialog.Root>`}</code></pre>
      <p>입력 항목이 많은 편집 화면이라면:</p>
      <pre><code>{`<Dialog.Root role="form">
  ...
</Dialog.Root>`}</code></pre>
      <p>처럼 의미에 맞는 역할을 선택하면 돼요.</p>

      <h2>왜 role을 사용하나요?</h2>
      <p>호출하는 곳에서 이렇게 작성할 수도 있어요.</p>
      <pre><code>{`isMobile ? <BottomSheet /> : <Modal />`}</code></pre>
      <p>
        하지만 이렇게 하면 어떤 형태를 보여줄지 앱 코드가 직접 결정하게 돼요.
        Protean에서는 대신 <code>role</code>로 <strong>Dialog가 무엇을 위한
        것인지</strong> 남겨요. 환경에 따른 기본 선택은 Protean이 맡아요. 이
        원리가 궁금하다면{' '}
        <Link href="/ko/concepts/pattern-adaptation">패턴 적응</Link>에서 자세히
        볼 수 있어요.
      </p>

      <h2>열린 뒤에는 갑자기 바뀌지 않아요</h2>
      <p>
        기본적으로 Dialog는 <strong>열리는 순간</strong> 현재 환경에 맞는 형태를
        선택해요. 한번 열리면 창 크기가 달라져도 닫을 때까지 그 형태를 유지해요.
        예를 들어 입력 중이던 전체 화면 Dialog가 갑자기 모달로 바뀌지 않아요.
      </p>
      <pre><code>{`열기
  ↓
현재 환경에서 형태 선택
  ↓
사용하는 동안 유지
  ↓
닫기`}</code></pre>
      <p>
        다음에 다시 열 때 현재 환경을 보고 새로 선택해요. 이 기본 동작을{' '}
        <code>pinned</code>라고 해요.
      </p>

      <h3>열려 있는 동안에도 바꾸고 싶다면</h3>
      <p>필요한 경우에는:</p>
      <pre><code>{`<Dialog.Root
  role="form"
  continuity="live"
>`}</code></pre>
      <p>
        처럼 <code>live</code>를 사용할 수 있어요. 이 경우 열린 상태에서도 환경이
        달라지면 새로운 형태로 전환할 수 있어요. Protean은 전환할 때 입력 중인
        값이나 React 상태가 사라지지 않도록 같은 Dialog의 연속성을 유지해요.
        일반적인 Dialog에서는 기본값인 <code>pinned</code>를 그대로 사용하는 걸
        권장해요. <a href="/continuity-demo">전환 연속성 데모</a>에서 직접 확인할
        수 있어요.
      </p>

      <h2>이 Dialog만 결과를 바꾸고 싶다면</h2>
      <p>
        기본 규칙과 다르게 특정 Dialog만 다른 형태로 보여줘야 할 수도 있어요.
        그럴 때는 <code>presentation</code>을 직접 지정할 수 있어요.
      </p>
      <pre><code>{`<Dialog.Root
  role="form"
  presentation="sheet"
>
  ...
</Dialog.Root>`}</code></pre>
      <p>
        이렇게 지정하면 이 Dialog에서는 기본 판단보다 직접 지정한 결과가 우선해요.
        모든 Dialog의 규칙을 바꾸고 싶은 경우에는 호출부마다{' '}
        <code>presentation</code>을 반복하지 말고{' '}
        <Link href="/ko/guides/customize-decisions">결과 맞춤 설정</Link>에서
        프로젝트 규칙을 변경하는 편이 좋아요.
      </p>

      <h2>Dialog.Root</h2>
      <p>Dialog 전체의 역할과 적응 방식을 설정해요.</p>
      <div className="tableWrap">
        <table>
          <thead><tr><th>속성</th><th>설명</th></tr></thead>
          <tbody>
            <tr><td><code>role</code></td><td>Dialog의 목적이에요. <code>confirmation</code>, <code>form</code>, <code>contextual</code> 중에서 선택해요. 기본값은 <code>confirmation</code>이에요.</td></tr>
            <tr><td><code>presentation</code></td><td>이 Dialog에서 사용할 형태를 직접 지정하고 싶을 때 사용해요.</td></tr>
            <tr><td><code>continuity</code></td><td>열린 동안 형태를 유지할지 결정해요. 기본값은 <code>pinned</code>예요.</td></tr>
            <tr><td><code>open</code></td><td>열림 상태를 직접 제어할 때 사용해요.</td></tr>
            <tr><td><code>defaultOpen</code></td><td>처음 열림 상태의 기본값이에요.</td></tr>
            <tr><td><code>onOpenChange</code></td><td>열림 상태가 바뀔 때 호출돼요.</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        <code>presentation</code>에는 형태 이름 하나(<code>&quot;sheet&quot;</code>)를
        주거나, 환경별로 다르게(<code>&#123; compact: &quot;sheet&quot; &#125;</code>)
        지정할 수도 있어요. 픽셀이 아니라 환경 이름으로 써요.
      </p>

      <h2>Dialog.Content</h2>
      <p>실제로 열리는 Dialog 내용을 만들어요.</p>
      <pre><code>{`<Dialog.Content title="배송지 수정">
  ...
</Dialog.Content>`}</code></pre>
      <div className="tableWrap">
        <table>
          <thead><tr><th>속성</th><th>설명</th></tr></thead>
          <tbody>
            <tr><td><code>title</code></td><td>Dialog의 제목이에요. 화면에 표시되고 접근성 이름으로도 연결돼요.</td></tr>
            <tr><td><code>className</code></td><td>실제 팝업 요소에 클래스를 추가해요.</td></tr>
            <tr><td><code>alert</code></td><td>되돌리기 어려운 작업처럼 특별한 주의가 필요한 Dialog에 사용해요. 스크린 리더에 <code>alertdialog</code>로 알려요.</td></tr>
            <tr><td><code>describedBy</code></td><td>Dialog를 설명하는 요소와 연결할 때 사용해요.</td></tr>
            <tr><td><code>initialFocus</code></td><td>Dialog가 열렸을 때 처음 포커스를 받을 요소를 지정해요.</td></tr>
            <tr><td><code>finalFocus</code></td><td>Dialog가 닫힌 뒤 포커스가 돌아갈 위치를 지정해요.</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Trigger와 Close</h2>
      <p><code>Dialog.Trigger</code>는 Dialog를 열고:</p>
      <pre><code>{`<Dialog.Trigger>
  배송지 수정
</Dialog.Trigger>`}</code></pre>
      <p><code>Dialog.Close</code>는 Dialog를 닫아요.</p>
      <pre><code>{`<Dialog.Close>
  완료
</Dialog.Close>`}</code></pre>
      <p>
        일반적인 버튼 속성을 그대로 사용할 수 있어요. 기존 디자인 시스템의 버튼과
        함께 사용하는 방법은{' '}
        <Link href="/ko/guides/composition">함께 쓰기</Link>에서 설명해요.
      </p>

      <h2>스타일을 바꾸고 싶다면</h2>
      <p>실제로 열리는 요소에는 현재 선택된 형태가 표시돼요. 예를 들어:</p>
      <pre><code>{`<div data-presentation="modal">`}</code></pre>
      <p>
        처럼 확인할 수 있어요. 그래서 필요한 경우 CSS에서도 형태에 따라 스타일을
        다르게 적용할 수 있어요.
      </p>
      <pre><code>{`[data-presentation="modal"] {
  /* 프로젝트 스타일 */
}`}</code></pre>
      <p>
        다만 기본 디자인 토큰이나 프로젝트 전체 스타일을 바꾸는 방법은 이
        페이지에서 모두 설명하지 않아요. 자세한 내용은{' '}
        <Link href="/ko/guides/customize-decisions">결과 맞춤 설정</Link>에서
        확인해 주세요.
      </p>

      <h2>정리하면</h2>
      <p>
        Dialog를 사용할 때 가장 먼저 결정할 건 <strong>어떻게 보여줄지</strong>가
        아니라 <strong>무엇을 위한 Dialog인지</strong>예요. 의미를 선언하면
        기본적인 환경 분기는 Protean이 맡아요. 대부분은 이 정도면 충분해요.
      </p>
      <pre><code>{`<Dialog.Root role="form">
  <Dialog.Trigger>수정</Dialog.Trigger>
  <Dialog.Content title="수정">
    ...
  </Dialog.Content>
</Dialog.Root>`}</code></pre>
      <p>
        특별한 경우에만 <code>presentation</code>이나 <code>continuity</code>를
        직접 지정하면 돼요. 다음은{' '}
        <Link href="/ko/components/select">Select</Link>예요.
      </p>
    </div>
  )
}
