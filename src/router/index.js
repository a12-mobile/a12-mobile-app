import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/pages/Tab-Home'
import MultiWellList from '@/pages/Tab-MultiWellList'
import Discussion from '@/pages/Tab-Discussion'
import Me from '@/pages/Tab-Me'
import SubView from '@/pages/SubView'

//钻井
import DrillFormList from '@/pages/drill/DrillFormList'
import DrillDailyOfKeyWell from '@/pages/drill/DrillDailyOfKeyWell'
import DailyOfDrilling from '@/pages/drill/DailyOfDrilling'
import DRDailyOfRigDynamic from '@/pages/drill/DRDailyOfRigDynamic'
//井下
import DhFormList from '@/pages/dh/DhFormList'
import DhMonthlyOfWorkloadGN from '@/pages/dh/DhMonthlyOfWorkloadGN'
import DhMonthlyOfWorkloadZ from '@/pages/dh/DhMonthlyOfWorkloadZ'

//测井
import LogFormList from '@/pages/log/LogFormList'
import LogMonthlyOfWorkload from '@/pages/log/LogMonthlyOfWorkload'
import LogDailyOfWorkload from '@/pages/log/LogDailyOfWorkload'


// //录井
import MonthLogOfLogWellByCompany from '@/pages/mlog/MonthLogOfLogWellByCompany'
import MonthLogOfWellWorkload from '@/pages/mlog/MonthLogOfWellWorkload'
import MlogsOfRecordWell from '@/pages/mlog/MlogsOfRecordWell'
import MlogFormList from '@/pages/mlog/MlogFormList'
import MlogMonthOfTeam from '@/pages/mlog/MlogMonthOfTeam'

//实时数据
import RealtimeListOfProjectData from '@/pages/real-time/ListOfProjectData'

//demo
import HorizontalScreen from '@/pages/demo/HorizontalScreen'
import LoadMore from '@/pages/demo/LoadMore'
import Mlogs from '@/pages/demo/MlogsOfRecordWell'

//horizontal
import DrillDailyOfZH from '@/pages/horizontal/DrillDailyOfZH'

//well
import WellList from '@/pages/well/WellList'
import KeyWellList from '@/pages/well/KeyWellList'

//物探
import GPFormList from '@/pages/gp/GPFormList'

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
      meta: { navShow: false, title: '钻井日报' }
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
