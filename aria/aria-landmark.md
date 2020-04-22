# ARIA



### aria는 role, state, property 3가지로 범주로 사용됨.



- aria 사용원칙

1. 역할(role)은 약속이다. (각 역할에 맞는 인터랙션 기능구현)

   : aria role을 적용했을 경우 html입력요소와는 달리 브라우저가 키보드 동작이나 스타일링을 제공하지 않는다. 

   예를들어 div tag에 `role="button"` 속성을 부여하였을 경우 `button` tag로 mark-up 했을 시와 다르게 마우스 클릭 이벤트 뿐만아니라 키보드 인터랙션이 발생하지 않기 때문에 이를  javascript로 구현시켜줘야 한다.

   <span style="color:blue;">결론적으로 aria role은 지정한 role에 대해 기대되는 동작까지 정의 해 주어야 함을 명심한다.</span>

2. aria는 은폐와 강화를 통해 힘과 위험 모두를 창출할 수 있다.

   : 본래 특정 tag가 가진 의미나 콘텐츠의 목적성을 변경하거나 감출 수 있다.

   ```
   <table role="log">
   
   </table>
   
   <ul role="navigation">
   	<li><a></a><li>
   	<li><a></a><li>
   </ul>	
   ```

   상기와 같이 table, ul tag에 다른 role을 부여할 시, 하위 table 요소나 list 요소들은 더이상 테이블이나 리스트목록이 아니게 된다.



- [landmark][https://ko.wikipedia.org/wiki/랜드마크]란?

  : landmark는 원래 탐험가나 여행자 등이 특정지역을 돌아다니던 중에 기존 장소로 돌아올 수 있도록 표식을 해둔것을 가리키는 말이다. 

- aria land마크의 역할(role)

  : 특정 영역에 role을 부여하여 웹 페이지의 구성과 구조를 식별하는 방법을 제공한다. 랜드마크 영역은 스킵링크 또는 브라우저 확장을 통한 향상된 키보드 탐색으로도 사용될 수 있다.

  - HTML 섹션화 요소

  HTML의 몇몇 섹션화 요소들은 자동으로 aria landmark 영역을 생성한다.

  | HTML요소 | 기본 랜드마크 역할                                           |
  | -------- | ------------------------------------------------------------ |
  | aside    | complementary                                                |
  | footer   | body 요소의 컨텍스트에 있는 경우 contentinfo                 |
  | header   | body 요소의 컨텍스트에 있는 경우 banner                      |
  | main     | main                                                         |
  | nav      | navigation                                                   |
  | section  | aria-labelledby나 aria-label을 사용하여 접근 가능한 이름을 가지는 경우 region |

  

- 사용법

- - 만약 동일한 role이 한 페이지내에서 한번 이상 사용된다면 각 tag들은 고유한 label을 가져야 한다.

- - 특정 영역이 heading을 가지면 `aria-labelledby` 속성을 통해 해당 heading은 그 영역의 label로써 쓰여질 수 있다.

  ```
  <div role="banner" aria-labelledby="아이디">
  	<h1 id="아이디"> 제목입니다. </h1>
  </div>
  ```

- - 만약 특정 영역이 heading을 가지지 않는다면 `aria-label` 속성을 통해 label을 직접 입력하여 줄 수 있다.

- - landmark role과 label naming 시 중첩사용을 피한다.

  ```
  <div role="navigation" aria-label="site navigation">
  
  </div>
  ```

  : 상기와 같을 경우 sreen reader기에서는 site navigation navigation으로 읽힐 수 있기 떄문.





- landmark `role` 의 종류

<details>
    <summary>landmark-role</summary>
    <ul>
        <li>banner</li>
        <li>complementary</li>
        <li>contentinfo</li>
        <li>form</li>
        <li>main</li>
        <li>navigation</li>
        <li>region</li>
        <li>search</li>
    </ul>
</details>



###### banner 

: 웹사이트 내 각 페이지의 시작부분에 있는 사이트 지향적인 콘텐츠를 식별하는데 사용되며 전반적으로 <u>로고</u>나 사이트 제공자의 신분같은것들, <u>검색도구</u> 등등을 포함한다.

배너는 보통 페이지의 최 상단에 나타남.

- **각 페이지는 하나의 `banner`랜드마크를 가질 수 있다.**

- **`banner`랜드마크는 최상위 랜드마크여야 한다.**

- html tag 중 header의 역할

```
<div role="banner">
	<h1>title</h1>
	- content - 
</div>
```



###### complementary

: 문서의 supporting 섹션으로 DOM 계층상 유사한 수준에서 주 콘텐츠를 보완하도록 설계되었으며, <u>주 콘텐츠로부터 분리되는 경우에도 여전히 유의미하게 존재가능한 영역</u>이다.

- **최상위 랜드마크여야 한다.**

- **사용 갯수의 제한은 없으나 2개 이상 사용된다면 각각은 고유한 레이블을 가져야 한다.**

- **html tag 중 aside의 역할**



###### contentinfo

: 일반적으로 페이지의 가장 하단 영역에 존재하는 섹션을 가리키며 저작권 및 개인정보와 같은 정보를 포함하는 영역을 나타낸다.

- **최상위 랜드마크여야 한다.**

- **각 페이지당 하나의 랜드마크만 존재가 가능하다.**

- html tag 중 footer의 역할



###### form

: 특정 양식을 포함하는 영역 중 검색(search)양식이 아닌 영역을 나타낼 때 사용한다.

ex) 로그인 양식

