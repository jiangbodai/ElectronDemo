const state = {
    icons: [{
      icon: require('@/assets/images/home/icon-triage.png'),
      title: '分诊系统',
      name: 'triage',
    },{
      icon: require('@/assets/images/home/icon-moveInfusion.png'),
      title: '移动输液',
      name: 'infusion'
    },{
      icon: require('@/assets/images/home/icon-patient.png'),
      title: '患者管理',
      name: 'patient'
    },{
      icon: require('@/assets/images/home/icon-qualityControl.png'),
      title: '质控管理',
      name: 'qualityControl'
    },{
      icon: require('@/assets/images/home/icon-shifts.png'),
      title: '交接班',
      name: 'shifts'
    },{
      icon: require('@/assets/images/home/icon-firstAid.png'),
      title: '院前急救',
      name: 'firstAid'
    },{
      icon: require('@/assets/images/home/icon-critically.png'),
      title: '危急重症中心',
      name: 'critically'
    },{
      icon: require('@/assets/images/home/icon-departments.png'),
      title: '科室管理',
      name: 'departments'
    },{
      icon: require('@/assets/images/home/icon-setting.png'),
      title: '系统设置',
      name: 'setting'
    }]
  }

  const mutations = {
      changeIcons(state,type){
        switch (type) {
          case "急症科门诊医生":
            state.icons = state.icons.filter(
              (item) => {
                return item.title == '分诊系统' || item.title == '危急重症中心' || item.title == '系统设置'
              }
            )
            break;
          case "急症科病区医生":
            break;
          case "急症科门诊护士":
            break;
          case "超级管理员":
            break;
          default:
            break;
        }
      }
  }

  export default {
    state,
    mutations
  }