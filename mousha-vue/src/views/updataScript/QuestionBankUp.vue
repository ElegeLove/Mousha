<template>
    <div>
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
                                :key="itemHred.id"
                                :label="itemHred.script_node_name"
                                :value="itemHred.id"
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
                <div class="footer_nex" @click="clickNext">保存</div>
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
            <div class="clueSetpop">
                <div>
                    <div class="tabMain_top_item_title">不可见角色</div>
                    <el-select
                        v-model="procedureNode"
                        multiple="multiple"
                        class="pop_sel"
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="itemHred in showRole"
                            :key="itemHred.id"
                            :label="itemHred.name"
                            :value="itemHred.id"
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
            title="计分规则"
            :show-close="false"
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
                        v-model="backScore"
                        multiple="multiple"
                        class="pop_sel"
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="itemHred in showRole"
                            :key="itemHred.id"
                            :label="itemHred.name"
                            :value="itemHred.id"
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
            scoreIndex: -1,
            allData: {
                basicInfoData: {},
                setArr: [],
                manDrama: [],
                clueSettingVal: [],
                problemData: []
            },
            showRole:[]
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
        this.getScriptInfo(id);
    },
    // created() {
    //     // this.allData = JSON.parse(localStorage.getItem("data"));
    //     // if (this.allData.problemData) {
    //     //     this.problemData = this.allData.problemData;
    //     // }
    //     // this.allData.manDrama.forEach((item, index) => {
    //     //     item.num = index;
    //     // });
    //     // let arr = [];
    //     // this.allData.setArr.forEach((item, index) => {
    //     //     if (item.node_type == "5") {
    //     //         arr.push(item);
    //     //     }
    //     // });
    //     // this.setItemList = arr;
    //     // console.log(arr);
    //     // // this.showRole = this.allData.manDrama;
    //     // console.log(this.showRole);
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
                let setArrList = [];
                res.data.script_node_list.some(item => {
                    let obj = {
                        script_node_name: item.name, //节点名称
                        order_num: item.order_num, //节点序号
                        node_type: item.node_type, //节点类型【1故事背景2自我介绍3剧本阅读4搜证5答题6结算】
                        describe: item.describe, //节点说明
                        button_name: item.button_name, //按钮名称
                        min_experience: item.min_experience, //保底经验值
                        experience: item.experience, //经验值/得分
                        id: parseInt(item.script_node_id),
                        status: true
                    };
                    if (item.node_type == "5") {
                        setArrList.push(obj);
                    }
                    arr.push(obj);
                });
                that.allData.setArr = arr;
                that.setItemList = setArrList;
                console.log(that.setItemList)
                // 人物剧本
                let arr1 = [];
                let arr2 = [];
                res.data.script_role_list.some((item, index) => {
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
                        num: index,
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
                that.showRole = that.allData.manDrama;
                // 线索设置
                let arr3 = [];
                let arr4 = [];

                res.data.script_place_list.some(item => {
                    let arr5 = [];
                    if (item.clue_list.length > 0) {
                        item.clue_list.some(itemChild => {
                            let obj1 = {};
                            if (itemChild.is_going == 1) {
                                obj1 = {
                                    id: itemChild.script_clue_id,
                                    clueNode: itemChild.script_node_name, //线索的节点数据的键
                                    clueName: itemChild.name, //线索名称
                                    clueMain: itemChild.detail, //线索详情
                                    pathId: itemChild.attachment_id, //线索图片ID
                                    cluePath: itemChild.attachment, //线索图片ID
                                    clueSel: itemChild.is_open, //是否强制公开【1是0否】
                                    forceSel: itemChild.is_going, //是否可深入【1是0否】
                                    clueNameChild: itemChild.child.name, //深入线索的子线索名称
                                    pathsId: itemChild.child.attachment_id, //深入线索的子线索图片ID
                                    cluePaths: itemChild.child.attachment, //深入线索的子线索图片ID
                                    clueSels: itemChild.child.is_open, //深入线索的子线索-是否强制公开【1是0否】
                                    clueMainChild: itemChild.child.detail, //深入线索的子线索详情
                                    childId: itemChild.child.script_clue_id
                                };
                            } else {
                                obj1 = {
                                    id: itemChild.script_clue_id,
                                    clueNode: itemChild.script_node_name, //线索的节点数据的键
                                    clueName: itemChild.name, //线索名称
                                    clueMain: itemChild.detail, //线索详情
                                    pathId: itemChild.attachment_id, //线索图片ID
                                    cluePath: itemChild.attachment, //线索图片ID
                                    clueSel: itemChild.is_open, //是否强制公开【1是0否】
                                    forceSel: itemChild.is_going //是否可深入【1是0否】
                                };
                            }
                            arr4.push(obj1);
                        });
                    }

                    if (item.no_script_role_list.length > 0) {
                        item.no_script_role_list.some(itemShow => {
                            arr5.push(itemShow.script_role_name);
                        });
                    }
                    let obj = {
                        addressName: item.name, //地点名称
                        id: item.script_place_id, //地点id
                        showRole: arr5, //选择的不可见角色数据的键|[0,1]
                        clueVal: arr4,
                        status: true
                    };
                    arr3.push(obj);
                });
                that.allData.clueSettingVal = arr3;

                // 地图设置
                let arr6 = [];
                res.data.script_node_map_list.forEach((item, index) => {
                    let processValue = [];
                    let componentList = [];

                    // 节点
                    item.script_node_list.forEach(nodeItem => {
                        processValue.push(nodeItem.script_node_id);
                    });

                    // 控件
                    item.script_map_place_list.forEach(mapItem => {
                        // componentList.push(mapItem)
                        componentList.push({
                            x: mapItem.control_x_coordinate,
                            y: mapItem.control_y_coordinate,
                            width: mapItem.control_width,
                            height: mapItem.control_height,
                            clueValue: mapItem.script_place_key,
                            virtualClueValue: mapItem.script_place_key,
                            script_map_place_id: mapItem.script_map_place_id
                            // script_place_id:mapItem.script_place_id
                        });
                    });

                    arr6.push({
                        script_node_map_id: item.script_node_map_id,
                        name: item.name,
                        editingName: item.name,
                        allowEditName: false,
                        componentList: componentList,
                        virtualProcessValue: processValue,
                        processValue: processValue, // 节点
                        path: item.attachment,
                        imageId: item.attachment_id,
                        imageWidth: item.attachment_width,
                        imageHeight: item.attachment_height
                    });
                });

                that.allData.map = arr6;

                // 问题库
                let arr8 = [];
                res.data.script_question_list.some((item, index) => {
                    let arr9 = [];
                    let arr10 = [];
                    let arr11 = [];
                    if (item.answer_list.length > 0) {
                        item.answer_list.some(itemChild => {
                            let stas = false;
                            if (itemChild.is_answer == "1") {
                                stas = true;
                            } else {
                                stas = false;
                            }
                            let obj1 = {
                                id: itemChild.script_answer_id,
                                status: stas, //是否正确答案
                                textVal: itemChild.answer_title //问题名称
                            };
                            arr9.push(obj1);
                        });
                    }
                    if (item.no_see_script_roles.length > 0) {
                        item.no_see_script_roles.some(itemShow => {
                            arr10.push(itemShow.script_role_id);
                        });
                    }
                    if (item.reverse_score_role_data.length > 0) {
                        item.reverse_score_role_data.some(itemBack => {
                            arr11.push(itemBack.script_role_id);
                        });
                    }
                    let obj = {
                        id: item.script_question_id, //问题节点的数据的键
                        nodeVal: item.script_node_id, //问题节点的数据的键
                        nameVal:
                            "问题" +
                            (index + 1) +
                            "（" +
                            (item.question_type == 1 ? "多选" : "单选") +
                            "题）", //问题名称
                        showList: arr10, //不可见角色的数据的键|[0,1]
                        backScore: arr11, //反向得分角色
                        name: item.question_title, //问题title
                        type: item.question_type, //问题类型【0单选1多选】
                        score: item.score, //得分
                        negativeScore: item.reverse_score, //反向得分
                        child: arr9 //问题对应的答案数据
                    };
                    arr8.push(obj);
                });
                that.allData.problemData = arr8;
                that.problemData = that.allData.problemData;
                // localStorage.setItem("data", JSON.stringify(that.allData));
                loadingClose.close();
            });
        },
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
                            is_answer: nums, //是否是正确答案【1是0否】
                            script_answer_id: itemChild.id //答案id
                        };
                        answerList.push(answerObj);
                    });
                    let obj = {
                        script_node_id: item.nodeVal, //问题节点的数据的键
                        script_question_id: item.id, //问题节点的数据的键
                        no_script_role_ids: item.showList, //不可见角色的数据的键|[0,1]
                        question_title: item.name, //问题title
                        question_type: item.type, //问题类型【0单选1多选】
                        score: item.score, //得分
                        reverse_score: item.negativeScore, //反向得分
                        reverse_score_script_role_ids:item.backScore,
                        script_answer_data: answerList //问题对应的答案数据
                    };
                    arr5.push(obj);
                });

                let dataObj = {
                    script_id: this.allData.basicInfoData.id,
                    script_question_data: arr5
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
                // this.$router.push({
                //     path: "EndTruth"
                //     // query: {
                //     //     type: i
                //     // }
                // });
            }
        }
    }
};
</script>

<style scoped>
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
</style>