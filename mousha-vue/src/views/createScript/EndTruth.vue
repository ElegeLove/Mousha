<template>
    <div class="endTruth">
        <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
            <el-radio-button label="ending">结局</el-radio-button>
            <el-radio-button label="truth">真相</el-radio-button>
        </el-radio-group>
        <!-- <div>{{tabPosition}}</div> -->
        <div>
            <div v-if="tabPosition == 'ending'">
                <div class="tabMain_top_item">
                    <div class="tabMain_top_item_title">结局模式</div>
                    <!-- class="tabMain_top_item_down_sel" -->
                    <el-select
                        v-model="endingData.endModel"
                        class="tabMain_top_item_down_sel"
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="(itemHred, itemHredI) in manHead"
                            :key="itemHredI"
                            :label="itemHred.label"
                            :value="itemHred.label"
                        >
                        </el-option>
                    </el-select>
                </div>
                <div
                    class="tabMain_top_item"
                    v-for="(engItem, endItem) in endingData.manEnd"
                    :key="endItem"
                >
                    <div class="tabMain_top_item_title">
                        {{ engItem.name }}结局
                    </div>
                    <div class="ending_item">
                        <div>{{ engItem.end_name }}</div>
                        <img
                            @click="endUpdate(endItem)"
                            :src="require('assets/img/icon_update1.png')"
                            alt=""
                        />
                    </div>
                </div>
            </div>
            <div v-if="tabPosition == 'truth'">
                <div class="tabMain_top_item">
                    <div class="tabMain_top_item_title">真相</div>
                    <div class="ending_item">
                        <div>{{ truthVal.truth_name }}</div>
                        <img
                            @click="endUpdate('-1')"
                            :src="require('assets/img/icon_update1.png')"
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="footer_box">
                <div class="footer_cacel">取消</div>
                <div class="footer_nex" @click="clickPre">上一步</div>
                <div class="footer_nex" @click="clickNext">完成</div>
            </div>
        </div>
        <!-- 人物结局编辑 -->
        <el-dialog
            :visible.sync="manShow"
            :show-close="false"
            class="end_pop_footer"
            width="70%"
        >
            <div class="popBox clueSetpop">
                <div class="scoringRules_top">
                    <div class="tabMain_top_item_title">
                        {{ tabpopVal }}名称
                    </div>
                    <input
                        v-model="endName"
                        class="tabMain_top_item_inp"
                        type="text"
                        name=""
                        id=""
                    />
                </div>
                <div class="eng_mans">
                    <div class="tabMain_top_item_title">
                        {{ tabpopVal }}内容
                    </div>
                    <!-- <textarea v-model="endVal.endText" class="tabMain_top_item_inp pop_endText" type="text" name=""
                        id=""></textarea> -->
                    <div class="pop_main_box">
                        <quill-editor
                            v-model="endText"
                            :options="editorOption"
                            ref="QuillEditor"
                        >
                        </quill-editor>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button class="clueSetpop_btn" @click="manShow = false"
                        >取消</el-button
                    >
                    <el-button
                        class="clueSetpop_btn"
                        type="primary"
                        @click="endUpdataSure"
                        >保存</el-button
                    >
                </span>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { Message } from "element-ui";
