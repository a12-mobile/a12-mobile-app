import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/pages/Tab-Home'
import MultiWellList from '@/pages/Tab-MultiWellList'
import Discussion from '@/pages/Tab-Discussion'
import Me from '@/pages/Tab-Me'
import SubView from '@/pages/SubView'
import DrillListOfProjectData from '@/pages/DrillListOfProjectData'
import DrillListOfProjectData2 from '@/pages/DrillListOfProjectData2'
import DailyOfKeyWell from '@/pages/DailyOfKeyWell'
import LogsOfRecordWell from '@/pages/LogsOfRecordWell'
import DailyOfDrilling from '@/components/DailyOfDrilling'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { navShow: true, title: '首页' }
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
    {
      path: '/daily/well/key',
      name: 'DailyOfKeyWell',
      component: DailyOfKeyWell,
      meta: { navShow: false, title: '重点井日报' }
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
    }
  ]
})
