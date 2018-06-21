import Vue from 'vue'
import Router from 'vue-router'
import { request } from 'https';


//按需加载
const Home = r => require.ensure([], () => r(require('@/pages/Tab-Home')), 'tab')
const MultiWellList = r => require.ensure([], () => r(require('@/pages/Tab-MultiWellList')), 'tab')
const Discussion = r => require.ensure([], () => r(require('@/pages/Tab-Discussion')), 'tab')
const Me = r => require.ensure([], () => r(require('@/pages/Tab-Me')), 'tab')
const SubView = r => require.ensure([], () => r(require('@/pages/SubView')), 'tab')

//钻井
const DrillFormList = r => require.ensure([], () => r(require('@/pages/drill/DrillFormList')), 'drill')
const DrillDailyOfKeyWell = r => require.ensure([], () => r(require('@/pages/drill/DrillDailyOfKeyWell')), 'drill')
const DailyOfDrilling = r => require.ensure([], () => r(require('@/pages/drill/DailyOfDrilling')), 'drill')
const DRDailyOfRigDynamic = r => require.ensure([], () => r(require('@/pages/drill/DRDailyOfRigDynamic')), 'drill')


//井下
const DhFormList = r => require.ensure([], () => r(require('@/pages/dh/DhFormList')), 'dh')
const DhMonthlyOfWorkloadGN = r => require.ensure([], () => r(require('@/pages/dh/DhMonthlyOfWorkloadGN')), 'dh')
const DhMonthlyOfWorkloadZ = r => require.ensure([], () => r(require('@/pages/dh/DhMonthlyOfWorkloadZ')), 'dh')

//测井
const LogFormList = r => require.ensure([], () => r(require('@/pages/log/LogFormList')), 'log')
const LogMonthlyOfWorkload = r => require.ensure([], () => r(require('@/pages/log/LogMonthlyOfWorkload')), 'log')
const LogDailyOfWorkload = r => require.ensure([], () => r(require('@/pages/log/LogDailyOfWorkload')), 'log')


// //录井
const MonthLogOfLogWellByCompany = r => require.ensure([], () => r(require('@/pages/mlog/MonthLogOfLogWellByCompany')), 'mlog')
const MonthLogOfWellWorkload = r => require.ensure([], () => r(require('@/pages/mlog/MonthLogOfWellWorkload')), 'mlog')
const MlogsOfRecordWell = r => require.ensure([], () => r(require('@/pages/mlog/MlogsOfRecordWell')), 'mlog')
const MlogFormList = r => require.ensure([], () => r(require('@/pages/mlog/MlogFormList')), 'mlog')
const MlogMonthOfTeam = r => require.ensure([], () => r(require('@/pages/mlog/MlogMonthOfTeam')), 'mlog')

//实时数据
const RealtimeListOfProjectData = r => require.ensure([], () => r(require('@/pages/real-time/ListOfProjectData')), 'real-time')

//demo
const HorizontalScreen = r => require.ensure([], () => r(require('@/pages/demo/HorizontalScreen')), 'demo')
const LoadMore = r => require.ensure([], () => r(require('@/pages/demo/LoadMore')), 'demo')
const Mlogs = r => require.ensure([], () => r(require('@/pages/demo/MlogsOfRecordWell')), 'demo')

//horizontal
const DrillDailyOfZH = r => require.ensure([], () => r(require('@/pages/horizontal/DrillDailyOfZH')), 'demo')

//well
const WellList = r => require.ensure([], () => r(require('@/pages/well/WellList')), 'well')
const KeyWellList = r => require.ensure([], () => r(require('@/pages/well/KeyWellList')), 'well')

//物探
const GPFormList = r => require.ensure([], () => r(require('@/pages/gp/GPFormList')), 'gp')


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
      path: '/drill/daily/well/key',
      name: 'DrillDailyOfKeyWell',
      component: DrillDailyOfKeyWell,
      meta: { navShow: false, title: '重点井日报' }
    },
    {
      path:'/dailyOfDrilling',
      name:'DailyOfDrilling',
      component:DailyOfDrilling,
      meta:{navShow:false,title:'钻井综合日报'}
    },
    {
      path:'/dRDailyOfRigDynamic',
      name:'DRDailyOfRigDynamic',
      component:DRDailyOfRigDynamic,
      meta:{navShow:false,title:'钻机动态日报'}
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
      meta:{ navShow: false, title: '统计月报'}
    },


    {
      path: '/dh/monthly/workload/total',
      name: 'DhMonthlyOfWorkloadZ',
      component: DhMonthlyOfWorkloadZ,
      meta:{ navShow: false, title: '统计月报'}
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
      meta:{ navShow: false, title: '统计月报'}
    },
    {
      path: '/log/daily/workload',
      name: 'LogDailyOfWorkload',
      component: LogDailyOfWorkload,
      meta:{ navShow: false, title: '测井工作量日报'}
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
      meta:{ navShow: false, title: '录井分队动态'}
    },
    {
      path: '/MonthLogOfLogWellByCompany',
      name: 'MonthLogOfLogWellByCompany',
      component: MonthLogOfLogWellByCompany,
      meta:{ navShow: false, title: '录井分市场月报'}
    },
    {
      path: '/monthLogOfWellWorkload',
      name: 'MonthLogOfWellWorkload',
      component: MonthLogOfWellWorkload,
      meta:{ navShow: false, title: '录井工作量月报'}
    },
    {
      path: '/mlogMonthOfTeam',
      name: 'MlogMonthOfTeam',
      component: MlogMonthOfTeam,
      meta:{ navShow: false, title: '录井队伍统计月报'}
    },


    //实时数据
    {
      path: '/real-time/list/project',
      name: 'RealtimeListOfProjectData',
      component: RealtimeListOfProjectData,
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


    //物探
    {
      path: '/gp/form/list',
      name: 'GPFormList',
      component: GPFormList,
      meta:{ navShow: false, title: '物探专业'}
    },

  ]
})
