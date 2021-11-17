const data = [
  {
    title: 'Intro Slide 1',
    field_body_en:
      'Introducing Bidbong an easy to use auction application with a new concept like never before!',
    body:
      'Introducing Bidbong an easy to use auction application with a new concept like never before!',
    field_image_intro:
      'https://i.ibb.co/mSXpHmV/onboarding-illustration-10.png',
    field_intro_background: '',
    field_order_intro: '1',
    field_title_en: 'Welcome to BidBot',
    field_title: 'Bebas pilih yang pas, sampe puas!',
  },
  {
    title: 'Intro Slide 2',
    field_body_en:
      'Explore various things and interesting offers in one app. Get yours by playing at best prices!',
    body:
      'Explore various things and interesting offers in one app. Get yours by playing at best prices!',
    field_image_intro:
      'https://i.ibb.co/zsRrSrq/onboarding-illustration-copy-3.png',
    field_intro_background: '',
    field_order_intro: '2',
    field_title_en: 'Find best deals ',
    field_title: 'Duduk Santai, SIM Card Diantar',
  },
  {
    title: 'Intro Slide 3',
    field_body_en: `You won't miss any special items that are auctioned every day. Let's begin!`,
    body: 'Gak perlu ke luar rumah, SIM Card bakal diantar ke tempatmu. ',
    field_image_intro:
      'https://i.ibb.co/Br46n10/onboarding-illustration-copy-4.png',
    field_intro_background: '',
    field_order_intro: '3',
    field_title_en: 'Get notified when special item on sale',
    field_title: 'Duduk Santai, SIM Card Diantar',
  },
];

const createOnboardingItem = p => {
  const onboardingItem = {
    title: {
      id: p.field_title,
      en: p.field_title_en,
    },
    desc: {
      id: p.body,
      en: p.field_body_en,
    },
    image: p.field_image_intro,
  };

  return onboardingItem;
};

export default dataDummy = data.map(e => createOnboardingItem(e));