const toolbarOptions = [
    ["bold", "italic"], // toggled buttons
    // ["bold", "italic", "underline", "strike"], // toggled buttons
    // ["blockquote", "code-block"],

    // [{ header: 1 }, { header: 2 }], // custom button values
    // [{ list: "ordered" }, { list: "bullet" }],
    // [{ script: "sub" }, { script: "super" }], // superscript/subscript
    // [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    // [{ direction: "rtl" }], // text direction

    // [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    // [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }] // dropdown with defaults from theme
    // [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    // [{ font: [] }],
    // [{ align: [] }],

    // ["clean"] // remove formatting button
];
export default {
    data() {
        return {
            tabPosition: "ending",
            endingData: {
                endModel: "",
                manEnd: [
                    {
                        name: "张三",
                        text: "结局"
                    },
                    {
                        name: "王五",
                        text: "结局"
                    },
                    {
                        name: "李四",
                        text: "结局"
                    }
                ]
            },
            endUpdateIndex: "", //结局人物索引
            manShow: false,
            endName: "",
            endText: "",
            enddataval: "结局",
            manHead: [
                {
                    //人物头像
                    value: "1",
                    label: "单结局"
                }
            ],
            content: "",
            editorOption: {
                placeholder: "请输入",
                modules: {
                    toolbar: {
                        container: toolbarOptions // 工具栏
                    }
                }
            },
            tabpopVal: "结局",
            truthVal: {
                truth_name: ""
            },
            isShow: false
        };
    },
    // components: {
    //     quillEditor
    // },
    created() {
        this.allData = JSON.parse(localStorage.getItem("data"));
        this.endingData.manEnd = this.allData.manDrama;
        this.truthVal = this.allData.basicInfoData;
    },
    methods: {
        endUpdate(i) {
            if (this.tabPosition == "truth") {
                this.tabpopVal = "真相";
                this.endName = this.truthVal.truth_name;
                this.endText = this.truthVal.truth_content;
            } else {
                this.tabpopVal = "结局";
                this.endName = this.endingData.manEnd[i].end_name;
                console.log(this.endingData.manEnd[i].end_story);
                this.endText = this.endingData.manEnd[i].end_story;
            }
            this.endUpdateIndex = i;
            this.manShow = true;
        },
        // 结局修改确认
        endUpdataSure() {
            if (this.tabPosition == "truth") {
                if (this.endName == "") {
                    Message.error("请输入真相名称");
                } else if (this.endText == "") {
                    Message.error("请输入真相内容");
                } else {
                    this.truthVal.truth_name = this.endName;
                    this.truthVal.truth_content = this.endText;
                    this.manShow = false;
                }
            } else {
                if (this.endName == "") {
                    Message.error("请输入结局名称");
                } else if (this.endText == "") {
                    Message.error("请输入结局内容");
                } else {
                    this.endingData.manEnd[
                        this.endUpdateIndex
                    ].end_name = this.endName;
                    this.endingData.manEnd[
                        this.endUpdateIndex
                    ].end_story = this.endText;
                    console.log(this.endText);
                    this.manShow = false;
                }
            }
        },
        // 上一步
        clickPre() {
            this.allData.manDrama = this.endingData.manEnd;
            this.allData.basicInfoData = this.truthVal;
            localStorage.setItem("data", JSON.stringify(this.allData));
            this.$router.go(-1);
        },
        // 下一步
        clickNext() {
            this.allData.manDrama = this.endingData.manEnd;
            this.allData.basicInfoData = this.truthVal;
            localStorage.setItem("data", JSON.stringify(this.allData));
            // this.$router.push({
            //     path: "QuestionBank"
            //     // query: {
            //     //     type: i
            //     // }
            // });
            // if (this.truthVal.truth_name == "") {
            //     Message.error("请输入真相名称");
            //     this.isShow = false;
            // } else if (this.truthVal.truth_content == "") {
            //     Message.error("请输入真相内容");
            //     this.isShow = false;
            // } else {
            //     this.endingData.manEnd.some(item => {
            //         if (item.end_name == "") {
            //             Message.error("请输入结局名称");
            //             this.isShow = false;
            //             return true;
            //         } else if (item.end_story == "") {
            //             Message.error("请输入结局内容");
            //             this.isShow = false;
            //             return true;
            //         } else {
            //             this.allData.manDrama = this.endingData.manEnd;
            //             this.allData.basicInfoData = this.truthVal;
            //             localStorage.setItem(
            //                 "data",
            //                 JSON.stringify(this.allData)
            //             );
            //             this.isShow = true;
            //         }
            //     });
            // }
            // if (this.isShow) {
            let that = this;
            //剧本基础信息
            let script_data = {};
            if (this.allData.basicInfoData.paymentTypeVal == 1) {
                script_data = {
                    //剧本基础信息数据
                    script_name: this.allData.basicInfoData.name, //剧本名称
                    people_num: this.allData.basicInfoData.playsNum, //剧本人数
                    author: this.allData.basicInfoData.author, //作者
                    difficult: this.allData.basicInfoData.difficult, //难度
                    word_num: this.allData.basicInfoData.fontNum, //字数
                    tag_id: this.allData.basicInfoData.scriptTagsVal, //标签id
                    secret_talk_room_num: this.allData.basicInfoData.roomsNum, //密谈室数量
                    introduction: this.allData.basicInfoData.storyVal, //故事简介
                    cover: this.allData.basicInfoData.imgId, //封面
                    on_shelf_time: this.allData.basicInfoData.dataTime, //上架时间
                    duration: this.allData.basicInfoData.duration, //时长
                    pay_type: this.allData.basicInfoData.paymentTypeVal, //付费类型:0免费1付费
                    standard_price: this.allData.basicInfoData.criterionPrice, //标准版价格
                    standard_price_original: this.allData.basicInfoData.criterionOldPrice, //标准版原价格
                    enjoy_price: this.allData.basicInfoData.enjoyPrice, //	纷享版价格
                    on_shelf_time: this.allData.basicInfoData.dataTime, //上架时间
                    truth_name: this.allData.basicInfoData.truth_name, //真相名称
                    truth_content: this.allData.basicInfoData.truth_content //真相内容
                };
            } else {
                script_data = {
                    //剧本基础信息数据
                    script_name: this.allData.basicInfoData.name, //剧本名称
                    people_num: this.allData.basicInfoData.playsNum, //剧本人数
                    author: this.allData.basicInfoData.author, //作者
                    difficult: this.allData.basicInfoData.difficult, //难度
                    word_num: this.allData.basicInfoData.fontNum, //字数
                    tag_id: this.allData.basicInfoData.scriptTagsVal, //标签id
                    secret_talk_room_num: this.allData.basicInfoData.roomsNum, //密谈室数量
                    introduction: this.allData.basicInfoData.storyVal, //故事简介
                    cover: this.allData.basicInfoData.imgId, //封面
                    on_shelf_time: this.allData.basicInfoData.dataTime, //上架时间
                    duration: this.allData.basicInfoData.duration, //时长
                    pay_type: this.allData.basicInfoData.paymentTypeVal, //付费类型:0免费1付费
                    on_shelf_time: this.allData.basicInfoData.dataTime, //上架时间
                    truth_name: this.allData.basicInfoData.truth_name, //真相名称
                    truth_content: this.allData.basicInfoData.truth_content //真相内容
                };
            }
            // 流程节点
            let arr = [];
            this.allData.setArr.some(item => {
                let obj = {
                    script_node_name: item.script_node_name, //节点名称
                    order_num: item.order_num, //节点序号
                    node_type: item.node_type, //节点类型【1故事背景2自我介绍3剧本阅读4搜证5答题6结算】
                    describe: item.describe, //节点说明
                    point: item.point, //节点说明
                    button_name: item.button_name, //按钮名称
                    min_experience: item.min_experience, //保底经验值
                    experience: item.experience //经验值/得分
                };
                arr.push(obj);
            });
            // 人物剧本
            let arr1 = []; //人物
            let arr2 = []; //剧本章节
            this.allData.manDrama.some((item, index) => {
                let obj = {
                    script_role_name: item.name, //人物姓名
                    describe: item.describe, //人物介绍
                    head_id: item.head_id, //人物头像
                    end_name: item.end_name, //结局名称
                    end_story: item.end_story //结局内容
                };
                arr1.push(obj);
                if (item.child.length > 0) {
                    item.child.some(itemChild => {
                        // 剧本章节
                        let obj1 = {
                            script_node_key: itemChild.childMode, //选择的流程节点数据的键值
                            script_role_key: index, //选择的人物数据的键值
                            script_role_chapter_name: itemChild.childName, //章节名称
                            content: itemChild.childMain //章节内容
                        };
                        arr2.push(obj1);
                    });
                }
            });
            // 线索设置
            let arr3 = []; //地点
            let arr4 = []; //线索
            this.allData.clueSettingVal.some((item, index) => {
                let obj = {
                    script_place_name: item.addressName, //地点名称
                    no_script_role_keys: item.showRole //选择的不可见角色数据的键|[0,1]
                };
                arr3.push(obj);
                if (item.clueVal.length > 0) {
                    item.clueVal.some(itemChild => {
                        let obj1 = {};
                        if (itemChild.forceSel == "1") {
                            obj1 = {
                                script_node_key: itemChild.clueNode, //线索的节点数据的键
                                script_place_key: index, //地点的键值
                                script_clue_name: itemChild.clueName, //线索名称
                                clue_type: "0", //线索类型【0地点线索1人物线索】
                                detail: itemChild.clueMain, //线索详情
                                attachment: itemChild.pathId, //线索图片ID
                                is_open: itemChild.clueSel, //是否强制公开【1是0否】
                                is_going: itemChild.forceSel, //是否可深入【1是0否】
                                child_script_clue_name: itemChild.clueNameChild, //深入线索的子线索名称
                                child_attachment: itemChild.pathsId, //深入线索的子线索图片ID
                                child_is_open: itemChild.clueSels, //深入线索的子线索-是否强制公开【1是0否】
                                child_detail: itemChild.clueMainChild //深入线索的子线索详情
                            };
                        } else {
                            obj1 = {
                                script_node_key: itemChild.clueNode, //线索的节点数据的键
                                script_place_key: index, //地点的键值
                                clue_type: "0", //线索类型【0地点线索1人物线索】
                                script_clue_name: itemChild.clueName, //线索名称
                                detail: itemChild.clueMain, //线索详情
                                attachment: itemChild.pathId, //线索图片ID
                                is_open: itemChild.clueSel, //是否强制公开【1是0否】
                                is_going: itemChild.forceSel //是否可深入【1是0否】
                            };
                        }
                        arr4.push(obj1);
                    });
                }
            });
            // 问题库
            let arr5 = [];
            this.allData.problemData.some(item => {
                // 答案列表
                let answerList = [];
                item.child.some(itemChild => {
                    let nums = 0;
                    if (itemChild.status) {
                        nums = 1;
                    } else {
                        nums = 0;
                    }
                    let answerObj = {
                        answer_title: itemChild.textVal, //答案标题
                        is_answer: nums //是否是正确答案【1是0否】
                    };
                    answerList.push(answerObj);
                });
                let obj = {
                    script_node_key: item.nodeVal, //问题节点的数据的键
                    no_script_role_key: item.showList, //不可见角色的数据的键|[0,1]
                    question_title: item.name, //问题title
                    question_type: item.type, //问题类型【0单选1多选】
                    score: item.score, //得分
                    reverse_score: item.negativeScore, //反向得分
                    reverse_score_script_role_keys: item.backScore, //反向得分角色
                    script_answer_data: answerList //问题对应的答案数据
                };
                arr5.push(obj);
            });
            // 地图
            // let arr6 = [];  //地图数据
            // let arr7 = [];  //地图控件数据
            // this.allData.map.some(item => {
            //     let obj = {
            //         script_node_keys:item,  //地图选择的流程节点的键|[0,1]
            //         script_node_map_name:item,  //地图名称
            //         attachment:item,  //地图图片ID
            //     }
            // })
            // 新增人物线索
            let persons = [];
            if (this.allData.personVal.checked) {
                this.allData.personVal.personList.some(
                    (item, index) => {
                        if (item.clueVal.length > 0) {
                            item.clueVal.some(itemChild => {
                                let obj1 = {};
                                if (itemChild.forceSel == "1") {
                                    obj1 = {
                                        script_node_key: itemChild.clueNode, //线索的节点数据的键
                                        clue_type: "1", //线索类型【0地点线索1人物线索】
                                        script_role_key: index,
                                        script_clue_name: itemChild.clueName, //线索名称
                                        detail: itemChild.clueMain, //线索详情
                                        attachment: itemChild.pathId, //线索图片ID
                                        is_open: itemChild.clueSel, //是否强制公开【1是0否】
                                        is_going: itemChild.forceSel, //是否可深入【1是0否】

                                        // script_place_key: index, //地点的键值
                                        child_script_clue_name:
                                            itemChild.clueNameChild, //深入线索的子线索名称
                                        child_attachment: itemChild.pathsId, //深入线索的子线索图片ID
                                        child_is_open: itemChild.clueSels, //深入线索的子线索-是否强制公开【1是0否】
                                        child_detail: itemChild.clueMainChild //深入线索的子线索详情
                                    };
                                } else {
                                    obj1 = {
                                        script_node_key: itemChild.clueNode, //线索的节点数据的键
                                        clue_type: "1", //线索类型【0地点线索1人物线索】
                                        script_role_key: index,
                                        script_clue_name: itemChild.clueName, //线索名称
                                        detail: itemChild.clueMain, //线索详情
                                        attachment: itemChild.pathId, //线索图片ID
                                        is_open: itemChild.clueSel, //是否强制公开【1是0否】
                                        is_going: itemChild.forceSel //是否可深入【1是0否】
                                    };
                                }
                                persons.push(obj1);
                            });
                        }
                    }
                );
            }
            // console.log(arr5);
            let dataObj = {
                script_data: script_data,
                script_node_data: arr,
                script_role: arr1,
                script_role_chapter: arr2,
                script_place_data: arr3,
                script_clue_data: arr4,
                script_node_map_data: this.allData.newMap.script_node_map_data,
                script_map_place_data: this.allData.newMap
                    .script_map_place_data,
                script_question_data: arr5,
                script_role_clue_data: persons
            };
            // console.log(dataObj);
            let data = {
                url: "/current/script/add",
                method: "post",
                data: {
                    add_script_data: JSON.stringify(dataObj)
                }
            };
            this.$apiAxiox(data).then(res => {
                if (res.data.code == 1) {
                    // that.scriptTags = res.data.data.list;
                    Message.success(res.data.msg);
                    localStorage.removeItem("data");
                    this.$router.push({
                        path: "BasicInfo"
                    });
                } else {
                    Message.error(res.data.msg);
                }
            });
            // }
        }
    }
};
</script>


