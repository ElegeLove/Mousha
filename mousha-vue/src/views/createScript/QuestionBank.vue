<template>
    <div id="problemBase">
        <div class="problemBase">
            <div
                class="problemBase_item"
                v-for="(problem, proI) in problemData"
                :key="proI"
            >
                <div class="problemBase_item_top">
                    <div class="problemBase_item_top_title">
                        <div class="problemBase_item_top_title_text">
                            {{ problem.nameVal }}
                        </div>
                        <div class="problemBase_item_top_title_icon">
                            <img
                                @click="scoringRules(proI)"
                                :src="require('assets/img/ic_rules.png')"
                                alt=""
                            />
                            <img
                                @click="isShow(proI)"
                                :src="require('assets/img/icon_show.png')"
                                alt=""
                            />
                        </div>
                    </div>
                    <div class="problemBase_item_top_inp">
                        <input
                            v-model="problem.name"
                            class="tabMain_top_item_inp"
                            type="text"
                            name=""
                            id=""
                        />
                        <img
                            @click="delProblem(proI)"
                            :src="require('assets/img/icon_delete.png')"
                            alt=""
                        />
                    </div>
                </div>
                <div class="problemBase_item_main">
                    <div class="problemBase_item_main_title">选项</div>
                    <div
                        class="problemBase_item_main_sel"
                        v-for="(proChildItem, proChildIndex) in problem.child"
                        :key="proChildIndex"
                    >
                        <img
                            @click="proChildSel(proI, proChildIndex)"
                            :src="require('assets/img/ic_sel.png')"
                            alt=""
                            v-if="!proChildItem.status"
                        />
                        <img
                            @click="proChildSel(proI, proChildIndex)"
                            :src="require('assets/img/ic_seld.png')"
                            alt=""
                            v-if="proChildItem.status"
                        />
                        <input
                            v-model="proChildItem.textVal"
                            class="tabMain_top_item_inp"
                            type="text"
                            name=""
                            id=""
                        />
                        <div class="problemBase_del_icom">
                            <img
                                @click="delProblemItem(proI, proChildIndex)"
                                :src="require('assets/img/icon_delete.png')"
                                alt=""
                                v-if="proChildIndex != 0 && proChildIndex != 1"
                            />
                        </div>
                    </div>
                    <div class="problemBase_item_main_add">
                        <div @click="addProblemItem(proI)">
                            <span>+</span> <span>添加一个选项</span>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="tabMain_top_item">
                        <div class="tabMain_top_item_title">选择节点</div>
                        <el-select
                            class="tabMain_top_item_down_sel"
                            v-model="problem.nodeVal"
                            placeholder="请选择"
                        >
                            <el-option
                                v-for="itemHred in setItemList"
                                :key="itemHred.order_num"
                                :label="itemHred.script_node_name"
                                :value="itemHred.order_num"
                            >
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </div>
            <div class="clueSetting_btn" @click="addProblem">新增问题</div>
        </div>
        <div class="footer">
            <div class="footer_box">
                <div class="footer_cacel">取消</div>
                <div class="footer_nex" @click="clickPre">上一步</div>
                <div class="footer_nex" @click="clickNext">下一步</div>
            </div>
        </div>
        <!-- 新增问题 -->
        <el-dialog :visible.sync="isAddProblem" :show-close="false" width="30%">
            <div class="popBox clueSetpop">
                <div>
                    <div class="tabMain_top_item_title">问题类型</div>
                    <el-select
                        class="tabMain_top_item_down_sel"
                        v-model="proType"
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="itemHred in problemSel"
                            :key="itemHred.name"
                            :label="itemHred.name"
                            :value="itemHred.name"
                        >
                        </el-option>
                    </el-select>
                </div>
            </div>
            <span slot="footer" class="dialog-footer clueSetpop_btn_box">
                <el-button class="clueSetpop_btn" @click="isAddProblem = false"
                    >取消</el-button
                >
                <el-button
                    class="clueSetpop_btn"
                    type="primary"
                    @click="addProblemSure"
                    >保存</el-button
                >
            </span>
        </el-dialog>
        <el-dialog :visible.sync="isClueShow" :show-close="false" width="30%">
            <div class="popBox clueSetpop">
                <div>
                    <div class="tabMain_top_item_title">不可见角色</div>
                    <el-select
                        v-model="procedureNode"
                        class="pop_sel"
                        multiple="multiple"
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="itemHred in showRole"
                            :key="itemHred.num"
                            :label="itemHred.name"
                            :value="itemHred.num"
                        >
                        </el-option>
                    </el-select>
                </div>
            </div>
            <span slot="footer" class="dialog-footer clueSetpop_btn_box">
                <el-button class="clueSetpop_btn" @click="isClueShow = false"
                    >取消</el-button
                >
                <el-button
                    class="clueSetpop_btn"
                    type="primary"
                    @click="sureShow"
                    >保存</el-button
                >
            </span>
        </el-dialog>
        <!-- 计分规则 -->
        <el-dialog
            :visible.sync="scoringRulesShow"
            :show-close="false"
            :center="true"
            title="计分规则"
            width="30%"
        >
            <div class="popBox clueSetpop">
                <div class="scoringRules_top">
                    <div class="tabMain_top_item_title">得分</div>
                    <input
                        v-model="score"
                        class="tabMain_top_item_inp"
                        type="text"
                        name=""
                        id=""
                    />
                </div>
                <div>
                    <div class="tabMain_top_item_title">反向得分</div>
                    <el-select
                        class="pop_sel"
                        v-model="backScore"
                        multiple="multiple"
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="itemHred in showRole"
                            :key="itemHred.num"
                            :label="itemHred.name"
                            :value="itemHred.num"
                        >
                        </el-option>
                    </el-select>
                    <input
                        v-model="negativeScore"
                        class="tabMain_top_item_inp"
                        type="text"
                        name=""
                        id=""
                    />
                </div>
            </div>
            <span slot="footer" class="dialog-footer clueSetpop_btn_box">
                <el-button
                    class="clueSetpop_btn"
                    @click="scoringRulesShow = false"
                    >取消</el-button
                >
                <el-button
                    class="clueSetpop_btn"
                    type="primary"
                    @click="sureScore"
                    >保存</el-button
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
            // 问题库数据
            problemData: [],
            // 问题
            isAddProblem: false,
            problemSel: [
                {
                    name: "单选",
                    status: "0"
                },
                {
                    name: "多选",
                    status: "1"
                }
            ],
            proType: "",
            negativeScore: "",
            score: "",
            backScore: [],
            scoringRulesShow: false, //计分规则弹窗
            setItemList: [
                {
                    name: "背景故事",
                    status: true
                },
                {
                    name: "自我介绍",
                    status: true
                },
                {
                    name: "第一轮搜证",
                    status: true
                },
                {
                    name: "第二轮搜证",
                    status: true
                },
                {
                    name: "答题",
                    status: true
                },
                {
                    name: "结束结算",
                    status: true
                }
            ],
            isClueShow: false,
            manDramaAdd: {
                //新增编辑弹窗
                chapterName: "",
                chapterMain: ""
            },
            procedureNode: [],
            manHead: [
                {
                    //人物头像
                    value: "选项1",
                    label: "黄金糕"
                },
                {
                    value: "选项2",
                    label: "双皮奶"
                },
                {
                    value: "选项3",
                    label: "蚵仔煎"
                },
                {
                    value: "选项4",
                    label: "龙须面"
                },
                {
                    value: "选项5",
                    label: "北京烤鸭"
                }
            ],
            clueNameVal: "",
            showIndex: -1,
            isNext: false,
            isNextss: false,
            scoreIndex: -1
        };
    },
    created() {
        this.allData = JSON.parse(localStorage.getItem("data"));
        if (this.allData.problemData) {
            this.problemData = this.allData.problemData;
        }
        this.allData.manDrama.forEach((item, index) => {
            item.num = index;
        });
        let arr = [];
        this.allData.setArr.forEach((item, index) => {
            if (item.node_type == "5") {
                arr.push(item);
            }
        });
        this.setItemList = arr;
        console.log(arr);
        this.showRole = this.allData.manDrama;
        console.log(this.showRole);
    },
    methods: {
        // 新增一个问题
        addProblem() {
            this.isAddProblem = true;
        },
        // 确认新增
        addProblemSure() {
            if (this.proType == "") {
                Message.warning("请选择问题类型！");
            } else {
                let num = 0;
                if (this.proType == "单选") {
                    num = 0;
                } else {
                    num = 1;
                }
                let obj = {
                    name: "", //问题名称
                    nameVal:
                        "问题" +
                        (this.problemData.length + 1) +
                        "（" +
                        this.proType +
                        "题）", //问题名称
                    proType: this.proType,
                    type: num, //问题状态   0单选，1多选
                    showList: [], //可见角色
                    negativeScore: "", //反向得分
                    score: "", //得分
                    backScore: [], //反向得分角色
                    child: [
                        {
                            status: false,
                            textVal: ""
                        },
                        {
                            status: false,
                            textVal: ""
                        }
                    ], //答案选择
                    nodeVal: "" //选择节点
                };
                this.problemData.push(obj);
                this.isAddProblem = false;
            }
        },
        // 删除问题
        delProblem(i) {
            this.problemData.splice(i, 1);
            this.problemData.forEach((item, i) => {
                item.nameVal = "问题" + (i + 1) + "（" + item.proType + "题）";
            });
        },
        // 计分规则
        scoringRules(i) {
            this.scoreIndex = i;
            this.negativeScore = this.problemData[i].negativeScore;
            this.score = this.problemData[i].score;
            this.backScore = this.problemData[i].backScore;

            this.scoringRulesShow = true;
        },
        sureScore() {
            if (this.score == "") {
                Message.error("请输入得分");
            } else {
                this.problemData[
                    this.scoreIndex
                ].negativeScore = this.negativeScore;
                this.problemData[this.scoreIndex].score = this.score;
                this.problemData[this.scoreIndex].backScore = this.backScore;
                this.scoringRulesShow = false;
            }
        },
        // 是否可见
        isShow(i) {
            this.showIndex = i;
            this.procedureNode = this.problemData[i].showList;
            this.isClueShow = true;
        },
        // 确认不可见
        sureShow() {
            this.problemData[this.showIndex].showList = this.procedureNode;
            this.isClueShow = false;
        },
        // 添加一个选项
        addProblemItem(i) {
            let obj = {
                status: false,
                textVal: ""
            };
            this.problemData[i].child.push(obj);
        },
        // 删除一个选项
        delProblemItem(i, i1) {
            this.problemData[i].child.splice(i1, 1);
        },
        // 答案选择
        proChildSel(i, i1) {
            this.problemData[i].child[i1].status = !this.problemData[i].child[
                i1
            ].status;
            if (this.problemData[i].type == 0) {
                if (this.problemData[i].child[i1].status) {
                    this.problemData[i].child.forEach(item => {
                        item.status = false;
                    });
                    this.problemData[i].child[i1].status = true;
                }
            }
        },
        // 上一步
        clickPre() {
            this.allData.problemData = this.problemData;
            localStorage.setItem("data", JSON.stringify(this.allData));
            this.$router.go(-1);
        },
        // 下一步
        clickNext() {
            this.problemData.some(item => {
                if (item.name == "") {
                    Message.error("请输入问题名称");
                    this.isNext = false;
                    return true;
                } else if (item.nodeVal == "") {
                    if (this.setItemList.length > 0) {
                        Message.error("请选择节点");
                        this.isNext = false;
                        return true;
                    } else {
                        Message.error("请到流程设定模块中添加投票节点类型");
                        this.isNext = false;
                        return true;
                    }
                } else if (item.score == "") {
                    Message.error("请输入得分");
                    this.isNext = false;
                    return true;
                } else {
                    item.child.some(itemChild => {
                        if (itemChild.textVal == "") {
                            Message.error("请输入选项内容");
                            this.isNext = false;
                            return true;
                        } else {
                            this.isNext = true;
                            item.answer = false;
                            if (itemChild.status) {
                                item.answer = true;
                                return true;
                            }
                        }
                    });
                }
            });
            if (this.isNext) {
                this.problemData.some(item => {
                    if (item.answer == false) {
                        Message.error("请选择正确答案");
                        this.isNextss = false;
                        return true;
                    } else {
                        this.isNextss = true;
                    }
                });
            }
            if (this.isNextss) {
                this.allData.problemData = this.problemData;
                localStorage.setItem("data", JSON.stringify(this.allData));
                this.$router.push({
                    path: "EndTruth"
                    // query: {
                    //     type: i
                    // }
                });
            }
        }
    }
};
</script>

