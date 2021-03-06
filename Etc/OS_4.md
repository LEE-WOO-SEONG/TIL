# OS 4일차 Computer Network



## Network 란?

: 컴퓨터들이 통신기술을 이용하여 그물망처럼 연결된 통신 이용형태. (두 대 이상의 컴퓨터들을 연결하고 서로 통신할 수 있게 하는 것.)



### OSI 7 Layer

- Physical layer

  : 데이터를 전기신호로 변환하여 송수신

- Data Link layer

  : 물리적 네트워크 사이의 데이터 송수신 담당

  : 대표적 프로토콜 : Ethernet 프로토콜

- Network layer

  : 다양하고 방대한 네트워크 상에서 컴퓨터간 논리적 연결을 위해 네트워크 계층이 필요함.

  : 대표적인 프로토콜 => IP 프로토콜

> - 패킷(packet) ?
>
> 네트워크 계층에서 정의되는 데이터 단위
>
> - 프레임 ?
>
> 데이터 링크 계층에서 정의되는 데이터 단위

- Transport layer
  1. 목적지에 신뢰할 수 있는 데이터의 전달을 담당
     - 데이터 전송중 손상/ 유실 확인을 위한 오류점검 기능
  2. 목적지의 어떤 응용프로그램에 데이터를 전달해야 하는지를 식별하는 기능 (포트)
     - 대표적인 프로토콜: TCP, UDP 프로토콜

> TCP(Transmission Control Protocol)
>
> : 연결형 프로토콜, 데이터의 전송 순서보장, 데이터의 신뢰성 보장
>
> 정보 유실이 일어나면 안되는 서비스에 사용. (EX.채팅)
>
> UDP(User Datagram Protocol)
>
> : 비 연결형 프로토콜, TCP 보다 전송속도가 빠르다. 주로 스트리밍/ 브로드캐스팅 서비스에 사용된다.
>
> 정보 유실이 조금은 일어나도 크게 상관이 없는 서비스에 사용.

