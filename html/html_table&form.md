# HTML/ 요소 - 표 콘텐츠 & 양식





###### table, tr, th, td

----

tr: table row  

th: table head

td: table data

```
  <table>
        <tr>
            <th>type</th>
            <th>value</th>
        </tr>
        <tr>
            <td>1</td>
            <td>2</td>
        </tr>
        <tr>
            <td>3</td>
            <td>4</td>
        </tr>
    </table>
```

  <table>
        <tr>
            <th>type</th>
            <th>value</th>
        </tr>
        <tr>
            <td>1</td>
            <td>2</td>
        </tr>
        <tr>
            <td>3</td>
            <td>4</td>
        </tr>
    </table>





###### th

---

: 칸의 머리글을 지정



| 속성    | 의미                                    | 값                                                           | 기본값 |
| ------- | --------------------------------------- | ------------------------------------------------------------ | ------ |
| abbr    | 열에 대한 간단한 설명                   |                                                              |        |
| headers | 작은머리글을 포함하는 큰 머리글의 id값. |                                                              |        |
| colspan | 확장하려는 열의 수                      |                                                              | 1      |
| rowspan | 확장하려는 행의 수                      |                                                              | 1      |
| scope   | 자신이 누구의 머리글 칸인지 명시        | col: 자신의 열<br />colgroup: 모든 열<br />row: 자신의 행<br />rowgroup: 모든 행<br />auto | auto   |

- header, span 사용법

```
  <table>
        <tr>
            <th colspan="2" id="th-data">데이터</th>
        </tr> 
        <tr>
            <th headers="th-data">type</th>
            <th headers="th-data">value</th>
        </tr>
        <tr>
            <td>1</td>
            <td>2</td>
        </tr>
        <tr>
            <td>3</td>
            <td>4</td>
        </tr>
   </table>    
```

  <table>
        <tr>
            <th colspan="2" id="th-data">데이터</th>
        </tr> 
        <tr>
            <th headers="th-data">type</th>
            <th headers="th-data">value</th>
        </tr>
        <tr>
            <td>1</td>
            <td>2</td>
        </tr>
        <tr>
            <td>3</td>
            <td>4</td>
        </tr>
   </table>    



###### td

---

: 일반 칸을 지정

| 속성    | 의미 | 값   | 기본값 |
| ------- | ---- | ---- | ------ |
| headers |      |      |        |
| colspan |      |      |        |
| rowspan |      |      |        |

```
  <table>
        <tr>
            <th colspan="2" id="th-data">데이터</th>
        </tr> 
        <tr>
            <th headers="th-data" id="th-type">type</th>
            <th headers="th-data" id="th-value">value</th>
        </tr>
        <tr>
            <td headers="th-type">1</td>
            <td headers="th-value">2</td>
        </tr>
        <tr>
            <td headers="th-type">3</td>
            <td headers="th-value">4</td>
        </tr>
   </table>    
```

  <table>
        <tr>
            <th colspan="2" id="th-data">데이터</th>
        </tr> 
        <tr>
            <th headers="th-data" id="th-type">type</th>
            <th headers="th-data" id="th-value">value</th>
        </tr>
        <tr>
            <td headers="th-type">1</td>
            <td headers="th-value">2</td>
        </tr>
        <tr>
            <td headers="th-type">3</td>
            <td headers="th-value">4</td>
        </tr>
   </table>    



###### caption

---

: 표의 제목을 설정할 때 사용

- open table 태그 바로 다음에 작성해야 한다.
- table 당 하나의 caption만 사용가능하다.

