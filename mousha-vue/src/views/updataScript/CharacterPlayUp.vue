<template>
    <div class="characterPlay">
        <div
            class="characterPlay_main"
            v-for="(item, ix) in manDrama"
            :key="ix"
        >
            <div class="tabMain_top_item">
                <div class="tabMain_top_item_title">人物{{ ix + 1 }}姓名</div>
                <input
                    class="tabMain_top_item_inp"
                    type="text"
                    v-model="item.name"
                />
            </div>
            <div class="tabMain_top_item">
                <div class="tabMain_top_item_title">人物{{ ix + 1 }}介绍</div>
                <input
                    class="tabMain_top_item_inp"
                    type="text"
                    v-model="item.describe"
                />
            </div>
            <div class="tabMain_top_item">
                <div class="tabMain_top_item_title">人物{{ ix + 1 }}头像</div>
                <el-select
                    class="pop_sel"
                    v-model="item.head_id"
                    placeholder="请选择"
                >
                    <el-option
                        v-for="itemHred in manHead"
                        :key="itemHred.attachment"
                        :label="itemHred.name"
                        :value="itemHred.attachment"
                    >
                    </el-option>
                </el-select>
            </div>
            <div class="tabMain_top_item">
                <div class="tabMain_top_item_title">人物{{ ix + 1 }}剧本</div>
                <div class="characterPlay_box">
                    <div
                        class="characterPlay_item"
                        v-for="(itemChild, ix1) in item.child"
                        :key="ix1"
                    >
                        <input
                            v-model="itemChild.childName"
                            readonly="readonly"
                            type="text"
                            name=""
                            id=""
                        />
                        <img
                            @click="updateMode(ix, ix1)"
                            :src="require('assets/img/icon_update1.png')"
                            alt=""
                        />
                    </div>
                    <div class="characterPlay_btn" @click="addMode(ix)">
                        新增
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="footer_box">
                <div class="footer_nex" @click="clickNext">保存</div>
            </div>
        </div>
        <!-- 人物剧本新增 -->
        <el-dialog :visible.sync="manDramaShow" :show-close="false" width="50%">
            <div class="popBox">
                <div class="tabMain_top_item">
                    <div class="tabMain_top_item_title">章节名称</div>
                    <input
                        v-model="manDramaAdd.chapterName"
                        class="tabMain_top_item_inp"
                        type="text"
                        name=""
                        id=""
                    />
                </div>
                <div class="tabMain_top_item">
                    <div class="tabMain_top_item_title">流程节点</div>
                    <el-select
                        class="pop_sel"
                        v-model="manDramaAdd.procedureNode"
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="itemHred in processNode"
                            :key="itemHred.id"
                            :label="itemHred.script_node_name"
                            :value="itemHred.id"
                        >
                        </el-option>
                    </el-select>
                </div>
                <div class="tabMain_top_item">
                    <div class="tabMain_top_item_title">章节内容</div>
                    <!-- <textarea
                        v-model="manDramaAdd.chapterMain"
                        class="tabMain_top_item_inp chapterMain_text"
                        type="text"
                        name=""
                        id=""
                    ></textarea> -->
                    <div class="pop_main_box">
                        <quill-editor
                            v-model="manDramaAdd.chapterMain"
                            :options="editorOption"
                            ref="QuillEditor"
                        >
                        </quill-editor>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer clueSetpop_btn_box">
                <el-button class="clueSetpop_btn" @click="manDramaShow = false"
                    >取消</el-button
                >
                <el-button
                    class="clueSetpop_btn"
                    type="primary"
                    @click="sureAddMode"
                    >保存</el-button
                >
            </span>
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
            // 人物剧本
            manDrama: [
                {
                    name: "", //人物姓名
                    describe: "", //人物介绍
                    head_id: "", //人物头像
                    end_name: "", //	结局名称
                    end_story: "", //	结局内容
                    child: []
                }
            ],
            editorOption: {
                placeholder: "请输入",
                modules: {
                    toolbar: {
                        container: toolbarOptions // 工具栏
                    }
                }
            },
            manDramaIndex: -1, //人物剧本索引
            manDramaChildIndex: -1, //人物剧本子索引
            manDramaShow: false, //人物剧本新增弹窗
            manHead: [],
            value: "",
            manDramaAdd: {
                //新增编辑弹窗
                chapterName: "",
                procedureNode: "",
                chapterMain: ""
            },
            isAddMode: true,
            processNode: [],
            isSure: false,
            allData: {
                basicInfoData: {},
                setArr: [],
                manDrama: []
            }
        };
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
        this.getHeadList();
        this.getScriptInfo(id);
    },
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
                that.allData.basicInfoData = {
                    id: res.data.script_result.script_id, //剧本ID
                    name: res.data.script_result.script_name, //剧本名称
                    playsNum: res.data.script_result.people_num, //剧本人数
                    author: res.data.script_result.author, //作者
                    duration: res.data.script_result.duration, //时长
                    difficult: res.data.script_result.difficult_text, //难度
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
                // 流程节点
                let arr = [];
                let arrs1 = [];
                res.data.script_node_list.some(item => {
                    let obj = {
                        script_node_name: item.name, //节点名称
                        order_num: item.order_num, //节点序号
                        node_type: item.node_type, //节点类型【1故事背景2自我介绍3剧本阅读4搜证5答题6结算】
                        describe: item.describe, //节点说明
                        button_name: item.button_name, //按钮名称
                        min_experience: item.min_experience, //保底经验值
                        experience: item.experience, //经验值/得分
                        id: item.script_node_id,
                        status: true
                    };
                    if (item.node_type == 3 || item.node_type == 1) {
                        arrs1.push(obj);
                    }
                    arr.push(obj);
                });
                that.allData.setArr = arr;
                that.processNode = arrs1;
                // 人物剧本
                let arr1 = [];

                res.data.script_role_list.some(item => {
                    let arr2 = [];
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
                if (that.allData.manDrama) {
                    that.manDrama = that.allData.manDrama;
                    if (
                        that.allData.manDrama.length >
                        parseInt(that.allData.basicInfoData.playsNum)
                    ) {
                        let arr = [];
                        for (
                            let i = 0;
                            i < parseInt(that.allData.basicInfoData.playsNum);
                            i++
                        ) {
                            let obj = {
                                name: "", //人物姓名
                                describe: "", //人物介绍
                                head_id: "", //人物头像
                                end_name: "", //	结局名称
                                end_story: "", //	结局内容
                                child: []
                            };
                            arr.push(obj);
                        }
                        that.manDrama = arr;
                    } else {
                        let arr = [];
                        that.manDrama = that.allData.manDrama;
                        for (
                            let i = 0;
                            i <
                            parseInt(that.allData.basicInfoData.playsNum) -
                                that.allData.manDrama.length;
                            i++
                        ) {
                            let obj = {
                                name: "", //人物姓名
                                describe: "", //人物介绍
                                head_id: "", //人物头像
                                end_name: "", //	结局名称
                                end_story: "", //	结局内容
                                child: []
                            };
                            arr.push(obj);
                        }
                        that.manDrama.concat(arr);
                    }
                } else {
                    let arr = [];
                    for (
                        let i = 0;
                        i < parseInt(that.allData.basicInfoData.playsNum);
                        i++
                    ) {
                        let obj = {
                            name: "", //人物姓名
                            describe: "", //人物介绍
                            head_id: "", //人物头像
                            end_name: "", //	结局名称
                            end_story: "", //	结局内容
                            child: []
                        };
                        arr.push(obj);
                    }
                    that.manDrama = arr;
                }

                // localStorage.setItem("data", JSON.stringify(that.allData));
                loadingClose.close();
            });
        },
        //获取头像列表
        getHeadList() {
            let that = this;
            let data = {
                url: "/current/script/role_head_list",
                method: "post",
                data: {}
            };
            this.$apiAxiox(data).then(res => {
                if (res.data.code == 1) {
                    that.manHead = res.data.data.list;
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        openMode() {
            this.modeTypeShow = !this.modeTypeShow;
        },
        //下拉框选择
        getMode(index, item) {
            this.modeTypeObj.modeTypeVal = item.name;
            this.modeTypeShow = false;
        },
        // 新增人物剧本
        addMode(i) {
            this.manDramaIndex = i;
            this.manDramaAdd.chapterName = "";
            this.manDramaAdd.procedureNode = "";
            this.manDramaAdd.chapterMain = "";
            this.manDramaShow = true;
            this.isAddMode = true;
        },
        // 确认新增
        sureAddMode() {
            if (this.manDramaAdd.chapterName == "") {
                Message.error("请输入章节名称");
            } else if (this.manDramaAdd.procedureNode == "") {
                Message.error("请选择流程节点");
            } else if (this.manDramaAdd.chapterMain == "") {
                Message.error("请输入章节内容");
            } else {
                if (this.isAddMode) {
                    let obj = {
                        childName: this.manDramaAdd.chapterName, //章节名称
                        childMode: this.manDramaAdd.procedureNode, //流程节点
                        childMain: this.manDramaAdd.chapterMain //章节内容
                    };
                    this.manDrama[this.manDramaIndex].child.push(obj);
                } else {
                    this.manDrama[this.manDramaIndex].child[
                        this.manDramaChildIndex
                    ].childName = this.manDramaAdd.chapterName;
                    this.manDrama[this.manDramaIndex].child[
                        this.manDramaChildIndex
                    ].childMode = this.manDramaAdd.procedureNode;
                    this.manDrama[this.manDramaIndex].child[
                        this.manDramaChildIndex
                    ].childMain = this.manDramaAdd.chapterMain;
                }
                this.manDramaShow = false;
            }
        },
        // 修改人物剧本
        updateMode(i, i1) {
            this.manDramaIndex = i;
            this.manDramaChildIndex = i1;
            this.manDramaAdd.chapterName = this.manDrama[i].child[i1].childName;
            this.manDramaAdd.procedureNode = this.manDrama[i].child[
                i1
            ].childMode;
            this.manDramaAdd.chapterMain = this.manDrama[i].child[i1].childMain;
            this.manDramaShow = true;
            this.isAddMode = false;
        },
        // 下一步
        clickNext() {
            let that = this;
            this.manDrama.some(item => {
                if (item.name == "") {
                    Message.error("请输入人物姓名");
                    that.isSure = false;
                    return true;
                } else if (item.describe == "") {
                    Message.error("请输入人物介绍");
                    that.isSure = false;
                    return true;
                } else if (item.head_id == "") {
                    Message.error("请选择人物头像");
                    that.isSure = false;
                    return true;
                } else {
                    that.isSure = true;
                }
            });
            if (that.isSure) {
                this.allData.manDrama = this.manDrama;
                localStorage.setItem("data", JSON.stringify(this.allData));
                let that = this;
                //paymentTypeVal: "", //付费类型 difficult
                // 人物剧本
                let arr1 = []; //人物
                let arr2 = []; //剧本章节
                this.manDrama.some((item, index) => {
                    let obj = {
                        script_role_name: item.name, //人物姓名
                        describe: item.describe, //人物介绍
                        head_id: item.head_id, //人物头像
                        end_name: item.end_name, //结局名称
                        end_story: item.end_story, //结局内容
                        script_role_id: item.id //角色id
                    };
                    arr1.push(obj);
                    if (item.child.length > 0) {
                        item.child.some(itemChild => {
                            // 剧本章节
                            let obj1 = {
                                script_node_id: itemChild.childMode, //选择的流程节点数据的键值
                                script_role_chapter_id: itemChild.childId, //人物章节ID
                                script_role_chapter_name: itemChild.childName, //章节名称
                                content: itemChild.childMain, //章节内容
                                script_role_id: item.id //角色id
                            };
                            arr2.push(obj1);
                        });
                    }
                });
                let dataObj = {
                    script_id: this.allData.basicInfoData.id,
                    script_role: arr1,
                    script_role_chapter: arr2
                };
                let data = {
                    url: "/current/script/edit",
                    method: "post",
                    data: {
                        add_script_data: JSON.stringify(dataObj)
                    }
                };
                this.$apiAxiox(data).then(res => {
                    if (res.data.code == 1) {
                        // let arr = [{ semester: "全部" }];
                        // that.semesterList = arr.concat(res.data.data);
                        Message.success(res.data.msg);
                    } else {
                        // that.$message.error(res.data.msg);
                        Message.error(res.data.msg);
                    }
                });
            }
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
.characterPlay {
    padding: 20px 0;
}
.characterPlay_main {
    width: 100%;
    padding: 0 40px;
    box-sizing: border-box;
}
.tabMain_top_item_inp {
    width: 100%;
    height: 50px;
    padding: 0 20px;
    box-sizing: border-box;
    margin-top: 14px;
    background: rgba(245, 245, 245, 1);
    border: 1px solid rgba(238, 238, 238, 1);
    border-radius: 4px;
    outline-style: none;
}
.characterPlay_main .tabMain_top_item_inp,
.characterPlay_main .tabMain_top_item_inp input {
    width: 100%;
    height: 50px;
    padding: 0 20px;
    box-sizing: border-box;
    margin-top: 14px;
    background: rgba(245, 245, 245, 1);
    border: 1px solid rgba(238, 238, 238, 1);
    border-radius: 4px;
    outline-style: none;
}
.tabMain_top_item {
    margin: 0 20px 20px;
    /* padding-right: 126px; */
    box-sizing: border-box;
}
.tabMain_top_item_down_sel {
    width: 100%;
    padding: 0 20px 0 20px;
    margin-top: 15px;
    height: 50px;
    box-sizing: border-box;
    background: rgba(245, 245, 245, 1);
    border-radius: 4px;
    border: none;
    outline: none;
}

.tabMain_top_item_down_sel input {
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    margin-top: 14px;
    background: rgba(245, 245, 245, 1);
    border-radius: 4px;
    border: none;
    outline: none;
    background: rgba(245, 245, 245, 1);
    font-size: 16px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 20px;
    cursor: pointer;
}

.characterPlay_box {
    width: 100%;
    margin-top: 20px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}

.characterPlay_item {
    width: 260px;
    height: 50px;
    padding: 0 15px;
    box-sizing: border-box;
    background: rgba(245, 245, 245, 1);
    border: 1px solid rgba(238, 238, 238, 1);
    border-radius: 4px;
    display: flex;
    align-items: center;
    margin: 0 34px 20px 0;
}

.characterPlay_item input {
    width: 100%;
    margin-right: 10px;
    border: none;
    outline: none;
    background: rgba(245, 245, 245, 1);
    font-size: 16px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 20px;
}

.characterPlay_item img {
    width: 23px;
    height: 25px;
    cursor: pointer;
}

.characterPlay_btn {
    width: 100px;
    height: 50px;
    margin-bottom: 20px;
    background: rgba(26, 149, 234, 1);
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
}

.chapterMain_text {
    width: 100%;
    height: 204px;
    padding: 10px 20px;
    box-sizing: border-box;
    margin-top: 14px;
    background: rgba(245, 245, 245, 1);
    border: 1px solid rgba(238, 238, 238, 1);
    border-radius: 4px;
    outline-style: none;
    resize: none;
    font-size: 16px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 24px;
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
.clueSetpop_btn_box {
    width: 100%;
    padding-left: 20px;
    box-sizing: border-box;
    display: flex;
    /* justify-content: center; */
    align-items: center;
}
.clueSetpop_btn {
    width: 150px;
    height: 50px;
    font-size: 18px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
}
.pop_sel {
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
.pop_main_box {
    height: 400px;
    margin-top: 10px;
    font-size: 16px;
}
</style>