export default [
  {
    path: '/',
    name: 'main-view',
    component: require('components/MainView/'),
  },
  {
    path: '*',
    redirect: '/',
  },
];
