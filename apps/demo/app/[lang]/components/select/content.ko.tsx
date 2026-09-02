import { BillingSelect } from '../../../screen-demo/billing-select'
import { SearchableSelectDemo } from './searchable-demo'

export default function SelectKo() {
  return (
    <div className="doc" lang="ko">
      <h1>Select</h1>
      <p className="lede">
        옵션을 고르는 리스트박스예요. 마우스 환경에서는 버튼 옆에 붙는 드롭다운으로,
        작은 터치 화면에서는 바텀 시트로 열려요.
      </p>

      <div className="example">
        <span className="exampleLabel">직접 해 보세요 - 창 크기를 바꾸고 다시 열어 보세요</span>
        <BillingSelect />
      </div>

      <pre><code>{`<Select.Root aria-label="결제 주기" value={value} onValueChange={setValue} items={cycles}>
  <Select.Trigger placeholder="결제 주기" />
  <Select.Content>
    <Select.Item value="monthly">매월</Select.Item>
    <Select.Item value="yearly">매년</Select.Item>
  </Select.Content>
</Select.Root>`}</code></pre>

      <h2>환경마다 이렇게 열려요</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>환경</th><th>모습</th></tr></thead>
          <tbody>
            <tr><td>마우스 (화면 크기 무관)</td><td>버튼에 붙는 드롭다운. 타이핑으로 옵션을 찾을 수 있어요.</td></tr>
            <tr><td>작은 화면 + 터치</td><td>화면 폭을 꽉 채우는 바텀 시트. 항목 높이가 44px 이상이라 누르기 편해요.</td></tr>
            <tr><td>태블릿 + 터치</td><td>드롭다운에 터치 크기 항목. iPad 앱들의 관습을 따라요.</td></tr>
            <tr><td>presentation=&quot;native&quot;</td><td>브라우저 기본 &lt;select&gt;를 그대로 써요. 신뢰성이 최우선인 폼에서 쓰세요.</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Select.Root</h2>
      <div className="tableWrap">
        <table>
          <thead><tr><th>속성</th><th>타입</th><th>설명</th></tr></thead>
          <tbody>
            <tr><td>value / defaultValue / onValueChange</td><td>string | null</td><td>선택값이에요. 직접 관리할 수도, 맡길 수도 있어요.</td></tr>
            <tr><td>open / defaultOpen / onOpenChange</td><td></td><td>열림 상태도 같은 방식이에요 - 라우터나 분석 이벤트와 연결할 때 쓰세요.</td></tr>
            <tr><td>items</td><td>&#123; value, label &#125;[]</td><td>값과 표시 이름의 목록이에요. 버튼에 선택된 이름을 보여줄 때 쓰고, native 모드에서는 필수예요.</td></tr>
            <tr><td>presentation</td><td>모습 지정 | &quot;native&quot;</td><td>이 셀렉트만 다르게 열고 싶을 때 지정해요.</td></tr>
            <tr><td>aria-label</td><td>string</td><td>스크린 리더가 읽을 이름이에요. 버튼과 native 모드 양쪽에 연결돼요.</td></tr>
            <tr><td>searchable</td><td>boolean</td><td>팝업 안에 검색 입력을 넣어요. items가 필수예요.</td></tr>
            <tr><td>searchPlaceholder / emptyLabel</td><td>string</td><td>검색 입력의 안내 문구와, 결과가 없을 때 보여줄 문구예요.</td></tr>
            <tr><td>name / disabled</td><td></td><td>폼 연동과 비활성화예요.</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        키보드 조작, 타이핑 검색, 선택 상태 관리는 어떤 모습에서든 Base UI의 Select가
        똑같이 처리해요. 시트 모습은 같은 컴포넌트의 위치만 바꾼 것이라서, 스크린
        리더에게는 언제나 하나의 셀렉트예요.
      </p>

      <h2>항목이 많다면: 검색</h2>
      <p>
        <code>searchable</code>을 켜면 팝업 맨 위에 검색 입력이 생기고, 입력할 때마다
        목록이 걸러져요. 폰의 바텀 시트에서도 똑같이 동작해요. 겉모습만 입력을 얹은 게
        아니라, 안에서 컴포넌트가 정식 콤보박스(combobox) 패턴으로 바뀌기 때문에 스크린
        리더에게도 올바르게 &quot;검색해서 고르는 입력&quot;으로 읽혀요.
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
      <p>
        검색 모드에서는 목록이 <code>items</code>에서 그려져서{' '}
        <code>Select.Content</code>를 비워 두면 돼요. Base UI가 걸러진 목록과 키보드
        하이라이트를 함께 관리해야 정확하거든요.
      </p>
    </div>
  )
}