```
  <table>
    <caption> 테이블 </caption>
        <tr>
            <th colspan="2" id="th-data">데이터</th>
        </tr> 
        <tr>
            <th headers="th-data" id="th-type">type</th>
            <th headers="th-data" id="th-value">value</th>
        </tr>
        <tr>
            <td headers="th-type">1</td>
            <td headers="th-value">2</td>
        </tr>
        <tr>
            <td headers="th-type">3</td>
            <td headers="th-value">4</td>
        </tr>
   </table>    
```

  <table>
    <caption> 테이블 </caption>
        <tr>
            <th colspan="2" id="th-data">데이터</th>
        </tr> 
        <tr>
            <th headers="th-data" id="th-type">type</th>
            <th headers="th-data" id="th-value">value</th>
        </tr>
        <tr>
            <td headers="th-type">1</td>
            <td headers="th-value">2</td>
        </tr>
        <tr>
            <td headers="th-type">3</td>
            <td headers="th-value">4</td>
        </tr>
   </table>    



###### colgroup, col

---

: 표의 열들을 공통적으로 정의하는 컬럼과 그 집합

| 속성 | 의미           | 값            | 기본값 |
| ---- | -------------- | ------------- | ------ |
| span | 연속되는 열 수 | 숫자 (number) | 1      |

```
  <table>
    <caption> 테이블 </caption>
      	<colgroup>
            <col style="backgound-color:tomato;" span="2">
        </colgroup>
        <tr>
            <th colspan="2" id="th-data">데이터</th>
        </tr> 
        <tr>
            <th headers="th-data" id="th-type">type</th>
            <th headers="th-data" id="th-value">value</th>
        </tr>
        <tr>
            <td headers="th-type">1</td>
            <td headers="th-value">2</td>
        </tr>
        <tr>
            <td headers="th-type">3</td>
            <td headers="th-value">4</td>
        </tr>
   </table>    
```

![image-20200313113649366](C:\Users\112606\AppData\Roaming\Typora\typora-user-images\image-20200313113649366.png)  



###### thead / tbody / tfoot

----

thead: 머리글

tbody: 본문

tfoot: 바닥글을 지정할 때 사용한다.

- 기본적으로 테이블의 레이아웃에 영향을 주지 않으며 의미적으로 구분하기 위해 사용

```
  <table>
    <caption> 테이블 </caption>
      	<colgroup>
            <col style="backgound-color:tomato;" span="2">
        </colgroup>
     <thead>   
        <tr>
            <th colspan="2" id="th-data">데이터</th>
        </tr> 
        <tr>
            <th headers="th-data" id="th-type">type</th>
            <th headers="th-data" id="th-value">value</th>
        </tr>
     </thead>
     <tbody>
        <tr>
            <td headers="th-type">1</td>
            <td headers="th-value">2</td>
        </tr>
        <tr>
            <td headers="th-type">3</td>
            <td headers="th-value">4</td>
        </tr>
     </tbody>
   </table>    
```



###### form

---

: 웹서버에 정보를 제출하기 위한 양식의 범위를 지정할 때 사용한다.

- form은 다른 form 을 자식요소로 포함할 수 없다.

| 속성         | 의미                                                       | 값              | 기본값 |
| ------------ | ---------------------------------------------------------- | --------------- | ------ |
| action       | 전송한 정보를 제출할 웹페이지의 URL                        | URL             |        |
| autocomplete | 사용자가 이전에 입력한 값으로 자동완성 할 것인지 여부      | on/off          | on     |
| method       | 서버로 전송한 http 방식                                    | get, post       | get    |
| name         | 고유한 양식의 이름                                         |                 |        |
| novalidate   | 서버로 전송 시 양식 데이터의 유효성을 검사하지 않도록 지정 |                 |        |
| taget        | 서버로 전송 후 응답받을 방식을 지정                        | _selft / _blank | _self  |

```
  <form action="/login" method="post" autocomplete="off" target="_self">
        <input type="email" name="email">
        <input type="password" name="password">
        <button type="submit">로그인</button>
    </form>
```

<span style="color:blue;"> input</span>

