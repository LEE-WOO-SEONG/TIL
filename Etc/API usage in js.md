# API usage in js



## API란?

Application Programming interface의 약자.

프로그래밍 간의 수월한 상호작용을 위한 매개체?

예를들면 컴퓨터와 사람은 키보드나 마우스와 같은 입력장치로 서로 상호작용을 하고, 자판기는 버튼으로 사용자의 요구를 수렴한다.

이렇게 상효작을 위한 매개체가 되는 것들을 api라 한다.



## 카카오 지도 API 사용 기

 

카카오 자바스크립트 키 : b546e93a88a2cb5872b817350ef0d1c4

```html
<script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=b546e93a88a2cb5872b817350ef0d1c4"></script>
  <script>
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
      mapOption = {
        center: new kakao.maps.LatLng(37.545191, 127.057103), // 지도의 중심좌표
        level: 6, // 지도의 확대 레벨
        mapTypeId: kakao.maps.MapTypeId.ROADMAP // 지도종류
      };

    // 지도를 생성한다
    var map = new kakao.maps.Map(mapContainer, mapOption);

    // 마커가 표시될 위치
    var markerPosition = new kakao.maps.LatLng(37.545191, 127.057103);

    // 지도에 마커를 생성
    var marker = new kakao.maps.Marker({
      position: markerPosition,
      clickable: true
    });

    // 마커가 지도 위에 표시되도록 설정
    marker.setMap(map);

    var iwContent =
      '<div style="padding:5px;">Seongsu station</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
      iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

    // 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({
      content: iwContent,
      removable: iwRemoveable
    });

    // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(marker, 'click', function () {
      // 마커 위에 인포윈도우를 표시합니다
      infowindow.open(map, marker);
    });
  </script>
```

