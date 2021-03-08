import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import CreateScript from 'views/createScript/index'
import UpdataScript from 'views/updataScript/index'
import ShowInfoScript from 'views/showInfoScript/index'
// import ViewScript from '@views/viewScript/index'

export default new Router({
    routes: [{
            path: '/',
            redirect: 'createScript/BasicInfo'
        },
        {
            path: '/createScript',
            name: 'createScript',
            component: CreateScript,
            children: [{
                    path: 'BasicInfo',
                    name: 'BasicInfo',
                    component: () =>
                        import ('views/createScript/BasicInfo')
                },
                {
                    path: 'ProcessSetting',
                    name: 'ProcessSetting',
                    component: () =>
                        import ('views/createScript/ProcessSetting')
                },
                {
                    path: 'CharacterPlay',
                    name: 'CharacterPlay',
                    component: () =>
                        import ('views/createScript/CharacterPlay')
                },
                {
                    path: 'ClueSetting',
                    name: 'ClueSetting',
                    component: () =>
                        import ('views/createScript/ClueSetting')
                },
                {
                    path: 'QuestionBank',
                    name: 'QuestionBank',
                    component: () =>
                        import ('views/createScript/QuestionBank')
                },
                {
                    path: 'EndTruth',
                    name: 'EndTruth',
                    component: () =>
                        import ('views/createScript/EndTruth')
                },
                {
                    path: 'map',
                    name: 'map',
                    component: () =>
                        import ('views/createScript/map')
                },
            ]
        },
        {
            path: '/updataScript',
            name: 'updataScript',
            component: UpdataScript,
            children: [{
                    path: 'BasicInfoUp',
                    name: 'BasicInfoUp',
                    component: () =>
                        import ('views/updataScript/BasicInfoUp')
                },
                {
                    path: 'ProcessSettingUp',
                    name: 'ProcessSettingUp',
                    component: () =>
                        import ('views/updataScript/ProcessSettingUp')
                },
                {
                    path: 'CharacterPlayUp',
                    name: 'CharacterPlayUp',
                    component: () =>
                        import ('views/updataScript/CharacterPlayUp')
                },
                {
                    path: 'ClueSettingUp',
                    name: 'ClueSettingUp',
                    component: () =>
                        import ('views/updataScript/ClueSettingUp')
                },
                {
                    path: 'QuestionBankUp',
                    name: 'QuestionBankUp',
                    component: () =>
                        import ('views/updataScript/QuestionBankUp')
                },
                {
                    path: 'EndTruthUp',
                    name: 'EndTruthUp',
                    component: () =>
                        import ('views/updataScript/EndTruthUp')
                },
                {
                    path: 'mapUp',
                    name: 'mapUp',
                    component: () =>
                        import ('views/updataScript/mapUp')
                },
            ]
        },
        {
            path: '/showInfoScript',
            name: 'showInfoScript',
            component: ShowInfoScript,
            children: [{
                    path: 'BasicInfoInfo',
                    name: 'BasicInfoInfo',
                    component: () =>
                        import ('views/showInfoScript/BasicInfoInfo')
                },
                {
                    path: 'ProcessSettingInfo',
                    name: 'ProcessSettingInfo',
                    component: () =>
                        import ('views/showInfoScript/ProcessSettingInfo')
                },
                {
                    path: 'CharacterPlayInfo',
                    name: 'CharacterPlayInfo',
                    component: () =>
                        import ('views/showInfoScript/CharacterPlayInfo')
                },
                {
                    path: 'ClueSettingInfo',
                    name: 'ClueSettingInfo',
                    component: () =>
                        import ('views/showInfoScript/ClueSettingInfo')
                },
                {
                    path: 'QuestionBankInfo',
                    name: 'QuestionBankInfo',
                    component: () =>
                        import ('views/showInfoScript/QuestionBankInfo')
                },
                {
                    path: 'EndTruthInfo',
                    name: 'EndTruthInfo',
                    component: () =>
                        import ('views/showInfoScript/EndTruthInfo')
                },
                {
                    path: 'mapInfo',
                    name: 'mapInfo',
                    component: () =>
                        import ('views/showInfoScript/mapInfo')
                },
            ]
        },
        // {
        // 	path: '/viewScript',
        // 	name: 'viewScript',
        // 	component: ViewScript,
        // }
    ]
})