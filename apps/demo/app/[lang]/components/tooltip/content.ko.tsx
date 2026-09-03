import Link from 'next/link'
import { TooltipDemo } from './tooltip-demo'

export default function TooltipKo() {
  return (
    <div className="doc" lang="ko">
      <h1>Tooltip</h1>
      <p className="lede">
        아이콘이나 버튼의 의미를 짧게 설명할 때 사용해요. 마우스처럼 호버할 수
        있는 환경에서는 일반적인 툴팁으로 나타나고, 호버할 수 없는 환경에서는
        같은 도움말을 눌러서 확인할 수 있어요. Protean에서는 같은{' '}
        <code>Tooltip</code> 하나만 작성하면 돼요.
      </p>

      <h2>직접 확인해 보세요</h2>
      <div className="example">
        <span className="exampleLabel">마우스로 올려 보고, 호버가 없는 터치 환경에서는 탭해 보세요</span>
        <TooltipDemo label="배송비 안내" hint="3만 원 이상이면 배송비가 무료예요." text="배송비 3,000원" />
      </div>
      <p>
        호버할 수 있는 환경에서는 일반적인 툴팁으로 나타나고, 호버할 수 없는
        환경에서는 눌러서 확인할 수 있어요.
      </p>

      <h2>기본 사용법</h2>
      <p>아이콘 버튼에 도움말을 붙여볼게요.</p>
      <pre><code>{`<Tooltip.Root>
  <Tooltip.Trigger aria-label="공유">
    <ShareIcon />
  </Tooltip.Trigger>
  <Tooltip.Content>
    공유
  </Tooltip.Content>
</Tooltip.Root>`}</code></pre>
      <p>
        앱이 작성하는 건 도움말을 여는 버튼과 보여줄 짧은 설명이에요. 호버용
        Tooltip과 터치용 도움말을 따로 만들 필요는 없어요.
      </p>

      <h2>환경에 따라 어떻게 달라지나요?</h2>
      <p>
        Tooltip의 기본 판단에서는 화면 크기보다{' '}
        <strong>호버할 수 있는지</strong>가 중요해요.
      </p>
      <div className="tableWrap">
        <table>
          <thead>
            <tr><th>환경</th><th>선택되는 형태</th><th>여는 방법</th></tr>
          </thead>
          <tbody>
            <tr><td>호버 가능</td><td><code>tooltip</code></td><td>포인터를 올려 확인</td></tr>
            <tr><td>호버 불가능</td><td><code>popover</code></td><td>눌러서 확인</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        화면이 작다고 무조건 두 번째 방식이 되는 건 아니에요. 반대로 화면이
        넓어도 호버할 수 없는 환경이라면 눌러서 확인할 수 있는 방식이 필요해요.
        Protean의 모든 컴포넌트가 같은 환경 정보를 사용하는 건 아니에요.
        Tooltip에서는 <strong>이 도움말을 실제로 호버로 열 수 있는가</strong>가
        핵심이에요. 터치 환경은 호버가 없는 대표적인 예시일 뿐이에요.
      </p>

      <h2>터치에서는 왜 Popover가 되나요?</h2>
      <p>
        일반적인 툴팁은 포인터를 올리는 hover 동작을 전제로 해요. 하지만
        손가락에는 hover가 없어요. 그렇다고 도움말을 없애버리면 사용자는 같은
        정보를 확인할 방법이 없어져요. 그래서 호버할 수 없는 환경에서는 같은
        내용을 <strong>눌러서 열 수 있는 popover 방식</strong>으로 보여줘요.
      </p>
      <pre><code>{`같은 도움말

호버 가능
→ Tooltip

호버 불가능
→ 탭으로 여는 Popover`}</code></pre>
      <p>
        여기서 중요한 건 UI의 의미가 바뀌는 게 아니라는 점이에요. Popover로
        표현되더라도 여전히 <strong>짧은 도움말</strong>이에요. Dialog나 Menu로
        바뀌는 게 아니에요.
      </p>
      <h3>Popover가 되어도 포커스를 가져가지 않아요</h3>
      <p>
        눌러서 여는 popover도 별도의 작업 화면으로 취급하지 않아요. 현재
        구현에서는 도움말 팝업에 계속 <code>role=&quot;tooltip&quot;</code>을
        사용하고, 열릴 때 팝업 안으로 포커스를 강제로 이동시키지 않아요.{' '}
        <strong>호버할 수 없는 환경이라고 도움말을 없애지 않고, 여는 방법만
        바꿔요.</strong>
      </p>

      <div className="callout">
        <strong>중요한 정보는 Tooltip에만 넣지 마세요.</strong> Tooltip은 보조
        설명이에요. &quot;이 작업은 데이터를 영구 삭제합니다&quot; 같은 반드시
        알아야 하는 정보는 Tooltip을 열어야만 보이게 하지 말고, 화면 본문이나
        라벨에 직접 보여주세요. Tooltip에는 아이콘 버튼의 짧은 이름, 익숙하지
        않은 기능의 보조 설명처럼 없어도 기본 작업을 이해할 수 있는 정보를 넣어
        주세요.
      </div>

      <h2>Trigger는 실제 버튼이에요</h2>
      <p>
        <code>Tooltip.Trigger</code>는 실제 <code>&lt;button&gt;</code>을
        사용해요. 그래서 일반적인 버튼 속성을 사용할 수 있어요.
      </p>
      <pre><code>{`<Tooltip.Trigger
  aria-label="공유"
  disabled={isDisabled}
  onClick={handleShare}
>
  <ShareIcon />
</Tooltip.Trigger>`}</code></pre>
      <p>
        Tooltip이 붙었다고 해서 버튼의 원래 동작을 잃지 않아요. 버튼을 눌렀을 때
        실행할 작업과 도움말 동작을 함께 사용할 수 있고,{' '}
        <code>disabled</code>는 버튼과 도움말을 함께 잠가요. 버튼의{' '}
        <code>type</code>은 <code>button</code>으로 렌더링돼요.
      </p>
      <h3>아이콘 버튼에는 이름도 필요해요</h3>
      <p>
        화면에 글자가 없는 아이콘 버튼이라면 Tooltip 내용에만 의존하지 말고 버튼
        자체에도 <code>aria-label</code>로 이름을 주세요. 그러면 Tooltip을 열지
        않아도 보조 기술이 버튼의 목적을 알 수 있어요.
      </p>

      <h2>열림 상태를 직접 관리할 수도 있어요</h2>
      <p>기본적으로는 Tooltip이 열림 상태를 관리해요. 필요하다면:</p>
      <pre><code>{`<Tooltip.Root open={open} onOpenChange={setOpen}>
  ...
</Tooltip.Root>`}</code></pre>
      <p>
        처럼 직접 관리할 수 있고, 처음 열린 상태가 필요하면{' '}
        <code>defaultOpen</code>도 사용할 수 있어요. 대부분의 Tooltip에서는 직접
        관리할 필요가 없어요.
      </p>

      <h2>이 Tooltip만 결과를 바꾸고 싶다면</h2>
      <p>
        <code>presentation</code>으로 형태를 직접 지정할 수 있어요. 사용할 수
        있는 값은 <code>tooltip</code>과 <code>popover</code>예요.
      </p>
      <pre><code>{`<Tooltip.Root presentation="popover">
  ...
</Tooltip.Root>`}</code></pre>
      <p>
        이렇게 지정하면 해당 Tooltip의 결과가 기본 판단보다 우선해요. 프로젝트
        전체의 판단 규칙을 바꾸려는 경우에는 인스턴스마다 반복하지 말고{' '}
        <Link href="/ko/guides/customize-decisions">결과 맞춤 설정</Link>에서
        변경하는 편이 좋아요.
      </p>

      <h2>처음 렌더링할 때는 어떻게 되나요?</h2>
      <p>
        서버는 사용자의 환경이 호버를 지원하는지 확실하게 알 수 없어요. 그래서
        현재 구현에서는 서버와 첫 화면에서 먼저 기본 버튼을 안전하게 렌더링하고,
        브라우저가 준비된 뒤 현재 환경에 맞는 도움말 동작을 연결해요.
        (JavaScript가 없으면 도움말도 없어요.) Tooltip은 원래 보조 정보이기
        때문에 이런 방식이 가능해요 - 중요한 정보를 Tooltip에만 두면 안 되는
        이유 중 하나이기도 해요. 자세한 전략은{' '}
        <Link href="/ko/advanced/server-rendering">서버 렌더링</Link>에서 확인해
        주세요.
      </p>

      <h2>스타일을 바꾸고 싶다면</h2>
      <p>트리거와 실제로 열리는 팝업에 현재 결과가 표시돼요.</p>
      <pre><code>{`<button
  data-scope="tooltip"
  data-part="trigger"
  data-presentation="tooltip"
>

<div
  data-scope="tooltip"
  data-part="popup"
  data-presentation="tooltip"
  data-density="comfortable"
>`}</code></pre>
      <p>
        호버할 수 없는 환경에서는 <code>data-presentation=&quot;popover&quot;</code>
        가 돼요. 구체적인 <code>data-scope</code> · <code>data-part</code> ·{' '}
        <code>data-density</code> 활용법은{' '}
        <Link href="/ko/guides/customize-decisions">결과 맞춤 설정</Link>에서 한
        번에 설명해요. 밀도의 의미는{' '}
        <Link href="/ko/concepts/density">밀도</Link> 페이지에 있어요.
      </p>

      <h2>Tooltip.Root</h2>
      <p>Tooltip 전체의 적응 방식과 열림 상태를 관리해요.</p>
      <div className="tableWrap">
        <table>
          <thead><tr><th>속성</th><th>설명</th></tr></thead>
          <tbody>
            <tr><td><code>presentation</code></td><td><code>tooltip</code> 또는 <code>popover</code>를 직접 지정할 때 사용해요. 환경별 지정도 가능해요.</td></tr>
            <tr><td><code>open</code></td><td>열림 상태를 직접 관리할 때 사용해요.</td></tr>
            <tr><td><code>defaultOpen</code></td><td>처음 열림 상태의 기본값이에요.</td></tr>
            <tr><td><code>onOpenChange</code></td><td>열림 상태가 바뀔 때 호출돼요.</td></tr>
            <tr><td><code>children</code></td><td>Trigger와 Content예요.</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Tooltip.Trigger</h2>
      <p>도움말을 연결할 버튼이에요.</p>
      <pre><code>{`<Tooltip.Trigger aria-label="공유">
  <ShareIcon />
</Tooltip.Trigger>`}</code></pre>
      <p>
        일반 <code>&lt;button&gt;</code> 속성(<code>disabled</code>,{' '}
        <code>onClick</code>, <code>aria-*</code> 등)을 그대로 사용할 수 있어요.{' '}
        <code>children</code>은 선택 사항인데, 다른 컴포넌트의 트리거와 합성할 때
        필요한 계약이에요 - 아래 절을 보세요.
      </p>

      <h2>Tooltip.Content</h2>
      <p>보여줄 도움말 내용이에요.</p>
      <pre><code>{`<Tooltip.Content>
  공유
</Tooltip.Content>`}</code></pre>
      <div className="tableWrap">
        <table>
          <thead><tr><th>속성</th><th>설명</th></tr></thead>
          <tbody>
            <tr><td><code>children</code></td><td>보여줄 도움말이에요.</td></tr>
            <tr><td><code>className</code></td><td>팝업에 클래스를 추가해요.</td></tr>
          </tbody>
        </table>
      </div>

      <h2>다른 Trigger와 함께 사용할 수 있어요</h2>
      <p>
        Tooltip이 붙은 버튼이 동시에 Dialog를 열 수도 있어요. 이때 트리거를 두 번
        렌더링하지 않고, 행동을 소유한 쪽의 <code>render</code>에 Tooltip.Trigger를
        넘겨요.
      </p>
      <pre><code>{`<Dialog.Trigger
  render={<Tooltip.Trigger aria-label="공유" />}
>
  ...
</Dialog.Trigger>`}</code></pre>
      <p>
        <code>render</code>는 Dialog.Trigger 같은 바깥 컴포넌트의 속성이에요 -
        Tooltip.Trigger 자체에 있는 게 아니에요. 실제 사용법은{' '}
        <Link href="/ko/guides/composition">함께 쓰기</Link>에서 다뤄요.
      </p>

      <h2>접근성</h2>
      <p>
        Tooltip에서 가장 중요한 원칙은 간단해요.{' '}
        <strong>도움말이 없어도 기본 작업을 이해하고 사용할 수 있어야 해요.</strong>{' '}
        현재 구현은 환경에 따라 툴팁과 팝오버를 사용하지만 도움말의 의미는{' '}
        <code>role=&quot;tooltip&quot;</code>으로 유지하고, 팝업으로 포커스를
        강제 이동하지 않아요. 아이콘 버튼에는 별도의 접근성 이름을 제공하고,
        중요한 정보는 Tooltip 밖에서도 확인할 수 있게 해 주세요. 전체 접근성
        원칙은 <Link href="/ko/guides/accessibility">접근성</Link> 페이지에서
        설명해요.
      </p>

      <h2>정리하면</h2>
      <p>
        Tooltip은 <strong>짧은 도움말 하나를 여러 환경에서 접근할 수 있게 만드는
        컴포넌트</strong>예요.
      </p>
      <pre><code>{`호버 가능
→ Tooltip

호버 불가능
→ 눌러서 여는 Popover`}</code></pre>
      <p>
        앱에서는 같은 내용을 한 번만 작성해요. Protean이 바꾸는 건 도움말의
        의미가 아니라 <strong>그 환경에서 도움말을 여는 방식</strong>이에요.
        다음은 레이아웃 컴포넌트{' '}
        <Link href="/ko/layout/screen">Screen</Link>이에요.
      </p>
    </div>
  )
}
