<template>
  <div>
    <Layout>
      <!-- pc 환경 style -->
      <div class="pt-8 md:pt-16 is-pc">
        <div class="flex">
          <div style = "width: 47.5%;">
            <div class="flex flex-col items-left mb-2 text-ui-primary">
              <h2 class="text-3xl text-6xl font-black tracking-tighter border-none">
                uEngine6-BPM
              </h2>
              <div v-for="(paragraph, index) in paragraphs" :key="index">
                <p class="lead mt-0 mb-5" style="font-size: 18px;" v-html="paragraph.content"></p>
              </div>
              <div class="flex">
                <g-link
                  v-for="(link, index) in links"
                  :key="index"
                  :to="link.to"
                  class="glink-margin px-6 py-4 text-2xl leading-none text-white border rounded-lg shadow-lg bg-ui-primary border-ui-primary transition-all duration-200 ease-out transform hover:shadow-xl hover:-translate-y-1"
                >
                  {{ link.text }}
                </g-link>
              </div>
            </div>
          </div>
          <div style = "width: 47.5%; margin-left: 5%; margin-top: 140px;">
            <iframe style ="width: 100%; height: 350px;"
              src="https://www.youtube.com/embed/ZmytoLlvpMs"
              title="YouTube video player" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen
            >
            </iframe>
          </div>
        </div>

        <div class="pt-8 mx-auto mt-8 border-t md:mt-16 md:pt-16 border-top border-ui-border max-w-screen-sm"></div>
        <h2 class="sub-title">FEATURES</h2>
        <!-- 텍스트 왼쪽 -->
        <div v-for="(description, index) in mainDescriptions" :key="index" style="margin-top: 50px;" class="flex container">
          <template v-if="index % 2 === 0">
            <div style="width: 47.5%;">
              <h3 style="font-size: 30px; font-weight: 500; margin: 20px 0px 50px 0px;">{{ description.title }}</h3>
              <div style="font-size: 20px;">
                {{ description.content }}
              </div>
            </div>
            <g-image :src="description.image" style="width: 47.5%; margin-left: 5%;" />
          </template>
          <template v-else>
            <g-image :src="description.image" style="width: 47.5%;" />
            <div style="width: 47.5%; margin-left: 5%;">
              <h3 style="font-size: 30px; font-weight: 500; margin: 20px 0px 50px 0px;">{{ description.title }}</h3>
              <div style="font-size: 20px;">{{ description.content }}</div>
            </div>
          </template>
        </div>
        <br><br><br>
      </div>

      <!-- 모바일 환경 style -->
      <div class="is-mobile container">
        <div style="width: 100%;">
          <div class="flex flex-col items-left mb-2 text-ui-primary">
            <h2 class="text-3xl text-6xl font-black tracking-tighter border-none">
              uEngine6-BPM
            </h2>
            <div v-for="(paragraph, index) in paragraphs" :key="index">
              <p class="lead mt-0 mb-5" style="font-size: 18px;" v-html="paragraph.content"></p>
            </div>
            <div class="flex">
              <g-link
                v-for="(link, index) in links"
                :key="index"
                :to="link.to"
                style="font-size: 14px; font-weight: 500;"
                class="glink-margin px-6 py-4 text-2xl leading-none text-white border rounded-lg shadow-lg bg-ui-primary border-ui-primary transition-all duration-200 ease-out transform hover:shadow-xl hover:-translate-y-1"
              >
                {{ link.text }}
              </g-link>
            </div>
          </div>
        </div>
        <div style = "width: 100%;">
          <iframe style ="width: 100%; height: 300px;"
            src="https://www.youtube.com/embed/ZmytoLlvpMs"
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen
          >
          </iframe>
        </div>
        <div class="pt-8 mx-auto mt-8 border-t md:mt-16 md:pt-16 border-top border-ui-border max-w-screen-sm"></div>
        <h2 class="sub-title">FEATURES</h2>

        <div v-for="(description, index) in mainDescriptions" :key="index" class="content-section">
          <div class="content-text">
            <h3 style="text-align: center;">{{ description.title }}</h3>
            <div>{{ description.content }}</div>
          </div>
          <img :src="description.image" class="content-image" alt="Description Image">
        </div>
      </div>

      <div class="container">
        <div>
            <h2 class="sub-title is-mobile-sub-title" style="margin: 50px 0;">Other features</h2>
            <div style="margin-bottom: 50px;">
              <dl class="accordion">
                <div v-for="(item, index) in accordionItems" :key="index"
                   style="margin-bottom: 30px;"
                >
                  <dt>
                    <a href="#" style="font-size: 20px; font-weight: 700;">{{ item.title }}</a>
                  </dt>
                  <dd class="text-gray-700" v-html="item.content"></dd>
                </div>
              </dl>
            </div>
            
            <!-- <div class="local-scroll">
                <a href="https://github.com/uengine-oss/uEngine6" class="btn btn-mod btn-large btn-round btn-hover-anim" target="_blank"><span>github</span></a>
            </div> -->
        </div>                                
      </div>

      <div class="pt-8 mx-auto mt-8 border-t md:mt-20 md:pt-20 border-top border-ui-border max-w-screen-sm"></div>

      <h2 class = "sub-title is-mobile-sub-title" style="margin-bottom: 50px;">Trusted by</h2>
      <g-image style ="width: 100%;" src="../../uengine-image/cases.png"></g-image>

      <!-- uEngine 제품 그룹 섹션 위치 -->
      <div class="pt-8 mx-auto mt-8 border-t md:mt-20 md:pt-20 border-top border-ui-border max-w-screen-sm"></div>

      <!-- <h2 class = "sub-title is-mobile-sub-title" style="margin-bottom:30px;">왜 유엔진에서는 BPM 제품을 오픈소스화 한 것인가요?</h2>
      <g-image style ="width:100%;" src="../../uengine-image/96.png"></g-image>


        <div style = "line-height:30px; font-weight:500; font-size:16px;">
          유엔진 BPM 프로젝트는 기존 고가의 라이센스 비용으로만 접할 수 있던 BPMS 제품을 오픈소스 형태로 제공하고,
          이를 적용하기 위한 교육과 컨설팅 서비스를 제공함으로써,
          컨설팅 비용 중심의 예산구조를 통한 충실한 교육과 내재화 달성,
          소스코드의 제공을 통한 고객 요건에 중심을 둔 충실한 커스터마이징, 다수의 서비스 채널을 허용합니다.
          BPM도입에서의 고려사항 중 기술적인 내용과 관계있는 사항은, 얼마나 용이하게 커스터마이징 가능한가와 우리 조직 시스템 환경에 부담없이 쉽게 융합될 수 있느냐, 입니다.
          이러한 커스터마이저빌리티와 리스크 낮은 융합을 위해 유엔진BPMS의 아키텍처는 "객체지향 컴포넌트 프레임워크"의 접근방식인 IoC (제어권의 반전)과 "설계의 재사용"의 컨셉을 적용하고 있습니다.
          이는, 조직도 찾기 로직의 분리, 액티비티 유형의 컴포넌트 인터페이스화, 엔진상 발생 이벤트의 리스너 등의 컴포넌트 인터페이스를 제공하여
          BPM Hot-spot 서비스(고정부위)와 BPM 커스터마이징 빈발요소(가변부위)를 정제한 경계를 형성하며 고정부위의 서비스로서,
          리플렉션을 통한 액티비티 컴포넌트 UI의 자동생성, 인스턴스 데이터의 관리, MQ처리, OLAP분석처리등의 기능을 기반 제공함으로서
          개발자로 하여금 BPM 기반 개발에 있어 BPM하부 기술에 대한 어떠한 고민도 하지 않더라도 커스터마이징을 용이하게 하는 접근방식입니다.
          이러한 접근방식은 이미 Spring Framework 등, 다양한 프레임워크에서의 접근방식을 BPM기반 시스템 개발의 영역에 대입한 것으로,
          일반적으로 패키지 기반으로만 제공되어 Server/Client 방식의 연계만을 허용하는 BPM제품에서의 리스크를 대폭 줄이고 가용성을 최대화하는 기술적 기반이 됩니다.
        </div>
        <br><br>
        
        Zero Code & Extensible Vocalbulary 섹션 -->

        <section class="pb-0 mb-40">
          <div class="container">                    
              <div>
                  <div class="text-center">
                      <h2 class="sub-title is-mobile-sub-title" style="line-height: 1.5; margin-bottom: 50px;">왜 유엔진에서는 BPM 제품을 오픈소스화 한 것인가요?</h2>
                      <div style="display: flex; justify-content: center; margin-bottom: 50px;">
                          <img src="../../uengine-image/96.png" alt="Image Description" />
                      </div>
                  </div>
              </div>
              <div>
                  <p style="line-height: 1.8;">
                    유엔진 BPM 프로젝트는 기존 고가의 라이센스 비용으로만 접할 수 있던 BPMS 제품을 오픈소스 형태로 제공하고, 이를 적용하기 위한 교육과 컨설팅 서비스를 제공함으로써, 컨설팅 비용 중심의 예산구조를 통한 충실한 교육과 내재화 달성, 소스코드의 제공을 통한 고객 요건에 중심을 둔 충실한 커스터마이징, 다수의 서비스 채널을 허용합니다. 
                    BPM도입에서의 고려사항 중 기술적인 내용과 관계있는 사항은, 얼마나 용이하게 커스터마이징 가능한가와 우리 조직 시스템 환경에 부담없이 쉽게 융합될 수 있는가 입니다. 
                    이러한 커스터마이저빌리티와 리스크 낮은 융합을 위해 유엔진BPMS의 아키텍처는 "객체지향 컴포넌트 프레임워크"의 접근방식인 IoC (제어권의 반전)과 "설계의 재사용"의 컨셉을 적용하고 있습니다. 
                    이는, 조직도 찾기 로직의 분리, 액티비티 유형의 컴포넌트 인터페이스화, 엔진상 발생 이벤트의 리스너 등의 컴포넌트 인터페이스를 제공하여 BPM Hot-spot 서비스(고정부위)와 BPM 커스터마이징 빈발요소(가변부위)를 정제한 경계를 형성하며 고정부위의 서비스로서, 리플렉션을 통한 액티비티 컴포넌트 UI의 자동생성, 인스턴스 데이터의 관리, MQ처리, OLAP분석처리등의 기능을 기반 제공함으로서 개발자로 하여금 BPM 기반 개발에 있어 BPM하부 기술에 대한 어떠한 고민도 하지 않더라도 커스터마이징을 용이하게 하는 접근방식입니다. 
                    이러한 접근방식은 이미 Spring Framework 등, 다양한 프레임워크에서의 접근방식을 BPM기반 시스템 개발의 영역에 대입한 것으로, 일반적으로 패키지 기반으로만 제공되어 Server/Client 방식의 연계만을 허용하는 BPM제품에서의 리스크를 대폭 줄이고 가용성을 최대화하는 기술적 기반이 됩니다.                            
                  </p>
              </div>
          </div>
        </section>

        <div class="pt-8 mx-auto mt-8 border-t md:mt-16 md:pt-16 border-top border-ui-border max-w-screen-sm"></div>

        <h2 class="sub-title is-mobile-sub-title">License</h2>
        <h3>uEngine Open Source License : LGPL</h3>

        <table style="width: 100%;">
          <tr><!-- 첫번째 줄 시작 -->
              <td>주요 오픈소스SW<br>라이선스 비교</td>
              <td>무료<br>이용가능</td>
              <td>배포<br>허용가능</td>
              <td>소스코드<br>취득가능</td>
              <td>소스코드<br>수정가능</td>
              <td>2차적 저작물<br>재공개 의무</td>
              <td>독점SW와<br>결합가능</td>
          </tr><!-- 첫번째 줄 끝 -->

          <tr><!-- 두번째 줄 시작 -->
              <td>GPL</td>
              <td>O</td>
              <td>O</td>
              <td>O</td>
              <td>O</td>
              <td>O</td>
              <td>X</td>
          </tr><!-- 두번째 줄 끝 -->

          <tr><!-- 세번째 줄 시작 -->
              <td>LGPL</td>
              <td>O</td>
              <td>O</td>
              <td>O</td>
              <td>O</td>
              <td>O</td>
              <td>O</td>
          </tr><!-- 세번째 줄 끝 -->

          <tr><!-- 넷번째 줄 시작 -->
              <td>MPL</td>
              <td>O</td>
              <td>O</td>
              <td>O</td>
              <td>O</td>
              <td>O</td>
              <td>O</td>
          </tr><!-- 넷번째 줄 끝 -->

          <tr><!-- 다섯번째 줄 시작 -->
              <td>BSD<br>Licence</td>
              <td>O</td>
              <td>O</td>
              <td>O</td>
              <td>O</td>
              <td>X</td>
              <td>O</td>
          </tr><!-- 다섯번째 줄 끝 -->

          <tr><!-- 여섯번째 줄 시작 -->
              <td>Apache<br>Licence</td>
              <td>O</td>
              <td>O</td>
              <td>O</td>
              <td>O</td>
              <td>X</td>
              <td>O</td>
          </tr><!-- 여섯번째 줄 끝 -->
        </table>
        <br>
        <div>
          1) 2차 저작물이 재 공개 의무가 있으나 저작물이 전체가 아닌 ("독점SW와 결합가능" 항목에 의하여) 유엔진 내의 필요에 의하여서 수정한 부분만 sf.net 등에 공개하면 됩니다.<br>
          2) 주로 유엔진 내의 설정파일 수준에서 수정이 이루어지기 때문에 소스코드 변경이 발생치 않으나, 관리자 화면의 스플래시 화면 수정의 요건이 발생할 수 있습니다.<br>
          3) 2차 저작물의 어떠한 내용도 재 공개를 원치 않은 경우 "듀얼라이센싱" 정책에 의거하여 상용화(소스비공개 권한 획득) 라이센싱을 구매할 수 있습니다.<br>
          4) 무비용으로 유엔진을 사용하고자 하는 경우: - 유엔진 내 수정한 소스코드를 sf.net에 공개 - 유엔진 내의 소스를 수정하지 않고 사용자 화면 등에 유엔진을 사용했다는 표시를 하는 경우<br>
          5) 소스코드를 보호하고자 하는 경우: - 듀얼라이센싱 (상용화 라이센싱) 구매 출처 한국 저작권 위원회: http://www.olis.or.kr/osslice/guideViewComp.do<br>
        </div>

        <br>
    </Layout>

  <!-- pc footer -->
    <footer 
      style="width: 100%;
      height: 300px;
      background-color: #1E88E5;"
      class="is-pc-footer"
    >
      <div class="flex logo-style">
        <div>
        <g-image style="display: block;" src="../../uengine-image/logo-bpm.png"></g-image>
        </div>
      </div>
      <div style = "width: 100%; height: 100px; text-align: center; font-size: 16px; color: white; font-weight: 300; line-height: 50px; padding-top: 20px;">
        <div>Copyright © 2017 uEngine &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp; All Rights Reserved &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp; Designed By Sppark &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp; Address 서울 서초구 신반포로45길 18 주일빌딩 501호</div>
        <div>Email : help@uengine.org</div>
      </div>
    </footer>

  <!-- 모바일 footer -->
    <footer 
      style = "width: 100%;
      height: 300px;
      background-color: #1E88E5;"
      class="is-mobile-footer"
    >
      <div class="flex logo-style">
        <div>
        <g-image style="display:block;" src="../../uengine-image/logo-bpm.png"></g-image>
        </div>
      </div>
      <div style = "width: 100%; height: 100px; text-align: center; font-size: 16px; color: white; font-weight: 300; line-height: 30px; padding-top: 20px;">
        <div>Copyright © 2017 uEngine <br> All Rights Reserved <br> Designed By Sppark <br> Address 서울 서초구 신반포로45길 18 주일빌딩 501호</div>
        <div>Email : help@uengine.org</div>
      </div>
    </footer>
  </div>
