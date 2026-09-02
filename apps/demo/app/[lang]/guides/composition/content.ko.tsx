export default function CompositionKo() {
  return (
    <div className="doc" lang="ko">
      <h1>함께 쓰기</h1>
      <p className="lede">
        컴포넌트 열 개를 한 앱에서 같이 쓰면 꼬이지 않을까요? 대부분의 조합은
        구조적으로 꼬일 수가 없어요 - 컴포넌트끼리 서로를 모르거든요. 이 문서는 그
        이유와, 진짜로 주의할 네 곳을 알려드려요.
      </p>

      <h2>전체 조립도</h2>
      <p>실제 앱 하나를 조립하면 이런 모양이에요. 이 문서 사이트도 같은 구조예요.</p>
      <pre><code>{`<ProteanProvider>                  {/* 선택 - 없으면 내장 기본 규칙 */}
  <Screen.Root>
    <Screen.Navigation>
      <Navigation.Root aria-label="메뉴">   {/* 바 - 서랍 - 레일 - 사이드바 */}
        <Navigation.Item href="/inbox">받은함</Navigation.Item>
        ...
      </Navigation.Root>
    </Screen.Navigation>

    <Screen.Content>
      <Actions.Root aria-label="문서 도구">  {/* 액션 줄 */}
        <Actions.Item onClick={save}>저장</Actions.Item>
        <Actions.Item secondary onClick={rename}>이름 변경</Actions.Item>
      </Actions.Root>

      <ListDetail.Root detailActive={!!selected}>  {/* 목록-상세 */}
        <ListDetail.List>...</ListDetail.List>
        <ListDetail.Detail>
          <ProteanBoundary>              {/* 이 패널 폭으로 판정 */}
            <Dialog.Root role="confirmation">
              <Dialog.Trigger>삭제</Dialog.Trigger>
              <Dialog.Content title="정말 삭제할까요?">...</Dialog.Content>
            </Dialog.Root>
          </ProteanBoundary>
        </ListDetail.Detail>
      </ListDetail.Root>
    </Screen.Content>

    <Screen.Actions>
      <PrimaryAction.Root>결제하기</PrimaryAction.Root>
    </Screen.Actions>
  </Screen.Root>
</ProteanProvider>`}</code></pre>

      <h2>왜 안 꼬이나요</h2>
      <p>
        컴포넌트끼리는 서로의 상태를 읽거나 쓰는 통로 자체가 없어요. 함께 보는 건
        읽기 전용 환경 정보와 규칙, 밀도 설정처럼 <strong>모두에게 같은 값</strong>뿐이고,
        오버레이는 각자 <strong>자기가 열리는 순간</strong> 독립적으로 판정해요. 다이얼로그 셋과 셀렉트
        둘과 메뉴를 한 화면에 놓아도, 각각은 혼자 있을 때와 똑같이 동작해요. 중첩도
        마찬가지예요 - 다이얼로그 안에서 셀렉트를 열면 포커스와 겹침 순서는 Base UI가
        처리하고, 판정은 각자 해요.
      </p>
      <div className="callout">
        <strong>왜 이렇게 하나요?</strong> 결정이 컴포넌트 사이를 흐르기 시작하면
        &quot;A를 바꿨더니 B가 이상해지는&quot; 지점이 생겨요. 결정을 순수 함수에 가두고
        결과만 DOM에 찍는 구조(<code>data-presentation</code>)라서, 조합의 수가 늘어도
        경우의 수는 늘지 않아요.
      </div>

      <h2>주의할 네 곳</h2>

      <h3>1. 파트에 display를 직접 걸지 마세요</h3>
      <p>
        참고 스타일시트는 <code>@layer</code> 안에 있어서 여러분의 CSS가 항상 이겨요.
        그래서 상태에 따라 숨겨지는 파트(ListDetail의 목록, Navigation의 더보기 탭)에
        <code>display: flex</code> 같은 걸 직접 걸면 숨김을 이겨버려요. 파트를 꾸밀 때는
        보이는 상태로 스코프하거나(<code>[data-presentation=&quot;panes&quot;] [data-part=&quot;list&quot;]</code>),
        파트 안에 래퍼를 하나 두고 그걸 꾸미세요.
      </p>

      <h3>2. Boundary 안에서 크롬은 뷰포트를 봐요</h3>
      <p>
        420px 패널을 <code>ProteanBoundary</code>로 감싸면 그 안의 오버레이는 패널 폭으로
        판정돼요(compact - 시트가 패널 바닥에서 올라와요). 하지만 같은 패널 안의
        Navigation은 뷰포트를 그대로 봐요. 크롬은 항상 화면에 있어서 서버가 그리는데,
        서버는 패널 폭을 잴 수 없거든요. 패널 안 크롬을 폭에 맞추고 싶으면 CSS 컨테이너
        쿼리를 쓰세요 - 같은 data 속성에 걸면 돼요.
      </p>

      <h3>3. 시트 위 시트는 스크림을 직접 정리하세요</h3>
      <p>
        작은 화면에서 시트 다이얼로그 안의 셀렉트를 열면 시트 위에 시트가 떠요. 동작은
        전부 정상인데(포커스, 닫기 순서), 스크림이 두 겹 깔려 어두워져요. 겹침이 잦은
        화면이면 안쪽 스크림을 CSS로 빼면 돼요:
      </p>
      <pre><code>{`/* 시트가 이미 떠 있을 때 셀렉트 시트의 스크림은 생략 */
body:has([data-scope='overlay'][data-presentation='sheet'])
  [data-scope='select'] [data-part='backdrop'] {
  background: transparent;
}`}</code></pre>

      <h3>4. 중첩 Boundary는 가장 가까운 것이 이겨요</h3>
      <p>
        Boundary 안에 Boundary를 두면, 오버레이는 자기에게 가장 가까운 경계의 폭으로
        판정되고 그 경계 안에 갇혀요. 테스트로 고정된 계약이에요.
      </p>

      <h2>힌트 달린 버튼은 그대로 버튼이에요</h2>
      <p>
        <code>Tooltip.Trigger</code>는 버튼 속성을 전부 통과시켜요. 툴팁 달린 아이콘
        버튼이 실제 동작도 하게 하려면 <code>onClick</code>을 그냥 주면 돼요 - 터치
        환경(탭 토글 팝오버)에서는 힌트 열림과 여러분의 onClick이 함께 실행돼요.
        <code>disabled</code>도 버튼에 그대로 찍히고, 힌트도 함께 잠겨요.
      </p>
      <pre><code>{`<Tooltip.Root>
  <Tooltip.Trigger aria-label="행 삭제" onClick={removeRow}>
    <TrashIcon />
  </Tooltip.Trigger>
  <Tooltip.Content>이 행을 삭제해요.</Tooltip.Content>
</Tooltip.Root>`}</code></pre>

      <h2>한 요소에 역할 두 개: render</h2>
      <p>
        버튼 하나가 힌트도 갖고 다이얼로그나 메뉴도 열어야 하면, 행동의 주인
        (Dialog · Menu)의 트리거에 <code>render</code>로 다른 요소를 건네요. 버튼은
        DOM에 하나만 생기고, 행동과 접근성 배선이 그 위에 합쳐져요. Base UI의 render
        관례 그대로예요.
      </p>
      <pre><code>{`<Tooltip.Root presentation="tooltip">  {/* 아래 설명을 보세요 */}
  <Menu.Root>
    <Menu.Trigger render={<Tooltip.Trigger aria-label="더 많은 작업" />}>
      <MoreIcon />
    </Menu.Trigger>
    <Menu.Content>...</Menu.Content>
  </Menu.Root>
  <Tooltip.Content>더 많은 작업</Tooltip.Content>
</Tooltip.Root>`}</code></pre>
      <div className="callout">
        <strong>행동이 있는 버튼의 힌트는 호버 전용으로 두세요.</strong> 기본 규칙은
        호버가 없는 환경에서 힌트를 탭 토글 팝오버로 바꾸는데, 행동이 있는 버튼에서는
        탭 한 번이 두 가지(힌트 + 행동)를 하게 돼요. <code>Tooltip.Root</code>에
        <code>presentation=&quot;tooltip&quot;</code>을 주면 힌트가 호버에서만 열리고,
        터치에서는 조용히 사라져요 - 이름은 <code>aria-label</code>이 이미 지키고
        있으니까요. 스타일드 버튼(<code>render=&#123;&lt;button className=&quot;...&quot;/&gt;&#125;</code>)도
        같은 방식으로 건네면 돼요.
      </div>

      <h2>실제로 굴러가는 증거</h2>
      <p>
        지금 보고 있는 이 문서 사이트가 Screen + Navigation 조합이고, 토스 미니앱
        클론(화면 24개, 테스트 699개)이 오버레이 다섯 종과 셸을 함께 굴린 이관
        사례예요. 컨테이너 판정은 컨테이너 경계 데모에서 직접 확인할 수 있어요.
      </p>
    </div>
  )
}
