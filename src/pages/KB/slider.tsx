import { ArrowRightOutlined } from '@ant-design/icons';
import { Image, Typography } from 'antd';
import { useRef } from 'react';
import Slider from 'react-slick';
import extraction from './img/extraction.png';
import fusion from './img/fusion.png';
import update from './img/update.png';
import styles from './index.less';

const { Title, Paragraph } = Typography;

interface PropsType {
  title: string;
  subTitle: string;
  image: string;
  remarks: string[];
}

const introductions: PropsType[] = [
  {
    title: '基于人机协同与远程监督的知识提取方法',
    subTitle: '从非结构化数据中低成本提取高质量金融知识，与任务1.1对应',
    image: extraction,
    remarks: [
      '论文：Triple-d: Denoising Distant Supervision for High-quality Data Creation.（ICDE2024，CCF A类会议）',
      '专利：基于人机协同与远程监督的知识提取方法及系统 (申请号： 2023105070160)',
    ],
  },
  {
    title: '基于数据源置信度推导的知识融合方法',
    subTitle: '对多种来源的金融数据实现动态的去冗消歧，与任务1.2对应',
    image: fusion,
    remarks: [
      '论文：HIT-An Effective Approach to Build a Dynamic Financial Knowledge Base.（DASFAA 2023，CCF B类会议）',
      '论文：T-FinKB: A Platform of Temporal Financial Knowledge Base Construction.（ICDE2023，CCF A类会议）',
    ],
  },
  {
    title: '基于数据源置信度推导的知识融合方法',
    subTitle: '对多种来源的金融数据实现动态的去冗消歧，与任务1.3对应',
    image: update,
    remarks: [
      '专利：一种基于图规则挖掘的知识图谱更新系统(申请号：2023104765162)',
    ],
  },
];

const IntroductionCard = (props: PropsType) => {
  const { title, subTitle, image, remarks } = props;
  return (
    <div style={{ padding: '0 30px' }}>
      <div className={styles.introduction_container}>
        <div>
          <Title level={2}>{title}</Title>
          <Title level={4}>{subTitle}</Title>
          <Paragraph>
            <ul style={{ listStyleType: 'disc' }}>
              {remarks.map((item) => {
                return <li>{item}</li>;
              })}
            </ul>
          </Paragraph>
        </div>

        <div className={styles.image_container}>
          <Image src={image} preview={false} height={300}></Image>
        </div>
      </div>
    </div>
  );
};

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        background: 'gray',
        borderRadius: '50%',
      }}
      onClick={onClick}
    />
  );
}
function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        background: 'gray',
        borderRadius: '50%',
      }}
      onClick={onClick}
    />
  );
}

const CenterModeSlider = (props: {
  currentStatus: any;
  setCurrentStatus: any;
}) => {
  const { currentStatus, setCurrentStatus } = props;
  // const [currentStatus, setCurrentStatus] = useState<number>(0);
  const slider = useRef(null);
  const settings = {
    className: 'custom-arrows',
    centerMode: true,
    infinite: true,
    centerPadding: '20px',
    slidesToShow: 1,
    speed: 500,
    // arrows: true,
    // dots: true,
    // autoplay: true,
    // autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    beforeChange: (current: any, next: number) => setCurrentStatus(next),
  };
  const changeStatus = (s: number) => {
    setCurrentStatus(s);
    slider?.current?.slickGoTo(s);
  };
  return (
    <div>
      <div className={styles.pipeline_container}>
        <div className={styles.status_line}>
          <div
            className={`${styles.title} ${
              currentStatus === 0 && styles.current
            }`}
            onClick={() => changeStatus(0)}
          >
            知识抽取
          </div>
          <ArrowRightOutlined />
          <div
            className={`${styles.title} ${
              currentStatus === 1 && styles.current
            }`}
            onClick={() => changeStatus(1)}
          >
            知识融合
          </div>
          <ArrowRightOutlined />
          <div
            className={`${styles.title} ${
              currentStatus === 2 && styles.current
            }`}
            onClick={() => changeStatus(2)}
          >
            知识更新
          </div>
        </div>
      </div>
      <Slider {...settings} ref={slider}>
        <div>
          <IntroductionCard
            title={introductions[0].title}
            subTitle={introductions[0].subTitle}
            image={introductions[0].image}
            remarks={introductions[0].remarks}
          />
        </div>
        <div>
          <IntroductionCard
            title={introductions[1].title}
            subTitle={introductions[1].subTitle}
            image={introductions[1].image}
            remarks={introductions[1].remarks}
          />
        </div>
        <div>
          <IntroductionCard
            title={introductions[2].title}
            subTitle={introductions[2].subTitle}
            image={introductions[2].image}
            remarks={introductions[2].remarks}
          />
        </div>
      </Slider>
    </div>
  );
};

export default CenterModeSlider;
