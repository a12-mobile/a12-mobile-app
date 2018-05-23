import Vue from 'vue'
import Router from 'vue-router'

//tab页
import Home from '@/pages/Tab-Home'
import MultiWellList from '@/pages/Tab-MultiWellList'
import Discussion from '@/pages/Tab-Discussion'
import Me from '@/pages/Tab-Me'


import SubView from '@/pages/SubView'

//钻井
import DrillListOfProjectData from '@/pages/drill/DrillListOfProjectData'
import DrillListOfProjectData2 from '@/pages/drill/DrillListOfProjectData2'
import DrillFormList from '@/pages/drill/DrillFormList'
import DrillDailyOfKeyWell from '@/pages/drill/DrillDailyOfKeyWell'

//井下
import DhFormList from '@/pages/dh/DhFormList'
import DhMonthlyOfWorkloadGN from '@/pages/dh/DhMonthlyOfWorkloadGN'
import DhMonthlyOfWorkloadZ from '@/pages/dh/DhMonthlyOfWorkloadZ'

//测井
import LogFormList from '@/pages/log/LogFormList'
import LogMonthlyOfWorkload from '@/pages/log/LogMonthlyOfWorkload'

import LogsOfRecordWell from '@/pages/LogsOfRecordWell'
import DailyOfDrilling from '@/components/DailyOfDrilling'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { navShow: true, title: '首页' },
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
    
    {
      path:'/dailyOfDrilling',
      name:'dailyOfDrilling',
      component:DailyOfDrilling,
      meta:{navShow:true,title:'中油油服钻井工作量日报'}
    },
    {
      path: '/logsOfRecordWell',
      name: 'LogsOfRecordWell',
      component: LogsOfRecordWell,
      meta:{ navShow: false, title: '录井日报'}
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
      path: '/drill/project/data/list',
      name: 'DrillListOfProjectData',
      component: DrillListOfProjectData,
      meta: { navShow: false, title: '工程数据列表' }
    },
    {
      path: '/drill/project/data/list2',
      name: 'DrillListOfProjectData2',
      component: DrillListOfProjectData2,
      meta: { navShow: false, title: '工程数据列表2' }
    },
    //钻井 end

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
      path: '/log/monthly',
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

    //测井end
  ]
})
