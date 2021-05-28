
export default {
    state: {
        currentTasks:[]
    },
    getters:{

    },
    mutations: {
        /**
         * 添加任务
         */
        addTask(state, task){
            for(var i = 0; i < state.currentTasks.length; i ++){
                state.currentTasks[i].isWorking = 'unwork';
            }
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