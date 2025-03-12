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
                      <h2 class="sub-title is-mobile-sub-title" style="line-height: 1.5; margin-bottom: 50px;">Why did uEngine make the BPM product open source?</h2>
                      <div style="display: flex; justify-content: center; margin-bottom: 50px;">
                          <img src="../../uengine-image/96.png" alt="Image Description" />
                      </div>
                  </div>
              </div>
              <div>
                  <p style="line-height: 1.8;">
                    The uEngine BPM project provides what was previously only accessible through expensive license fees as an open source product, along with education and consulting services for implementation. This creates a budget structure centered on consulting costs that achieves thorough education and internalization, enables customization focused on customer requirements through source code provision, and allows multiple service channels. Among the considerations in BPM adoption, technical aspects include how easily it can be customized and how seamlessly it can be integrated into our organizational system environment. For this customizability and low-risk integration, uEngine BPMS architecture applies the IoC (Inversion of Control) approach of "object-oriented component frameworks" and the concept of "design reuse." This forms refined boundaries between BPM Hot-spot services (fixed parts) and frequently customized BPM elements (variable parts) by providing component interfaces such as separated organizational chart lookup logic, component interfaces for activity types, and listeners for engine events. As fixed-part services, it provides automatic generation of activity component UIs through reflection, instance data management, MQ processing, and OLAP analysis processing. This approach allows developers to easily customize without any concerns about underlying BPM technology. This approach applies methods already used in various frameworks like Spring Framework to BPM-based system development, significantly reducing risks and maximizing availability compared to BPM products that are only provided as packages allowing only Server/Client integration.                            
                  </p>
              </div>
          </div>
        </section>

        <div class="pt-8 mx-auto mt-8 border-t md:mt-16 md:pt-16 border-top border-ui-border max-w-screen-sm"></div>

        <h2 class="sub-title is-mobile-sub-title">License</h2>
        <h3>uEngine Open Source License : LGPL</h3>

        <table style="width: 100%;">
          <tr><!-- 첫번째 줄 시작 -->
              <td>Main Open Source SW License Comparison</td>
              <td>Free Use</td>
              <td>Distribution Allowed</td>
              <td>Source Code Acquisition</td>
              <td>Source Code Modification</td>
              <td>Obligation to Redistribute Derivative Works</td>
              <td>Combinable with Proprietary SW</td>
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
          1) While there is an obligation to redistribute derivative works, it is not the entire work that needs to be disclosed (as indicated by the "Combinable with Proprietary SW" item), but only the portions modified within uEngine that need to be disclosed on platforms like sf.net.<br>
          2) Modifications are mainly made at the configuration file level within uEngine, so source code changes do not occur, but requirements for modifying the splash screen in the admin interface may arise.<br>
          3) If you do not wish to disclose any contents of the derivative work, you can purchase commercial licensing (right to not disclose source) according to the "dual licensing" policy.<br>
          4) If you want to use uEngine at no cost: - Disclose the modified source code within uEngine on sf.net - Use uEngine without modifying its source code, while indicating the use of uEngine in the user interface, etc.<br>
          5) If you want to protect the source code: - Purchase dual licensing (commercial licensing) Source: Korea Copyright Commission: http://www.olis.or.kr/osslice/guideViewComp.do<br>
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
        <div>Copyright © 2025 uEngine &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp; All Rights Reserved &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp; Address : Floor 5, Room 502, 18, Sinbanpo-ro 45-gil, Seocho-gu, Seoul, Republic of Korea</div>
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
        <div>Copyright © 2025 uEngine <br> All Rights Reserved <br> Address : Floor 5, Room 502, 18, Sinbanpo-ro 45-gil, Seocho-gu, Seoul, Republic of Korea</div>
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
          content: 'uEngine6 fully supports the OMG BPMN 2.0 specification, allowing efficient process orchestration of microservices exposed as REST APIs on the OCE. Additionally, simple process-based REST microservices can be created using a pure BPMN-based approach. The intuitive interface enables easy modeling of complex business processes.',
          image: require('../../uengine-image/full.jpeg') // require 사용
        },
        {
          title: 'Sub-process',
          content: 'Multi-instance processing is available using subprocesses. A multi-instance (MI) process allows for dynamic execution of sections where the number of instances is determined at runtime. To specify MI execution, a subprocess is used, and by setting a process variable (array value) as an MI-generating parameter, multiple instances are dynamically created in parallel or loop mode, depending on the number of values in the array.',
          image: require('../../uengine-image/sub.jpeg') // require 사용
        },
        {
          title: 'Complex Branching Handling',
          content: 'Process branching is possible using gateways. Gateways allow modeling of conditional branches and the definition of business rules. Complex rules involving simple process variable comparisons and And/Or combinations can be defined.',
          image: require('../../uengine-image/condition.jpeg') // require 사용
        },
        {
          title: 'Form Mapping',
          content: 'Data transfer between activities can be performed using a Data Mapper. This tool enables integration with various systems (e.g., legacy systems) by mapping and transforming data between different schemas during process execution.',
          image: require('../../uengine-image/mapping.jpeg') // require 사용
        },
        {
          title: 'Event-based system integration',
          content: 'Asynchronous integration method between uEngine6 and external applications using a Message Broker.',
          image: require('../../uengine-image/event.jpeg') // require 사용
        },
        {
          title: 'Message-based system integration',
          content: 'Method of integrating uEngine6 with external systems via REST API using BPMN&#039;s two Message Event Notations.',
          image: require('../../uengine-image/message.jpeg') // require 사용
        }
      ],
      accordionItems: [
        {
          title: '01. AI Support - Process GPT',
          content: `
            ✔ Using open or closed-source LLMs (ChatGPT4 or llama3), process definitions, form definitions, and organizational chart definitions can be automatically created through chat or image uploads.<br>
            ✔ This allows BPMN beginners to easily define processes and configure business screens, quickly applying them to their work.
          `
        },
        {
          title: '02. Exposing Process as REST Services',
          content: `
            ✔ Control security, integration, and performance for paths accessing microservices from external sources. New APIs required for business needs can be created by mashing up existing microservice assets.<br>
            ✔ Expose created processes directly as REST APIs or Kafka Event Consumers<br>
            ✔ Create service endpoints through service endpoint designation<br>
            ✔ Correlation between callers and process instances
          `
        },
        {
          title: '03. Process Execution & Monitoring',
          content: `
            ✔ Simulation & debugging of modeled processes<br>
            ✔ Automatic generation of processing screens for human roles<br>
            ✔ Display of call payload and results for microservice calls<br>
            ✔ Check logs on processes when errors occur & restart from error points, recover previous steps<br>
            ✔ Reflect to production after simulation completion
          `
        }
      ],
      paragraphs: [
        {
          content: '<span style="font-size: 20px; font-weight: bold;">uEngine6 is</span> a platform that supports everything from BPM-based architecture analysis to operational automation, achieving SOA MM Level 7 compliance.'
        },
        {
          content: '<span style="font-size: 20px; font-weight: bold;">uEngine6 BPM is</span> a Business Process Management System (BPMS) based on the latest cloud-native architecture. It features an AI-powered version called "Process GPT," which automates process definition, form generation, and application integration. This AI capability handles complex processes automatically, enabling complete automation up to the execution stage without user intervention.'
        },
        {
          content: 'By utilizing an Event-Driven Architecture (EDA), uEngine6 minimizes service dependencies, synchronizes application states, and manages processes without propagating failures. Additionally, it offers built-in features for automated retries, compensation handling, and timeouts through process modeling, ensuring stable transaction processing in microservice architectures, where such tasks are typically complex.'
        },
        {
          content: 'Leveraging Large Language Model (LLM) AI technology, uEngine6 automates process modeling and form generation through natural language processing. This enables seamless system integration and effectively meets various business requirements. As a result, uEngine6 BPM is an ideal solution for enterprises transitioning to cloud-native and microservice architectures.'
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
