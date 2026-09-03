import Link from 'next/link'
import { BillingSelect } from '../../../screen-demo/billing-select'
import { SearchableSelectDemo } from './searchable-demo'

export default function SelectKo() {
  return (
    <div className="doc" lang="ko">
      <h1>Select</h1>
      <p className="lede">
        여러 옵션 중 하나를 고르는 UI예요. 마우스로 사용할 때는 익숙한{' '}
        <strong>드롭다운</strong>으로 열리고, 작은 터치 화면에서는 손가락으로
        고르기 쉬운 <strong>바텀 시트</strong>로 열려요. 앱에서는 같은{' '}
        <code>Select</code> 하나만 사용하면 돼요.
      </p>

      <h2>직접 확인해 보세요</h2>
      <div className="example">
        <span className="exampleLabel">아래 Select를 열어 보고, 창 크기와 입력 환경을 바꾼 뒤 다시 열어 보세요</span>
        <BillingSelect />
      </div>
      <p>같은 코드인데도 환경에 따라 열리는 모습과 항목 크기가 달라져요.</p>

      <h2>기본 사용법</h2>
      <p>결제 주기를 고르는 Select를 만들어볼게요.</p>
      <pre><code>{`const cycles = [
  { value: "monthly", label: "매월" },
  { value: "yearly", label: "매년" },
];

function BillingSelect() {
  const [value, setValue] = useState("monthly");

  return (
    <Select.Root aria-label="결제 주기" value={value} onValueChange={setValue} items={cycles}>
      <Select.Trigger placeholder="결제 주기" />
      <Select.Content>
        <Select.Item value="monthly">매월</Select.Item>
        <Select.Item value="yearly">매년</Select.Item>
      </Select.Content>
    </Select.Root>
  );
}`}</code></pre>
      <p>
        사용자가 직접 작성하는 건 값과 옵션이에요. 드롭다운을 쓸지 바텀 시트를
        쓸지는 호출하는 곳에서 판단하지 않아요.
      </p>

      <h2>환경에 따라 어떻게 달라지나요?</h2>
      <p>기본 규칙은 이렇게 동작해요.</p>
      <div className="tableWrap">
        <table>
          <thead>
            <tr><th>사용 환경</th><th>열리는 모습</th><th>항목 크기</th></tr>
          </thead>
          <tbody>
            <tr><td>데스크톱 + 마우스</td><td>드롭다운</td><td>마우스에 맞게 촘촘하게</td></tr>
            <tr><td>좁은 창 + 마우스</td><td>드롭다운</td><td>마우스에 맞게 촘촘하게</td></tr>
            <tr><td>태블릿 + 터치</td><td>드롭다운</td><td>터치하기 쉽게 넉넉하게</td></tr>
            <tr><td>작은 화면 + 터치</td><td>바텀 시트</td><td>터치하기 쉽게 넉넉하게</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        여기서 중요한 건 <strong>화면 너비만 보고 시트로 바꾸지 않는다는 것</strong>
        이에요. 데스크톱 브라우저 창이 좁아졌다고 해서 갑자기 바텀 시트가 되지
        않아요. 반대로 화면이 충분히 넓은 태블릿이라면 드롭다운을 유지하면서도
        손가락으로 누르기 편한 크기를 사용할 수 있어요.
      </p>

      <h3>패턴과 밀도가 같이 움직여요</h3>
      <pre><code>{`데스크톱 + 마우스
→ Dropdown
→ comfortable

작은 화면 + 터치
→ Sheet
→ touch`}</code></pre>
      <p>
        하지만 앱 코드에서 <code>const rowHeight = isTouch ? 44 : 36;</code> 같은
        코드를 추가할 필요는 없어요. Select가 어떤 모습으로 열렸는지와 현재 입력
        환경에 맞춰 참고 스타일의 항목 크기가 함께 적용돼요. 밀도가 어떻게
        동작하는지 자세히 알고 싶다면{' '}
        <Link href="/ko/concepts/density">밀도</Link> 페이지에서 확인할 수 있어요.
      </p>

      <h2>값과 옵션은 일반적인 React 상태로 관리해요</h2>
      <p>
        Protean이 환경에 맞는 모습을 선택한다고 해서 앱의 값 관리 방식까지 바뀌는
        건 아니에요.
      </p>
      <pre><code>{`const [value, setValue] = useState("monthly");

<Select.Root value={value} onValueChange={setValue} items={cycles}>
  ...
</Select.Root>`}</code></pre>
      <p>
        선택된 값은 평소 React 컴포넌트처럼 앱이 관리해요. Protean이 맡는 건{' '}
        <strong>값을 어디에 저장할지</strong>가 아니라 <strong>그 선택 UI를 지금
        어떤 모습으로 보여줄지</strong>예요.
      </p>

      <h3>작은 화면에서 Sheet가 되어도 같은 Select예요</h3>
      <p>드롭다운과 바텀 시트를 별도의 Select로 관리하지 않아요.</p>
      <pre><code>{`Select
  ├─ Dropdown
  └─ Sheet`}</code></pre>
      <p>처럼 앱에서 두 컴포넌트를 직접 연결하는 구조가 아니라,</p>
      <pre><code>{`Select
  ↓
현재 환경에서 presentation 선택`}</code></pre>
      <p>
        하는 구조예요. 그래서 패턴이 바뀌어도 선택된 값과 옵션 데이터는 같은{' '}
        <code>Select.Root</code>가 계속 소유해요. 키보드 조작과 스크린 리더
        연결도 어떤 모습에서든 똑같이 동작해요.
      </p>

      <h2>이 Select만 결과를 바꾸고 싶다면</h2>
      <p>
        특정 화면에서는 기본 규칙과 다르게 항상 같은 형태를 사용하고 싶을 수도
        있어요. 그럴 때는 <code>presentation</code>을 직접 지정할 수 있어요.
      </p>
      <pre><code>{`<Select.Root
  presentation="sheet"
  value={value}
  onValueChange={setValue}
  items={cycles}
>
  ...
</Select.Root>`}</code></pre>
      <p>
        이렇게 지정하면 이 Select에서는 기본 판단보다 직접 지정한 결과가 우선해요.
        다만 프로젝트 전체의 Select 동작을 바꾸려는 경우에는 컴포넌트마다 이 값을
        반복하지 말고 <Link href="/ko/guides/customize-decisions">결과 맞춤
        설정</Link>에서 기본 규칙을 변경하는 편이 좋아요.
      </p>

      <h2>스타일을 바꾸고 싶다면</h2>
      <p>
        실제로 열리는 팝업에는 현재 선택된 모습과 밀도가 표시돼요. 예를 들면:
      </p>
      <pre><code>{`<div
  data-presentation="popover"
  data-density="comfortable"
>`}</code></pre>
      <p>또는 작은 터치 화면에서는:</p>
      <pre><code>{`<div
  data-presentation="sheet"
  data-density="touch"
>`}</code></pre>
      <p>
        처럼 확인할 수 있어요. 프로젝트 전체 스타일을 변경하는 방법은{' '}
        <Link href="/ko/guides/customize-decisions">결과 맞춤 설정</Link>에서
        다뤄요.
      </p>

      <h2>Select.Root</h2>
      <p>Select의 값과 적응 방식을 관리해요.</p>
      <div className="tableWrap">
        <table>
          <thead><tr><th>속성</th><th>설명</th></tr></thead>
          <tbody>
            <tr><td><code>value</code></td><td>현재 선택된 값이에요.</td></tr>
            <tr><td><code>onValueChange</code></td><td>선택된 값이 바뀔 때 호출돼요.</td></tr>
            <tr><td><code>defaultValue</code></td><td>값 관리를 맡길 때의 처음 값이에요.</td></tr>
            <tr><td><code>items</code></td><td>값과 표시 이름의 목록이에요. 버튼에 선택된 이름을 보여줄 때 쓰고, native 모드와 검색 모드에서는 필수예요.</td></tr>
            <tr><td><code>presentation</code></td><td>이 Select에서 사용할 형태를 직접 지정할 때 사용해요. <code>&quot;native&quot;</code>를 주면 브라우저 기본 <code>&lt;select&gt;</code>를 그대로 써요.</td></tr>
            <tr><td><code>disabled</code></td><td>Select를 사용할 수 없게 할 때 사용해요.</td></tr>
            <tr><td><code>open</code> / <code>defaultOpen</code> / <code>onOpenChange</code></td><td>열림 상태를 직접 관리할 수도, 맡길 수도 있어요.</td></tr>
            <tr><td><code>aria-label</code></td><td>스크린 리더가 읽을 이름이에요. 버튼과 native 모드 양쪽에 연결돼요.</td></tr>
            <tr><td><code>searchable</code></td><td>팝업 안에 검색 입력을 넣어요. <code>items</code>가 필수예요.</td></tr>
            <tr><td><code>searchPlaceholder</code> / <code>emptyLabel</code></td><td>검색 입력의 안내 문구와, 결과가 없을 때 보여줄 문구예요.</td></tr>
            <tr><td><code>name</code></td><td>폼과 연동할 때 사용해요.</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Select.Trigger</h2>
      <p>현재 선택된 값을 보여주고 Select를 여는 요소예요.</p>
      <pre><code>{`<Select.Trigger placeholder="결제 주기" />`}</code></pre>
      <div className="tableWrap">
        <table>
          <thead><tr><th>속성</th><th>설명</th></tr></thead>
          <tbody>
            <tr><td><code>placeholder</code></td><td>아직 선택된 값이 없을 때 보여줄 문구예요.</td></tr>
            <tr><td><code>aria-label</code></td><td>버튼의 접근성 이름을 직접 지정할 때 사용해요.</td></tr>
            <tr><td><code>className</code></td><td>트리거 버튼에 클래스를 추가해요.</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Select.Content</h2>
      <p>
        선택할 옵션이 열리는 영역이에요. 환경에 따라 이 영역이 드롭다운 팝업이나
        바텀 시트로 표현돼요. 옵션은 <code>Select.Item</code>으로 구성해요.
      </p>
      <pre><code>{`<Select.Content>
  <Select.Item value="monthly">매월</Select.Item>
  <Select.Item value="yearly">매년</Select.Item>
</Select.Content>`}</code></pre>
      <p>
        예외가 하나 있어요. 검색 모드(<code>searchable</code>)에서는 목록이{' '}
        <code>items</code>에서 그려지기 때문에 <code>Select.Content</code>는 비워
        두면 돼요.
      </p>

      <h2>항목이 많다면: 검색</h2>
      <p>
        <code>searchable</code>을 켜면 팝업 맨 위에 검색 입력이 생기고, 입력할
        때마다 목록이 걸러져요. 폰의 바텀 시트에서도 똑같이 동작하고, 스크린
        리더에게도 정식 &quot;검색해서 고르는 입력&quot;(콤보박스) 패턴으로
        올바르게 읽혀요.
      </p>
      <div className="example">
        <span className="exampleLabel">직접 해 보세요 - 검색해서 골라 보세요</span>
        <SearchableSelectDemo
          label="국가"
          placeholder="국가 선택"
          searchPlaceholder="국가 검색"
          emptyLabel="결과가 없어요"
        />
      </div>
      <pre><code>{`<Select.Root aria-label="국가" searchable items={countries}
  searchPlaceholder="국가 검색" emptyLabel="결과가 없어요">
  <Select.Trigger placeholder="국가 선택" />
  <Select.Content />
</Select.Root>`}</code></pre>

      <h2>정리하면</h2>
      <p>Select를 사용할 때 앱이 직접 판단해야 할 건 선택 값이에요.</p>
      <pre><code>{`<Select.Root value={value} onValueChange={setValue} items={cycles}>
  ...
</Select.Root>`}</code></pre>
      <p>환경에 따른 모습은 Protean이 맡아요.</p>
      <pre><code>{`마우스
→ Dropdown

작은 화면 + 터치
→ Bottom Sheet`}</code></pre>
      <p>
        그리고 터치 환경이라면 항목 크기도 함께 넉넉해져요. 그래서 앱 코드에는{' '}
        <code>isMobile ? &lt;MobileSelect /&gt; : &lt;DesktopSelect /&gt;</code>{' '}
        같은 분기를 남기지 않아도 돼요. 다음은{' '}
        <Link href="/ko/components/menu">Menu</Link>예요.
      </p>
    </div>
  )
}
