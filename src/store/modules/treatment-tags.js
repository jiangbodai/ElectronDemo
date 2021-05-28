let icons = [
  {
    icon: require('@/assets/images/home/icon-triage.png'),
    title: '分诊系统',
    name: 'TriageSystem',
    id: 1
  },
  {
    icon: require('@/assets/images/home/icon-moveInfusion.png'),
    title: '移动输液',
    name: 'MobileInfusion',
    id: 2
  },
  {
    icon: require('@/assets/images/home/icon-patient.png'),
    title: '患者管理',
    name: 'PatientsControl',
    id: 3
  },
  {
    icon: require('@/assets/images/home/icon-qualityControl.png'),
    title: '质控管理',
    name: 'QualityControl',
    id: 4
  },
  {
    icon: require('@/assets/images/home/icon-shifts.png'),
    title: '交接班',
    name: 'ChangeShifts',
    id: 5
  },
  {
    icon: require('@/assets/images/home/icon-firstAid.png'),
    title: '院前急救',
    name: 'PreHospitalCare',
    id: 6
  },
  {
    icon: require('@/assets/images/home/icon-critically.png'),
    title: '危急重症中心',
    name: 'Critically',
    id: 7
  },
  {
    icon: require('@/assets/images/home/icon-departments.png'),
    title: '科室管理',
    name: 'Departments',
    id: 8
  },
  {
    icon: require('@/assets/images/home/icon-setting.png'),
    title: '系统设置',
    name: 'Setting',
    id: 9
  }
]

function getIcons(type){
  switch (type) {
    case "急症科门诊医生":
      return icons.filter(
        (item) => {
          return item.title == '分诊系统' || item.title == '危急重症中心' || item.title == '系统设置'
        }
      )
      break;
    case "急症科病区医生":
      return icons.filter(
        (item) => {
          return item.title == '院前急救' || item.title == '科室管理' || item.title == '系统设置'
        }
      )
      break;
    case "急症科门诊护士":
      return icons.filter(
        (item) => {
          return item.title == '分诊系统' || item.title == '交接班' || item.title == '系统设置'
        }
      )
      break;
    case "超级管理员":
      return icons;
      break;
  }
}

export default {
  getters:{
    currentIcons(state){
      return function(type){
        return getIcons(type)
      }
    }
  }
}
