import Link from 'next/link'

export default function CompositionKo() {
  return (
    <div className="doc" lang="ko">
      <h1>함께 쓰기</h1>
      <p className="lede">
        실제 앱에서는 Navigation, 본문, Dialog, Select, Tooltip, 페이지 Actions가
        한 화면에 같이 있어요. 대부분의 경우에는 특별한 연결 코드가 필요하지
        않아요. 각 컴포넌트를 원래 목적대로 조합하면 돼요. 가장 자주 쓰는
        조합부터 볼게요.
      </p>

      <h2>1. 앱의 기본 골격 만들기</h2>
      <p>가장 먼저 Screen, Navigation, PrimaryAction을 조합해볼게요.</p>
      <pre><code>{`<Screen.Root>
  <Screen.Navigation>
    <Navigation.Root aria-label="주요 메뉴">
      <Navigation.Item href="/" current>홈</Navigation.Item>
      <Navigation.Item href="/orders">주문</Navigation.Item>
      <Navigation.Item href="/settings">설정</Navigation.Item>
    </Navigation.Root>
  </Screen.Navigation>
  <Screen.Content>
    <h1>주문 관리</h1>
    <OrderPage />
  </Screen.Content>
  <Screen.Actions>
    <PrimaryAction.Root onClick={createOrder}>
      새 주문
    </PrimaryAction.Root>
  </Screen.Actions>
</Screen.Root>`}</code></pre>
      <pre><code>{`Screen        → 페이지의 골격
Navigation    → 현재 환경에 맞는 탐색 형태
PrimaryAction → 가장 중요한 행동의 위치
CSS           → 실제 페이지 배치`}</code></pre>
      <p>
        한 컴포넌트가 다른 컴포넌트의 환경 판단을 대신하지 않아요. 각자 맡은
        역할만 처리해요. 지금 보고 있는 이 문서 사이트도 같은 조합이에요.
      </p>
      <h3>참고 레이아웃을 사용한다면</h3>
      <p>
        Screen · Navigation · PrimaryAction의 제공 레이아웃을 그대로 사용하려면{' '}
        <code>protean-defaults</code> opt-in이 필요해요.
      </p>
      <pre><code>{`<body className="protean-defaults">
  <App />
</body>`}</code></pre>
      <p>
        프로젝트 자체 레이아웃을 사용하고 있다면 꼭 켤 필요는 없어요. 자세한
        스타일 커스터마이징은{' '}
        <Link href="/ko/guides/customize-decisions">결과 맞춤 설정</Link>에서
        설명해요.
      </p>

      <h2>2. 페이지 Actions에 여러 작업 넣기</h2>
      <p>
        <code>Screen.Actions</code>는 페이지에서 작업이 놓이는 자리이고,{' '}
        <code>Actions.Root</code>는 여러 작업을 묶는 도구 모음이에요. 그래서 함께
        사용할 수 있어요.
      </p>
      <pre><code>{`<Screen.Actions>
  <Actions.Root aria-label="문서 작업" moreLabel="더보기">
    <Actions.Item onClick={save}>저장</Actions.Item>
    <Actions.Item secondary onClick={duplicate}>복제</Actions.Item>
    <Actions.Item secondary destructive onClick={remove}>삭제</Actions.Item>
  </Actions.Root>
</Screen.Actions>`}</code></pre>
      <h3>PrimaryAction과 Actions 중 무엇을 쓰나요?</h3>
      <pre><code>{`가장 중요한 행동 하나 → PrimaryAction
여러 작업의 묶음     → Actions`}</code></pre>
      <p>으로 생각하면 쉬워요.</p>

      <h2>3. 아이콘 버튼에 Tooltip 붙이기</h2>
      <pre><code>{`<Tooltip.Root>
  <Tooltip.Trigger aria-label="행 삭제" onClick={removeRow}>
    <TrashIcon />
  </Tooltip.Trigger>
  <Tooltip.Content>이 행을 삭제해요.</Tooltip.Content>
</Tooltip.Root>`}</code></pre>
      <p>
        <code>Tooltip.Trigger</code>는 실제 버튼이기 때문에 <code>onClick</code>,{' '}
        <code>disabled</code> 같은 일반 버튼 속성을 그대로 사용할 수 있어요.
        하지만 <strong>실제 작업이 있는 버튼</strong>에는 한 가지 주의할 점이
        있어요.
      </p>
      <div className="callout">
        <strong>행동 버튼의 Tooltip은 터치에서 두 역할을 만들지 마세요.</strong>{' '}
        호버할 수 없는 환경에서 기본 규칙은 도움말을 탭으로 여는 popover로
        바꾸는데, 같은 버튼에 실제 <code>onClick</code>도 있다면 탭 한 번이
        도움말 열기와 작업 실행 두 일을 하게 돼요. 이런 버튼에는{' '}
        <code>&lt;Tooltip.Root presentation=&quot;tooltip&quot;&gt;</code>으로
        도움말을 호버 환경에서만 보여주고, 터치에서는{' '}
        <code>aria-label</code>이 버튼의 이름을 맡게 하세요. 중요한 정보는
        Tooltip에만 넣지 않는다는 원칙도 그대로예요.
      </div>

      <h2>4. 버튼 하나가 Tooltip과 Dialog를 모두 가져야 한다면</h2>
      <p>
        호버하면 도움말을 보여주고, 누르면 Dialog를 열어야 할 수도 있어요. 이럴
        때 버튼을 두 개 겹쳐 만들지 않아요. <code>render</code> 합성으로{' '}
        <strong>하나의 실제 버튼에 두 역할을 연결</strong>해요.
      </p>
      <pre><code>{`<Tooltip.Root presentation="tooltip">
  <Dialog.Root role="confirmation">
    <Dialog.Trigger
      render={<Tooltip.Trigger aria-label="행 삭제" />}
    >
      <TrashIcon />
    </Dialog.Trigger>
    <Dialog.Content title="행을 삭제할까요?">
      <p>삭제하면 복구할 수 없어요.</p>
      <Dialog.Close>취소</Dialog.Close>
    </Dialog.Content>
  </Dialog.Root>
  <Tooltip.Content>행 삭제</Tooltip.Content>
</Tooltip.Root>`}</code></pre>
      <pre><code>{`실제 DOM 버튼   → 하나
Tooltip        → 도움말
Dialog.Trigger → 클릭 행동의 주인`}</code></pre>
      <h3>render의 주인은 행동 컴포넌트예요</h3>
      <p>
        <code>Tooltip.Trigger</code>에 <code>render</code>를 넣는 구조가
        아니에요. Dialog처럼 실제 행동을 소유한 Trigger가 바깥에서 합성을
        주도해요. Menu도 같은 계약을 지원해요:
      </p>
      <pre><code>{`<Menu.Trigger
  render={<Tooltip.Trigger aria-label="더 많은 작업" />}
>
  <MoreIcon />
</Menu.Trigger>`}</code></pre>
      <p>
        스타일드 버튼도 같은 방식으로 건네면 돼요 (
        <code>render=&#123;&lt;button className=&quot;...&quot; /&gt;&#125;</code>).
      </p>

      <h2>5. 본문 안에 보조 Pane 넣기</h2>
      <p>
        검색 결과 옆에 필터를 보여주고 싶다면 <code>SupportingPane</code>을{' '}
        <code>Screen.Content</code> 안에서 사용할 수 있어요.
      </p>
      <pre><code>{`<Screen.Content>
  <SupportingPane.Root paneLabel="검색 필터" compact="sheet">
    <SupportingPane.Main>
      <SearchResults />
    </SupportingPane.Main>
    <SupportingPane.Pane>
      <Filters />
    </SupportingPane.Pane>
  </SupportingPane.Root>
</Screen.Content>`}</code></pre>
      <p>
        Screen은 페이지 전체 골격을 맡고, SupportingPane은{' '}
        <strong>Content 안쪽의 본문 + 보조 영역 관계</strong>를 맡아요. 좁은
        화면에서의 처리 방식(<code>sheet</code> / <code>stacked</code>)은{' '}
        <Link href="/ko/layout/supporting-pane">SupportingPane</Link>에서 설명한
        대로 앱이 선택해요.
      </p>

      <h2>6. 폼 안의 PrimaryAction</h2>
      <pre><code>{`<Screen.Root>
  <Screen.Content>
    <form id="checkout-form">
      <ShippingFields />
      <PaymentFields />
    </form>
  </Screen.Content>
  <Screen.Actions>
    <PrimaryAction.Root type="submit" form="checkout-form">
      결제하기
    </PrimaryAction.Root>
  </Screen.Actions>
</Screen.Root>`}</code></pre>
      <p>
        <code>PrimaryAction.Root</code>는 실제 native button을 사용하므로 일반
        form 연결(<code>type=&quot;submit&quot;</code> + <code>form</code>)을
        그대로 사용할 수 있어요. 버튼의 React 로직을 작은 화면용과 데스크톱용으로
        두 번 작성하지 않아도 돼요.
      </p>

      <h2>ProteanProvider는 꼭 필요한가요?</h2>
      <p>
        기본 규칙만 사용한다면 모든 화면을 반드시 <code>ProteanProvider</code>로
        감쌀 필요는 없어요. Protean에는 기본 context가 있어요. 프로젝트 설정을
        전달해야 할 때 사용하면 돼요.
      </p>
      <pre><code>{`policy / density / thresholds → 결과 맞춤 설정
components                    → 이 페이지 (아래)
ssrTraits                     → 서버 렌더링`}</code></pre>

      <h2>기존 Overlay 구현을 연결해야 한다면</h2>
      <p>
        대부분의 프로젝트에서는 Protean의 기본 Dialog 구현을 그대로 사용하고
        CSS만 바꾸면 충분해요. 하지만 이미 조직에 자체 Modal · Drawer · Popover
        구현이 있고 <strong>스타일뿐 아니라 실제 Overlay 동작 구현 자체를
        재사용해야 한다면</strong> <code>ProteanProvider</code>의{' '}
        <code>components</code>를 사용할 수 있어요.
      </p>
      <pre><code>{`<ProteanProvider
  components={{
    modal: MyModalPresentation,
  }}
>
  <App />
</ProteanProvider>`}</code></pre>
      <p>
        지정하지 않은 형태는 기본 구현을 그대로 사용해요 - <code>modal</code>만
        교체하고 <code>fullscreen</code> · <code>sheet</code> ·{' '}
        <code>popover</code>는 기본에 맡길 수 있어요.
      </p>
      <div className="callout">
        <strong>이 기능은 Dialog의 presentation 구현을 교체하는 API예요.</strong>{' '}
        현재 이 registry를 읽는 곳은 Dialog예요. Select · Menu · Tooltip의 내부
        팝업 구현까지 한 번에 교체하는 전역 component registry가 아니에요.
      </div>
      <h3>Custom presentation은 고급 기능이에요</h3>
      <p>
        Custom 구현은 단순한 스타일 wrapper가 아니라, 공개{' '}
        <code>OverlayPresentationProps</code> 계약을 받아야 해요 - 열림 상태와
        판단 결과, 제목 · 접근성 연결, 포커스 계약, Boundary portal과 전환 연속성
        계약까지 Protean이 전달하는 Overlay 계약을 유지해야 해요. 기준은
        간단해요.
      </p>
      <pre><code>{`모양만 변경                          → CSS
Overlay 구현 자체 교체               → components`}</code></pre>
      <p>
        단순히 색상이나 모서리를 바꾸려는 목적이라면 이 기능을 사용하지 마세요.
      </p>

      <h2>컴포넌트끼리는 왜 대부분 별도 연결이 필요 없나요?</h2>
      <p>
        컴포넌트가 서로의 상태를 직접 공유하도록 만들어져 있지 않기 때문이에요.
        함께 공유하는 건 환경 정보 · policy · density 설정 같은 공통 context뿐이고,
        각 컴포넌트는 그 정보를 자기 역할에 맞게 사용해요. 그래서 한 화면에
        Dialog 3개, Select 2개, Menu와 Tooltip 여러 개가 있어도 각각 자기 상태와
        판단을 유지해요.
      </p>

      <h2>중첩 Overlay는 동작보다 시각을 확인하세요</h2>
      <p>
        Dialog 안에서 Select나 Menu를 여는 것도 가능해요. 포커스와 닫힘 같은 기본
        동작은 각 기반 primitive가 담당해요. 다만 작은 화면에서는 시트 위에 또
        시트가 열릴 수 있어요. 기능적으로는 정상이어도 스크림(배경 어둡게)이 두 겹
        겹쳐 화면이 지나치게 어두워질 수 있어요. 이런 조합을 자주 사용한다면
        프로젝트 CSS에서 안쪽 스크림을 조정할 수 있어요.
      </p>
      <pre><code>{`/* 시트가 이미 떠 있을 때 셀렉트 시트의 스크림은 생략 */
body:has([data-scope='overlay'][data-presentation='sheet'])
  [data-scope='select'] [data-part='backdrop'] {
  background: transparent;
}`}</code></pre>
      <p>
        (<code>:has()</code> 사용 여부는 프로젝트의 선택이에요.) 이건 Protean이
        자동으로 판단하는 문제가 아니라{' '}
        <strong>서비스의 시각적 중첩 정책</strong>이에요.
      </p>

      <h2>스타일을 합칠 때 한 가지 원칙</h2>
      <p>
        참고 스타일은 <code>@layer</code> 안에 있어서 여러분의 CSS가 항상 이겨요.
        그래서 상태에 따라 숨겨지는 파트(ListDetail의 목록, Navigation의 더보기
        탭)에 <code>display: flex</code> 같은 걸 직접 걸면 숨김을 이겨버려요.
        파트를 꾸밀 때는 보이는 상태로 스코프하거나 파트 안에 래퍼를 두고
        꾸미세요. 구체적인 DOM hook 사용법은{' '}
        <Link href="/ko/guides/customize-decisions">결과 맞춤 설정</Link>에서
        설명해요.
      </p>

      <h2>좁은 패널 기준으로 판단하고 싶다면</h2>
      <p>
        대시보드 카드처럼 화면 전체가 아니라 컨테이너 폭을 기준으로 Dialog를
        판단하고 싶은 경우가 있어요. 이건 일반 조합과 별도의 주제라{' '}
        <Link href="/ko/advanced/container-boundary">컨테이너 안에서
        사용하기</Link>에서 <code>ProteanBoundary</code>를 처음부터 끝까지
        설명해요.
      </p>

      <h2>자주 쓰는 조합 빠르게 찾기</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>만들고 싶은 화면</th><th>조합</th></tr></thead>
          <tbody>
            <tr><td>일반 앱 Shell</td><td><code>Screen + Navigation</code></td></tr>
            <tr><td>하단 주요 행동이 있는 앱</td><td><code>Screen + PrimaryAction</code></td></tr>
            <tr><td>여러 페이지 작업</td><td><code>Screen.Actions + Actions.Root</code></td></tr>
            <tr><td>아이콘 도움말</td><td><code>Tooltip</code></td></tr>
            <tr><td>도움말 + Dialog 버튼 하나</td><td><code>Dialog.Trigger + Tooltip.Trigger</code></td></tr>
            <tr><td>도움말 + Menu 버튼 하나</td><td><code>Menu.Trigger + Tooltip.Trigger</code></td></tr>
            <tr><td>본문 + 필터/속성 패널</td><td><code>Screen.Content + SupportingPane</code></td></tr>
            <tr><td>자체 Modal/Drawer 구현 재사용</td><td><code>ProteanProvider components</code></td></tr>
            <tr><td>좁은 패널 기준 적응</td><td><code>ProteanBoundary</code> → 다음 페이지</td></tr>
          </tbody>
        </table>
      </div>

      <h2>정리하면</h2>
      <p>
        Protean 컴포넌트를 함께 쓸 때 별도의 거대한 연결 계층을 만들 필요는
        없어요. <strong>각 컴포넌트를 자기 역할대로 조합하고, 한 DOM 요소가 두
        역할을 가져야 할 때만 <code>render</code>로 합쳐요.</strong> 기존 Overlay
        구현 자체를 재사용해야 할 때만 <code>components</code>까지 내려가면 돼요.
        실제 앱 이관에서도 여러 컴포넌트를 함께 사용하고 있어요 - 검증 현황은{' '}
        <Link href="/ko/about/status">품질과 지원</Link>에 있어요. 다음은{' '}
        <Link href="/ko/advanced/container-boundary">컨테이너 안에서
        사용하기</Link>예요.
      </p>
    </div>
  )
}