<style>
select {
    padding-right: 20px !important;
}
.edit_container,
.quill-editor {
    height: 300px;
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
    content: "14px";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
    content: "10px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
    content: "18px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
    content: "32px";
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
    content: "文本" !important;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
    content: "标题1" !important;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
    content: "标题2" !important;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
    content: "标题3" !important;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
    content: "标题4" !important;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
    content: "标题5" !important;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
    content: "标题6" !important;
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
    content: "标准字体" !important;
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
    content: "衬线字体" !important;
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
    content: "等宽字体" !important;
}
</style>
<style scoped>
.endTruth {
    width: 100%;
    padding: 20px 150px 20px 40px;
    box-sizing: border-box;
    /* margin-top: 20px; */
}
.tabMain_top_item {
    margin: 10px 0 30px;
}
.ending_item {
    width: 100%;
    height: 50px;
    margin-top: 10px;
    padding: 0 18px;
    margin-top: 14px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(245, 245, 245, 1);
    border-radius: 4px;
}

.ending_item > div {
    width: 100%;
    padding-right: 20px;
    box-sizing: border-box;
    font-size: 16px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: rgba(101, 101, 101, 1);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.ending_item > img {
    width: 23px;
    height: 25px;
}
.tabMain_top_item_down_sel {
    width: 100%;
    /* padding: 0 20px 0 20px; */
    margin-top: 15px;
    height: 100%;
    box-sizing: border-box;
    background: rgba(245, 245, 245, 1);
    border-radius: 4px;
    border: none;
    outline: none;
    margin-bottom: 10px;
}
.tabMain_top_item_inp {
    width: 100%;
    height: 50px;
    padding: 20px;
    box-sizing: border-box;
    margin-top: 10px;
    background: rgba(245, 245, 245, 1);
    border: 1px solid rgba(238, 238, 238, 1);
    border-radius: 4px;
}
.tabMain_top_item_title {
    margin-bottom: 10px;
}
.scoringRules_top,
.eng_mans {
    margin-bottom: 20px;
}
.pop_main_box {
    height: 400px;
    font-size: 16px;
}
/* 底部按钮 */

.footer_box {
    width: 100%;
    /* padding: 0 20px 0 40px; */
    box-sizing: border-box;
    display: flex;
    align-items: center;
}

.footer_box > div {
    width: 200px;
    height: 50px;
    border-radius: 5px;
    font-size: 18px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.footer_cacel {
    background-color: #eeeeee;
    color: rgba(153, 153, 153, 1);
    margin-right: 26px;
}

.footer_nex {
    background-color: #1a95ea;
    color: rgba(255, 255, 255, 1);
    margin-right: 26px;
}
.clueSetpop_btn {
    width: 200px;
    height: 50px;
    font-size: 18px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
}
</style>