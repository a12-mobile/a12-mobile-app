import Vue from 'vue';
import Router from 'vue-router';
import { request } from 'https';


//按需加载
const Home = r => require.ensure([], () => r(require('@/pages/Tab-Home')), 'tab');
const MultiWellList = r => require.ensure([], () => r(require('@/pages/Tab-MultiWellList')), 'tab');
const Discussion = r => require.ensure([], () => r(require('@/pages/Tab-Discussion')), 'tab');
const Me = r => require.ensure([], () => r(require('@/pages/Tab-Me')), 'tab');
const SubView = r => require.ensure([], () => r(require('@/pages/SubView')), 'tab');

//钻井
const DrillFormList = r => require.ensure([], () => r(require('@/pages/drill/DrillFormList')), 'drill');
const DrillFormListOfYear = r => require.ensure([], () => r(require('@/pages/drill/DrillFormListOfYear')), 'drill');
const DrillDailyList = r => require.ensure([], () => r(require('@/pages/drill/DrillDailyList')), 'drill');
const DrillDailyOfKeyWell = r => require.ensure([], () => r(require('@/pages/drill/DrillDailyOfKeyWell')), 'drill');
const DrillDailyOfWell = r => require.ensure([], () => r(require('@/pages/drill/DrillDailyOfWell')), 'drill');
const DailyOfDrilling = r => require.ensure([], () => r(require('@/pages/drill/DailyOfDrilling')), 'drill');
const DRDailyOfRigDynamic = r => require.ensure([], () => r(require('@/pages/drill/DRDailyOfRigDynamic')), 'drill');
const DrillOfRigstatistics = r => require.ensure([], () => r(require('@/pages/drill/DrillOfRigstatistics')), 'drill');
const DrillOfTeamYearly = r => require.ensure([], () => r(require('@/pages/drill/DrillOfTeamYearly')), 'drill');
const DrillOfFootageYearly = r => require.ensure([], () => r(require('@/pages/drill/DrillOfFootageYearly')), 'drill');
const DrillOfNumYearly = r => require.ensure([], () => r(require('@/pages/drill/DrillOfNumYearly')), 'drill');
const DrillOfFinishNumYearly = r => require.ensure([], () => r(require('@/pages/drill/DrillOfFinishNumYearly')), 'drill');
const DrillKeyIndicatorsYearly = r => require.ensure([], () => r(require('@/pages/drill/DrillKeyIndicatorsYearly')), 'drill');
const DrillShamTsengFinishYearly = r => require.ensure([], () => r(require('@/pages/drill/DrillShamTsengFinishYearly')), 'drill');
const DrillEngineeringAccidentsYearly = r => require.ensure([], () => r(require('@/pages/drill/DrillEngineeringAccidentsYearly')), 'drill');


//井下
const DhFormList = r => require.ensure([], () => r(require('@/pages/dh/DhFormList')), 'dh');
const DhMonthlyOfWorkloadGN = r => require.ensure([], () => r(require('@/pages/dh/DhMonthlyOfWorkloadGN')), 'dh');
const DhMonthlyOfWorkloadZ = r => require.ensure([], () => r(require('@/pages/dh/DhMonthlyOfWorkloadZ')), 'dh');

//测井
const LogFormList = r => require.ensure([], () => r(require('@/pages/log/LogFormList')), 'log');
const LogMonthlyOfWorkload = r => require.ensure([], () => r(require('@/pages/log/LogMonthlyOfWorkload')), 'log');
const LogDailyOfWorkload = r => require.ensure([], () => r(require('@/pages/log/LogDailyOfWorkload')), 'log');
const LogWorkloadOfBlock = r => require.ensure([], () => r(require('@/pages/log/LogWorkloadOfBlock')), 'log');
const LogOfTeamByTeamtype = r => require.ensure([], () => r(require('@/pages/log/LogOfTeamByTeamtype')), 'log');
const LogOfTeamByDevicetype = r => require.ensure([], () => r(require('@/pages/log/LogOfTeamByDevicetype')), 'log');
const LogOfForeignTeamByTeamtype = r => require.ensure([], () => r(require('@/pages/log/LogOfForeignTeamByTeamtype')), 'log');
const LogOfForeignTeamByDevicetype = r => require.ensure([], () => r(require('@/pages/log/LogOfForeignTeamByDevicetype')), 'log');


// //录井
const MonthLogOfLogWellByCompany = r => require.ensure([], () => r(require('@/pages/mlog/MonthLogOfLogWellByCompany')), 'mlog');
const MonthLogOfWellWorkload = r => require.ensure([], () => r(require('@/pages/mlog/MonthLogOfWellWorkload')), 'mlog');
const MlogsOfRecordWell = r => require.ensure([], () => r(require('@/pages/mlog/MlogsOfRecordWell')), 'mlog');
const MlogFormList = r => require.ensure([], () => r(require('@/pages/mlog/MlogFormList')), 'mlog');
const MlogMonthOfTeam = r => require.ensure([], () => r(require('@/pages/mlog/MlogMonthOfTeam')), 'mlog');