<style scoped>
#problemBase {
    padding: 20px;
    box-sizing: border-box;
}
.problemBase {
    width: 100%;
    padding: 0 40px;
    box-sizing: border-box;
    margin-top: 20px;
}

.problemBase_item {
    width: 100%;
    padding-bottom: 26px;
    margin-bottom: 30px;
    border-bottom: 1px solid #eeeeee;
}
.tabMain_top_item {
    width: 100%;
    padding-right: 103px;
    box-sizing: border-box;
}
.problemBase_item_top_title {
    display: flex;
    align-items: center;
}

.problemBase_item_top_title_text {
    font-size: 16px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
}

.problemBase_item_top_title_icon {
    display: flex;
    align-items: center;
    margin-left: 24px;
}

.problemBase_item_top_title_icon > img:first-child {
    width: 18px;
    height: 18px;
    margin-right: 30px;
    cursor: pointer;
}

.problemBase_item_top_title_icon > img:last-child {
    width: 23px;
    height: 21px;
    cursor: pointer;
}

.problemBase_item_top_inp {
    width: 100%;
    display: flex;
    align-items: center;
}
.tabMain_top_item_inp {
    width: 100%;
    height: 50px;
    margin-top: 10px;
    background: rgba(245, 245, 245, 1);
    border: 1px solid rgba(238, 238, 238, 1);
    border-radius: 4px;
}
.problemBase_item_top_inp > .tabMain_top_item_inp {
    width: 100%;
    height: 50px;
    margin-top: 10px;
    background: rgba(245, 245, 245, 1);
    border: 1px solid rgba(238, 238, 238, 1);
    border-radius: 4px;
}