- **양식이 검색기능으로 사용되는 경우 `search` 랜드마크를 사용해야 한다.**

- **사용자들이 양식의 목절을 이해할 수 있도록 <span style="color: red;"> 반드시 label을 가져야 한다.</span>** (form tag 사용시에도 동일)

  (aria-labelledby로 legend나 heading tag의 id를 연결하여 label을 부여.)

- **가능한 `form` 랜드마크에 포함된 컨트롤 들은 네이티브 호스트의 의미론을 사용해야 한다.**

  ex) 버튼구성 시 `span` tag에 의한 mark-up 이후 클릭 이벤트이 바인딩 보다는 `button` tag사용을 권장.

  버튼 - button

  입력 - input/textarea

  선택 - select/radio/datalist

- html tag 중 form의 역할



###### main

: 페이지의 주요 콘텐츠를 식별할 때 사용됨.

- **최상위 랜드마크여야 한다.**

- **각 페이지당 하나의 랜드마크만 존재가 가능하다.**
- html tag 중 main의 역할



###### navigation

: 웹 사이트나 페이지 콘텐츠를 탐색하는데 사용되도록 의도된 링크의 그룹(목록)을 식별할 때 사용된다.

- **사용 갯수의 제한은 없으나 2개 이상 사용된다면 각각은 고유한 레이블을 가져야 한다.**

- **navigation 랜드마크가 페이지의 다른 navigation 랜드마크와 동일한 링크세트를 가지는 경우(global navigation), 각 navigation 랜드마크에 대해 동일한 레이블을 사용해야 한다.**
- **만약 페이지 내 navigation이 한개라면 label은 선택적이다.**
- html tag중 nav의 역할



###### region

: 사용자가 섹션으로 이동할 수 있어야 할 정도로 충분히 중요한 콘텐츠를 포함하는 페이지의 인식 가능한 섹션.

###### html section tag

: 챕터, 탭 페이지, 논문의 번호가 매겨진 섹션, 소개, 뉴스항목들에 대한 정보를 담는 영역으로 일반적인 컨테이너 요소가 아니라 문서의 outline에 명시적으로 나열되는 경우에 사용되는 tag.



- **<span style="color: red;"> 반드시 label을 가져야 한다.</span>** ("어떠한" 영역인지의 명시 필요.)

- **둘 이상의 랜드마크를 포함하면 각각은 고유한 label을 가져야 한다.**

- label 네이밍 시 aria-label / aria-labelledby 외 <em>title</em> 속성으로도 표현할 수 있으나 title은 기본적으로 label보다는 툴팁에 적절한 <u>보조정보</u>를 나타내는데 사용하는 속성으로 최후의 방법으로 사용하는 수단으로 그다지 권장하지는 않는다. 
- html tag 중 section의 역할



###### search

: 검색기능을 만들기 위해 결합된 항목과 객체들의 전체집합을 포함할 때 사용한다.

- **양식이 검색기능으로 사용되는 경우 form 랜드마크 대신 search 랜드마크를 사용해야 한다.**
- **둘 이상의 랜드마크를 포함하면 각각은 고유한 label을 가져야 한다.**

- <u>**html에서 search를 의미하는 tag는 없다.**</u>

