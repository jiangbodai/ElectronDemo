
export default {
    state: {
        currentTasks:[{
            title: '分诊系统',
            icon: require('@/assets/images/home/icon-triage.png'),
            active: true,
            componentName:'TriageSystem',
            isWorking: 'working'
        },{
            title: '移动输液',
            icon: require('@/assets/images/home/icon-moveInfusion.png'),
            active: true,
            componentName:'MobileInfusion',
            isWorking: 'unwork'
        },{
            title: '患者管理',
            icon: require('@/assets/images/home/icon-patient.png'),
            active: true,
            componentName:'PatientsControl',
            isWorking: 'unwork'
        }]
    },
    getters:{

    },
    mutations: {
        /**
         * 添加任务
         */
        addTask(state, task){
            state.currentTasks.push(task);
        },
        /**
         * 删除任务
         */
        deleteTask(state, task){
            state.currentTasks = state.currentTasks.filter(item => {
                return task.title != item.title
            })
        },
        /**
         * 当前正在工作的任务栏
         */
        currentWorkingTask(state, task){

            for(var i = 0; i < state.currentTasks.length; i ++){
                if(task.title == state.currentTasks[i].title){
                    state.currentTasks[i].isWorking = 'working';
                    state.currentTasks[i].active = true;
                }else{
                    state.currentTasks[i].isWorking = 'unwork';
                }
            }
        },
        /**
         * 最小化任务
         */
        minTask(state, task){
            for(var i = 0; i < state.currentTasks.length; i ++){
                if(task.title == state.currentTasks[i].title){
                    state.currentTasks[i].active = false;
                    break;
                }
            }
        },
        /**
         * 最大化任务
         */
        maxTask(state, task){
            for(var i = 0; i < state.currentTasks.length; i ++){
                if(task.title == state.currentTasks[i].title){
                    state.currentTasks[i].active = true;
                    break;
                }
            }
        }

    },
    actions: {
    },
}