| 속성         | 의미                                                         | 값      | 기본값                                   |
| ------------ | ------------------------------------------------------------ | ------- | ---------------------------------------- |
| autocomplete | 자동완성 사용 유무                                           | on/off  | on                                       |
| autofocus    | 페이지가 로드될 때 자동으로 포커싱 됨                        | boolean | 문서내 고유                              |
| checked      | 선택유무                                                     | boolean | type 속성값이 radio, checkbox일 경우에만 |
| form         | <form> 의 바깥영역에 input이 따로 쓰일 때, form의 id값을 입력하여 이어줌. |         | 해당 form의 후손이 아닐경우만            |
| name         | 양식의 이름                                                  |         |                                          |
| placehold    | 사용자가 입력할 값의 힌트                                    |         |                                          |
| type         | 입력받을 데이터의 종류                                       | text    |                                          |
| value        | 양식의 초기값                                                |         |                                          |
| disable      | 비활성화 시킴                                                |         |                                          |
| readonly     | 포커싱은 되나 값을 수정할 수 없음                            |         |                                          |

---

<span style="color: green;"> type 종류 </span>

| 값       | 데이터종류 | 특징                                                        |
| -------- | ---------- | ----------------------------------------------------------- |
| button   | 일반버튼   | button tag처럼 사용되나 javascript로 동작을 구현해 줘야 함. |
| checkbox | 체크박스   |                                                             |
| email    | 이메일     |                                                             |
| file     | 파일       |                                                             |
| password | 비밀번호   |                                                             |
| submit   | 제출버튼   | 해당 form 범위 내 고유한 양식                               |
| text     | 일반텍스트 |                                                             |
| radio    | 체크       | 다수 중 1개만 선택가능                                      |
| reset    | 리셋       |                                                             |
| range    | 범위       |                                                             |
| number   | 숫자       |                                                             |





<span style="color:blue;"> method </span>

- get방식

: URL에 입력정보가 그대로 노출된다.

![image-20200313120749255](C:\Users\112606\AppData\Roaming\Typora\typora-user-images\image-20200313120749255.png)



- POST방식

: URL에 입력정보가 노출되지 않음.

![image-20200313121025241](C:\Users\112606\AppData\Roaming\Typora\typora-user-images\image-20200313121025241.png) 





###### label

---

: 라벨 가능 요소의 제목을 나타냄.

- label 바깥에 라벨 가능요소가 있을 경우 해당 요소에 <strong>for 속성=input의 id 값</strong> 으로 포함시킬 수 있다.
- 라벨 가능요소 : button / input / progress / select / textarea

```
<!-- 라벨 가능 요소를 참조 -->
<input type="checkbox" id="user-agreement" />
<label for="user-agreement">동의하십니까?</label>

<!-- 라벨 가능 요소를 포함 -->
<label><input type="checkbox" />동의하십니까?</label>
```

![image-20200313125521876](C:\Users\112606\AppData\Roaming\Typora\typora-user-images\image-20200313125521876.png)	



###### button

---

: 선택 가능한 버튼을 지정

input과 동일한 속성을 사용한다. ex> autofocus, disabled, form, name, type...

```
<button> 버튼 </button>
```

<button> 버튼 </button>



###### textarea

---

: <strong>여러 줄</strong>의 일반 텍스트 양식을 작성할 때 사용.

- input과 동일한 속성을 사용하며 + 양식의 줄 수를 나타내는 rows를 추가로 사용할 수 있으며
  하단부를 클릭해 크기를 조절할 수 있다.

1줄의 텍스트양식을 작성할 때에는 input을 사용한다.

    <textarea rows="6" placeholder="설명을 입력하세요!"></textarea>

  <textarea rows="6" placeholder="설명을 입력하세요!"></textarea>



###### fieldset, legend

----

fieldset: 같은 목적의 양식을 그룹화

legend: 제목 지정



<strong> fieldset 속성 </strong>

