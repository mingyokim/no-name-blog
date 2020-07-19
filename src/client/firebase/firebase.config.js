const firebaseDevConfig = {
  apiKey: 'AIzaSyA0Ji8-_r96VyZfl6bLUrwV0b6EpeQn9LQ',
  authDomain: 'blog-dev-564da.firebaseapp.com',
  databaseURL: 'https://blog-dev-564da.firebaseio.com',
  projectId: 'blog-dev-564da',
  storageBucket: 'blog-dev-564da.appspot.com',
  messagingSenderId: '106761700363',
  appId: '1:106761700363:web:986b06e94be495f04bb30e',
};

const firebaseProdConfig = {
  apiKey: 'AIzaSyDWlEic_z3gHTr0vuqd12cbKSVW2GfVu4I',
  authDomain: 'blog-c7c72.firebaseapp.com',
  databaseURL: 'https://blog-c7c72.firebaseio.com',
  projectId: 'blog-c7c72',
  storageBucket: 'blog-c7c72.appspot.com',
  messagingSenderId: '277525795155',
  appId: '1:277525795155:web:71c2766397b306a714d1a6',
  measurementId: 'G-PBS9NG8GCW'
};

const firebaseConfig = {
  development: firebaseDevConfig,
  production: firebaseProdConfig,
};

export default firebaseConfig[process.env.NODE_ENV];
// console.log(process.env.FB_CLIENT);

// const config = JSON.parse(process.env.FB_CLIENT);

// export default config;
