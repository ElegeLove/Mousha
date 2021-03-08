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
                    <el-select
                        class="tabMain_top_item_down_sel"
                        v-model="endingData.endModel"
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
                <div class="footer_nex" @click="clickNext">保存</div>
            </div>
        </div>
        <!-- 人物结局编辑 -->
        <el-dialog :visible.sync="manShow" :show-close="false" class="end_pop_footer" width="70%">
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

    [{ color: [] }], // dropdown with defaults from theme
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
            isShow: false,
            allData:{
                basicInfoData:{},
                manDrama:[]
            }
        };
    },
    // components: {
    //     quillEditor
    // },
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
        this.getScriptInfo(id);
    },
    // created() {
    //     this.allData = JSON.parse(localStorage.getItem("data"));
    //     this.endingData.manEnd = this.allData.manDrama;
    //     this.truthVal = this.allData.basicInfoData;
    // },
    methods: {
        getScriptInfo(id) {
            let that = this;
            let loadingClose = this.$loading({
                lock: true,
                text: "Loading",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)"
            });
            let data = {
                url: "/current/script/details",
                method: "post",
                data: {
                    script_id: id
                }
            };
            this.$apiAxiox(data).then(res => {
                // 剧本基本信息
                let basicInfo = {
                    id: res.data.script_result.script_id, //剧本ID
                    name: res.data.script_result.script_name, //剧本名称
                    playsNum: res.data.script_result.people_num, //剧本人数
                    author: res.data.script_result.author, //作者
                    duration: res.data.script_result.duration, //时长
                    difficult: res.data.script_result.difficult, //难度
                    // difficult: res.data.script_result.difficult_text, //难度
                    fontNum: res.data.script_result.word_num, //字数
                    scriptTagsVal: res.data.script_result.tag_id, //剧本标签
                    roomsNum: res.data.script_result.secret_talk_room_num, //密谈室数量
                    imageUrl: res.data.script_result.cover, //剧本封面
                    imgId: res.data.script_result.cover_id, //剧本封面id
                    storyVal: res.data.script_result.introduction, //故事简介
                    paymentTypeVal: res.data.script_result.pay_type_text, //付费类型
                    criterionPrice: res.data.script_result.standard_price, //标准版价格
                    enjoyPrice: res.data.script_result.enjoy_price, //纷享版价格
                    launchTime: null, //上架时间
                    dataTime: res.data.script_result.on_shelf_time, //上架时间
                    truth_name: res.data.script_result.truth_name, //真相名称
                    truth_content: res.data.script_result.truth_content //真相内容
                };
                that.allData.basicInfoData = basicInfo;
                that.truthVal = that.allData.basicInfoData;
                // 人物剧本
                let arr1 = [];
                let arr2 = [];
                res.data.script_role_list.some(item => {
                    if (item.script_role_list.length > 0) {
                        item.script_role_list.some(itemChild => {
                            let obj1 = {
                                childMode: itemChild.script_node_id, //选择的流程节点数据的键值
                                childModeName: itemChild.script_node_name, //选择的流程节点数据的键值
                                childName: itemChild.name, //章节名称
                                childMain: itemChild.content, //章节内容
                                childId: itemChild.script_role_chapter_id
                            };
                            arr2.push(obj1);
                        });
                    }

                    let obj = {
                        id: item.script_role_id,
                        name: item.name, //人物姓名
                        describe: item.describe, //人物介绍
                        head_name: item.head_name, //人物头像
                        head_id: item.head_id, //人物头像
                        end_name: item.end_name, //	结局名称
                        end_story: item.end_story, //	结局内容
                        child: arr2
                    };
                    arr1.push(obj);
                });
                that.allData.manDrama = arr1;
                this.endingData.manEnd = this.allData.manDrama;
                
                // localStorage.setItem("data", JSON.stringify(that.allData));
                loadingClose.close();
            });
        },
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
                // if (this.endName == "") {
                //     Message.error("请输入真相名称");
                // } else if (this.endText == "") {
                //     Message.error("请输入真相内容");
                // } else {
                    this.truthVal.truth_name = this.endName;
                    this.truthVal.truth_content = this.endText;
                    this.manShow = false;
                // }
            } else {
                // if (this.endName == "") {
                //     Message.error("请输入结局名称");
                // } else if (this.endText == "") {
                //     Message.error("请输入结局内容");
                // } else {
                    this.endingData.manEnd[
                        this.endUpdateIndex
                    ].end_name = this.endName;
                    this.endingData.manEnd[
                        this.endUpdateIndex
                    ].end_story = this.endText;
                    console.log(this.endText);
                    this.manShow = false;
                // }
            }
        },
        // 下一步
        clickNext() {
            this.allData.manDrama = this.endingData.manEnd;
            this.allData.basicInfoData = this.truthVal;
            localStorage.setItem(
                "data",
                JSON.stringify(this.allData)
            );
            // // 人物剧本
            // let arr1 = []; //人物
            // let arr2 = []; //剧本章节
            // this.allData.manDrama.some((item, index) => {
            //     let obj = {
            //         script_role_name: item.name, //人物姓名
            //         describe: item.describe, //人物介绍
            //         head_id: item.head_id, //人物头像
            //         end_name: item.end_name, //结局名称
            //         end_story: item.end_story //结局内容
            //     };
            //     arr1.push(obj);
            //     if (item.child.length > 0) {
            //         item.child.some(itemChild => {
            //             // 剧本章节
            //             let obj1 = {
            //                 script_node_key: itemChild.childMode, //选择的流程节点数据的键值
            //                 script_role_key: index, //选择的人物数据的键值
            //                 script_role_chapter_name: itemChild.childName, //章节名称
            //                 content: itemChild.childMain //章节内容
            //             };
            //             arr2.push(obj1);
            //         });
            //     }
            // });
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
                // this.endingData.manEnd.some(item => {
                //     // if (item.end_name == "") {
                //     //     Message.error("请输入结局名称");
                //     //     this.isShow = false;
                //     //     return true;
                //     // } else if (item.end_story == "") {
                //     //     Message.error("请输入结局内容");
                //     //     this.isShow = false;
                //     //     return true;
                //     // } else {
                //         this.allData.manDrama = this.endingData.manEnd;
                //         this.allData.basicInfoData = this.truthVal;
                //         localStorage.setItem(
                //             "data",
                //             JSON.stringify(this.allData)
                //         );
                //         this.isShow = true;
                //     // }
                // });
            // }
            // if (this.isShow) {
                let that = this;
                let arr1 = []; //人物
                // let arr2 = []; //剧本章节
                this.allData.manDrama.some((item, index) => {
                    let obj = {
                        script_role_name: item.name, //人物姓名
                        describe: item.describe, //人物介绍
                        head_id: item.head_id, //人物头像
                        end_name: item.end_name, //结局名称
                        end_story: item.end_story, //结局内容
                        script_role_id: item.id //角色id
                    };
                    arr1.push(obj);
                    // if (item.child.length > 0) {
                    //     item.child.some(itemChild => {
                    //         // 剧本章节
                    //         let obj1 = {
                    //             script_node_id: itemChild.childMode, //选择的流程节点数据的键值
                    //             script_role_chapter_id: itemChild.childId, //人物章节ID
                    //             script_role_chapter_name: itemChild.childName, //章节名称
                    //             content: itemChild.childMain, //章节内容
                    //             script_role_id: item.id //角色id
                    //         };
                    //         arr2.push(obj1);
                    //     });
                    // }
                });
                let dataObj = {
                    script_id: this.allData.basicInfoData.id, //剧本ID
                    script_data: {
                        script_id: this.allData.basicInfoData.id, //剧本ID
                        script_name: this.allData.basicInfoData.name, //剧本名称
                        people_num: this.allData.basicInfoData.playsNum, //剧本人数
                        author: this.allData.basicInfoData.author, //作者
                        difficult: this.allData.basicInfoData.difficult, //难度
                        duration: this.allData.basicInfoData.duration, //时长
                        secret_talk_room_num: this.allData.basicInfoData
                            .roomsNum, //密谈室数量
                        introduction: this.allData.basicInfoData.storyVal, //故事简介
                        word_num: this.allData.basicInfoData.fontNum, //字数
                        tag_id: this.allData.basicInfoData.scriptTagsVal, //标签id
                        cover: this.allData.basicInfoData.imgId, //封面
                        pay_type: this.allData.basicInfoData.paymentTypeVal, //付费类型:0免费1付费
                        on_shelf_time: this.allData.basicInfoData.dataTime, //上架时间
                        truth_name: this.allData.basicInfoData.truth_name, //真相名称
                        truth_content: this.allData.basicInfoData.truth_content //真相内容
                    },
                    script_role: arr1,
                    // script_role_chapter: arr2
                };
                if (this.allData.basicInfoData.paymentTypeVal == 1) {
                    dataObj.script_data.standard_price = this.allData.basicInfoData.criterionPrice;
                    dataObj.script_data.enjoy_price = this.allData.basicInfoData.enjoyPrice;
                }
                console.log(dataObj);
                let data = {
                    url: "/current/script/edit",
                    method: "post",
                    data: {
                        add_script_data: JSON.stringify(dataObj)
                    }
                };
                this.$apiAxiox(data).then(res => {
                    if (res.data.code == 1) {
                        // that.scriptTags = res.data.data.list;
                        Message.success(res.data.msg);
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
    padding: 0 150px 0 40px;
    box-sizing: border-box;
    margin-top: 20px;
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
    padding: 0 20px 0 40px;
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
    font-family: 'Microsoft YaHei';
    font-weight: 400;
}
</style>