//实时数据
const RealtimeListOfProjectData = r => require.ensure([], () => r(require('@/pages/real-time/ListOfProjectData')), 'real-time');
const RealtimeChartsOfDataMonitoring = r => require.ensure([], () => r(require('@/pages/real-time/ChartsOfDataMonitoring')), 'real-time');

//demo
const HorizontalScreen = r => require.ensure([], () => r(require('@/pages/demo/HorizontalScreen')), 'demo');
const LoadMore = r => require.ensure([], () => r(require('@/pages/demo/LoadMore')), 'demo');
const Mlogs = r => require.ensure([], () => r(require('@/pages/demo/MlogsOfRecordWell')), 'demo');

//horizontal
const DrillDailyOfZH = r => require.ensure([], () => r(require('@/pages/horizontal/DrillDailyOfZH')), 'demo');

//well
const WellList = r => require.ensure([], () => r(require('@/pages/well/WellList')), 'well')
const KeyWellList = r => require.ensure([], () => r(require('@/pages/well/KeyWellList')), 'well')
const WellDaily = r => require.ensure([], () => r(require('@/pages/well/WellDaily')), 'well')

//物探
const GPFormList = r => require.ensure([], () => r(require('@/pages/gp/GPFormList')), 'gp');


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { navShow: false, title: '首页' },
    },
    {
      path: '/multiWellList',
      name: 'MultiWellList',
      component: MultiWellList,
      meta: { navShow: true, title: '多井列表' }
    },
    {
      path: '/discussion',
      name: 'Discussion',
      component: Discussion,
      meta: { navShow: true, title: '协同讨论' }
    },
    {
      path: '/me',
      name: 'Me',
      component: Me,
      meta: { navShow: true, title: '我的' }
    },
    {
      path: '/sub',
      name: 'SubView',
      component: SubView,
      meta: { navShow: false, title: '子页面' }
    },


    //钻井
    {
      path: '/drill/form/list',
      name: 'DrillFormList',
      component: DrillFormList,
      meta: { navShow: false, title: '钻井报表' }
    },
    {
      path: '/drill/form/list/year',
      name: 'DrillFormListOfYear',
      component: DrillFormListOfYear,
      meta: { navShow: false, title: '钻井年报' }
    },
    {
      path: '/drill/daily/list',
      name: 'DrillDailyList',
      component: DrillDailyList,
      meta: { navShow: false, title: '单井日报列表' }
    },
    {
      path: '/drill/daily/well/key',
      name: 'DrillDailyOfKeyWell',
      component: DrillDailyOfKeyWell,
      meta: { navShow: false, title: '重点井日报' }
    },
    {
      path: '/drill/daily/well',
      name: 'DrillDailyOfWell',
      component: DrillDailyOfWell,
      meta: { navShow: false, title: '分井动态' }
    },
    {
      path:'/dailyOfDrilling',
      name:'DailyOfDrilling',
      component:DailyOfDrilling,
      meta:{navShow:false,title:'工作量日报'}
    },
    {
      path:'/dRDailyOfRigDynamic',
      name:'DRDailyOfRigDynamic',
      component:DRDailyOfRigDynamic,
      meta:{navShow:false,title:'钻机动态日报'}
    },
    {
      path:'/years/rigstatistics',
      name:'DrillOfRigstatistics',
      component:DrillOfRigstatistics,
      meta:{navShow:false,title:'钻机统计表(2017)'}
    },
    {
      path:'/years/drillTeam',
      name:'DrillOfTeamYearly',
      component:DrillOfTeamYearly,
      meta:{navShow:false,title:'队伍分布表(2017)'}
    },
    {
      path:'/years/footage',
      name:'DrillOfFootageYearly',
      component:DrillOfFootageYearly,
      meta:{navShow:false,title:'工作量-钻井进尺表(2017)'}
    },
    {
      path:'/years/drillNum',
      name:'DrillOfNumYearly',
      component:DrillOfNumYearly,
      meta:{navShow:false,title:'工作量-开钻口数表(2017)'}
    },
    {
      path:'/years/drillFinishNum',
      name:'DrillOfFinishNumYearly',
      component:DrillOfFinishNumYearly,
      meta:{navShow:false,title:'工作量-完井口数(2017)'}
    },
    {
      path:'/years/drillKeyIndicators',
      name:'DrillKeyIndicatorsYearly',
      component:DrillKeyIndicatorsYearly,
      meta:{navShow:false,title:'主要指标(2017)'}
    },
    {
      path:'/years/shamTsengFinish',
      name:'DrillShamTsengFinishYearly',
      component:DrillShamTsengFinishYearly,
      meta:{navShow:false,title:'深井完成井(4000米以上)(2017)'}
    },
    {
      path:'/years/engineeringAccidents',
      name:'DrillEngineeringAccidentsYearly',
      component:DrillEngineeringAccidentsYearly,
      meta:{navShow:false,title:'工程事故统计（2017）'}
    },
    //钻井end

    //井下
    {
      path: '/dh/form/list',
      name: 'DhFormList',
      component: DhFormList,
      meta:{ navShow: false, title: '井下报表'}
    },
    {
      path: '/dh/monthly/workload/gn',
      name: 'DhMonthlyOfWorkloadGN',
      component: DhMonthlyOfWorkloadGN,
      meta:{ navShow: false, title: '井下工作量月报国内'}
    },


    {
      path: '/dh/monthly/workload/total',
      name: 'DhMonthlyOfWorkloadZ',
      component: DhMonthlyOfWorkloadZ,
      meta:{ navShow: false, title: '井下工作量月报总'}
    },
    //井下 end
    //测井
    {
      path: '/log/form/list',
      name: 'LogFormList',
      component: LogFormList,
      meta:{ navShow: false, title: '测井报表'},
    },
    {
      path: '/log/monthly/workload',
      name: 'LogMonthlyOfWorkload',
      component: LogMonthlyOfWorkload,
      meta:{ navShow: false, title: '工作量月报'}
    },
    {
      path: '/log/daily/workload',
      name: 'LogDailyOfWorkload',
      component: LogDailyOfWorkload,
      meta:{ navShow: false, title: '工作量日报'}
    },
    {
      path: '/log/monthly/workloadOfBlock',
      name: 'LogWorkloadOfBlock',
      component: LogWorkloadOfBlock,
      meta:{ navShow: false, title: '工作量油区分布'}
    },
    {
      path: '/log/Monthly/TeamByTeamType',
      name: 'LogOfTeamByTeamtype',
      component: LogOfTeamByTeamtype,
      meta:{ navShow: false, title: '专业队伍分布(队伍类型)'}
    },
    {
      path: '/log/Monthly/TeamByDeviceType',
      name: 'LogOfTeamByDevicetype',
      component: LogOfTeamByDevicetype,
      meta:{ navShow: false, title: '专业队伍分布(设备类型)'}
    },
    {
      path: '/log/Monthly/ForeignTeamByTeamType',
      name: 'LogOfForeignTeamByTeamtype',
      component: LogOfForeignTeamByTeamtype,
      meta:{ navShow: false, title: '专业队伍国外分布(队伍类型)'}
    },
    {
      path: '/log/Monthly/ForeignTeamByDeviceType',
      name: 'LogOfForeignTeamByDevicetype',
      component: LogOfForeignTeamByDevicetype,
      meta:{ navShow: false, title: '专业队伍国外分布(设备类型)'}
    },

    //测井end
    //录井
    {
      path: '/mlog/form/list',
      name: 'MlogFormList',
      component: MlogFormList,
      meta:{ navShow: false, title: '录井报表'}
    },
    {
      path: '/mlogsOfRecordWell',
      name: 'MlogsOfRecordWell',
      component: MlogsOfRecordWell,
      meta:{ navShow: false, title: '分队动态'}
    },
    {
      path: '/MonthLogOfLogWellByCompany',
      name: 'MonthLogOfLogWellByCompany',
      component: MonthLogOfLogWellByCompany,
      meta:{ navShow: false, title: '分单位月报'}
    },
    {
      path: '/monthLogOfWellWorkload',
      name: 'MonthLogOfWellWorkload',
      component: MonthLogOfWellWorkload,
      meta:{ navShow: false, title: '工作量月报'}
    },
    {
      path: '/mlogMonthOfTeam',
      name: 'MlogMonthOfTeam',
      component: MlogMonthOfTeam,
      meta:{ navShow: false, title: '队伍统计月报'}
    },


    //实时数据
    {
      path: '/real-time/list/project',
      name: 'RealtimeListOfProjectData',
      component: RealtimeListOfProjectData,
      meta: { navShow: false, title: '工程数据列表' }
    },
    {
      path: '/real-time/charts/monitoring',
      name: 'RealtimeChartsOfDataMonitoring',
      component: RealtimeChartsOfDataMonitoring,
      meta: { navShow: false, title: '工程数据列表' }
    },
    //实时数据 end




    //demo
    {
      path: '/hscreen',
      name: 'HorizontalScreen',
      component: HorizontalScreen,
      meta:{ navShow: false, title: '横屏效果demo'}
    },
    {
      path: '/loadmore',
      name: 'LoadMore',
      component: LoadMore,
      meta:{ navShow: false, title: '加载更多demo'}
    },
    {
      path: '/mlogs',
      name: 'Mlogs',
      component: Mlogs,
      meta:{ navShow: false, title: '录井分井动态下拉加载'}
    },




    //horizontal
    {
      path: '/horizontal/drill/daily/zh',
      name: 'DrillDailyOfZH',
      component: DrillDailyOfZH,
      meta:{ navShow: false, title: '横屏效果'}
    },

    //well
    {
      path: '/well/list',
      name: 'WellList',
      component: WellList,
      meta: { navShow: false, title: '井列表' },
    },
    {
      path: '/well/list/key',
      name: 'KeyWellList',
      component: KeyWellList,
      meta: { navShow: false, title: '关注井列表' },
    },
    {
      path: '/well/daily',
      name: 'WellDaily',
      component: WellDaily,
      meta: { navShow: false, title: '井日报' },
    },


    //物探
    {
      path: '/gp/form/list',
      name: 'GPFormList',
      component: GPFormList,
      meta:{ navShow: false, title: '物探专业'}
    },

  ]
})
