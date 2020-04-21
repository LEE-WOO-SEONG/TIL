### SEO란?

: Search Engine Optimize의 약자로 검색최적화를 의미한다.



### SEO의 목적

검색엔진 결과 페이지에서 웹사이트 순위와 노출도를 높여 자신의 콘텐츠를 검색결과 상위에 표시함으로써 사이트로의 사용들의 유입을 늘리고 검색키워드에 관련된 콘텐츠를 제공해 검색에 대한 니즈를 만족시켜 줌으로써 해당 브랜드의 인지도 향상 및 상품의 구매로까지 이어지게 할 수 있는 마케팅 전략.



### SEO를 향상시킬 수 있는 방법

- 표준을 준수한 HTML 작성 및 semantic tag 사용.

- Meta tag의 활용

  ```
  <head>
  	<meta name="title" content="제목">
  	<meta name="description" content="부연설명">
  	<meta name="keywords" content="사이트의 키워드">
  </head>
  ```

  1. meta title

  : 검색결과에서 사이트로 직접연결되는 링크형태로 표시되는 항목

  2. meta description

  : 웹페이지의 축약된 설명을 제공할 때 사용하며 검색결과에서 주어진 페이지의 정보를 미리보여주는 역할을 함.

  ```
  meta description 사용 시, 주의점
  
  : 웹사이트 내 모든 페이지에 동일한 description을 적용할 경우 스팸 구분 검색노출에 의해 불이익을 받을 수 있음.
  ```

  3. meta keywords

  : 검색엔진 순위를 결정하는 중요한 요소는 아니나, 중요한 주제를 담고있는 간결하고 축약된 목록을 넣는데 사용.

  4. robot meta tag

  : 검색결과에서 페이지가 사용자에게 게재되는 방식을 제어할 때 사용하는 tag.

  ```
  <head>
  	<meata naem="robots" content="noindex">
  </head>
  ```

  - name 속성값 robots은 명령어가 모든 크롤러에 적용됨을 지정한다.

    (특정 크롤러의 이름을 넣으면 해당 크롤러에게만 노출됨)

  - 다수의 meta tag사용으로 여러개의 크롤러를 개별적으로 지정할 수도 있다.

  - content value

    - all  - 색인생성이나 게제에 대한 제한이 없음. 기본값으로 명시적으로 사용하여도 아무 효과가 없다.

    - noindex - 검색결과에 이 페이지를 표시하지 않겠다.

    - nofollow - 이페이지의 링크를 따라가지 않겠다.

    - none - noindex. nofollow와 같음.

    - noarchive - 검색결과에 <em>저장된페이지 링크</em>를 표시하지 않겠다.

    - nosnippet - 검색결과에 이페이지에 관한 스니펫, 동영상 미리보기를 표시하지 않겠다. 단, 정적미리보기 이미지의 경우 사용자 환경개선에 도움이 될 경우 표시될 수 있다. 

    - max-snippet:[number] - 검색결과에 관한 text snippet의 최대 글자수를 지정하며, 해당명령어는 [number]가 지정되지 않으면 무시된다.

      ```
      number 값:
       0  - 표시할 snippet이 없다. = nosnippet.
      -1  - snippet 길이의 제한이 없다. 
      ```

    - max-image-preview:[setting] - 검색결과에 이 페이지가 표시될 때 사용할 미리보기 이미지의 최대크기를 설정.

      ```
      setting 값 :
      none      - 표시할 미리보기 이미지가 없다.
      standard  - 기본 미리보기 이미지가 표시될 수 있다.
      large     - 표시영역 너비까지 미리보기 이미지가 더 크게 표시될 수 있다.
      ```

    - max-video-preview:[number] - 검색결과에 이 페이지의 동영상에 대한 동영상 snippet에 최대 시간(초) 를 지정한다. 해당 명령어 또한 [number]가 지정되지 않으면 무시된다.

      ```
      지원 값 :
       0 - 최대 미리보기 이미지 설정에 따라 정적이미지만 사용할 수 있다.
      -1 - 제한이 없다.
      ```

    - notranslate : 검색결과에 페이지의 번역을 제공하지 않겠다.

    - noimageindex : 페이지에 있는 이미지의 색인을 생성하지 않겠다.

    - unavailable_after:[date/time] : 지정된 날짜/시간 이후에 검색결과에 이 페이지를 표시하지 않겠다.

      날짜/시간은 날짜/시간은 [RFC 822](http://www.ietf.org/rfc/rfc0822.txt), [RFC 850](http://www.ietf.org/rfc/rfc0850.txt), [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) 등의 형식으로 표현해야 한다.

      해당명령어는 유효한 [date/time] 값을 지정하지 않으면 명령어가 무시된다. 

      해당명령어를 사용하지 않으면 기본적으로 콘텐츠의 만료일은 지정되지 않는다.

  - 상기 content value 값들을 다수로 지정하고 싶으면 쉼표를 사용하여 처리한다.

    ```
    meta name="robots" content="noindex, nofollow"
    ```

  - 여러 크롤러가 다른 명령어와 함께 지정된 경우 검색엔진은 부정명령어를 모두 사용하게 된다.

    ```
    <meta name="robots" content="nofollow">
    <meta name="googlebot" content="noindex">
    ```

    : 상기와 같이 작성할 경우 googlebot이 크롤링 할 때 noindex, nofollow 명령어를 모두 해석한다.

  - data-nosnippet HTML 속성 사용

    : HTML 페이지의 텍스트 중에서 스니펫으로 사용하지 않을 텍스트를 지정할 수 있다.

    ```
    <p>This text can be shown in a snippet
    <span data-nosnippet>and this part would not be shown</span>.<p>
    
    <div data-nosnippet>not in snippet</div>
    <div data-nosnippet="true">also not in snippet</div>
    ```

    단,  자바스크립트를 통해 기존 노드의 `data-nosnippet` 속성을 추가하거나 삭제하면 안 되며, 자바스크립트를 통해 신규 DOM 요소를 추가하는 경우 필요에 따라 `data-nosnippet` 속성을 추가할 수 있다.




#### SEO 점수확인 사이트 : [seocert][https://www.seocert.net/]

