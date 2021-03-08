<template>
    <div id="processSetting">
        <div class="processSetting">
            <div>
                <div
                    class="set_item"
                    v-for="(item, index) in setItemList"
                    :key="index"
                >
                    <!-- <div
                        class="set_item_title"
                        v-show="index == 0 || index == 1"
                    >
                        {{ item.script_node_name }}
                    </div> -->
                    <div
                        class="set_item_box"
                        @mouseover="cursorOvre(index)"
                        @mouseout="cursorOut(index)"
                    >
                        <div class="set_item_title" v-show="item.status">
                            {{ item.script_node_name }}
                        </div>
                        <div class="set_item_titHover" v-show="!item.status">
                            <div @click="itemUpdate(index, item.node_type)">
                                <img
                                    :src="require('assets/img/icon_update.png')"
                                    alt=""
                                />
                                <div class="cordiv">编辑</div>
                            </div>
                            <div
                                @click="itemDel(index)"
                                v-show="
                                    index != 0 &&
                                        index != setItemLength
                                "
                            >
                            <!-- <div
                                @click="itemDel(index)"
                                v-show="
                                    index != 0 &&
                                        index != 1 &&
                                        index != setItemLength
                                "
                            > //自我介绍 -->
                                <img
                                    :src="require('assets/img/icon_del.png')"
                                    alt=""
                                />
                                <div class="cordiv">删除节点</div>
                            </div>
                        </div>
                    </div>
                    <div class="set_item_icon">
                        <img
                            class="icon_down"
                            :src="require('assets/img/icon_down.png')"
                            alt=""
                        />
                            <!-- v-if="index != 0" -->
                        <img
                            class="icon_add"
                            @click="clickAdd(index, item.node_type)"
                            :src="require('assets/img/icon_add.png')"
                            alt=""
                        />
                    </div>
                    <!-- <div class="set_item_title" v-show="index == setItemLength">
                        {{ item.script_node_name }}
                    </div> -->
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="footer_box">
                <div class="footer_cacel">取消</div>
                <div class="footer_nex" @click="clickPre">上一步</div>
                <div class="footer_nex" @click="clickNext">下一步</div>
            </div>
        </div>
        <el-dialog
            :visible.sync="dialogVisible"
            :show-close="false"
            width="30%"
        >
            <div class="popBox">
                <div class="tabMain_top_item">
                    <div class="tabMain_top_item_title">节点类型</div>
                    <div v-if="dataIndex == 0" class="tabMain_top_item_inp">
                        故事背景
                    </div>
                    <div v-if="dataIndex == 1" class="tabMain_top_item_inp">
                        自我介绍
                    </div>
                    <div
                        v-if="dataIndex == setItemLength"
                        class="tabMain_top_item_inp"
                    >
                        结算
                    </div>
                    <div
                        v-if="
                            dataIndex != 0 &&
                                dataIndex != 1 &&
                                dataIndex != setItemLength
                        "
                    >
                        <el-select
                            v-model="modeTypeObj.modeTypeVal"
                            placeholder="请选择节点类型"
                            @change="selNode"
                            class="pop_sel"
                        >
                            <el-option
                                v-for="item in modeTypeList"
                                :key="item.num"
                                :label="item.name"
                                :value="item.num"
                            ></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="tabMain_top_item">
                    <div class="tabMain_top_item_title">节点名称</div>
                    <input
                        v-model="modeTypeObj.modeName"
                        class="tabMain_top_item_inp"
                        maxlength="20"
                        type="text"
                        name=""
                        id=""
                    />
                </div>
                <div class="tabMain_top_item">
                    <div class="tabMain_top_item_title">节点说明</div>
                    <input
                        v-model="modeTypeObj.modeExplain"
                        class="tabMain_top_item_inp"
                        maxlength="100"
                        type="text"
                        name=""
                        id=""
                    />
                </div>
                <div class="tabMain_top_item" v-show="nodeTypeVal == 4">
                    <div class="tabMain_top_item_title">可搜证次数</div>
                    <input
                        v-model="modeTypeObj.searchTimes"
                        class="tabMain_top_item_inp"
                        maxlength="100"
                        type="text"
                        name=""
                        id=""
                    />
                </div>
                <div class="tabMain_top_item">
                    <div class="tabMain_top_item_title">按钮名称</div>
                    <input
                        v-model="modeTypeObj.btnName"
                        class="tabMain_top_item_inp"
                        type="text"
                        name=""
                        id=""
                    />
                </div>
                <div class="tabMain_top_item" v-show="nodeTypeVal == 6">
                    <div class="tabMain_top_item_title">保底经验值</div>
                    <input
                        v-model="modeTypeObj.experience"
                        class="tabMain_top_item_inp"
                        type="text"
                        name=""
                        id=""
                    />
                </div>
                <div class="tabMain_top_item" v-show="nodeTypeVal == 6">
                    <div class="tabMain_top_item_title">经验值/得分</div>
                    <input
                        v-model="modeTypeObj.score"
                        class="tabMain_top_item_inp"
                        type="text"
                        name=""
                        id=""
                    />
                </div>
            </div>
            <span slot="footer" class="dialog-footer clueSetpop_btn_box">
                <el-button class="clueSetpop_btn" @click="dialogVisible = false"
                    >取 消</el-button
                >
                <el-button
                    class="clueSetpop_btn"
                    type="primary"
                    @click="surecreup"
                    >确 定</el-button
                >
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { Message } from "element-ui";
export default {
    data() {
        return {
            setItemList: [
                {
                    script_node_name: "背景故事",
                    order_num: "0",
                    describe: "",
                    button_name: "",
                    node_type: "1",
                    // min_experience: "10",
                    // experience: "10",
                    status: true
                },
                {
                    script_node_name: "自我介绍",
                    order_num: "1",
                    describe: "",
                    button_name: "",
                    node_type: "2",
                    // min_experience: "10",
                    // experience: "10",
                    status: true
                },
                {
                    script_node_name: "结束结算",
                    order_num: "2",
                    describe: "",
                    button_name: "",
                    node_type: "6",
                    min_experience: "",
                    experience: "",
                    status: true
                }
            ],
            allData: {},
            itemTypeVal: "",
            setItemLength: "",
            // 弹出框
            dialogVisible: false,
            modeTypeList: [
                //节点预算
                {
                    name: "阅读剧本",
                    num: "3"
                },
                {
                    name: "搜证",
                    num: "4"
                },
                {
                    name: "投票",
                    num: "5"
                }
            ],
            modeTypeShow: false,
            modeTypeObj: {
                modeTypeVal: "3", //节点类型
                modeName: "", //节点名称
                modeExplain: "", //节点说明
                searchTimes: "", //可搜证次数
                btnName: "", //按钮名称
                experience: "", //经验
                score: "" //得分
            },
            // 人物剧本
            manDrama: [
                {
                    name: "人物1姓名", //人物姓名
                    nameVal: "", //人物姓名
                    introduce: "人物1介绍", //人物介绍
                    introduceVal: "", //人物介绍
                    head: "人物1头像", //人物头像
                    headVal: "", //人物头像
                    childVal: "人物1剧本", //人物剧本
                    child: [
                        //人物剧本
                        {
                            childName: "", //章节名称
                            childMode: "", //流程节点
                            childMain: "" //章节内容
                        }
                    ]
                }
            ],
            mapSetVal: {
                mapPath: "", //图片
                mapNode: "" //流程节点
            },
            manDramaAdd: {
                //新增编辑弹窗
                chapterName: "",
                procedureNode: "",
                chapterMain: ""
            },
            dataIndex: 0,
            addIndex: 0,
            nodeTypeVal: -1,
            addStatus: false
        };
    },
    created() {
        this.allData = JSON.parse(localStorage.getItem("data"));
        if (this.allData.setArr) {
            this.setItemList = this.allData.setArr;
        }
        this.setItemLength = this.setItemList.length - 1;
    },
    methods: {
        // 鼠标hover效果
        cursorOvre(i) {
            this.setItemList[i].status = false;
        },
        cursorOut(i) {
            this.setItemList[i].status = true;
        },
        // 编辑节点
        itemUpdate(i, nodeType) {
            this.addStatus = false;
            this.dataIndex = i;
            this.nodeTypeVal = nodeType;
            this.dialogVisible = true;
            this.modeTypeObj.modeTypeVal = this.setItemList[i].node_type;
            this.modeTypeObj.modeName = this.setItemList[i].script_node_name;
            this.modeTypeObj.modeExplain = this.setItemList[i].describe;
            this.modeTypeObj.btnName = this.setItemList[i].button_name;
            if (nodeType == 6) {
                this.modeTypeObj.experience = this.setItemList[
                    i
                ].min_experience;
                this.modeTypeObj.score = this.setItemList[i].experience;
            }
            if (nodeType == 4) {
                this.modeTypeObj.searchTimes = this.setItemList[i].point;
            }
        },
        selNode(val) {
            this.nodeTypeVal = val;
        },
        // 节点类型
        openMode() {
            this.modeTypeShow = !this.modeTypeShow;
        },
        surecreup() {
            // modeTypeObj: {
            // modeTypeVal: "3", //节点类型
            // modeName: "", //节点名称
            // modeExplain: "", //节点说明
            // btnName: "", //按钮名称
            // experience: "", //经验
            // score: "" //得分
            if (this.modeTypeObj.modeTypeVal == "") {
                Message.error("请选择节点类型");
            } else if (this.modeTypeObj.modeName == "") {
                Message.error("请输入节点名称");
            } else if (this.modeTypeObj.modeExplain == "") {
                Message.error("请输入节点说明");
            } else if (
                this.modeTypeObj.searchTimes == "" &&
                this.nodeTypeVal == 4
            ) {
                Message.error("请输入可搜证次数");
            } else if (this.modeTypeObj.btnName == "") {
                Message.error("请输入按钮名称");
            } else if (
                this.modeTypeObj.experience == "" &&
                this.nodeTypeVal == 6
            ) {
                Message.error("请输入保底经验值");
            } else if (this.modeTypeObj.score == "" && this.nodeTypeVal == 6) {
                Message.error("请输入经验值/得分");
            } else {
                if (this.addStatus) {
                    let obj = {
                        node_type: this.modeTypeObj.modeTypeVal,
                        script_node_name: this.modeTypeObj.modeName,
                        describe: this.modeTypeObj.modeExplain,
                        button_name: this.modeTypeObj.btnName,
                        // min_experience: this.modeTypeObj.experience,

                        status: true
                    };
                    if (this.nodeTypeVal == 6) {
                        obj.min_experience = this.modeTypeObj.experience;
                        obj.experience = this.modeTypeObj.score;
                    }
                    if (this.nodeTypeVal == 4) {
                        obj.point = this.modeTypeObj.searchTimes;
                    }
                    this.setItemList.splice(this.addIndex + 1, 0, obj);
                    this.setItemLength = this.setItemList.length - 1;
                    this.setItemList.forEach((item, index) => {
                        item.order_num = index;
                    });
                } else {
                    this.setItemList[
                        this.dataIndex
                    ].node_type = this.modeTypeObj.modeTypeVal;
                    this.setItemList[
                        this.dataIndex
                    ].script_node_name = this.modeTypeObj.modeName;
                    this.setItemList[
                        this.dataIndex
                    ].describe = this.modeTypeObj.modeExplain;
                    this.setItemList[
                        this.dataIndex
                    ].button_name = this.modeTypeObj.btnName;
                    if (this.nodeTypeVal == 6) {
                        this.setItemList[
                            this.dataIndex
                        ].min_experience = this.modeTypeObj.experience;
                        this.setItemList[
                            this.dataIndex
                        ].experience = this.modeTypeObj.score;
                    }
                    if (this.nodeTypeVal == 4) {
                        this.setItemList[
                            this.dataIndex
                        ].point = this.modeTypeObj.searchTimes;
                    }
                }
                this.dialogVisible = false;
            }
        },
        // 删除节点
        itemDel(i) {
            this.$confirm("是否确认删除该节点？")
                .then(_ => {
                    this.setItemList.splice(i, 1);
                    this.setItemLength = this.setItemList.length - 1;
                    this.setItemList.forEach((item, index) => {
                        item.order_num = index;
                    });
                    done();
                })
                .catch(_ => {});
        },
        // 添加流程
        clickAdd(i, nodeType) {
            // let isHave = false;
            // this.setItemList.some(item => {
            //     if(item.node_type == 2){
            //         isHave = true;
            //         return false;
            //     }
            // })
            // if(isHave){
            //     this.modeTypeList = [
            //         //节点预算
            //         {
            //             name: "阅读剧本",
            //             num: "3"
            //         },
            //         {
            //             name: "搜证",
            //             num: "4"
            //         },
            //         {
            //             name: "投票",
            //             num: "5"
            //         }
            //     ];
            // }else{
            //     this.modeTypeList = [
            //         //节点预算
            //         {
            //             name: "自我介绍",
            //             num: "2"
            //         },
            //         {
            //             name: "阅读剧本",
            //             num: "3"
            //         },
            //         {
            //             name: "搜证",
            //             num: "4"
            //         },
            //         {
            //             name: "投票",
            //             num: "5"
            //         }
            //     ];
            // }
            this.addStatus = true;
            this.addIndex = i;
            this.nodeTypeVal = nodeType;
            this.dataIndex = -1;
            this.dialogVisible = true;
            this.modeTypeObj.modeTypeVal = "";
            this.modeTypeObj.modeName = "";
            this.modeTypeObj.modeExplain = "";
            this.modeTypeObj.searchTimes = "";
            this.nodeTypeVal = -1;
            this.modeTypeObj.btnName = "";
            this.modeTypeObj.experience = "";
            this.modeTypeObj.score = "";
            // this.setItemList.insert(i, obj)
        },
        // 上一步
        clickPre() {
            this.allData.setArr = this.setItemList;
            localStorage.setItem("data", JSON.stringify(this.allData));
            this.$router.go(-1);
        },
        // 下一步
        clickNext() {
            this.allData.setArr = this.setItemList;
            localStorage.setItem("data", JSON.stringify(this.allData));
            this.$router.push({
                path: "CharacterPlay"
                // query: {
                //     type: i
                // }
            });
        }
    }
};
</script>

