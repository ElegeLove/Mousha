<template>
    <div class="container">
        <header class="header">
            <div class="navbar">
                <div
                    v-for="navItem in navbar"
                    :key="navItem.name"
                    class="navbar-item"
                    @click="tabs(navItem.name)"
                >
                    <div>
                        <div
                            :class="[
                                navItem.name === navbarIndex
                                    ? 'navbar-item-active'
                                    : ''
                            ]"
                        >
                            {{ navItem.text }}
                        </div>
                        <div
                            class="line_box"
                            v-if="navItem.name === navbarIndex"
                        ></div>
                    </div>
                </div>
            </div>
        </header>
        <router-view />
    </div>
</template>

<script>
export default {
    data() {
        return {
            navbarIndex: "BasicInfoUp",
            navbar: [
                { text: "剧本基础信息", name: "BasicInfoUp" },
                { text: "流程设定", name: "ProcessSettingUp" },
                { text: "人物剧本", name: "CharacterPlayUp" },
                { text: "线索设置", name: "ClueSettingUp" },
                { text: "地图设置", name: "mapUp" },
                { text: "问题库", name: "QuestionBankUp" },
                { text: "结局与真相", name: "EndTruthUp" }
            ],
            searchContent: "",
            keyWordList: [],
            courseURL: "",
            allData: {},
            scriptId: ""
        };
    },
    watch: {
        $route(to, from) {
            localStorage.setItem("selRouter", to.name);
            this.navbarIndex = to.name;
            // console.log(to.fullPath);
            // this.getScriptInfo(this.scriptId);
            // this.$router.push({
            //     path: to.fullPath
            //     // query: {
            //     //     type: i
            //     // }
            // });
        }
    },
    created() {
        var sHref = window.location.href;
        var args = sHref.split("?");
        var str = args[1];
        var id = "";
        args = str.split("&");
        for (var i = 0; i < args.length; i++) {
            str = args[i];
            var arg = str.split("=");
            if (arg.length <= 1) continue;
            if (arg[0] == "id") id = arg[1];
        }
        this.scriptId = id;
        if (localStorage.getItem("selRouter")) {
            this.navbarIndex = localStorage.getItem("selRouter");
        } else {
            this.navbarIndex = "BasicInfoUp";
        }
        // this.getScriptInfo(id);
    },
    methods: {
        tabs(name) {
            localStorage.setItem("selRouter", name);
            if (this.navbarIndex != name) {
                this.navbarIndex = name;
                this.$router.push({
                    path: name,
                    query: {
                        id: this.scriptId
                    }
                });
            }
        },
        // getScriptInfo(id) {
        //     let that = this;
        //     let loadingClose = this.$loading({
        //         lock: true,
        //         text: "Loading",
        //         spinner: "el-icon-loading",
        //         background: "rgba(0, 0, 0, 0.7)"
        //     });
        //     let data = {
        //         url: "/current/script/details",
        //         method: "post",
        //         data: {
        //             script_id: id
        //         }
        //     };
        //     this.$apiAxiox(data).then(res => {
        //         // 剧本基本信息
        //         that.allData.basicInfoData = {
        //             id: res.data.script_result.script_id, //剧本ID
        //             name: res.data.script_result.script_name, //剧本名称
        //             playsNum: res.data.script_result.people_num, //剧本人数
        //             author: res.data.script_result.author, //作者
        //             duration: res.data.script_result.duration, //时长
        //             difficult: res.data.script_result.difficult_text, //难度
        //             fontNum: res.data.script_result.word_num, //字数
        //             scriptTagsVal: res.data.script_result.tag_id, //剧本标签
        //             roomsNum: res.data.script_result.secret_talk_room_num, //密谈室数量
        //             imageUrl: res.data.script_result.cover, //剧本封面
        //             imgId: res.data.script_result.cover_id, //剧本封面id
        //             storyVal: res.data.script_result.introduction, //故事简介
        //             paymentTypeVal: res.data.script_result.pay_type_text, //付费类型
        //             criterionPrice: res.data.script_result.standard_price, //标准版价格
        //             enjoyPrice: res.data.script_result.enjoy_price, //纷享版价格
        //             launchTime: null, //上架时间
        //             dataTime: res.data.script_result.on_shelf_time, //上架时间
        //             truth_name: res.data.script_result.truth_name, //真相名称
        //             truth_content: res.data.script_result.truth_content //真相内容
        //         };
        //         // 流程节点
        //         let arr = [];
        //         res.data.script_node_list.some(item => {
        //             let obj = {
        //                 script_node_name: item.name, //节点名称
        //                 order_num: item.order_num, //节点序号
        //                 node_type: item.node_type, //节点类型【1故事背景2自我介绍3剧本阅读4搜证5答题6结算】
        //                 describe: item.describe, //节点说明
        //                 button_name: item.button_name, //按钮名称
        //                 min_experience: item.min_experience, //保底经验值
        //                 experience: item.experience, //经验值/得分
        //                 id: item.script_node_id,
        //                 status: true
        //             };
        //             arr.push(obj);
        //         });
        //         that.allData.setArr = arr;
        //         // 人物剧本
        //         let arr1 = [];
        //         let arr2 = [];
        //         res.data.script_role_list.some(item => {
        //             if (item.script_role_list.length > 0) {
        //                 item.script_role_list.some(itemChild => {
        //                     let obj1 = {
        //                         childMode: itemChild.script_node_id, //选择的流程节点数据的键值
        //                         childModeName: itemChild.script_node_name, //选择的流程节点数据的键值
        //                         childName: itemChild.name, //章节名称
        //                         childMain: itemChild.content, //章节内容
        //                         childId: itemChild.script_role_chapter_id
        //                     };
        //                     arr2.push(obj1);
        //                 });
        //             }

        //             let obj = {
        //                 id: item.script_role_id,
        //                 name: item.name, //人物姓名
        //                 describe: item.describe, //人物介绍
        //                 head_name: item.head_name, //人物头像
        //                 head_id: item.head_id, //人物头像
        //                 end_name: item.end_name, //	结局名称
        //                 end_story: item.end_story, //	结局内容
        //                 child: arr2
        //             };
        //             arr1.push(obj);
        //         });
        //         that.allData.manDrama = arr1;
        //         // 线索设置
        //         let arr3 = [];
        //         let arr4 = [];

        //         res.data.script_place_list.some(item => {
        //             let arr5 = [];
        //             if (item.clue_list.length > 0) {
        //                 item.clue_list.some(itemChild => {
        //                     let obj1 = {};
        //                     if (itemChild.is_going == 1) {
        //                         obj1 = {
        //                             id: itemChild.script_clue_id,
        //                             clueNode: itemChild.script_node_name, //线索的节点数据的键
        //                             clueName: itemChild.name, //线索名称
        //                             clueMain: itemChild.detail, //线索详情
        //                             pathId: itemChild.attachment_id, //线索图片ID
        //                             cluePath: itemChild.attachment, //线索图片ID
        //                             clueSel: itemChild.is_open, //是否强制公开【1是0否】
        //                             forceSel: itemChild.is_going, //是否可深入【1是0否】
        //                             clueNameChild: itemChild.child.name, //深入线索的子线索名称
        //                             pathsId: itemChild.child.attachment_id, //深入线索的子线索图片ID
        //                             cluePaths: itemChild.child.attachment, //深入线索的子线索图片ID
        //                             clueSels: itemChild.child.is_open, //深入线索的子线索-是否强制公开【1是0否】
        //                             clueMainChild: itemChild.child.detail, //深入线索的子线索详情
        //                             childId: itemChild.child.script_clue_id
        //                         };
        //                     } else {
        //                         obj1 = {
        //                             id: itemChild.script_clue_id,
        //                             clueNode: itemChild.script_node_name, //线索的节点数据的键
        //                             clueName: itemChild.name, //线索名称
        //                             clueMain: itemChild.detail, //线索详情
        //                             pathId: itemChild.attachment_id, //线索图片ID
        //                             cluePath: itemChild.attachment, //线索图片ID
        //                             clueSel: itemChild.is_open, //是否强制公开【1是0否】
        //                             forceSel: itemChild.is_going //是否可深入【1是0否】
        //                         };
        //                     }
        //                     arr4.push(obj1);
        //                 });
        //             }

        //             if (item.no_script_role_list.length > 0) {
        //                 item.no_script_role_list.some(itemShow => {
        //                     arr5.push(itemShow.script_role_name);
        //                 });
        //             }
        //             let obj = {
        //                 addressName: item.name, //地点名称
        //                 id: item.script_place_id, //地点id
        //                 showRole: arr5, //选择的不可见角色数据的键|[0,1]
        //                 clueVal: arr4,
        //                 status: true
        //             };
        //             arr3.push(obj);
        //         });
        //         that.allData.clueSettingVal = arr3;

        //         // 地图设置
        //         let arr6 = [];
        //         res.data.script_node_map_list.forEach((item, index) => {
        //             let processValue = [];
        //             let componentList = [];

        //             // 节点
        //             item.script_node_list.forEach(nodeItem => {
        //                 processValue.push(nodeItem.script_node_id);
        //             });

        //             // 控件
        //             item.script_map_place_list.forEach(mapItem => {
        //                 // componentList.push(mapItem)
        //                 componentList.push({
        //                     x: mapItem.control_x_coordinate,
        //                     y: mapItem.control_y_coordinate,
        //                     width: mapItem.control_width,
        //                     height: mapItem.control_height,
        //                     clueValue: mapItem.script_place_key,
        //                     virtualClueValue: mapItem.script_place_key,
        //                     script_map_place_id: mapItem.script_map_place_id
        //                     // script_place_id:mapItem.script_place_id
        //                 });
        //             });

        //             arr6.push({
        //                 script_node_map_id: item.script_node_map_id,
        //                 name: item.name,
        //                 editingName: item.name,
        //                 allowEditName: false,
        //                 componentList: componentList,
        //                 virtualProcessValue: processValue,
        //                 processValue: processValue, // 节点
        //                 path: item.attachment,
        //                 imageId: item.attachment_id,
        //                 imageWidth: item.attachment_width,
        //                 imageHeight: item.attachment_height
        //             });
        //         });

        //         that.allData.map = arr6;

        //         // 问题库
        //         let arr8 = [];
        //         res.data.script_question_list.some((item, index) => {
        //             let arr9 = [];
        //             let arr10 = [];
        //             let arr11 = [];
        //             if (item.answer_list.length > 0) {
        //                 item.answer_list.some(itemChild => {
        //                     let stas = false;
        //                     if (itemChild.is_answer == "1") {
        //                         stas = true;
        //                     } else {
        //                         stas = false;
        //                     }
        //                     let obj1 = {
        //                         id: itemChild.script_answer_id,
        //                         status: stas, //是否正确答案
        //                         textVal: itemChild.answer_title //问题名称
        //                     };
        //                     arr9.push(obj1);
        //                 });
        //             }
        //             if (item.no_see_script_roles.length > 0) {
        //                 item.no_see_script_roles.some(itemShow => {
        //                     arr10.push(itemShow.name);
        //                 });
        //             }
        //             if (item.reverse_score_role_data.length > 0) {
        //                 item.reverse_score_role_data.some(itemBack => {
        //                     arr11.push(itemBack.name);
        //                 });
        //             }

        //             let obj = {
        //                 id: item.script_question_id, //问题节点的数据的键
        //                 nodeVal: item.script_node_id, //问题节点的数据的键
        //                 nameVal:
        //                     "问题" +
        //                     (index + 1) +
        //                     "（" +
        //                     (item.question_type == 1 ? "多选" : "单选") +
        //                     "题）", //问题名称
        //                 showList: arr10, //不可见角色的数据的键|[0,1]
        //                 backScore: arr11, //反向得分角色
        //                 name: item.question_title, //问题title
        //                 type: item.question_type, //问题类型【0单选1多选】
        //                 score: item.score, //得分
        //                 negativeScore: item.reverse_score, //反向得分
        //                 child: arr9 //问题对应的答案数据
        //             };
        //             arr8.push(obj);
        //         });
        //         this.allData.problemData = arr8;
        //         // localStorage.setItem("data", JSON.stringify(that.allData));
        //         loadingClose.close();
        //     });
        // }
    }
};
</script>

<style lang="scss">
.header {
    width: 100%;
    height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    .navbar {
        width: 1200px !important;
        display: flex;
        flex-wrap: wrap;
        flex: 1;
        div {
            position: relative;
            width: 120px;
            text-align: center;
            height: 30px;
            .navbar-item-active {
                color: #1994e9 !important;
            }
            .line_box {
                position: absolute;
                left: 45px;
                bottom: 0;
                width: 30px;
                height: 4px;
                background: #1a95ea;
                border-radius: 2px;
            }
        }
        .navbar-item {
            height: 100%;
            font-size: 18px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 20px 10px;
            cursor: pointer;
        }
    }
}
.el-loading-mask {
    z-index: 9999 !important;
}
</style>