| 속성     | 의미                                    | 값      |
| -------- | --------------------------------------- | ------- |
| disabled | 그룹 내 모든 양식요소를 비활성화        | boolean |
| form     | 그룹이 속할 하나이상의 form의 id 속성값 |         |
| name     | 그룹의 이름                             |         |

```
<form>
  <fieldset>
    <legend>Coffee Size</legend>
    <label>
        <input type="radio" name="size" value="tall" />
        Tall
    </label>
    <label>
        <input type="radio" name="size" value="grande" />
        Grande
    </label>
    <label>
        <input type="radio" name="size" value="venti" />
        Venti
    </label>
  </fieldset>
</form>
```

<form>   <fieldset>     <legend>Coffee Size</legend>     <label>         <input type="radio" name="size" value="tall" />         Tall     </label>     <label>         <input type="radio" name="size" value="grande" />         Grande     </label>     <label>         <input type="radio" name="size" value="venti" />         Venti     </label>   </fieldset> </form>





###### select, datalist, optgroup, option

---

option : 옵션

optgroup : 옵션그룹

select : 선택메뉴

datalist : 자동완성



- select

| 속성         | 의미                        | 값      | 기본값 |
| ------------ | --------------------------- | ------- | ------ |
| autocomplete | 자동완성                    | on/off  | on     |
| disabled     | 선택메뉴 비활성화           | boolean |        |
| form         |                             |         |        |
| multiple     | 다중선택여부                | boolean |        |
| name         | 선택 메뉴의 이름            |         |        |
| size         | 한번에 볼 수 있는 행의 개수 | 숫자    | 0      |

```
   <label for="fuit"> favorite: </label>
   <select id="fruit" size="3" multiple>
        <optgroup label="내가 좋아하는 과일">
            <option value="apple">apple</option>
            <option value="mango">mango</option>
            <option value="banana">banana</option>
        </optgroup>
        <optgroup label="내가 싫어하는 과일">
            <option value="strawberry">strawberry</option>
            <option value="grape">grape</option>
        </optgroup>
    </select>
```



- datalist

input에 미리 정의된 옵션을 지정하여 자동완성 기능을 제공하는 데 사용.

<ul>
	<ul>
        <li>input의 list 속성 바인딩.</li>
        <li>option을 포함하여 정의된 옵션을 지정.</li>
    </ul>
</ul>

```
    <input list="fruits">
    
    <datalist id="fruits">
        <option value="Apple">
        <option value="Orange">
        <option value="Banana">
        <option value="Mango">
        <option value="Fineapple">
    </datalist>
```



- optgroup

| 속성     | 의미                   | 값      |
| -------- | ---------------------- | ------- |
| label    | (필수)옵션 그룹의 이름 |         |
| disabled | 옵션 그룹을 비활성화   | boolean |



- option

<ul>
    <ul>
        <li>선택적 빈태그로 사용 가능하다.</li>
    </ul>
</ul>

| 속성     | 의미                     | 값      | 기본값                               |
| -------- | ------------------------ | ------- | ------------------------------------ |
| disabled | 옵션을 비활성화          | boolean |                                      |
| label    | 표시될 옵션의 제목       |         | 생략되면 포함된 텍스트를 표시        |
| selectd  | 옵션이 선택되었음을 표시 | boolean |                                      |
| value    | 양식으로 제출될 값       |         | 생략되면 포함된 텍스트를 값으로 사용 |



###### progress

---

: 작업의 완료 진행률을 표시한다.



| 속성  | 의미          | 값   | 특징                                        |
| ----- | ------------- | ---- | ------------------------------------------- |
| max   | 작업의 총량   | 숫자 |                                             |
| value | 작업의 진행량 | 숫자 | max 속성을 생략할 경우 0~1 사이의 값이 필요 |

```
<progress value="70" max="100"></progress>
<progress value="0.7"></progress>
```

<progress value="70" max="100">70 %</progress>

<progress value="0.7"></progress>

