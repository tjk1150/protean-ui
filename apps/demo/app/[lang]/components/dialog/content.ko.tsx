import Link from 'next/link'
import { ProteanCheckoutDialog } from '../../../delete-demo/protean-dialog'

export default function DialogKo() {
  return (
    <div className="doc" lang="ko">
      <h1>Dialog</h1>
      <p className="lede">
        다이얼로그의 역할만 선언하면, 열리는 순간의 환경에 맞춰 팝오버 · 바텀 시트 ·
        모달 · 전체 화면 중 하나로 열려요.
      </p>

      <div className="example">
        <span className="exampleLabel">직접 해 보세요 - 창 크기를 바꾸고 다시 열어 보세요</span>
        <ProteanCheckoutDialog />
      </div>

      <pre><code>{`<Dialog.Root role="form">
  <Dialog.Trigger>배송지 수정</Dialog.Trigger>
  <Dialog.Content title="배송지 수정">
    <AddressForm />
  </Dialog.Content>
</Dialog.Root>`}</code></pre>

      <h2>역할에 따라 이렇게 열려요</h2>
      <p>
        <code>role</code>은 이 다이얼로그가 어떤 성격인지 알려주는 속성이에요. 성격에
        따라 어울리는 모습이 달라요.
      </p>
      <div className="tableWrap">
        <table>
          <thead>
            <tr><th>role</th><th>이런 것</th><th>작은 화면 + 터치</th><th>그 외</th></tr>
          </thead>
          <tbody>
            <tr><td>confirmation</td><td>확인 · 안내 창</td><td>바텀 시트</td><td>모달</td></tr>
            <tr><td>form</td><td>입력 폼</td><td>전체 화면</td><td>모달</td></tr>
            <tr><td>contextual</td><td>버튼에 붙는 메뉴 · 옵션</td><td>바텀 시트</td><td>팝오버 (버튼 옆에 붙어요)</td></tr>
          </tbody>
        </table>
      </div>
      <div className="callout">
        열려 있는 동안에는 창 크기가 바뀌어도 모습을 유지해요. 쓰던 도중에 UI가 갑자기
        변신하면 당황스러우니까요. 다음에 열 때 다시 판단해요. 반대 트레이드가 필요하면{' '}
        <code>continuity=&quot;live&quot;</code>를 켜 보세요. 열려 있는 동안에도 다시
        판단해서 모습을 그 자리에서 바꾸는데, 입력하던 내용과 포커스, React 상태까지
        전부 보존돼요. <a href="/continuity-demo">전환 연속성 데모</a>에서 직접 확인할
        수 있어요.
      </div>

      <h2>Dialog.Root</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>속성</th><th>타입</th><th>설명</th></tr></thead>
          <tbody>
            <tr><td>role</td><td>&quot;confirmation&quot; | &quot;form&quot; | &quot;contextual&quot;</td><td>다이얼로그의 성격. 기본값은 confirmation이에요.</td></tr>
            <tr><td>presentation</td><td>모습 이름 | &#123; 화면등급: 모습 &#125;</td><td>이 다이얼로그만 다르게 열고 싶을 때 지정해요. 픽셀이 아니라 환경 이름으로 써요.</td></tr>
            <tr><td>continuity</td><td>&quot;pinned&quot; | &quot;live&quot;</td><td>기본은 pinned(열림 동안 고정)이에요. live면 열려 있는 동안에도 다시 판단해서, 상태를 보존한 채 모습을 바꿔요.</td></tr>
            <tr><td>open / defaultOpen / onOpenChange</td><td></td><td>열림 상태를 직접 관리할 수도, 맡길 수도 있어요. 부모가 조건부로 렌더링하는 패턴은 defaultOpen과 onOpenChange를 쓰면 돼요.</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Dialog.Content</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>속성</th><th>타입</th><th>설명</th></tr></thead>
          <tbody>
            <tr><td>title</td><td>string</td><td>제목이에요. 화면에 보이고, 스크린 리더가 읽는 이름으로도 연결돼요.</td></tr>
            <tr><td>className</td><td>string</td><td>팝업 요소에 그대로 붙어요. 기존 클래스 기반 스타일을 재사용할 수 있어요.</td></tr>
            <tr><td>alert</td><td>boolean</td><td>되돌릴 수 없는 확인 창이면 켜 주세요. role=&quot;alertdialog&quot;로 알려요.</td></tr>
            <tr><td>describedBy</td><td>string</td><td>설명 문단의 id를 연결해요. 여러 개면 공백으로 이어요.</td></tr>
            <tr><td>initialFocus</td><td>RefObject</td><td>열릴 때 포커스를 받을 요소예요. 위험한 창에서는 취소 버튼을 지정하세요.</td></tr>
            <tr><td>finalFocus</td><td>false | RefObject | 함수</td><td>닫힐 때 포커스가 갈 곳이에요. 함수로 false를 돌려주면 복귀를 생략하고 앱이 직접 옮길 수 있어요.</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        <code>Dialog.Trigger</code>와 <code>Dialog.Close</code>는 연결이 끝나 있는
        평범한 버튼이에요. 버튼에 쓰는 속성을 그대로 받아요. 모든 조각에는{' '}
        <code>data-scope</code> · <code>data-part</code> ·{' '}
        <code>data-presentation</code> 속성이 붙어서 CSS 선택자로 스타일링해요.
      </p>

      <p>
        수동 분기 방식과 나란히 비교하려면 <Link href="/delete-demo">삭제 데모</Link>를,
        서버 렌더링에서 왜 안전한지는 <Link href="/ko/concepts/ssr">서버 렌더링</Link>{' '}
        문서를 보세요.
      </p>
    </div>
  )
}