<style scoped>
#processSetting {
    padding: 20px;
    box-sizing: border-box;
}
.processSetting {
    width: 100%;
    padding: 10px 20px 0;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    margin-bottom: 60px;
}
.set_item {
    text-align: center;
}

.set_item_box {
    width: 312px;
    height: 60px;
}

.set_item_title {
    width: 312px;
    height: 60px;
    border: 1px solid rgba(26, 149, 234, 1);
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: rgba(26, 149, 234, 1);
    cursor: pointer;
}

.set_item_titHover {
    width: 312px;
    height: 60px;
    border-radius: 4px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 18px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    background: rgba(26, 149, 234, 1);
    color: rgba(255, 255, 255, 1) !important;
}
.cordiv {
    font-size: 18px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: rgba(255, 255, 255, 1) !important;
}
.set_item_titHover > div {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: rgba(255, 255, 255, 1) !important;
}

.set_item_titHover > div > img {
    width: 17px;
    height: 17px;
    margin-right: 8px;
}

.set_item_icon {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.icon_down {
    width: 9px;
    height: 36px;
    margin: 4px 0;
}

.icon_add {
    width: 26px;
    height: 26px;
    margin-left: 18px;
    position: absolute;
    left: 166px;
    top: 10px;
    cursor: pointer;
}

.set_item:last-child img {
    display: none;
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

.tabMain_top_item {
    /* margin: 0 45px 20px 0; */
    margin-bottom: 20px;
    /* padding-right: 126px; */
    box-sizing: border-box;
}
.tabMain_top_item_inp {
    width: 100%;
    min-height: 50px;
    line-height: 50px;
    padding: 0 10px;
    box-sizing: border-box;
    margin-top: 10px;
    background: rgba(245, 245, 245, 1);
    border: 1px solid rgba(238, 238, 238, 1);
    border-radius: 4px;
}
.tabMain_top_item_sel {
    padding: 0 0.3rem 0 0.2rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
}
.clueSetpop_btn_box {
    width: 100%;
    /* padding-left: 20px; */
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
}
.clueSetpop_btn {
    width: 210px;
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
</style>