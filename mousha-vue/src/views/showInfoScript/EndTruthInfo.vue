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
                    <div class="tabMain_top_item_down_sel">单结局</div>
                    <!-- <select
                        class="tabMain_top_item_down_sel"
                        v-model="endingData.endModel"
                        placeholder="请选择"
                    >
                        <option
                            v-for="(itemHred, itemHredI) in manHead"
                            :key="itemHredI"
                            :label="itemHred.label"
                            :value="itemHred.label"
                        >
                        </option>
                    </select> -->
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
                <div class="footer_nex" @click="clickNext">编辑</div>
            </div>
        </div>
        <!-- 人物结局编辑 -->
        <el-dialog :visible.sync="manShow" class="end_pop_footer" width="70%">
            <div class="popBox clueSetpop">
                <div class="scoringRules_top">
                    <div class="tabMain_top_item_title">
                        {{ tabpopVal }}名称
                    </div>
                    <div class="tabMain_top_item_inp">{{ endName }}</div>
                    <!-- <input
                        v-model="endName"
                        class="tabMain_top_item_inp"
                        type="text"
                        name=""
                        id=""
                    /> -->
                </div>
                <div class="eng_mans">
                    <div class="tabMain_top_item_title">
                        {{ tabpopVal }}内容
                    </div>
                    <!-- <textarea v-model="endVal.endText" class="tabMain_top_item_inp pop_endText" type="text" name=""
                        id=""></textarea> -->
                    <div class="pop_main_box">
                        {{ endText }}
                        <!-- <quill-editor
                            v-model="endText"
                            :options="editorOption"
                            ref="QuillEditor"
                        >
                        </quill-editor> -->
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <!-- <el-button class="clueSetpop_btn" @click="manShow = false"
                        >取消</el-button
                    > -->
                    <el-button
                        class="clueSetpop_btn"
                        type="primary"
                        @click="manShow = false"
                        >关闭</el-button
                    >
                </span>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { Message } from "element-ui";
const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"] // remove formatting button
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
        // 下一步
        clickNext() {
            localStorage.setItem('selRouter','EndTruthUp')
            this.$router.push({
                path: "/updataScript/EndTruthUp",
                query: {
                    id: this.allData.basicInfoData.id
                }
            });
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
    padding: 20px 150px 20px 40px;
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
    padding: 0 20px 0 20px;
    margin-top: 15px;
    min-height: 50px;
    line-height: 50px;
    box-sizing: border-box;
    background: rgba(245, 245, 245, 1);
    border-radius: 4px;
    border: none;
    outline: none;
    margin-bottom: 10px;
}
.tabMain_top_item_inp {
    width: 100%;
    min-height: 50px;
    line-height: 50px;
    padding: 0 20px;
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
    /* height: 400px; */
    width: 100%;
    min-height: 400px;
    line-height: 50px;
    padding: 10px;
    box-sizing: border-box;
    margin-top: 10px;
    background: rgba(245, 245, 245, 1);
    border: 1px solid rgba(238, 238, 238, 1);
    border-radius: 4px;
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
</style>