.problemBase_item_top_inp > img {
    width: 28px;
    height: 28px;
    margin-left: 18px;
    /* margin-top: 14px; */
    cursor: pointer;
}

.problemBase_item_main {
    width: 100%;
    margin: 20px 0 30px;
    padding-right: 60px;
    box-sizing: border-box;
}

.problemBase_item_main_title {
    font-size: 16px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
}

.problemBase_item_main_sel {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 16px;
}

.problemBase_item_main_sel > img {
    width: 23px;
    height: 23px;
    margin-right: 22px;
    margin-top: 14px;
}

.problemBase_item_main_sel > .tabMain_top_item_inp {
    width: 100%;
    height: 50px;
    margin-top: 10px;
    background: rgba(245, 245, 245, 1);
    border: 1px solid rgba(238, 238, 238, 1);
    border-radius: 4px;
}

.problemBase_del_icom {
    width: 28px;
    height: 28px;
    margin-left: 18px;
    margin-top: 14px;
}

.problemBase_del_icom > img {
    width: 100%;
    height: 100%;
    cursor: pointer;
}

.problemBase_item_main_add {
    width: 100%;
    padding: 0 42px 0 42px;
    box-sizing: border-box;
}

.problemBase_item_main_add > div {
    width: 100%;
    height: 50px;
    border-radius: 4px;
    background: rgba(25, 149, 233, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
}
.problemBase_item_main_add span {
    color: rgba(255, 255, 255, 1);
}
.problemBase_item_main_add > div > span:last-child {
    font-size: 18px;
}

.problemBase_item_main_add > div > span:first-child {
    display: inline-block;
    line-height: 46px;
    height: 50px;
    font-size: 30px;
}
.clueSetting_btn {
    width: 130px;
    height: 40px;
    background: rgba(26, 149, 234, 1);
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    margin: 35px 0 60px;
    cursor: pointer;
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
.tabMain_top_item_title {
    margin: 10px 0;
}
.pop_sel{
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
.clueSetpop_btn_box{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.clueSetpop_btn {
    width: 150px;
    height: 50px;
    font-size: 18px;
    font-family: 'Microsoft YaHei';
    font-weight: 400;
}
</style>