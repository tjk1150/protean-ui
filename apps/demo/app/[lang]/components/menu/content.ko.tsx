import Link from 'next/link'
import { MenuDemo } from './menu-demo'

export default function MenuKo() {
  return (
    <div className="doc" lang="ko">
      <h1>Menu</h1>
      <p className="lede">
        수정, 복사, 삭제처럼 <strong>여러 작업 중 하나를 실행할 때</strong>{' '}
        사용하는 메뉴예요. 마우스 환경에서는 버튼 주변에 작은 메뉴로 열리고, 작은
        터치 화면에서는 손가락으로 누르기 쉬운 형태로 바뀌어요. 앱에서는 같은{' '}
        <code>Menu</code> 하나만 만들면 돼요.
      </p>

      <h2>직접 확인해 보세요</h2>
      <div className="example">
        <span className="exampleLabel">아래 메뉴를 열어 보고, 창 크기와 입력 환경을 바꾼 뒤 다시 열어 보세요</span>
        <MenuDemo trigger="더보기" share="공유" duplicate="복제" remove="삭제" onPick="선택함" />
      </div>
      <p>같은 메뉴인데도 환경에 따라 열리는 모습과 항목 크기가 달라져요.</p>

      <h2>기본 사용법</h2>
      <p>파일 작업 메뉴를 만들어볼게요.</p>
      <pre><code>{`<Menu.Root>
  <Menu.Trigger>더 보기</Menu.Trigger>
  <Menu.Content>
    <Menu.Item onSelect={rename}>이름 변경</Menu.Item>
    <Menu.Item onSelect={duplicate}>복사</Menu.Item>
    <Menu.Item onSelect={remove}>삭제</Menu.Item>
  </Menu.Content>
</Menu.Root>`}</code></pre>
      <p>
        각 항목에는 <code>onSelect</code>로 실제로 실행할 동작을 연결해요. 중요한
        건 앱에서:
      </p>
      <pre><code>{`isMobile
  ? <ActionSheet />
  : <DropdownMenu />`}</code></pre>
      <p>처럼 두 메뉴를 직접 만들지 않는다는 점이에요.</p>

      <h2>환경에 따라 어떻게 달라지나요?</h2>
      <p>기본 규칙은 이렇게 동작해요.</p>
      <div className="tableWrap">
        <table>
          <thead>
            <tr><th>사용 환경</th><th>열리는 모습</th><th>항목 크기</th></tr>
          </thead>
          <tbody>
            <tr><td>데스크톱 + 마우스</td><td>메뉴 팝업</td><td>마우스에 맞게 촘촘하게</td></tr>
            <tr><td>좁은 창 + 마우스</td><td>메뉴 팝업</td><td>마우스에 맞게 촘촘하게</td></tr>
            <tr><td>태블릿 + 터치</td><td>메뉴 팝업</td><td>터치하기 쉽게 넉넉하게</td></tr>
            <tr><td>작은 화면 + 터치</td><td>액션 시트</td><td>터치하기 쉽게 넉넉하게</td></tr>
          </tbody>
        </table>
      </div>
      <p>핵심은 Select와 같아요. 화면이 좁다는 이유만으로 터치 UI로 바꾸지 않아요.</p>
      <pre><code>{`좁은 창 + 마우스
→ 메뉴 팝업 유지

작은 화면 + 터치
→ 터치에 맞는 액션 시트`}</code></pre>
      <p>사용할 수 있는 공간과 입력 방식을 함께 봐요.</p>

      <h2>Select와는 무엇이 다른가요?</h2>
      <p>
        겉으로 보기에는 Select와 Menu가 비슷해 보여요. 둘 다 버튼을 눌렀을 때
        선택지가 열리니까요. 하지만 목적이 달라요.
      </p>
      <h3>Select는 값을 고르는 UI예요</h3>
      <pre><code>{`결제 주기
✓ 월간
  연간`}</code></pre>
      <p>선택한 값이 앱 상태로 남아요.</p>
      <h3>Menu는 작업을 실행하는 UI예요</h3>
      <pre><code>{`더 보기
이름 변경
복사
삭제`}</code></pre>
      <p>
        항목을 누르면 작업이 실행돼요. 그래서 단순히 &quot;옵션이 여러 개
        있다&quot;는 이유만으로 Menu와 Select를 바꿔 쓰지 않아요.
      </p>
      <pre><code>{`값을 선택한다
→ Select

작업을 실행한다
→ Menu`}</code></pre>
      <p>
        이 차이는 환경이 바뀌어도 그대로 유지돼요. Protean이 바꾸는 건{' '}
        <strong>기능의 의미가 아니라 보여주는 패턴</strong>이에요.
      </p>

      <h2>터치에서는 항목도 함께 넉넉해져요</h2>
      <p>
        패턴만 시트로 바뀌고 메뉴 항목이 마우스용 크기로 그대로 남아 있다면
        사용하기 불편해요. 그래서 Menu에서도 패턴과 밀도가 함께 적용돼요.
      </p>
      <pre><code>{`데스크톱 + 마우스
→ 메뉴 팝업
→ comfortable

작은 화면 + 터치
→ 액션 시트
→ touch`}</code></pre>
      <p>
        앱에서 각 항목에 직접{' '}
        <code>style=&#123;&#123; height: isTouch ? 44 : 36 &#125;&#125;</code>{' '}
        같은 분기를 추가할 필요는 없어요. 자세한 원리는{' '}
        <Link href="/ko/concepts/density">밀도</Link>에서 설명하고 있으므로 이
        페이지에서는 반복하지 않아요.
      </p>

      <h2>메뉴 항목에는 작업만 연결하면 돼요</h2>
      <p>
        Menu는 값을 보관하기 위한 컴포넌트가 아니에요. 각 항목에 실행할 작업을
        연결해요.
      </p>
      <pre><code>{`<Menu.Item onSelect={handleRename}>
  이름 변경
</Menu.Item>`}</code></pre>
      <p>항목을 고르면 작업이 실행되고, 메뉴는 닫혀요.</p>

      <h3>위험한 작업은 구분해 주세요</h3>
      <p>
        삭제처럼 되돌리기 어려운 작업에는 <code>destructive</code>를 켜 주세요.
      </p>
      <pre><code>{`<Menu.Item destructive onSelect={remove}>
  삭제
</Menu.Item>`}</code></pre>
      <p>
        항목에 <code>data-variant=&quot;danger&quot;</code>가 표시되고, 참고
        스타일에서는 붉은색으로 구분돼요.
      </p>

      <h2>이 Menu만 결과를 바꾸고 싶다면</h2>
      <p>
        특정 Menu에서 기본 규칙과 다른 결과를 사용하고 싶다면{' '}
        <code>presentation</code>을 직접 지정할 수 있어요.
      </p>
      <pre><code>{`<Menu.Root presentation="sheet">
  ...
</Menu.Root>`}</code></pre>
      <p>
        이 Menu에서는 기본 판단보다 직접 지정한 결과가 우선해요. Menu가 의미 있게
        그리는 모습은 <code>popover</code>와 <code>sheet</code> 둘이에요. 다만
        프로젝트 전체 Menu의 동작을 바꾸려는 경우에는 모든 호출부에 같은 값을
        반복하지 말고 <Link href="/ko/guides/customize-decisions">결과 맞춤
        설정</Link>에서 규칙을 변경하는 편이 좋아요.
      </p>

      <h2>스타일을 바꾸고 싶다면</h2>
      <p>
        실제로 열리는 메뉴 팝업에는 현재 선택된 모습과 밀도가 표시돼요.
      </p>
      <pre><code>{`<div
  data-presentation="popover"
  data-density="comfortable"
>`}</code></pre>
      <p>그래서 CSS에서도 현재 상태를 확인해 사용할 수 있어요.</p>
      <pre><code>{`[data-presentation="popover"] {
  /* 프로젝트의 메뉴 팝업 스타일 */
}`}</code></pre>
      <p>
        <code>data-scope</code>, <code>data-part</code>를 이용해 Menu의 특정
        부분만 스타일링하는 상세 방법은{' '}
        <Link href="/ko/guides/customize-decisions">결과 맞춤 설정</Link>에서 한
        번에 설명해요.
      </p>

      <h2>Menu.Root</h2>
      <p>Menu 전체의 상태와 적응 방식을 관리해요.</p>
      <div className="tableWrap">
        <table>
          <thead><tr><th>속성</th><th>설명</th></tr></thead>
          <tbody>
            <tr><td><code>presentation</code></td><td>이 Menu에서 사용할 형태를 직접 지정할 때 사용해요. 환경별로 다르게 지정할 수도 있어요.</td></tr>
            <tr><td><code>open</code></td><td>메뉴의 열림 상태를 직접 제어해요.</td></tr>
            <tr><td><code>defaultOpen</code></td><td>처음 열림 상태의 기본값이에요.</td></tr>
            <tr><td><code>onOpenChange</code></td><td>열림 상태가 바뀔 때 호출돼요.</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Menu.Trigger</h2>
      <p>메뉴를 여는 요소예요.</p>
      <pre><code>{`<Menu.Trigger>
  더 보기
</Menu.Trigger>`}</code></pre>
      <p>
        일반적인 버튼 속성을 그대로 사용할 수 있고, <code>render</code>로 다른
        요소에 트리거 행동을 합칠 수 있어요. 기존 디자인 시스템의 버튼과 합성하는
        방법은 <Link href="/ko/guides/composition">함께 쓰기</Link>에서 설명해요.
      </p>

      <h2>Menu.Content</h2>
      <p>실제로 메뉴 항목이 열리는 영역이에요.</p>
      <pre><code>{`<Menu.Content>
  ...
</Menu.Content>`}</code></pre>
      <p>환경에 따라 이 영역이 메뉴 팝업이나 액션 시트로 표현돼요.</p>

      <h2>Menu.Item</h2>
      <p>하나의 작업을 나타내요.</p>
      <div className="tableWrap">
        <table>
          <thead><tr><th>속성</th><th>설명</th></tr></thead>
          <tbody>
            <tr><td><code>onSelect</code></td><td>항목을 고르면 실행돼요. 실행 뒤 메뉴는 닫혀요.</td></tr>
            <tr><td><code>destructive</code></td><td>삭제 같은 위험한 작업을 표시해요. <code>data-variant=&quot;danger&quot;</code>로 찍혀요.</td></tr>
            <tr><td><code>disabled</code></td><td>항목을 비활성화해요. 스크린 리더에도 그대로 전달돼요.</td></tr>
          </tbody>
        </table>
      </div>

      <h3>구분선이 필요하다면</h3>
      <p><code>Menu.Separator</code>로 항목 사이를 나눌 수 있어요.</p>
      <pre><code>{`<Menu.Item onSelect={duplicate}>복사</Menu.Item>
<Menu.Separator />
<Menu.Item destructive onSelect={remove}>삭제</Menu.Item>`}</code></pre>

      <h2>접근성은 기본 동작에 포함돼요</h2>
      <p>
        메뉴가 열렸을 때의 키보드 이동, 포커스 관리, 닫힘 동작,{' '}
        <code>role=&quot;menu&quot;</code> 시맨틱은 어떤 모습에서든 기반
        primitive가 똑같이 처리해요. 앱이 데스크톱 메뉴와 터치용 메뉴를 각각 따로
        구현하면서 접근성 동작을 두 번 맞출 필요가 없어요. 제품 전체의 접근성
        원칙은 <Link href="/ko/guides/accessibility">접근성</Link> 페이지에서
        설명해요.
      </p>

      <h2>정리하면</h2>
      <p>Select와 Menu를 구분하는 가장 쉬운 기준은 이것이에요.</p>
      <pre><code>{`값을 고른다
→ Select

작업을 실행한다
→ Menu`}</code></pre>
      <p>Menu를 사용할 때 앱은 작업을 정의해요.</p>
      <pre><code>{`<Menu.Root>
  <Menu.Trigger>더 보기</Menu.Trigger>
  <Menu.Content>
    <Menu.Item onSelect={edit}>수정</Menu.Item>
    <Menu.Item destructive onSelect={remove}>삭제</Menu.Item>
  </Menu.Content>
</Menu.Root>`}</code></pre>
      <p>
        어떤 환경에서 어떤 패턴으로 열릴지는 Protean이 맡아요. 다음은{' '}
        <Link href="/ko/components/navigation">Navigation</Link>이에요.
      </p>
    </div>
  )
}