</template>

<script>
import Logo from '@/components/Logo';
import { ArrowRightCircleIcon, ZapIcon, CodeIcon, MoonIcon, SearchIcon } from 'vue-feather-icons';

export default {
  components: {
    Logo,
    ArrowRightCircleIcon,
    ZapIcon,
    CodeIcon,
    MoonIcon,
    SearchIcon
  },

  data() {
    return {
      mainDescriptions: [
        {
          title: 'Full Support of BPMN 2.0',
          content: 'uEngine6 는 OMG BPMN 2.0 스펙을 완전하게 지원하여 OCE 상에 운영되어 REST API들로 노출된 마이크로 서비스들을 효율적으로 매시업할 수 있는 프로세스 오케스트레이션 기능을 제공합니다. 또한 순수한 BPMN 기반만으로도 간단한 프로세스 기반 REST 마이크로 서비스를 생성할 수도 있습니다.',
          image: require('../../uengine-image/full.jpeg') // require 사용
        },
        {
          title: '서브 프로세스',
          content: '서브프로세스를 활용한 멀티 인스턴스 처리 - 멀티플 인스턴스(MI)는 실행 중에 어떠한 실행 구간의 개수가 정해지는 특성의 복잡한 프로세스 실행 기능입니다. MI를 지정하기 위해서는 MI 실행구간의 범위를 지정해 주는 SubProcess가 지원되고, SubProcess의 설정에 MI를 발생시키는 인자값(배열값) 에 해당하는 프로세스 변수를 지정해주면, 해당 변수에 입력된 값의 개수만큼을 Parallel 혹은 Loop 방식으로 반복하여 MI를 동적으로 발생시켜 줍니다.',
          image: require('../../uengine-image/sub.jpeg') // require 사용
        },
        {
          title: '조건 설정 분기',
          content: '게이트웨이를 활용한 프로세스 분기 처리 - Gateway들을 이용하여 조건 분개 모델링을 할 수 있고 규칙을 정의할 수 있습니다. 단순한 프로세스 변수 비교와 And / Or 조합의 복잡한 규칙을 정의할 수 있습니다.',
          image: require('../../uengine-image/condition.jpeg') // require 사용
        },
        {
          title: '폼 매핑',
          content: 'Data Mapper를 사용한 액티비티간의 데이터 전달 - 프로세스 실행 중에 다른 도구(i.e. Legacy Systems) 등과의 통합을 위하여 다른 스키마 간의 데이터를 연계, 트랜스포밍 할 수 있는 설정 도구',
          image: require('../../uengine-image/mapping.jpeg') // require 사용
        },
        {
          title: '이벤트 기반 시스템 연동',
          content: 'Message Broker를 사용한 uEngine6와 외부 어플리케이션 간 비동기식 연동 방법',
          image: require('../../uengine-image/event.jpeg') // require 사용
        },
        {
          title: '메시지 기반 시스템 연동',
          content: 'BPMN의 2가지 Message Event Notation을 사용하여 uEngine6를 외부 시스템과 REST API로 연동하는 방법',
          image: require('../../uengine-image/message.jpeg') // require 사용
        }
      ],
      accordionItems: [
        {
          title: '01. AI Support - Process GPT',
          content: `
            ✔ 공개형 혹은 폐쇄형 LLM을 이용하여 (ChatGPT4 or llama3) 프로세스 정의와 폼 정의, 조직도 정의를 챗이나 이미지 업로드를 통하여 자동 정의할 수 있습니다.<br>
            ✔ 이는 BPMN 초심자들도 쉽게 프로세스 정의와 업무 화면을 구성하고 빠르게 업무에 반영할 수 있도록 합니다.
          `
        },
        {
          title: '02. Exposing Process as REST Services',
          content: `
            ✔ 외부에서 마이크로 서비스들을 접근하는 경로에 대한 보안, 통합, 성능에 대한 제어를 할 수 있습니다. 새로운 비즈니스 요건에 필요한 API 를 기존 마이크로 서비스 자산들의 매시업을 통하여 생성할 수 도 있습니다.<br>
            ✔ 생성한 프로세스를 바로 REST API 혹은 Kafka Event Consumer 형식으로 노출<br>
            ✔ 서비스 Endpoint 의 지정을 통한 서비스 엔드포인트 생성<br>
            ✔ 호출자와 프로세스 인스턴스간 상호연관(Correlation)
          `
        },
        {
          title: '03. Process Execution & Monitoring',
          content: `
            ✔ 모델링한 프로세스를 시뮬레이션 & 디버깅<br>
            ✔ 사람이 해당 역할인 경우 처리할 화면을 자동 생성<br>
            ✔ 마이크로 서비스 호출인 경우 호출 Payload 와 결과를 표시<br>
            ✔ 오류 발생시 로그를 프로세스 상에서 확인 & 오류 지점에서 재시작, 이전단계 복구<br>
            ✔ 시뮬레이션 완료 후 프로덕션으로 반영
          `
        }
      ],
      paragraphs: [
        {
          content: '<span style="font-size: 20px; font-weight: bold;">유엔진은</span> BPM 기반 아키텍처 분석에서 운영자동화까지 한번에 지원하는 SOA MM Level 7을 지원하는 플랫폼입니다'
        },
        {
          content: '<span style="font-size: 20px; font-weight: bold;">uEngine6 BPM은</span> 최신 클라우드 네이티브 아키텍처를 기반으로 하는 비즈니스 프로세스 관리 시스템(BPMS)으로, Process GPT라는 uEngine의 AI 버전을 통해 프로세스 정의와 폼 생성, 그리고 애플리케이션 연동을 자동화하는 능력을 갖추었습니다. 이 AI 기능은 복잡한 프로세스들을 자동으로 처리하며, 사용자가 직접 개입하지 않아도 실행단계까지 완전히 자동화됩니다.'
        },
        {
          content: '이벤트 기반 아키텍처(EDA)를 활용하여 서비스 간 의존성을 최소화하고, 애플리케이션의 진행 상태를 동기화하며 장애 전파 없이 관리합니다. 또한, 시스템 연동 시 자동화된 재시도(retry), 보상 처리(compensation), 타임아웃 등을 모델링을 통해 제공함으로써, 마이크로서비스 아키텍처에서 흔히 복잡하게 다루어지는 트랜잭션 처리를 안정적으로 수행합니다.'
        },
        {
          content: 'LLM AI 기술을 기반으로 프로세스 모델링, 폼 생성 등을 자연어 처리를 통해 자동으로 수행하며, 이는 시스템 통합을 포함한 다양한 비즈니스 요구사항을 효과적으로 지원합니다. uEngine6 BPM은 기업이 클라우드 네이티브 및 마이크로서비스 아키텍처로의 전환을 모색하는데 있어 이상적인 솔루션을 제공합니다.'
        }
      ],
      links: [
        {
          to: '/bpm6-intro/',
          text: 'Getting Started'
        },
        {
          to: 'https://github.com/uengine-oss/uEngine5-bpm',
          text: 'Github'
        },
        {
          to: 'https://www.facebook.com/groups/uenginebpm/',
          text: 'Facebook'
        }
      ]
    };
  },

  metaInfo() {
    const title = 'uengine6';
    const description = 'DOCC is a starter theme with instant search and dark mode for writing great technical documentation. Based on Gridsome!';

    return {
      title: title,
      meta: [
        {
          name: 'description',
          content: description
        },
        {
          key: 'og:title',
          name: 'og:title',
          content: title,
        },
        {
          key: 'twitter:title',
          name: 'twitter:title',
          content: title,
        },
        {
          key: 'og:description',
          name: 'og:description',
          content: description,
        },
        {
          key: 'twitter:description',
          name: 'twitter:description',
          content: description,
        },
      ],
    }
  }
}
</script>

<style>
  .home-links a {
    margin-right: 1rem;
  }
  .glink-margin:nth-child(2),
  .glink-margin:nth-child(3),
  .glink-margin:nth-child(4){
    margin-left:2%;
  }
  .sub-title{
    width:100%; text-align:center; font-size:40px; font-weight:700;
  }

  .logo-style{
    width:20%; margin-left:40%;  padding-top:60px;
  }

  .is-mobile-footer{display:none;}

  td {
      border: 1px solid #999;
      text-align:center;
      padding:5px !important;
  }
  .is-mobile{display:none;}

  .content-section {
  margin-top: 50px;
}

.content-text {
  width: 100%;
  font-size: 20px;
  margin-top:20px;
}

.content-text h3 {
  font-size: 30px;
  font-weight: 500;
  margin-bottom: 20px;
}

.content-image {
  width: 100%;
  margin-top: 30px;
}

@media only screen and (max-width:1279px) {
  .is-pc{display:none;}
  .is-mobile{display:block;}

  .is-mobile-sub-title{font-size:30px;}

  .logo-style{
    width:40%; margin-left:30%;  padding-top:30px;
  }
  .is-mobile-footer{display:block;}
  .is-pc-footer{display:none;}
}


</style>
